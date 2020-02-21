import React from 'react';
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
import useStyles from 'assets/jss/dashboardStyle';


export default function Dashboard() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <CssBaseline />
        <Grid container style={{padding :'15px 30px 15px 30px'}}>

          <Grid item xs={12} sm={6} md={6} style={{padding:'15px',}}>
            <WeatherCard />
          </Grid>

          <Grid item xs={12} sm={6} md={6} style={{padding:'15px',}}>
            <Card className={classes.controlCardButtons}>
              <div style={{height:'25%'}}>
                <ControlIcon />
              </div>
              <div style={{height:'75%'}}>

                <Box style={{height:'calc(100% / 3)'}} display='flex'>
                  <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                    <Typography className={classes.textColor} variant="subtitle2">조&nbsp;&nbsp;&nbsp;명</Typography>
                  </Box>
                  <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                    <Switch />
                  </Box>
                </Box>

                <Box style={{height:'calc(100% / 3)'}} display='flex'>
                  <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                    <Typography className={classes.textColor} variant="subtitle2">가습기</Typography>
                  </Box>
                  <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                    <Switch />
                  </Box>
                </Box>

                <Box style={{height:'calc(100% / 3)'}} display='flex'>
                  <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                    <Typography className={classes.textColor} variant="subtitle2" >송풍기</Typography>
                  </Box>
                  <Box className={classes.alignButtonIcon} flexGrow={1} p={1}>
                    <Switch />
                  </Box>
                </Box>

              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2} className={classes.itemGrid}>
              <IconCard Co2Icon color='co2'/>
              <Card className={classes.figureCard}>
                <CardContent className={classes.figureCardContents}>
                    <Typography className={classes.textColor}>CO2
                      <svg className={classes.greenDot}>
                        <circle cx="50" cy="50" r="10"/>
                      </svg>
                    </Typography>
                    <Typography className={classes.textColor}>50%</Typography>
                </CardContent>
                <div className={classes.updateInfo}>
                  <TimerIcon />
                  <Typography className={classes.updateTime}> 방금 갱신됨</Typography>
                </div>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2} className={classes.itemGrid}>
            <IconCard TemperatureIcon color='temp' />
              <Card className={classes.figureCard}>
                <CardContent className={classes.figureCardContents}>
                      <Typography className={classes.textColor}>
                        온도
                        <svg className={classes.greenDot}>
                          <circle cx="50" cy="50" r="10"/>
                        </svg>
                      </Typography>
                      <Typography className={classes.textColor}>24°C</Typography>
                </CardContent>
                <div className={classes.updateInfo}>
                  <TimerIcon />
                  <p className={classes.updateTime}> 방금 갱신됨</p>
                </div>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2} className={classes.itemGrid}>
            <IconCard HumidityIcon color='hum'/>
              <Card className={classes.figureCard}>
                <CardContent className={classes.figureCardContents}>
                    <Typography className={classes.textColor}>습도
                      <svg className={classes.redDot}>
                        <circle cx="50" cy="50" r="10"/>
                      </svg>
                    </Typography>
                    <Typography  className={classes.textColor}>50%</Typography>
                </CardContent>
                <div className={classes.updateInfo}>
                  <TimerIcon />
                  <p className={classes.updateTime}> 방금 갱신됨</p>
                </div>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2} className={classes.itemGrid}>
            <IconCard PHIcon color='ph'/>
            <Card className={classes.figureCard}>
              <CardContent className={classes.figureCardContents}>
                  <Typography className={classes.textColor}>PH
                    <svg className={classes.redDot}>
                      <circle cx="50" cy="50" r="10"/>
                    </svg>
                  </Typography>
                  <Typography className={classes.textColor}>5.5</Typography>
              </CardContent>
              <div className={classes.updateInfo}>
                <TimerIcon />
                <p className={classes.updateTime}> 방금 갱신됨</p>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2} className={classes.itemGrid}>
            <IconCard ECIcon color='ec' />
            <Card className={classes.figureCard}>
              <CardContent className={classes.figureCardContents}>
                  <Typography className={classes.textColor}>EC
                    <svg className={classes.greenDot}>
                      <circle cx="50" cy="50" r="10"/>
                    </svg>
                  </Typography>
                  <Typography className={classes.textColor}>10</Typography>
              </CardContent>
              <div className={classes.updateInfo}>
                <TimerIcon />
                <p className={classes.updateTime}> 방금 갱신됨</p>
              </div>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2} className={classes.itemGrid}>
            <IconCard LedIcon color='led' />
            <Card className={classes.figureCard}>
              <CardContent className={classes.figureCardContents}>
                  <Typography className={classes.textColor}>LED
                    <svg className={classes.greenDot}>
                      <circle cx="50" cy="50" r="10"/>
                    </svg>
                  </Typography>
                  <Typography className={classes.textColor}>10</Typography>
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
