import React from 'react';
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
    width: 300,
  },
  sldier :{
    color : '#D7A310',
}
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
    const { measurement } = props;
    const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
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