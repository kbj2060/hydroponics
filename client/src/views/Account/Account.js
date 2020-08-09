import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from '../../assets/jss/accountStyle';
import AppBar from 'components/AppBar/AppBar';
import CustomGrid from '../../components/utils/CustomGrid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import locationImage from "assets/img/location.png";

const ColorCircularProgress = withStyles({
  root: {
    color: '#405C5A',
  },
})(CircularProgress);

export default function Account() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container className={classes.container}>
          <CustomGrid xs={12} sm={12} md={6} noPadding={true}>
              <Grid container spacing={2} className={classes.secondContainer}>
                  <Grid item xs={4} sm={4} md={4} className={classes.item}>
                          <AccountCircle className={classes.accountCircle}/>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} className={classes.item2}>
                      <Typography className={classes.text}>Sensor Broker IP    : </Typography>
                      <Typography className={classes.text}>MySQL Server IP     : </Typography>
                      <Typography className={classes.text}>Web Server IP       : </Typography>
                      <Typography className={classes.text}>Prisma Server IP    : </Typography>  
                      </Grid>
              </Grid>
          </CustomGrid>
        <CustomGrid xs={12} sm={12} md={6}>
            <Typography className={classes.text}>경기도 광주시 초월읍 대쌍령리 253-52</Typography>
            <img src={locationImage} className={classes.img} />
        </CustomGrid>
        </Grid>
    </div>
		)
	}
