import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ControlCard from 'components/Card/ControlCard';
import CardContent from '@material-ui/core/CardContent';
import IconCard from 'components/Card/IconCard';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Switch from 'components/Switches/Switches';
import WeatherCard from 'components/Card/WeatherCard';

import TimerIcon from 'assets/icons/TimerIcon';
import ControlIcon from 'assets/icons/ControlIcon';
import GreenLightIcon from 'assets/icons/GreenLightIcon';
import RedLightIcon from 'assets/icons/RedLightIcon';
import useStyles from 'assets/jss/cardStyle';


const drawerWidth = 240;

export default function Dashboard() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <CssBaseline />
        <Grid container spacing={1}>

          <Grid item xs={12} sm={6} md={6} style={{padding:'14px',}}>
            <WeatherCard />
          </Grid>

          <Grid item xs={12} sm={6} md={6} style={{padding:'14px',}}>
            <Card className={classes.controlCardButtons}>
              <div style={{height:'25%'}}>
                <ControlIcon />
              </div>
              <div style={{height:'75%'}}>
                <Box style={{height:'calc(100% / 3)'}} display='flex'>
                  <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                    <Typography >조&nbsp;&nbsp;&nbsp;명</Typography>
                  </Box>
                  <Box className={classes.alignButtonIcon} flexGrow={1} p={1}>
                    <svg className={classes.greenDot}>
                      <circle cx="50" cy="50" r="10"/>
                    </svg>
                  </Box>
                  <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                    <Switch />
                  </Box>
                </Box>
                <Box style={{height:'calc(100% / 3)'}} display='flex'>
                  <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                    <Typography >가습기</Typography>
                  </Box>
                  <Box className={classes.alignButtonIcon} flexGrow={1} p={1}>
                  <svg className={classes.greenDot}>
                    <circle cx="50" cy="50" r="10"/>
                  </svg>
                  </Box>
                  <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                    <Switch />
                  </Box>
                </Box>
                <Box style={{height:'calc(100% / 3)'}} display='flex'>
                  <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                    <Typography style={{textAlign:'center'}} >송풍기</Typography>
                  </Box>
                  <Box className={classes.alignButtonIcon} flexGrow={1} p={1}>
                  <svg className={classes.redDot}>
                    <circle cx="50" cy="50" r="10"/>
                  </svg>
                  </Box>
                  <Box className={classes.alignButtonIcon} flexGrow={1} p={1}>
                    <Switch />
                  </Box>
                </Box>

              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} className={classes.itemGrid}>
              <IconCard Co2Icon color='co2'/>
              <Card className={classes.figureCard}>
                <CardContent className={classes.figureCardContents}>
                    <p>이산화탄소</p>
                    <h3>50%</h3>
                </CardContent>
                <div className={classes.updateInfo}>
                  <TimerIcon />
                  <p className={classes.updateTime}> 방금 갱신됨</p>
                </div>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} className={classes.itemGrid}>
            <IconCard TemperatureIcon color='temp' />
              <Card className={classes.figureCard}>
                <CardContent className={classes.figureCardContents}>
                    <p>온도</p>
                    <h3>24</h3>
                </CardContent>
                <div className={classes.updateInfo}>
                  <TimerIcon />
                  <p className={classes.updateTime}> 방금 갱신됨</p>
                </div>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} className={classes.itemGrid}>
            <IconCard HumidityIcon color='hum'/>
              <Card className={classes.figureCard}>
                <CardContent className={classes.figureCardContents}>
                    <p>습도</p>
                    <h3>50%</h3>
                </CardContent>
                <div className={classes.updateInfo}>
                  <TimerIcon />
                  <p className={classes.updateTime}> 방금 갱신됨</p>
                </div>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} alignItems={'center'} className={classes.itemGrid}>
            <IconCard PHIcon color='ph'/>
            <Card className={classes.figureCard}>
              <CardContent className={classes.figureCardContents}>
                  <p>PH</p>
                  <h3>5.5</h3>
              </CardContent>
              <div className={classes.updateInfo}>
                <TimerIcon />
                <p className={classes.updateTime}> 방금 갱신됨</p>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} className={classes.itemGrid}>
            <IconCard ECIcon color='ec' />
            <Card className={classes.figureCard}>
              <CardContent className={classes.figureCardContents}>
                  <p>EC</p>
                  <h3>10</h3>
              </CardContent>
              <div className={classes.updateInfo}>
                <TimerIcon />
                <p className={classes.updateTime}> 방금 갱신됨</p>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} className={classes.itemGrid}>
            <IconCard LedIcon color='led' />
            <Card className={classes.figureCard}>
              <CardContent className={classes.figureCardContents}>
                  <p>LED</p>
                  <h3>10</h3>
              </CardContent>
              <div className={classes.updateInfo}>
                <TimerIcon />
                <p className={classes.updateTime}> 방금 갱신됨</p>
              </div>
            </Card>
          </Grid>

        </Grid>
      </div>
      );
    }
