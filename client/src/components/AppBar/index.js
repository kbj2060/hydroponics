import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from 'assets/jss/AppBarStyle.js'
import Menu from '../Menu';


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

  return (  
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="sticky"
              className={classes.appBar}
              elevation={0}
              color='primary'>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            스마트팜 관리시스템
          </Typography>
          <div className={classes.grow} />
            <div>
              <Menu MenuButton={MenuButton}>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
