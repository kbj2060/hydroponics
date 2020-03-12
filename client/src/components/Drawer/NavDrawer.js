import React, { useEffect } from 'react';
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
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "react-router-dom";
import useStyles from "assets/jss/navDrawerStyle";
import image from "assets/img/navBackground2.jpg"
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

  const [menuClicked, setMenuClicked ] = React.useState('')
  const [state, setstate] = React.useState(props);
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');

  const username = localStorage.getItem("name");

  useEffect(() => {
    try {
      setstate(state);
      setName(data.getCurrentUser.name);
      setType(data.getCurrentUser.__typename.toUpperCase());
      console.log(state, data)
    } catch (error) {
      console.log(error)
    }
    }, [props, data])

  const leftDrawerItems = {
    Dashboard  : [<DashboardIcon />, '/dashboard'],
    History  : [<HistoryIcon />, '/history'],
    Settings  : [<SettingsIcon />, '/settings'],
  };
  const restDrawerItems = {
    Account : [<AccountCircle style={{fill: "#D7A310", height: '27px', width: '27px',}} />, '/account'],
    Alarm: [<NotificationsIcon style={{fill: "#D7A310", height: '27px', width: '27px',}} />, '/notification']
  };
  const rightDrawerItems = Object.assign({}, restDrawerItems , leftDrawerItems);
  const footerDrawerItems = {
    Logout : [<LogOutIcon />, '/'],
  };

  const handleItems = (items) => (
    <div>
      {Object.keys(items).map((text, index) => {
        let icon = items[text][0];
        let routes = items[text][1];
        return (
        <MenuItem className={menuClicked === text ? classes.clickedItem : classes.hoverItem}
          component={Link} to={routes} button key={text}
          onClick={(e) => {
            if (e.target.textContent === "Logout") {
              localStorage.clear();
            } else {
              e.persist();
              setMenuClicked(e.target.textContent);
            }}}>
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
      <div style={{ display:'block', position:'relative', height: "auto", paddingTop : '10px'}}>
        <ColorAccountCircle/>
        <Typography style={{ color: 'white', fontSize : '13px' }}>Welcome, {name}</Typography>
        <Typography style={{ color: 'white', fontSize : '10px' }}>{type}</Typography>
      </div>
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
