import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HistoryCard from 'components/Card/HistoryCard';
import useStyles from 'assets/jss/HistoryStyle';
import AppBar from 'components/AppBar/AppBar';

export default function History() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container style={{padding :'15px 30px 15px 30px'}}>
          <Grid item xs={12} sm={12} md={6} style={{padding:'15px',}}>
            <HistoryCard subject='온도' backgroundColor='white'/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{padding:'15px',}}>
            <HistoryCard subject='조명' backgroundColor='white'/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{padding:'15px',}}>
            <HistoryCard subject='CO2' backgroundColor='white'/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{padding:'15px',}}>
            <HistoryCard subject='습도' backgroundColor='white'/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{padding:'15px',}}>
            <HistoryCard subject='PH' backgroundColor='white'/>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{padding:'15px',}}>
            <HistoryCard subject='EC' backgroundColor='white'/>
          </Grid>
        </Grid>
      </div>
    )
  }
