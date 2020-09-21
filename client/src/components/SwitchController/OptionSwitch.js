import React, {useEffect} from 'react';
import {withStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch} from "react-redux";
import {controlACtype} from "../../redux/modules/ControlACtype";
import axios from "axios";
import {ColorCircularProgress} from "../utils/ColorCircularProgress";
import {loadState} from "../LocalStorage";
import {store} from "../../redux/store";
import {controlSwitch} from "../../redux/modules/ControlSwitch";

const useStyles = makeStyles((theme) => ({
  root: {
      margin: "auto",
      display:'flex',
    '& > svg': {
      margin: '0 5%',
    },
  },
  optionBox : {
    color : 'white',
    textAlign:'center',
    margin:'auto',
    display:'inline',
    alignItems:'center',
    width:'calc(100%/4)',
  },
}));

export const AC_IOS_Switch = withStyles((theme) => ({
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
      backgroundColor: '#FF364A',
      '& + $track': {
        backgroundColor: '#FF364A',
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
    border: `1px solid #425DFF`,
    backgroundColor: '#425DFF',
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

export default function OptionSwitch({machine}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mqtt_cool = 2, mqtt_hot = 3, mqtt_off = 0;
  const initialType = store.getState()['controlACtype'] === mqtt_hot
  const [status, setStatus] = React.useState(initialType);
  const [isLoading, setIsLoading] = React.useState(true);

  const getCurrentUser = () => {
    return loadState()['authentication']['status']['currentUser'];
  }

  const getACtype = async () => {
    return await axios.get('/api/get/query/last', {
      params: {
        selects : ['status'],
        whereColumn : 'machine',
        where : 'airconditioner',
        table : 'switch'
      }
    })
  }

  const postACtype = async (status) => {
    const name = getCurrentUser();
    await axios.post('/api/post/ac',{
      params: {
        machine : 'airconditioner',
        status : status,
        name : name,
      }
    })
  }


  useEffect(() => {
    getACtype().then(({data}) => {
      const latestStatus = data[0]['status']
      if(latestStatus === mqtt_cool){ setStatus(false); setIsLoading(false); }
      else if (latestStatus === mqtt_hot){ setStatus(true); setIsLoading(false); }
      else if (latestStatus === mqtt_off){ setIsLoading(false); }
      else { setIsLoading(true);}
    })
  }, [])


  if(machine === 'airconditioner') {
    const handle_AC_Options = (e) => {
      let power = Boolean;
      getACtype().then(({data}) => {
        const latestStatus = data[0]['status']
        if(latestStatus !== 0){ power = true; }
        else{ power = false; }
      })
      e.persist()

      if(e.target.checked){
        if(power){
          postACtype(mqtt_hot).then(() => {console.log('heater on')})
          dispatch(controlSwitch());
        }
        setStatus(true);
        dispatch(controlACtype(mqtt_hot));
      }
      else {
        if(power){
          postACtype(mqtt_cool).then(() => {console.log('cooler on')})
          dispatch(controlSwitch());
        }
        setStatus(false);
        dispatch(controlACtype(mqtt_cool));
      }
    }

    if(isLoading){ return <ColorCircularProgress /> }

    return (
      <div className={classes.optionBox}>
        <div className={classes.root}>
          <AcUnitIcon style={{ color: '#425DFF'}}/>
            <AC_IOS_Switch key={`${machine}_option`} checked={status} onClick={handle_AC_Options}/>
          <WhatshotIcon style={{ color: '#FF364A' }} />
        </div>
      </div>
  )
  } else {
    return (
      <div style={{display:'flex', margin: 'auto'}}>
      </div>
    )
  }
}