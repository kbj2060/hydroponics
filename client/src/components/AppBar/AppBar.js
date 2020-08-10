import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import NavDrawer from './NavDrawer';
import useStyles from 'assets/jss/AppBarStyle.js'
import Menu from './Menu';


const MenuButton = () => {
  return (
      <IconButton
          aria-label="show more"
          aria-haspopup="true">
        <MenuIcon style={{ color: 'white' }} />
      </IconButton>
  )
}

export default function PermanentAppBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({ right: false });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {return;}
    setState({ ...state, [side]: open });
  };

  return (  
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="sticky"
              className={classes.appBar}
              elevation={0}
              color='primary'>
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          Smart Farm Management System
        </Typography>
        <div className={classes.grow} />
          <div>
            <Menu MenuButton={MenuButton} />
{/*            <SwipeableDrawer
              anchor="right"
              open={state.right}
              onClose={toggleDrawer('right', false)}
              onOpen={toggleDrawer('right', true)}
              classes={{ paper: classes.paper }} >*/}
{/*
            </SwipeableDrawer>
*/}
          </div>
      </Toolbar>
      </AppBar>
      {/* <Hidden smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.paper,
          }}
          anchor="left"
        >
          <NavDrawer />
        </Drawer>
      </Hidden> */}
    </div>
  );
}
