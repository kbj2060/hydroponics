import React from 'react';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';


import { NavDrawer } from 'components/Drawer/NavDrawer';
import useStyles from 'assets/jss/appBarStyle.js'
import {  makeStyles } from '@material-ui/core/styles';

const style = makeStyles(theme => ({
  badge : {
    backgroundColor:'#a87f0b',
    color : 'white',
  }
}))

export default function PermanentAppBar(props) {
  const classes = useStyles();
  const overrideClasses = style();
  
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  // const closeDrawer = () => {
  //   setState(false);
  // }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="sticky"
      className={classes.appBar}
      elevation={0}
      color='primary'
      >
      <Toolbar >
        <Typography className={classes.title} variant="h6">
          Hydroponics Management System
        </Typography>
        <div className={classes.grow} />
        <Hidden smDown>
          <Link to="/notification">
            <IconButton aria-label="show 17 new notifications" 
                        color="inherit">            
              <Badge badgeContent={100} classes={{badge: overrideClasses.badge}}>
                <NotificationsIcon style={{ heigth: '27px', width:'27px', color: '#405C5A' }} />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/account">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle style={{ heigth: '27px', width:'27px', color: '#405C5A' }}/>
            </IconButton>
          </Link>
        </Hidden>
        <Hidden mdUp>
          <div>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={toggleDrawer('right', true)}
              >
              <MenuIcon
                style={{ color: '#405C5A' }}
              />
            </IconButton>
            <SwipeableDrawer
              anchor="right"
              open={state.right}
              onClose={toggleDrawer('right', false)}
              onOpen={toggleDrawer('right', true)}
              classes={{ paper: classes.paper }} >
              <div>
                <NavDrawer {...state}/>
              </div>
            </SwipeableDrawer>
            
          </div>
        </Hidden>
      </Toolbar>
      </AppBar>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.paper,
          }}
          anchor="left"
        >
          <NavDrawer />
        </Drawer>
      </Hidden>
    </div>
  );
}
