import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from "axios";
import {ColorCircularProgress} from "../utils/ColorCircularProgress"

const CustomSlider = withStyles({
    valueLabel: {
      fontSize: '13px'
    }
  })(Slider);

const useStyles = makeStyles({
  root: {
    width: 'auto',
    padding: '0 5% 0 5%'
  },
  sldier :{
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
    <div className={classes.root}>
      <Typography className={classes.title}>
        {environment}
      </Typography>
      <CustomSlider
        className={classes.sldier}
        value={setting}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}