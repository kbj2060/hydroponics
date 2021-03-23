import {Link} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {logout} from "../../redux/modules/Authentication";
import {useDispatch} from "react-redux";
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../../assets/img/logo.jpeg'; 



const LinkButton = (props) => {
	const {colors} = require('../../values/colors.json')

	return (
		<Link to={`/${props.to}`} forcerefresh="true" style={{ textDecoration: 'none', color :  colors.fontColor}}>
			<ListItem button key={props.value}>
				<ListItemIcon>{props.icon}</ListItemIcon>
				<ListItemText primary={props.value} onClick={props.onClick} />
			</ListItem>
		</Link>
	)
}

const useStyles = makeStyles({
  list: {
    width: "250px",
  },
  fullList: {
    width: 'auto',
	},
	logo : {
		width : "250px",
		height : "120px"
	}
});

export default function Menu() {
  const classes = useStyles();
	const [state, setState] = React.useState(false);
	const {colors} = require('../../values/colors.json')
	const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState( open );
	};


  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
			<img src={logo} className={classes.logo} />
      <List>
				<LinkButton icon={<LocalFloristIcon />} value={'무들로29'} to={'무들로29'}  />
				<LinkButton icon={<ScheduleIcon />} value={'일정'} to={'scheduler'}  />
      </List>
      <Divider />
      <List>
			<LinkButton icon={<SettingsIcon />} value={'설정'} to={'setting'}  />
			<LinkButton onClick={() => dispatch(logout())} icon={<ExitToAppIcon />} value={'로그아웃'} to={''}  />
      </List>
    </div>
  );

  return (
    <div>
			
      <React.Fragment key={'right'}>
				<IconButton
							onClick={toggleDrawer(true)}
							type="button"
							aria-label="show more"
							aria-haspopup="true">
							<MenuIcon style={{ color: colors.fontColor }} />
				</IconButton>
				<SwipeableDrawer
					anchor={'right'}
					open={state}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
				>
            {list()}
				</SwipeableDrawer>
			</React.Fragment>
    </div>
  );
}