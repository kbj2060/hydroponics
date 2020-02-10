import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ControlCard from 'components/Card/ControlCard';
import FigureCard from 'components/Card/FigureCard';
import IconCard from 'components/Card/IconCard';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    }
  },
  iconCard : {
    padding : '20px',
    width : "8em",
    height : '8em',
    position: 'relative',
    zIndex : '2',
    left : '30px',
    top : '40px',
  },
  card: {
    position: 'relative',
    top: '-50px',
    zIndex : '1',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <ControlCard className={classes.Card}>제어</ControlCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Card className={classes.iconCard} >
                <IconCard Co2Icon />
              </Card>
            </div>
            <div className={classes.card}>
              <FigureCard className={classes.Card}>온도</FigureCard>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div>
              <Card className={classes.iconCard} >
                <IconCard TemperatureIcon />
              </Card>
            </div>
            <div className={classes.card}>
              <FigureCard className={classes.Card}>온도</FigureCard>
            </div>
          </Grid><Grid item xs={12} sm={6} md={3}>
            <div>
              <Card className={classes.iconCard} >
                <IconCard HumidityIcon />
              </Card>
            </div>
            <div className={classes.card}>
              <FigureCard className={classes.Card}>온도</FigureCard>
            </div>
          </Grid><Grid item xs={12} sm={6} md={3}>
            <div>
              <Card className={classes.iconCard} >
                <IconCard PHIcon />
              </Card>
            </div>
            <div className={classes.card}>
              <FigureCard className={classes.Card}>온도</FigureCard>
            </div>
          </Grid><Grid item xs={12} sm={6} md={3}>
            <div>
              <Card className={classes.iconCard} >
                <IconCard ECIcon />
              </Card>
            </div>
            <div className={classes.card}>
              <FigureCard className={classes.Card}>온도</FigureCard>
            </div>
          </Grid>

        </Grid>
      </div>
      );
    }
