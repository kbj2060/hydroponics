import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SWITCH_CONTROL, SWITCH_FEED } from 'resolvers/resolvers';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorCircularProgress = withStyles({
  root: {
    color: '#405C5A',
  },
})(CircularProgress);

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
        backgroundColor: '#405C5A',
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
    />
  );
});

export default function CustomizedSwitches(props) {
  const {machine} = props

  const [switchControlMutation] = useMutation(SWITCH_CONTROL);
  const [state, setState] = React.useState({
    prevStatus : null,
    status: true, 
    machine: machine
  });
    // let { loading, error, data } = useSubscription(NEW_SWITCH, { variables:  { machine }  });
  const { loading, error, data  } = useQuery(SWITCH_FEED, {variables : {
    orderBy: "updatedAt_ASC",
    filter : machine,
    last: 1,
  }})

  if (loading || error) {return <ColorCircularProgress size={40} thickness={4} />}

  try{
    if(state.prevStatus === null){ 
      const status = data.switchFeed.switches[0].status;
      setState({...state, prevStatus : !status, status: status}) 
      console.log(machine, data.switchFeed.switches[0].status)}
  } catch (error) 
    { console.log("value is not defined") }

  const handleChange = event => {
    const preStatus = state.status
    const status = !preStatus

    setState(prevState => ({ 
      ...state, 
      prevStatus : preStatus, 
      status : status }));

    switchControlMutation({
      variables : {
        machine : state.machine,
        status : status
      } })
    .then((res) => {
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            checked={state.status}
            onChange={handleChange}
            value="status"
          />
        }
        style={{margin:'auto'}}
      />
    </FormGroup>
  );
}
