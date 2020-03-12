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
import { useHistory } from "react-router-dom";
import useStyles from 'assets/jss/dashboardStyle';

export default function Dashboard(props) {
  const history = useHistory();
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  if(!isAuth){ history.push('/'); }
  
  const measurementArr = [ "LUX", "HUM", "TEMP", "CO2", "PH", "EC" ]
  const machineArr = [ "LED" , "HUMIDIFIER", "FAN" ]                        
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container style={{padding :'15px 30px 15px 30px'}}>

          <Grid item xs={12} sm={6} md={6} style={{padding:'15px',}}>
            <WeatherCard />
          </Grid>

          <Grid item xs={12} sm={6} md={6} style={{padding:'15px',}}>
            <Card className={classes.controlCardButtons}>
            <div style={{height:'100%', paddingBottom:'3% 0 3% 0'}}>
                { machineArr.map(machine => { 
                  return (
                  <Box key={machine.toString()} style={{height:'calc(100% / 3)'}} display='flex'>
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
          
          <Grid item xs={12} sm={12} md={12} style={{padding:'15px',}}>
            <Card className={classes.parentItem}>
              <div  style={{display:'grid', gridTemplateColumns: 'auto auto auto',padding: '3% 0 0 0'}}>
                { measurementArr.map((measurement) => 
                        <Figure key={measurement.toString()} measurement={measurement} />) }
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
      );
    }
