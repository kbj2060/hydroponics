import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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

import image from "assets/img/navBackground2.jpg"

const useStyles = makeStyles(styles);

export const NavDrawer = (props) => {
  const classes = useStyles();

  const [menuClicked, setMenuClicked ] = React.useState('')
  const [state, setstate] = React.useState(props);

  useEffect(() => {
    setstate(state);

    }, [props])

  const leftDrawerItems = {
    제어  : [<DashboardIcon />, '/dashboard'],
    기록  : [<HistoryIcon />, '/history'],
    설정  : [<SettingsIcon />, '/settings'],
  };
  const restDrawerItems = {
    프로필: [<AccountCircle style={{fill: "#D7A310", height: '27px', width: '27px',}} />, '/account'],
    알림: [<NotificationsIcon style={{fill: "#D7A310", height: '27px', width: '27px',}} />, '/notification']
  };
  const rightDrawerItems = Object.assign({}, restDrawerItems , leftDrawerItems);
  const footerDrawerItems = {
    로그인: [<LogInIcon />, '/login'],
    로그아웃 : [<LogOutIcon />, '/logout'],
  };

  const handleMenuClicked = (e) => {
    e.persist();
    console.log(e);
    setMenuClicked(e.target.textContent);
  }
  const handleItems = (items) => (
    <div>
      {Object.keys(items).map((text, index) => {
        let icon = items[text][0];
        let routes = items[text][1];
        return (
        <MenuItem className={menuClicked === text ? classes.clickedItem : classes.hoverItem}
          component={Link} to={routes} button key={text}
          onClick={handleMenuClicked}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={
              <Typography className={classes.listText}>{text}</Typography>
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
    <div className={classes.background} style={{ backgroundImage: "url(" + image + ")" }}>
      <div className={classes.drawerTitle}>
        <p style={{position: 'relative', marginBottom:'6px', color:'white',}}>HYDROPONICS</p>
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
