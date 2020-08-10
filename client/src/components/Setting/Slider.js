import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from "axios";
import {ColorCircularProgress} from "../utils/ColorCircularProgress"
import ValueLabel from "@material-ui/core/Slider/ValueLabel";

const StyledValueLabel = withStyles({
  label: {
    color : '#1E2425'
  }
})(ValueLabel);

const CustomSlider = withStyles((theme ) => ({
  valueLabel: {
      fontSize: '15px',
    fontWeight : '500'
    },
  }))(Slider);

const useStyles = makeStyles({
  root: {
    width: 'auto',
    padding: '0 5% 0 5%'
  },
  slider :{
    color : "#FFCB3A",
  },
  title : {
    marginBottom : '40px',
    color:'white'
  },

});

function valuetext(value) {
  return `${value}°C`;
}

export default function SettingSlider(props) {
  const { environment, isApplied, getSettingFromSlider } = props;
  const classes = useStyles();
  const [setting, setSetting] = React.useState([0, 0]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {setRange, environmentsWordTable } = require('../../PROPERTIES');

  const giveSetting = () => {
    getSettingFromSlider({[environment]: setting});
  }

  const handleMinMaxSetting = (environment) => {
    let names = [];
    ['min', 'max'].forEach((MinMax) => {
      names.push(`${environment}_${MinMax}`);
    })
    return names
  }

  const getSettings = async () => {
    await axios.get('api/getStatus', {
      params : {
        table : 'setting',
        selects : handleMinMaxSetting(environment),
        num : 1
      }
    }).then(({data}) => {
      setSetting([data[0][`${environment}_min`], data[0][`${environment}_max`]])
      setIsLoading(false);
    })
  }

  useEffect(() => {
    if(isApplied){ giveSetting(); }
  }, [isApplied])

  useEffect(() => {
    getSettings();
  }, [])

  const handleChange = (event, newValue) => {
    setSetting(newValue);
  };

  if(isLoading){
    return <ColorCircularProgress></ColorCircularProgress>
  }

  return (
    <grid className={classes.root}>
      <Typography className={classes.title}>
        {environmentsWordTable[environment]}
      </Typography>
      <CustomSlider
        className={classes.slider}
        min={setRange[environment][0]}
        max={setRange[environment][1]}
        value={setting}
        onChange={handleChange}
        ValueLabelComponent={StyledValueLabel}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </grid>
  );
}