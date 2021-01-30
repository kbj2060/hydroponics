import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from 'root/client/src/components/AppBar';
import {CheckLogin} from "root/client/src/components/utils/CheckLogin";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {IconButton, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ThemeChecker from "../../components/ThemeChecker/ThemeChecker";

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
  },
  addIconButton: {
    height : '100%',
  }
}))
export default function Setting() {
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
    customTheme : colors.customTheme,
    neumOutShadow : colors.neumOutShadow,
    fontColor : colors.fontColor
  });

  return (
    CheckLogin() ?
      <div className={classes.root}>
        <AppBar page={'설정'} />
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={6} md={3} >
            <div className={classes.item}>
              <Typography className={classes.title}>테 마</Typography>
              <div className={classes.parent}>
                <ThemeChecker />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.item}>
              <Typography className={classes.title}>기기 등록</Typography>
              <div className={classes.parent}>
                <IconButton  className={classes.addIconButton} >
                  <AddIcon className={classes.addIcon} />
                </IconButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </div> :  <Redirect to={'/'} />
      );
    }
