import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import LogInIcon from 'assets/icons/LogInIcon';
import LogOutIcon from 'assets/icons/LogOutIcon';
import DashboardIcon from 'assets/icons/DashboardIcon';
import HistoryIcon from 'assets/icons/HistoryIcon';
import SettingsIcon from 'assets/icons/SettingsIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "react-router-dom";
import styles from "assets/jss/navDrawerStyle.js";

const useStyles = makeStyles(styles);

export const NavDrawer = (props) => {
  const classes = useStyles();

  const [state, setstate] = React.useState(props);

  useEffect(() => {
    setstate(props);
    }, [props])

  const leftDrawerItems = {
    제어  : [<DashboardIcon />, '/'],
    기록  : [<HistoryIcon />, '/history'],
    설정  : [<SettingsIcon />, '/settings'],
  };
  const restDrawerItems = {
    프로필: [<AccountCircle />, '/account'],
    알림: [<NotificationsIcon />, '/notification']
  };
  const rightDrawerItems = Object.assign({}, restDrawerItems , leftDrawerItems);
  const footerDrawerItems = {
    로그인: [<LogInIcon />, '/login'],
    로그아웃 : [<LogOutIcon />, '/logout'],
  };

  const handleItems = (items) => (
    <div>
      {Object.keys(items).map((text, index) => {
        let icon = items[text][0];
        let routes = items[text][1];
        return (
        <MenuItem component={Link} to={routes} button key={text} >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={
              <Typography style={{fontSize:'14px'}}>{text}</Typography>
            } />
        </MenuItem>
    )})}
    </div>
  );

  const viewList = (side) => {
    return (
     <div className={classes.fullList} role="presentation">
      <MenuList>
        {handleItems(side)}
      </MenuList>
      <Divider />
      <MenuList>
        {handleItems(footerDrawerItems)}
      </MenuList>
    </div>
    )
  }

  return (
    <div>
      <div className={classes.drawerTitle}>
        <p style={{marginBottom:'6px'}}>HYDROPONICS</p>
      </div>
      {state.right === true ?
      <div>
        {viewList(rightDrawerItems)}
      </div> :
      <div>
        {viewList(leftDrawerItems)}
      </div>
      }
    </div>
  );
}
