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
import {Redirect} from "react-router-dom";
import {CheckLogin} from "../utils/CheckLogin";
import {CustomIOSSwitch} from "../utils/CustomIOSSwitch";
import {store} from "../../redux/store";
import getCurrentUser from "../utils/getCurrentUser";


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
  const [state, setState] = React.useState({ [machine]: true});
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

  const emitSocket = (status) => {
    socket.emit('sendSwitchControl', {
      machine : machine,
      status : status
    })
  }

  const receiveSocket = () => {
    socket.on('receiveSwitchControl', (switchStatus) => {
      if(machine === switchStatus.machine){
        console.log(switchStatus)
        setState({[machine] : switchStatus.status});
        const _switch = store.getState()['switches'][machine];
        if (_switch !== switchStatus.status){dispatch(controlSwitch({[machine] : switchStatus.status}));}
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
    setState({[machine] : status});
    emitSocket(status);
    postSwitchMachine(status?1:0);
  }

  const closeSnackBar = () => {
    setSnackbarOpen(false);
  }

  const cleanup = () => {
    socket.disconnect();
    setIsLoading(true);
  }

  const PowerDisplay = () => {
    return (
      state[machine]
        ? <p className={classes.displayPowerOn}>ON</p>
        : <p className={classes.displayPowerOff}>OFF</p>
    )
  }

  const Alarm = () => {
    return (
      <Snackbar open={snackbarOpen} onClose={closeSnackBar} autoHideDuration={2000}>
        <Alert onClose={closeSnackBar} severity="info">
          {`${WordsTable[machine.toLowerCase()]} 전원 수동 전환 완료!`}
        </Alert>
      </Snackbar>
    )
  }


  const SwitchForm = ({children}) => {
    return (
      <FormGroup>
        <FormControlLabel
          control={ children }
          className={classes.controlForm} />
      </FormGroup>
    )
  }

  useEffect(() => {
    setState({[machine] : store.getState()['switches'][machine]})
    setIsLoading(false)
    receiveSocket();
    return () => {
      cleanup();
    }
  }, [machine]);

    useEffect(() => {
      setState({[machine] : store.getState()['switches'][machine]})
      setIsLoading(false)
    }, [])

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    CheckLogin()
      ? <>
          <SwitchForm>
            <FormGroup>
              <FormControlLabel
                control={
                  <CustomIOSSwitch
                    key={machine}
                    checked={state[machine]}
                    onChange={handleChange}
                    value={machine} /> }
                className={classes.controlForm} />
            </FormGroup>
          </SwitchForm>
          <PowerDisplay />
          <Alarm />
        </>
      : <Redirect to={'/'} />);
}

export default memo(Switches);