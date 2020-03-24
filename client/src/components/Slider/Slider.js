import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useQuery  } from '@apollo/react-hooks';
import { GET_SETTING } from 'resolvers/resolvers';
import CircularProgress from '@material-ui/core/CircularProgress';

const ColorCircularProgress = withStyles({
  root: {
    color: '#003458',
  },
})(CircularProgress);

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
    color:'white'
  }
});

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider(props) {
  const { measurement, isApplied, getValue, index } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 0]);
  const {loading, error, data} = useQuery(GET_SETTING, { fetchPolicy : 'network-only', variables: {filter: measurement, last:1}})

  useEffect(() => {
    if (loading || error) {return}
    if(Array.isArray(data.getSetting) && data.getSetting.length) {
      const values = data.getSetting[0].subjects.find(element => 
        element.measurement === measurement )
      setValue([values.min, values.max])
    } else {
      setValue([0,0]);
    }
  }, [data])

  useEffect(() => {
    if(isApplied){
      giveValue(index);
    }
  }, [isApplied])

  if (loading || error) {return <ColorCircularProgress size={40} thickness={4} />}

  const giveValue = (idx) => {
    getValue(measurement, value, idx);
    console.log(measurement, value, idx)
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