import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NavDrawer from 'components/Drawer/NavDrawer';
import RightDrawer from 'components/Drawer/RightDrawer';

import styles from 'assets/jss/appBarStyle.js'


// 페이지 상단의 앱바를 만드는 함수형 컴포넌트
export default function PermanentAppBar() {
  const classes = styles();
  const [state, setState] = React.useState({
    right: false,
  });
  const [location, setLocation] = React.useState(null);

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
    }
    setState({ ...state, [side]: open });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"
      className={classes.appBar}
      elevation={0}
      >
      <Toolbar>
        <Typography className={classes.title} variant="h5" noWrap>
          수경재배 관리 시스템
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="검색.."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={100} color="secondary">
              <NotificationsIcon style={{ color: '#3c4858' }} />
            </Badge>
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle style={{ color: '#3c4858' }}/>
          </IconButton>
        </div>
        <div className={classes.sectionMobile} >
          <IconButton
            aria-label="show more"
            aria-haspopup="true"
            color="inherit"
          >
            <MenuIcon
              onClick={toggleDrawer('right', true)}
              style={{ color: '#3c4858' }}
            />
            <SwipeableDrawer
              anchor="right"
              open={state.right}
              onClose={toggleDrawer('right', false)}
              onOpen={toggleDrawer('right', true)}
            >
              <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer('right', false)}
                onKeyDown={toggleDrawer('right', false)}
              >

              </div>
            </SwipeableDrawer>
          </IconButton>
        </div>
      </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <NavDrawer />
      </Drawer>
    </div>
  );
}
//IconButton aria-controls : MenuId
//       {renderMobileMenu}
