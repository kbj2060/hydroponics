import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ControlCard from 'components/Card/ControlCard';
import ControlCardBody from 'components/Card/ControlCardBody';

import FigureCard from 'components/Card/FigureCard';
import IconCard from 'components/Card/IconCard';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';

const drawerWidth = 240;

const useStyles = makeStyles(theme =>({
root: {
  overflow: 'hidden',
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    flexGrow: 1,
    }
  },
  tableGrid : {
  display : 'table',
  margin : '-10em 10px 0 10px',
},
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <Grid container spacing={1}>

          <Grid item xs={12} sm={12} md={12} className={classes.tableGrid}>
              <ControlCardBody>sdsd</ControlCardBody>
              <ControlCard>제어</ControlCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div>
              <IconCard Co2Icon color='co2'/>
            </div>
            <div >
              <FigureCard>온도</FigureCard>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div>
              <IconCard TemperatureIcon color='temp' />
            </div>
            <div>
              <FigureCard >온도</FigureCard>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div>
              <IconCard HumidityIcon color='hum'/>
            </div>
            <div>
              <FigureCard>온도</FigureCard>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div>
              <IconCard PHIcon color='ph'/>
            </div>
            <div>
              <FigureCard>온도</FigureCard>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div>
              <IconCard ECIcon color='ec' />
            </div>
            <div>
              <FigureCard>온도</FigureCard>
            </div>
          </Grid>

        </Grid>
      </div>
      );
    }
