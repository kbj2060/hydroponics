import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomGrid from 'components/Grid/Grid';
import CustomTable from 'components/Table/Table';
import CustomDatePicker from 'components/DatePicker/DatePicker';
import useStyles from 'assets/jss/HistoryStyle';
import AppBar from 'components/AppBar/AppBar';
import Typography from '@material-ui/core/Typography';
import HistoryCard from "../../components/Card/HistoryCard";

export default function History() {
  const classes = useStyles();
  const measurementArr = ["HUM", "TEMP", "CO2"]

  return (
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />

        <Grid container>
            <CustomGrid xs={12} sm={12} md={12}>
                <CustomTable />
            </CustomGrid>
            <Grid container style={{padding:"25px"}}>
                { measurementArr.map(measurement => { return (
                    <Grid key={measurement.toString()} item xs={12} sm={12} md={12} className={classes.item}>
                        <HistoryCard measurement={measurement}/>
                    </Grid>)}) }
            </Grid>
        </Grid>

      </div>
    )
  }

  /*
  <CustomGrid xs={12} sm={12} md={6}>
            <CustomDatePicker />
        </CustomGrid>
        <CustomGrid xs={12} sm={12} md={6}>
            <Typography>Camera History</Typography>
        </CustomGrid>
   */