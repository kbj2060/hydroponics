import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch} from "react-redux";
import {controlSwitch} from "../../actions";

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
  //const {value, checked} = props;

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

export default function CustomizedSwitches(props) {
  const {machine} = props
  const [state, setState] = React.useState({
                                              status: true, 
                                              machine: machine});
  const classes = style();
  const dispatch = useDispatch()

  const fetchSwitch = async () => {
    await axios.get('/api/getSwitch', {
      params: {
        table : 'switch',
        selects : ['status'],
        machine : machine,
        num : 1
      }
    }).then(async (res) => {
      setState({
        status: res.data[0]['status'],
        machine: machine
      })
    })
  }

  const handleChange = async (event) => {
    const status = !state.status
    dispatch(controlSwitch());
    await axios.post('/api/switchMachine',{
      params: {
        machine : machine,
        status : status
      }
    })

    setState({
      machine : machine,
      status : status });
  };

  useEffect(() => {
    fetchSwitch();
  }, [])

  return (
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
  );
}
