import React, { useEffect, useMemo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import LogOutIcon from 'assets/icons/LogOutIcon';
import DashboardIcon from 'assets/icons/DashboardIcon';
import SettingsIcon from 'assets/icons/SettingsIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import useStyles from "assets/jss/NavDrawerStyle";

const ColorAccountCircle = withStyles({
    root: {
      height: 'auto', 
      width:'70px', 
      color: 'white'
    },
  })(AccountCircle);

export default function NavDrawer (props) {
  const classes = useStyles();
  const [state, setstate] = React.useState(props);

  useEffect(() => {
    setstate(state);
    }, [props])

  const drawerItems = {
    Dashboard  : [<DashboardIcon />, '/dashboard'],
    Settings  : [<SettingsIcon />, '/settings'],
  };

  const footerItems = {
    Logout : [<LogOutIcon />, '/'],
  };

  const handleClick = (e) => {
    if (e.target.textContent === "Logout") {
      localStorage.clear();
  }}

  const handleItems = (items) => (
    <div>
      {Object.keys(items).map((text) => {
        let icon = items[text][0];
        let routes = items[text][1];
        return (
        <MenuItem className={classes.hoverItem}
          component={Link} to={routes} button key={text}
          onClick={handleClick}>
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
      <>
        <MenuItem component={Link} to={'/account'} className={classes.menuItem}>
          <ColorAccountCircle />
        </MenuItem>
        <div className={classes.drawerTitle}>
        <p style={{position: 'relative', marginBottom:'6px', color:'white',}}>SMART FARM</p>
        </div>
        <div className={classes.fullList} role="presentation">
          <MenuList>
            {handleItems(side)}
          </MenuList>
          <Divider />
          <MenuList>
            {handleItems(footerItems)}
          </MenuList>
        </div>
      </>
    )
  }

  return (
    <div className={classes.background}>
        {viewList(drawerItems)}
    </div>
  );
}
