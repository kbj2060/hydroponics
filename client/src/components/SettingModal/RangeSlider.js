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
import Chip from "@material-ui/core/Chip";

const {colors} = require('root/values/colors.json')
const StyledValueLabel = withStyles({
  label: {
    color : colors.fontColor,
  }
})(ValueLabel);

const useStyles = makeStyles({
  root: {
    width: 'auto',
  },
  chip: {
    color : props => props.fontColor,
    borderColor: props => props.borderColor,
    margin: '0 10%'
  },
  typoExplanation : {
    padding: '3% 0'
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
  const classes = useStyles({
    borderColor : colors.fontColor,
    fontColor : colors.fontColor
  });
  const { unitsTable } = require('root/values/strings.json');
  const { settings:defaultSetting } = require('root/values/defaults.json')
  const [setting, setSetting] = React.useState(defaultSetting[settingKey]['range']);
  const [isLoading, setIsLoading] = React.useState(true);
  const reduxSetting = store.getState()['controlSetting'][settingKey]
  const [visible, setVisible] = React.useState(reduxSetting['enable']);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    const reduxSetting = store.getState()['controlSetting'][settingKey]
    dispatch(controlSetting({[settingKey] : update(reduxSetting, {
      range: {$set: newValue} })
    }))
    setSetting(newValue);
  };

const getOnExplanation = (_type) => {
    if(_type === "cooler") {
      return `켜기 : ${valuetext(setting[1])}`
    } else if (_type === "heater" || _type === "led") {
      return `켜기 : ${valuetext(setting[0])}`
    }
  }

const getOffExplanation = (_type) => {
    if(_type === "cooler") {
      return `끄기 : ${valuetext(setting[0])}`
    } else if (_type === "heater" || _type === "led") {
      return `끄기 : ${valuetext(setting[1])}`
    }
  }

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

  function setLineColor (settingKey){
    if(settingKey === "cooler"){
      return '#2153FF'
    }
    else if(settingKey === "heater"){
      return '#FF2E63'
    }
    else{
      return "#dec11e"
    }
  }

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    <div className={classes.margin}>
      {visible?
        <>
          <Grid className={classes.root}>
              <CustomIOSSlider
                className={classes.slider}
                min={getDefaultRangeMin(defaultSetting[settingKey])}
                max={getDefaultRangeMax(defaultSetting[settingKey])}
                value={setting}
                onChange={handleChange}
                ValueLabelComponent={StyledValueLabel}
                valueLabelDisplay="on"
                valueLabelFormat={valuetext}
                linecolor={setLineColor(settingKey)}/>
          </Grid>
          <Grid className={classes.typoExplanation} >
            <Chip className={classes.chip} variant="outlined" size="small" label={getOnExplanation(settingKey)} />
            <Chip className={classes.chip} variant="outlined" size="small" label={getOffExplanation(settingKey)} />
          </Grid>
        </>
        : null}
    </div>
  );
}
