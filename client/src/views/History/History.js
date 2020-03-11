import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HistoryCard from 'components/Card/HistoryCard';
import useStyles from 'assets/jss/HistoryStyle';
import AppBar from 'components/AppBar/AppBar';

export default function History() {
  const classes = useStyles();
  const measurementArr = [ "LUX", "HUM", "TEMP", "CO2", "PH", "EC" ]

  return (
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container style={{padding :'15px 30px 15px 30px'}}>
          { measurementArr.map(measurement => { return (
                  <Grid item xs={12} sm={12} md={6} style={{padding:'15px',}}>
                    <HistoryCard measurement={measurement}/>
                  </Grid>)}) }
        </Grid>
      </div>
    )
  }
