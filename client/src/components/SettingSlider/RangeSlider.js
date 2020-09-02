import React, {useCallback, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import axios from "axios";
import {ColorCircularProgress} from "../utils/ColorCircularProgress"
import ValueLabel from "@material-ui/core/Slider/ValueLabel";
import {useDispatch} from "react-redux";
import {controlSetting} from "../../redux/modules/ControlSetting";


const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    fontSize : '0.8em',
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,

  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'red',
  },
})(Slider);

const StyledValueLabel = withStyles({
  label: {
    color : '#fff'
  }
})(ValueLabel);

const useStyles = makeStyles({
  root: {
    width: 'auto',
    padding: '5% 5% 5% 5%',
  },
  slider :{
    fontSize : '0.9em',
    color : "#FFCB3A",
  },
  title : {
    fontWeight : '1000',
    marginBottom : '10%',
    color:'white'
  },
});


export default function RangeSlider(props) {
  const { settingKey, isApplied, values } = props;
  const classes = useStyles();
  const {settingMinMax, WordsTable, unitsTable } = require('root/init_setting');
  const [setting, setSetting] = React.useState(values);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch()
  const {settingType} = require('root/init_setting');

  const handleChange = (event, newValue) => {
    setSetting(newValue);
  };

  useEffect(() => {
    if(isApplied){
      dispatch(controlSetting({[settingKey] :setting}));
    }
  }, [isApplied])

  useEffect(() => {
    setSetting(values);
    setIsLoading(false);
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
        <Typography className={classes.title}>
          {WordsTable[settingKey]}
        </Typography>
        <IOSSlider
          className={classes.slider}
          min={settingMinMax[settingKey][0]}
          max={settingMinMax[settingKey][1]}
          value={setting}
          onChange={handleChange}
          ValueLabelComponent={StyledValueLabel}
          valueLabelDisplay="on"
          aria-labelledby="range-slider"
          valueLabelFormat={valuetext}
        />
      </Grid>
    </div>
  );
}
