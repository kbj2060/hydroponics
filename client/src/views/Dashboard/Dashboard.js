import React from 'react';
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
  const {environments, plants} = require('../../properties');

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
            plants.map(plant => { return(
               <Grid item xs={12} sm={4} md={4} className={classes.item} >
                <StatusCard plant={plant} />
               </Grid>)
            })
          }
          <Grid item xs={12} sm={12} md={12} className={classes.item}>
            <CustomTable />
          </Grid>
          {
            environments.map(env => { return (
            <Grid key={env.toString()} item xs={12} sm={12} md={12} lg={12} xl={4}  className={classes.item}>
              <HistoryCard environment={env}/>
            </Grid>)
            })
          }
        </Grid>
      </div>
      );
    }
