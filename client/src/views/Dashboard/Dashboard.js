import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CCTV from "root/client/src/components/CCTV";
import AppBar from 'root/client/src/components/AppBar';
import SwitchController from 'root/client/src/components/SwitchController';
import StatusDisplay from "root/client/src/components/StatusDisplay";
import useStyles from '../../assets/jss/DashboardStyle';
import MachinesHistoryCard from "root/client/src/components/MachinesHistory";
import EnvironmentsHistroy from "root/client/src/components/EnvironmentsHistroy";
import {CheckLogin} from "root/client/src/components/utils/CheckLogin";
import {Redirect} from "react-router-dom";

export default function Dashboard() {
  const classes = useStyles();
  const {environments, plants} = require('root/init_setting');

  useEffect(()=> {

  }, [])

  return (
    CheckLogin() ?
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container className={classes.container}>
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
      </div> :  <Redirect to={'/login'} />
      );
    }
