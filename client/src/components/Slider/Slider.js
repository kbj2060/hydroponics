import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const CustomSlider = withStyles({
    valueLabel: {
      fontSize: '10px',
    },
  })(Slider);

const useStyles = makeStyles({
  root: {
    width: 'auto',
    padding: '0 5% 0 5%'
  },
  sldier :{
    color : '#D7A310',
  },
  title : {
    marginBottom : '40px',
    color:'#405C5A'
  }
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const { measurement, isApplied, getValue } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 0]);
  
  useEffect(() => {
    if(isApplied){
      giveValue();
      console.log(value)
    }
  }, [isApplied])

  const giveValue = () => {
    getValue(measurement, value);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {measurement}
      </Typography>
      <CustomSlider
        className={classes.sldier}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}