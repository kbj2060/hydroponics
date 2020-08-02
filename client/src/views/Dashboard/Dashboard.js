import React, { useState, useRef, useLayoutEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import WeatherCard from 'components/Card/WeatherCard';
import AppBar from 'components/AppBar/AppBar';
import ControlCard from 'components/Card/ControlCard';
import StatusCard from "components/Card/StatusCard";
import useStyles from 'assets/jss/DashboardStyle';
import CustomTable from "../../components/Table/Table";
import HistoryCard from "../../components/Card/HistoryCard";

export default function Dashboard() {
  const classes = useStyles();
  const measurementsArr = ["humidity", "temperature", "co2"];
  const plantNamesArr = ['plant1', 'plant2', 'plant3'];

  return (
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={6} md={6} className={classes.item}>
            <WeatherCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6} className={classes.item}>
            <ControlCard />
          </Grid>
          {
            plantNamesArr.map(plantName => { return(
               <Grid item xs={12} sm={4} md={4} className={classes.item} >
                <StatusCard plant={plantName} />
               </Grid>)
            })
          }
          <Grid item xs={12} sm={12} md={12} className={classes.item}>
            <CustomTable />
          </Grid>
          {
            measurementsArr.map(measurement => { return (
            <Grid key={measurement.toString()} item xs={12} sm={12} md={12} lg={12} xl={4}  className={classes.item}>
              <HistoryCard measurement={measurement}/>
            </Grid>)
            })
          }
        </Grid>
      </div>
      );
    }
