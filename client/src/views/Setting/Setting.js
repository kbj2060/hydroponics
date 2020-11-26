import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CCTV from "root/client/src/components/CCTV";
import AppBar from 'root/client/src/components/AppBar';
import SwitchController from 'root/client/src/components/SwitchController';
import MachinesHistoryCard from "root/client/src/components/MachinesHistory";
import {CheckLogin} from "root/client/src/components/utils/CheckLogin";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";


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
    width : 'auto',
    background: props => props.customTheme,
    boxShadow: props => props.neumOutShadow,
  }
}))
export default function Setting() {
  const {colors} = require('root/values/colors')
  const classes = useStyles({
    customTheme : colors.customTheme,
    neumOutShadow : colors.neumOutShadow,
  });
  const {environments, plants} = require('root/values/preferences')


  useEffect(()=> {

  }, [])

  return (
    CheckLogin() ?
      <div className={classes.root}>
        <AppBar />
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={12} md={8} className={classes.item}>
            <p>Theme</p>
          </Grid>
          <Grid item xs={12} sm={12} md={8} className={classes.item}>
            <p>automation device setting type</p>
          </Grid>
        </Grid>
      </div> :  <Redirect to={'/'} />
      );
    }
