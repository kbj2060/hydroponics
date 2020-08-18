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
  const dispatch = useDispatch()
  const {WordsTable} = require('PROPERTIES')

  const fetchSwitch = useCallback(async () => {
    await axios.get('/api/getSwitch', {
      params: {
        table : 'switch',
        selects : ['status'],
        machine : machine,
        num : 1
      }
    }).then(({data}) => {
      setState({
        status: data[0]['status'] === 1,
        machine: machine
      })
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(true);
    })
  }, [machine])

  const handleChange = async () => {
    const status = !state.status
    setState({
      machine : machine,
      status : status
    });
    setSnackbarOpen(true);

    await axios.post('/api/switchMachine',{
      params: {
        machine : machine,
        status : status
      }
    })

    socket.emit('sendSwitchControl', {
      machine : machine,
      status : status
    })

    dispatch(controlSwitch());
  };

  useEffect(() => {
    fetchSwitch();
  }, [fetchSwitch]);

  useEffect(()=>{
    socket.on('receiveSwitchControl', (switchStatus) => {
      if (machine === switchStatus.machine){
        dispatch(controlSwitch());
        setState(switchStatus);
      }
    })
  }, [dispatch, machine]);

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={state.status}
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
    </>
  );
}
