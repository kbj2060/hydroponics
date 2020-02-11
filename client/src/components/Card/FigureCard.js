import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Co2Icon from 'assets/icons/Co2Icon';
import ECIcon from 'assets/icons/ECIcon';
import HumidityIcon from 'assets/icons/HumidityIcon';
import PHIcon from 'assets/icons/PHIcon';
import TemperatureIcon from 'assets/icons/TemperatureIcon';

import useStyles from 'assets/jss/cardStyle.js'

export default function FigureCard() {
  const classes = useStyles();

  return (
    <Card className={classes.figureCard}>
      <CardContent>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
