import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from 'root/client/src/components/AppBar';
import {CheckLogin} from "root/client/src/components/utils/CheckLogin";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Calendar } from "root/client/src/components/Scheduler/Calendar";


const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
  },
  container : {
    display : 'flex',
    justifyContent : 'center',
    justifyItems : 'center'
  },
  item : {
    height : '300px',
    textAlign : 'center',
    padding : '2% 0',
    margin: '3%',
    width : 'auto',
    borderRadius : '20px',
    background: props => props.customTheme,
    boxShadow: props => props.neumOutShadow,
  },
  title: {
    padding : '3% 0',
  },
  parent : {
    height: '75%',
    width : '100%',
    textAlign: 'center',
    justifyContent : 'center',
    display : 'flex',
    alignItems : 'center'
  },
  addIcon : {
    height : '20%',
    width : '20%',
    color: props => props.fontColor
  }
}))
export default function Schedule() {
  const {colors} = require('root/values/colors.json')
  const [selectedDay, setSelectedDay] = useState(null);
  const classes = useStyles({
    customTheme : colors.customTheme,
    neumOutShadow : colors.neumOutShadow,
    fontColor : colors.fontColor
  });


  return (
    CheckLogin() ?
      <div className={classes.root}>
        <AppBar page={'Scheduler'} />
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={6} md={6} >
            <Calendar value={selectedDay}
      onChange={setSelectedDay}
      shouldHighlightWeekends />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>

          </Grid>
        </Grid>
      </div> :  <Redirect to={'/'} />
      );
    }
