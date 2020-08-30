import React, {useCallback, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

const ColorCircularProgress = withStyles({
  root: {
    color: '#405C5A',
  },
})(CircularProgress);

const style = makeStyles({
  controlForm : {
    margin : 'auto'
  }
});

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
  },
  switchBase: {
    padding: 1,
    display:'flex',
    alignItems:'center',
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      backgroundColor: '#FFCB3A',
      '& + $track': {
        backgroundColor: '#FFCB3A',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#405C5A',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    >
    </Switch>

  );
});

export default function Switches(props) {
  const {machine} = props
  const [state, setState] = React.useState({
                                              status: true, 
                                              machine: machine});
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const classes = style();
  const dispatch = useDispatch();
  const {WordsTable, switches, switchTable} = require('root/init_setting');


  const getCurrentUser = () => {
    return loadState()['authentication']['status']['currentUser'];
  }

  const postSwitchMachine = async (status) => {
    const name = getCurrentUser();
    await axios.post('/api/post/switch/machine',{
      params: {
        machine : machine,
        status : status,
        name : name
      }
    })
  }

  const getSwitchMachine = async () => {
    return await axios.get('/api/get/switch', {
      params: {
        selects : ['status'],
        machine : machine,
        num : 1
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
        dispatch(controlSwitch());
        setState(switchStatus);
      }})
  }
  const handleChecked = (status) => {
    return status !== false
  }

  const handleChange = async (e) => {
    e.persist();
    if(CheckLogin()) {
      const status = e.target.checked;
      setSnackbarOpen(true);
      setState({machine: machine, status: status});
      emitSocket(status);
      postSwitchMachine(status).then(() => {
        console.log('switch machine')
      });
    }
  };

  const cleanup = () => {
    socket.disconnect();
  }

  useEffect(() => {
    getSwitchMachine().then(({data}) => {
        setState({
          status: data[0]['status'] !== 0,
          machine: machine
        })
        setIsLoading(false);
    }).catch((err) => { setIsLoading(true); })

    return () => { cleanup(); }
  }, []);

  useEffect(()=>{
    receiveSocket();
    return () => { cleanup() }
  }, [machine]);

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    CheckLogin() ? <>
      <FormGroup>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={handleChecked(state.status)}
              onChange={handleChange}
              value={machine}
            />
          }
          className={classes.controlForm}
        />
      </FormGroup>
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} autoHideDuration={1500}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="info">
          {`${WordsTable[machine.toLowerCase()]} 전원 전환 완료!`}
        </Alert>
      </Snackbar>
    </> : <Redirect to={'/login'} />);
}

/*
* */