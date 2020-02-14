import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Co2Icon from 'assets/icons/Co2Icon';
import TemperatureIcon from 'assets/icons/TemperatureIcon';
import HumidityIcon from 'assets/icons/HumidityIcon';
import PHIcon from 'assets/icons/PHIcon';
import ECIcon from 'assets/icons/ECIcon';

import useStyles from 'assets/jss/cardStyle.js'

const colors = {
  co2 : {backgroundColor : '#ff7473'},
  temp : {backgroundColor : '#ffc952'},
  hum : {backgroundColor : '#47b8e0'},
  ph : {backgroundColor : '#5c196b'},
  ec : {backgroundColor : '#f9a11b'},
};

export default function ControlIcon(props) {
  const {color, ...rest} = props;
  const classes = useStyles(colors[color]);
  const cardClass = Object.keys(rest)[0];

  const cardClassList = {
    'Co2Icon' : <Co2Icon />,
    'TemperatureIcon' : <TemperatureIcon />,
    'HumidityIcon' : <HumidityIcon />,
    'PHIcon' : <PHIcon />,
    'ECIcon' : <ECIcon />,
  }
  return (
        <Card className={classes.iconCard}>
          {cardClassList[cardClass]}
        </Card>
    );
}
