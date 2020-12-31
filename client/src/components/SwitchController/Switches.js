import React, {memo, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch} from "react-redux";
import {controlSwitch} from "../../redux/modules/ControlSwitch";
import socket from '../../socket';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {loadState} from "../LocalStorage";
import {Redirect} from "react-router-dom";
import {CheckLogin} from "../utils/CheckLogin";
import {CustomIOSSwitch} from "../utils/CustomIOSSwitch";
import {store} from "../../redux/store";
import {checkEmpty} from "../utils/CheckEmpty";

function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

const ColorCircularProgress = withStyles({
  root: {
    color: '#405C5A',
  },
})(CircularProgress);

const style = makeStyles({
  controlForm : {
    margin : 'auto',
  },
  displayPowerOn : {
    paddingLeft : '10px',
    width : '40px',
    color : props => props.buttonOn
  },
  displayPowerOff : {
    paddingLeft : '10px',
    width : '40px',
    color : props => props.buttonOff
  }
});

function Switches(props) {
  const {machine} = props
  const [state, setState] = React.useState({ status: true, machine: machine});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const {colors} = require('root/values/colors.json');
  const classes = style({
    buttonOn : colors.buttonOn,
    buttonOff : colors.buttonOff,
  });
  const dispatch = useDispatch();
  const {WordsTable} = require('root/values/strings.json');
  const han_current_page = decodeURI(window.location.pathname.replace('/',''))
  const current_page = WordsTable[han_current_page]

  const getCurrentUser = () => {
    return loadState('authentication')['status']['currentUser'];
  }

  const postSwitchMachine = async (status) => {
    const name = getCurrentUser();
    await axios.post('/api/post/switch/machine',{
      params: {
        machine : machine,
        section : current_page,
        status : status,
        name : name
      }
    })
  }

  const getSwitchMachine = async () => {
    return await axios.get('/api/get/query/last', {
      params: {
        selects : ['status'],
        whereColumn : 'machine',
        where : machine,
        table : 'switch'
      }
    })
  }

  const emitSocket = (status) => {
    socket.emit('sendSwitchControl', {
      machine : machine,
      status : status
    })
  }

  const receiveSocket = () => {
    socket.on('receiveSwitchControl', (switchStatus) => {
      if(machine === switchStatus.machine){
        setState(switchStatus);
        dispatch(controlSwitch({[machine] : switchStatus.status}));
      }})
  }

  const handleChange = (e) => {
    e.persist();
    const status = e.target.checked;
    const switches = store.getState()['switches'];

    if (machine === "cooler" && status && switches['heater']){
      return;
    }
    else if(machine === "heater" && status && switches['cooler']){
      return;
    }

    dispatch(controlSwitch({[machine] : status}));
    setSnackbarOpen(true);
    setState({machine: machine, status: status});
    emitSocket(status);
    postSwitchMachine(status?1:0)
  };

  const closeSnackBar = () => {
    setSnackbarOpen(false);
  }

  const handleSqlStatus = (data) => {
    return data !== 0;
  }

  const cleanup = () => {
    socket.disconnect();
    setIsLoading(true);
  }

  useEffect(() => {
    getSwitchMachine()
      .then(({data}) => {
        if(checkEmpty(data)) {
          setState({
            status: false,
            machine: machine
          })
        } else {
          setState({
            status: handleSqlStatus(data[0]['status']),
            machine: machine
          })
        }
          setIsLoading(false);
    }).catch(() => { setIsLoading(true); })
    receiveSocket();
    return () => {
      cleanup();
    }
  }, [machine]);

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    CheckLogin() ? <>
      <FormGroup>
        <FormControlLabel
          control={
            <CustomIOSSwitch
              key={machine}
              checked={state.status}
              onChange={handleChange}
              value={machine}
            />
          }
          className={classes.controlForm}
         />
      </FormGroup>
      {state.status ?
        <p className={classes.displayPowerOn}>ON</p>:<p className={classes.displayPowerOff}>OFF</p>}
      <Snackbar open={snackbarOpen} onClose={closeSnackBar} autoHideDuration={2000}>
        <Alert onClose={closeSnackBar} severity="info">
          {`${WordsTable[machine.toLowerCase()]} 전원 수동 전환 완료!`}
        </Alert>
      </Snackbar>
    </> : <Redirect to={'/'} />);
}

export default memo(Switches);