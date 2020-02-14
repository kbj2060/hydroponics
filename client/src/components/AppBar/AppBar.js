import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import { NavDrawer } from 'components/Drawer/NavDrawer';
import styles from 'assets/jss/appBarStyle.js'


// 페이지 상단의 앱바를 만드는 함수형 컴포넌트
export default function PermanentAppBar(props) {
  const classes = styles();
  const [state, setState] = React.useState({
    right: false,
  });
  const [locationState, setLocationState] = React.useState({
    location : 'left'
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
    }
    setState({[side]: open });
  }
  const handleLocationChange = (side) => {
    setLocationState({
      location : side,
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="sticky"
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
        <Hidden smDown>
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
        </Hidden>
        <Hidden mdUp>
          <div >
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
              onClick={() => handleLocationChange('right')}
              >
              <MenuIcon
                onClick={toggleDrawer('right', true)}
                style={{ color: '#3c4858' }}
              />
              <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
              >
                <div
                  className={classes.list}
                  role="presentation"
                >
                  <NavDrawer {...locationState}/>
                </div>
              </Drawer>
            </IconButton>
          </div>
        </Hidden>
      </Toolbar>
      </AppBar>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <NavDrawer locationState='left'/>
        </Drawer>
      </Hidden>
    </div>
  );
}
