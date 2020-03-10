import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { NEW_SWITCH, SWITCH_CONTROL } from 'resolvers/resolvers';

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

// const SWITCH_CONTROL = gql`
//     mutation switchControlMutation( $machine: SwitchFormat!, $status:Boolean! ){
//       switchControl(machine: $machine, status: $status){
//         updatedAt
//         controledBy {
//           name
//         }
//      }
// }`;

// const NEW_SWITCH = gql`
//     subscription newSwitchSubscription ($machine: SwitchFormat!) {
//         newSwitch(machine: $machine){
//           machine
//           status
//           updatedAt
//           controledBy{
//             name
//           }
//         }
//     }
// `;


export default function CustomizedSwitches(props) {
  const {machine} = props
  const [state, setState] = React.useState({
    checked: true, //쿼리문으로 이전 값 갖고 와야 할 것.
    machine: machine
  });

  const [switchControlMutation] = useMutation(SWITCH_CONTROL);
  let { loading, error, data } = useSubscription(NEW_SWITCH, { variables:  { machine }  });
  if (error) { console.log(error); }
  if (data === undefined || loading){
    console.log('No subscripted data!')}
  console.log(data)  

  const handleChange = name => event => {
    console.log(event)
    setState({ ...state, [name]: !state.checked });
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
