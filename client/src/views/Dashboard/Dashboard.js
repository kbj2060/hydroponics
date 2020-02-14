import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ControlCard from 'components/Card/ControlCard';
import CardContent from '@material-ui/core/CardContent';
import FigureCard from 'components/Card/FigureCard';
import IconCard from 'components/Card/IconCard';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Switch from 'components/Switches/Switches';
import TimerIcon from 'assets/icons/TimerIcon';
import ControlIcon from 'assets/icons/ControlIcon';
import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles(theme =>({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      }
  },
  tableGrid : {
    margin : '-10em 0px -3em 0px',
  },
  itemGrid : {
    height : '80%',
    margin : '-36px 0 -36px 0',
  },
  figureCard : {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundcolor: 'black',
    margin : '10px',
    position: 'relative',
    top: '-50px',
    zIndex : '1',
  },
  figureCardContents : {
      marginTop : '40px',
  },
  controlCardContents : {

  },
  controlCardWeather : {
    height : '20em',
    position: 'relative',
    zIndex : '2',
    top : '12em',
    margin : '0 5% 0 5%',
    backgroundColor : '#8CD790',
    },
  controlCardButtons : {
    height : '20em',
    position: 'relative',
    zIndex : '2',
    top : '12em',
    margin : '0 5% 0 5%',
    backgroundColor : '#218380',
  },
  updateInfo : {
    margin : 0,
    paddingTop : '10px',
    display : 'inlineBlock',
    borderTopWidth : '1px',
    borderTopStyle : 'solid',
    borderTopColor : '#eee',
    textAlign : 'left',
    verticalAlign : 'middle',
  },
  updateTime : {
    display : 'inline',
    verticalAlign : 'middle',
    fontSize : '10px',
  },
  controlCardBack : {
    position: 'relative',
    top: '-4em',
    zIndex : '1',
    padding: theme.spacing(2),
    textAlign: 'center',
    margin : '0 10px 0 10px',
    height : '20em',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <CssBaseline />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} className={classes.tableGrid}>
            <Card className={classes.controlCardWeather}>
                <Typography>오늘의 날씨</Typography>
            </Card>
            <Card className={classes.controlCardBack} />
          </Grid>

          <Grid item xs={12} sm={6} md={6} className={classes.tableGrid}>
            <Card className={classes.controlCardButtons}>
              <div style={{height:'25%'}}>
                <ControlIcon />
              </div>
              <div style={{height:'75%'}}>
                <Box style={{height:'calc(100%/3)'}} display='flex' p={1}>
                  <Box style={{marginLeft:'24px', display:'flex', alignItems:'center'}} flexGrow={1} p={1} >
                    <Typography>조 명</Typography>
                  </Box>
                  <Box flexGrow={1} p={1}>
                    <Typography>11</Typography>
                  </Box>
                  <Box p={1}>
                    <Switch />
                  </Box>
                </Box>
                <Box style={{height:'calc(100%/3)'}} display='flex' p={1}>
                  <Box style={{marginLeft:'24px', display:'flex', alignItems:'center'}} flexGrow={1} p={1} >
                    <Typography >가습기</Typography>
                  </Box>
                  <Box flexGrow={1} p={1}>
                    <Typography>11</Typography>
                  </Box>
                  <Box p={1}>
                    <Switch />
                  </Box>
                </Box>
                <Box style={{height:'calc(100%/3)'}} display='flex' p={1}>
                  <Box style={{marginLeft:'24px', display:'flex', alignItems:'center'}} flexGrow={1} p={1} >
                    <Typography >송풍기</Typography>
                  </Box>
                  <Box flexGrow={1} p={1}>
                    <Typography>11</Typography>
                  </Box>
                  <Box p={1}>
                    <Switch />
                  </Box>
                </Box>
              </div>
            </Card>
            <Card className={classes.controlCardBack} />
          </Grid>

          <Grid item xs={12} sm={6} md={3} className={classes.itemGrid}>
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

          <Grid item xs={12} sm={6} md={3} className={classes.itemGrid}>
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

          <Grid item xs={12} sm={6} md={3} className={classes.itemGrid}>
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

          <Grid item xs={12} sm={6} md={3} className={classes.itemGrid}>
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

          <Grid item xs={12} sm={6} md={3} className={classes.itemGrid}>
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
        </Grid>
      </div>
      );
    }
