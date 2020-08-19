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

export default function SettingSlider(props) {
  const { settingKey, isApplied } = props;
  const classes = useStyles();
  const {settingMinMax, WordsTable } = require('../../client_property');
  const [setting, setSetting] = React.useState([0, 0]);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch()

  const handleNames = (key) => {
    let names = [];
    ['min', 'max'].forEach((MinMax) => {
      names.push(`${key}_${MinMax}`);
    })
    return names
  }

  const handleChange = (event, newValue) => {
    setSetting(newValue);
  };

  const fetchSettings = useCallback(async () => {
    await axios.get('api/getStatus', {
      params : {
        table : 'setting',
        selects : handleNames(settingKey),
        num : 1
      }
    }).then(({data}) => {
      !data ? setSetting([0, 0]) : setSetting([data[`${settingKey}_min`], data[`${settingKey}_max`]])
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
      console.log("SLIDER FETCH ERROR");
      setSetting([0, 0]);
    })
  }, [settingKey])


  useEffect(() => {
    if(isApplied){
      dispatch(controlSetting({[settingKey] :setting}));
    }
  }, [isApplied])


  useEffect(() => {
    fetchSettings();
    }, [])


  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    <div className={classes.margin}>
      <Grid className={classes.root}>
        <Typography className={classes.title}>
          {WordsTable[settingKey]}
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