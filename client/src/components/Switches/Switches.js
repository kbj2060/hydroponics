import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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

const SWITCH_CONTROL = gql`
    mutation switchControlMutation( $machine: SwitchFormat!, $status:Boolean! ){
      switchControl(machine: $machine, status: $status){
        updatedAt
     }
}`;

export default function CustomizedSwitches(props) {
  const [state, setState] = React.useState({
    checked: true,
    machine: props.machine
  });
  const [switchControlMutation, { data }] = useMutation(SWITCH_CONTROL);
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    console.log(state)
    switchControlMutation({
      variables : {
        machine : state.machine,
        status : state.checked
      }
    })
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
            checked={state.checked}
            onChange={handleChange('checked')}
            value="checked"
          />
        }
        style={{margin:'auto'}}
      />
    </FormGroup>
  );
}
