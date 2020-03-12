import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from 'assets/jss/settingsStyle';
import AppBar from 'components/AppBar/AppBar';
import SettingSlider from 'components/Slider/Slider';
import Card from '@material-ui/core/Card';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography'

export default function Settings() {
  const classes = useStyles();
  const measurementArr = [ "LUX", "HUM", "TEMP", "CO2", "PH", "EC" ]

  return (
      <div className={classes.root}>
        <AppBar />
        <Grid container style={{padding :'15px 30px 15px 30px'}}>
        <Grid item xs={12} sm={12} md={12} style={{padding:'15px',}}>
            <Card className={classes.parentItem}>
              <div  style={{display:'grid', gridTemplateColumns: 'auto auto auto',padding: '3% 0 0 0'}}>
              { measurementArr.map((measurement) => <SettingSlider key={measurement.toString()} measurement={measurement} /> )}
              </div>
            </Card>
          </Grid>
        </Grid>
    </div>
  );
}