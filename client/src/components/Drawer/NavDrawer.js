import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LogInIcon from 'assets/icons/LogInIcon';
import LogOutIcon from 'assets/icons/LogOutIcon';
import ControlIcon from 'assets/icons/ControlIcon';
import HistoryIcon from 'assets/icons/HistoryIcon';
import SettingsIcon from 'assets/icons/SettingsIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import styles from "assets/jss/navDrawerStyle.js";

const useStyles = makeStyles(styles);

export const NavDrawer = (props) => {
  const classes = useStyles();

  const [locationState, setLocationState] = React.useState(props);

  useEffect(() => {
    setLocationState(props);
    }, [props])

  const leftDrawerItems = {
    제어  : <ControlIcon />,
    기록  : <HistoryIcon />,
    설정  : <SettingsIcon />,
  };
  const restDrawerItems = {
    프로필: <AccountCircle />,
    알림: <NotificationsIcon />
  };
  const rightDrawerItems = Object.assign({}, restDrawerItems , leftDrawerItems);
  const drawerFooterItems = {
    로그인: <LogInIcon />,
    로그아웃 : <LogOutIcon />,
  };

  const handleItems = (items) => (
    <div>
      {Object.keys(items).map((text, index) => (
      <ListItem button key={text}>
        <ListItemIcon>{items[text]}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
      ))}
    </div>
  );

  const viewList = (side) => {
    return (
     <div className={classes.fullList} role="presentation">
      <List>
        {handleItems(side)}
      </List>
      <Divider />
      <List>
        {handleItems(drawerFooterItems)}
      </List>
    </div>
    )
  }

  return (
    <div>
      {locationState.location === "right" ?
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
