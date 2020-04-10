import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomGrid from 'components/Grid/Grid';
import CustomTable from 'components/Table/Table';
import CustomDatePicker from 'components/DatePicker/DatePicker';
import useStyles from 'assets/jss/HistoryStyle';
import AppBar from 'components/AppBar/AppBar';
import Typography from '@material-ui/core/Typography';

export default function History() {
  const classes = useStyles();
  const measurementArr = [ "LUX", "HUM", "TEMP", "CO2", "PH", "EC" ]

  return (
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container>
        <CustomGrid xs={12} sm={12} md={12}>
            <CustomTable />
        </CustomGrid>
        <CustomGrid xs={12} sm={12} md={6}>
            <CustomDatePicker />
        </CustomGrid>
        <CustomGrid xs={12} sm={12} md={6}>
            <Typography>Camera History</Typography>
        </CustomGrid>
        </Grid>
      </div>
    )
  }
