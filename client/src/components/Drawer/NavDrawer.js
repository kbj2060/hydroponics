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
import HistoryIcon from 'assets/icons/HistoryIcon';
import SettingsIcon from 'assets/icons/SettingsIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import useStyles from "assets/jss/navDrawerStyle";
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from 'resolvers/resolvers';

const ColorAccountCircle = withStyles({
    root: {
      height: 'auto', 
      width:'70px', 
      color: 'white'
    },
  })(AccountCircle);

export const NavDrawer = (props) => {
  const classes = useStyles();
  const { loading, error, data  } = useQuery(GET_CURRENT_USER);
  const [state, setstate] = React.useState(props);
  var info = {name : '', type : ''};

  useEffect(() => {
    setstate(state);
    }, [props])
  
  const getNameAndType = (data) => {
    console.log(data)
    if (typeof data === "undefined" && loading || error){ return }
    info.name = data.getCurrentUser.name;
    info.type = data.getCurrentUser.type;
  }

  const drawerItems = {
    Account : [<AccountCircle style={{fill: "#D7A310", height: '27px', width: '27px',}} />, '/account'],
    Dashboard  : [<DashboardIcon />, '/dashboard'],
    History  : [<HistoryIcon />, '/history'],
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
          {getNameAndType(data)}
          <Typography style={{ color: 'white', fontSize : '13px' }}>Welcome, {info.name}</Typography>
          <Typography style={{ color: 'white', fontSize : '10px' }}>{info.type}</Typography>
        </MenuItem>
        <div className={classes.drawerTitle}>
        <p style={{position: 'relative', marginBottom:'6px', color:'white',}}>HYDROPONICS</p>
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
