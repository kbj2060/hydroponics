import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from 'assets/jss/cardStyle.js'

export default function ControlCard(props) {
  const classes = useStyles();

  return (
      <Card className={classes.controlCard}>
        <CardContent>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
  );
}
