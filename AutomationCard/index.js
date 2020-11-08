import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import socket from '../../socket';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {loadState} from "../LocalStorage";
import {CheckLogin} from "../utils/CheckLogin";
import BrightnessAutoOutlinedIcon from '@material-ui/icons/BrightnessAutoOutlined';
import {Redirect} from "react-router-dom";


function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

const ColorCircularProgress = withStyles({
  root: {
    color: '#405C5A',
  },
})(CircularProgress);

const CustomBrightnessAutoOutlinedIcon = ({filled, onClick}) => {
  const {colors} = require('root/values/colors');
  const color = filled ? colors['buttonOn'] : colors['buttonOff']
  return (
    <div onClick={onClick}>
      <BrightnessAutoOutlinedIcon style={{color: color}}/>
    </div>
  );
};

const style = makeStyles({
  controlForm : {
    margin : 'auto'
  }
});

export default function AutomationCard(props) {
  const {setting} = props
  const [state, setState] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const classes = style();
  const {WordsTable} = require('root/values/strings');


  const getCurrentUser = () => {
    return loadState()['authentication']['status']['currentUser'];
  }

  const postAutoSwitch = async (status) => {
    const name = getCurrentUser();
    await axios.post('/api/post/switch/auto',{
      params: {
        item : setting,
        enable : status,
        name : name
      }
    })
  }

  const getAutoSwitch = async () => {
    return await axios.get('/api/get/switch/auto', {
      params: {
        item : setting
      }
    })
  }

  const emitSocket = (status) => {
    socket.emit('sendSwitchControl', {
      setting : setting,
      status : status
    })
  }

  const receiveSocket = () => {
    socket.on('receiveSwitchControl', (switchStatus) => {
      if(setting === switchStatus.setting){
        setState(switchStatus['status'])
      }})
  }

  const closeSnackBar = () => {
    setSnackbarOpen(false);
  }

  const handleChange = (e) => {
    if(CheckLogin()) {
      const status = !state;
      setSnackbarOpen(true);
      setState(status);
      emitSocket(status);
      postAutoSwitch(status).then(() => {
        console.log('switch setting')
      });
    }
  };

  const cleanup = () => {
    socket.disconnect();
  }

  useEffect(() => {
    getAutoSwitch().then(({data}) => {
        setState(data['status'])
        setIsLoading(false);
    }).catch((err) => { setIsLoading(true); })

    return () => { cleanup(); }
  }, []);

  useEffect(()=>{
    receiveSocket();
    return () => { cleanup() }
  }, [setting]);

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    CheckLogin() ? <>
      <FormGroup>
        <FormControlLabel
          control={ <CustomBrightnessAutoOutlinedIcon filled={state} onClick={handleChange} /> }
          className={classes.controlForm}/>
      </FormGroup>
      <Snackbar open={snackbarOpen} onClose={closeSnackBar} autoHideDuration={1500}>
        <Alert onClose={closeSnackBar} severity="info">
          {`${WordsTable[setting.toLowerCase()]} 자동화 전환 완료!`}
        </Alert>
      </Snackbar>
    </> : <Redirect to={'/'} />);
}

/*
* */