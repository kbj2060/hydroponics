import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from 'assets/jss/accountStyle';
import AppBar from 'components/AppBar/AppBar';
import CustomCard from 'components/Grid/Grid';
import CustomList from 'components/List/List';
import CustomDatePicker from 'components/DatePicker/DatePicker';

import Typography from '@material-ui/core/Typography';

export default function Account() {
	const classes = useStyles();
	// switch history / figures histroy / details(ip, type, name, server, ) / plant pictures history /  
	return (
    <div className={classes.root}>
      <AppBar />
      <CssBaseline />
      <Grid container style={{padding :'15px 30px 15px 30px'}}>
        <CustomCard xs={12} sm={12} md={6}>
          <Typography>Account</Typography>
          <Typography>Name</Typography>
          <Typography>Type</Typography>
          <Typography>Location</Typography>
          <Typography>Web Server IP</Typography>
          <Typography>Sensor Broker IP</Typography>
          <Typography>Prisma Server Ip</Typography>
        </CustomCard>
        <CustomCard xs={12} sm={12} md={6}>
          <Typography>Switch History</Typography>
          <CustomList></CustomList>
        </CustomCard>
        <CustomCard xs={12} sm={12} md={6}>
          <Typography>Figure History</Typography>
          <CustomDatePicker />
        </CustomCard>
        <CustomCard xs={12} sm={12} md={6}>
          <Typography>Camera History</Typography>
        </CustomCard>
      </Grid>
    </div>
		)
	}
