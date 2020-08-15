import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import axios from "axios";
import {ColorCircularProgress} from "../utils/ColorCircularProgress"
import ValueLabel from "@material-ui/core/Slider/ValueLabel";


const StyledValueLabel = withStyles({
  label: {
    color : '#1E2425'
  }
})(ValueLabel);

const CustomSlider = withStyles({
  valueLabel: {
    fontSize: '15px',
    fontWeight : '500'
  },
})(Slider);


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

export default function Setting(props) {
  const { settingKey, isApplied, getSettingFromSlider } = props;
  const classes = useStyles();
  const [setting, setSetting] = React.useState([0, 0]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {settingMinMax, environmentsWordTable } = require('../../PROPERTIES');


  const handleMinMaxSetting = (settingKey) => {
    let names = [];
    ['min', 'max'].forEach((MinMax) => {
      names.push(`${settingKey}_${MinMax}`);
    })
    return names
  }

  const giveSetting = () => {
    getSettingFromSlider({[settingKey]: setting});
  }

  const fetchSettings = async () => {
    await axios.get('api/getStatus', {
      params : {
        table : 'setting',
        selects : handleMinMaxSetting(settingKey),
        num : 1
      }
    }).then(({data}) => {
      setSetting([data[`${settingKey}_min`], data[`${settingKey}_max`]])
      setIsLoading(false);
    })
  }

  useEffect(() => {
    if(isApplied){ giveSetting(); }
  }, [isApplied])

  useEffect(() => {
    fetchSettings();
  }, [])

  const handleChange = (event, newValue) => {
    setSetting(newValue);
  };

  if(isLoading){
    return <ColorCircularProgress></ColorCircularProgress>
  }

  return (
    <div className={classes.margin}>
      <Grid className={classes.root}>
        <Typography className={classes.title}>
          {environmentsWordTable[settingKey]}
        </Typography>
        <CustomSlider
          className={classes.slider}
          min={settingMinMax[settingKey][0]}
          max={settingMinMax[settingKey][1]}
          value={setting}
          onChange={handleChange}
          ValueLabelComponent={StyledValueLabel}
          valueLabelDisplay="on"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </Grid>
    </div>
  );
}