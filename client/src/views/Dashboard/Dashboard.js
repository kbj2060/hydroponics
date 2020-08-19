import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CCTV from "components/CCTV";
//import WeatherCard from 'components/WeatherCard';
import AppBar from 'components/AppBar';
import SwitchController from 'components/SwitchController';
import StatusDisplay from "components/StatusDisplay";
import useStyles from 'assets/jss/DashboardStyle';
import MachinesHistoryCard from "components/MachinesHistory";
import EnvironmentsHistroy from "components/EnvironmentsHistroy";

export default function Dashboard() {
  const classes = useStyles();
  const {environments, plants} = require('../../client_property');

  return (
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container className={classes.container}>
         {/* <Grid item xs={12} sm={6} md={6} className={classes.item}>
            <img src={logo} style={{width:'100%', height:'100%', borderRadius:'15px'}}/>
          </Grid>*/}
          <Grid item xs={12} sm={12} md={4} className={classes.item}>
            <SwitchController />
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={classes.item}>
            <CCTV />
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={classes.item}>
            <MachinesHistoryCard />
          </Grid>
          {plants.map(plant => { return(
               <Grid key={plant.toString()} item xs={12} sm={12} md={4} className={classes.item} >
                 <StatusDisplay plant={plant} />
               </Grid>)
            })}
          {environments.map(env => { return (
            <Grid key={env.toString()} item xs={12} sm={12} md={12} lg={4} xl={4}  className={classes.item}>
              <EnvironmentsHistroy environment={env} />
            </Grid>)
            })}
        </Grid>
      </div>
      );
    }
