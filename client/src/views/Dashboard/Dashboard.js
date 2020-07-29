import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Switch from 'components/Switches/Switches';
import Figure from 'components/Figure/Figure';
import WeatherCard from 'components/Card/WeatherCard';
import AppBar from 'components/AppBar/AppBar';
import useStyles from 'assets/jss/DashboardStyle';
import axios from "axios";

export default function Dashboard() {
  const machineArr = ["LED", "AirConditioner"]
  const measurementArr = ["HUM", "TEMP", "CO2"]
  const classes = useStyles();

  axios.get(`/api/temperature`)
    .then(res => {
        const data = res.data;
        console.log(data);
    })

  return (
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={6} md={6} className={classes.item}>
            <WeatherCard />
          </Grid>
          <Grid item xs={12} sm={6} md={6} className={classes.item}>
            <Card className={classes.controlCardButtons}>
            <div className={classes.controlCardDiv}>
                { machineArr.map(machine => { 
                  return (
                  <Box key={machine.toString()}  className={classes.controlCardBox} display='flex'>
                    <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                      <Typography className={classes.textColor} variant="subtitle2">{machine}</Typography>
                    </Box>
                    <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                      <Switch machine={machine} />
                    </Box>
                  </Box>
                  )
                }) }
            </div>
            </Card>
          </Grid>
            <Grid item xs={4} sm={4} md={4} className={classes.item}>
            <Card className={classes.parentItem}>
                <Typography style={{color:"white", padding:"5px 0px 5px 0px"}}>PLANT 1</Typography>
                <div className={classes.figureCardDiv}>
                { measurementArr.map((measurement) =>
                        <Figure key={measurement.toString()} measurement={measurement} />) }
              </div>
            </Card>
            </Grid>
            <Grid item xs={4} sm={4} md={4} className={classes.item}>
                <Card className={classes.parentItem}>
                    <Typography style={{color:"white", padding:"5px 0px 5px 0px"}}>PLANT 2</Typography>
                    <div className={classes.figureCardDiv}>
                        { measurementArr.map((measurement) =>
                            <Figure key={measurement.toString()} measurement={measurement} />) }
                    </div>
                </Card>
            </Grid>
            <Grid item xs={4} sm={4} md={4} className={classes.item}>
                <Card className={classes.parentItem}>
                    <Typography style={{color:"white", padding:"5px 0px 5px 0px"}}>PLANT 3</Typography>
                    <div className={classes.figureCardDiv}>
                        { measurementArr.map((measurement) =>
                            <Figure key={measurement.toString()} measurement={measurement} />) }
                    </div>
                </Card>
            </Grid>
        </Grid>
      </div>
      );
    }
