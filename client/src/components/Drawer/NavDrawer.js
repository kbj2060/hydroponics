import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import LogInIcon from 'assets/icons/LogInIcon';
import LogOutIcon from 'assets/icons/LogOutIcon';
import DashboardIcon from 'assets/icons/DashboardIcon';
import HistoryIcon from 'assets/icons/HistoryIcon';
import SettingsIcon from 'assets/icons/SettingsIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import styles from "assets/jss/navDrawerStyle.js";
import backgroundImage from 'assets/img/london-eye.png';

const useStyles = makeStyles(styles);

export const NavDrawer = (props) => {
  const classes = useStyles();

  const [state, setstate] = React.useState(props);

  useEffect(() => {
    setstate(props);
    console.log(props);
    }, [props])

  const leftDrawerItems = {
    제어  : <DashboardIcon />,
    기록  : <HistoryIcon />,
    설정  : <SettingsIcon />,
  };
  const restDrawerItems = {
    프로필: <AccountCircle />,
    알림: <NotificationsIcon />
  };
  const rightDrawerItems = Object.assign({}, restDrawerItems , leftDrawerItems);
  const footerDrawerItems = {
    로그인: <LogInIcon />,
    로그아웃 : <LogOutIcon />,
  };

  const handleItems = (items) => (
    <div>
      {Object.keys(items).map((text, index) => (
      <ListItem button key={text}>
        <ListItemIcon>{items[text]}</ListItemIcon>
        <ListItemText primary={<Typography style={{fontSize:'14px'}}>{text}</Typography>} />
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
        {handleItems(footerDrawerItems)}
      </List>
    </div>
    )
  }

  return (
    <div >
      <div className={classes.drawerTitle}>
        <p style={{marginBottom:'6px'}}>HYDROPONICS</p>
      </div>

      {state.right === true ?
      <div>
        <CssBaseline />
        {viewList(rightDrawerItems)}
      </div> :
      <div>
        <CssBaseline />
        {viewList(leftDrawerItems)}
      </div>
      }
    </div>
  );
}
