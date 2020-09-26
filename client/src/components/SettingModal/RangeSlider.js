import React, {useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {ColorCircularProgress} from "../utils/ColorCircularProgress"
import ValueLabel from "@material-ui/core/Slider/ValueLabel";
import {useDispatch} from "react-redux";
import {controlSetting} from "../../redux/modules/ControlSetting";
import {store} from "../../redux/store";
import {CustomIOSSlider} from "../utils/CustomIOSSlider";
import update from 'react-addons-update';


const StyledValueLabel = withStyles({
  label: {
    color : '#fff'
  }
})(ValueLabel);

const useStyles = makeStyles({
  root: {
    width: 'auto',
  },
  slider :{
    fontSize : '0.9em',
  },
  title : {
    fontWeight : '1000',
    marginBottom : '10%',
    color:'white'
  },
});

const getDefaultRangeMin = (subject) => {
  return subject.range[0]
}
const getDefaultRangeMax = (subject) => {
  return subject.range[1]
}

export default function RangeSlider(props) {
  const { settingKey } = props;
  const classes = useStyles();
  const {defaultSetting, unitsTable } = require('root/init_setting');
  const reduxSetting = store.getState()['controlSetting'][settingKey]
  const [setting, setSetting] = React.useState(defaultSetting[settingKey]['range']);
  const [visible, setVisible] = React.useState(reduxSetting['enable']);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    const reduxSetting = store.getState()['controlSetting'][settingKey]

    dispatch(controlSetting({[settingKey] : update(reduxSetting, {
      range: {$set: newValue} })
    }))
    setSetting(newValue);
  };

  useEffect(() => {
    const reduxRange = store.getState()['controlSetting'][settingKey]['range']
    const unsubscribe = store.subscribe(() => {
      setVisible(store.getState()['controlSetting'][settingKey]['enable']);
    })
    setSetting(reduxRange);
    setIsLoading(false);
    return () => { unsubscribe(); }
  }, [])

  function valuetext(value, index) {
    return `${value}${unitsTable[settingKey]}`;
  }

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    <div className={classes.margin}>
      <Grid className={classes.root}>
        {visible? <CustomIOSSlider
          className={classes.slider}
          min={getDefaultRangeMin(defaultSetting[settingKey])}
          max={getDefaultRangeMax(defaultSetting[settingKey])}
          value={setting}
          onChange={handleChange}
          ValueLabelComponent={StyledValueLabel}
          valueLabelDisplay="on"
          valueLabelFormat={valuetext}
        /> : null}

      </Grid>
    </div>
  );
}
