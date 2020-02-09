import React from 'react';
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
import styles from "assets/jss/navDrawerStyle.js";

const useStyles = makeStyles(styles);

export default function NavDrawer() {
  const classes = useStyles();

  const handleListItems = (items) => {
    const listItems = {
      제어 : <ControlIcon />,
      기록: <HistoryIcon />,
      로그인: <LogInIcon />,
    로그아웃 : <LogOutIcon />,
      설정 : <SettingsIcon />
    };

    return (
      <List>
        {items.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{listItems[text]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <div
      className={classes.fullList}
      role="presentation"
    >
      {handleListItems(['제어','기록', '설정'])}
    <Divider />
    <List>
      {handleListItems(['로그인','로그아웃'])}
      </List>
    </div>
  );
}
