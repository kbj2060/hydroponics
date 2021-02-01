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
	const {colors} = require('root/values/colors.json')

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
	const {colors} = require('root/values/colors.json')
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


// const LinkButton = (props) => {
// 	return (
// 		<Link to={`/${props.to}`} forcerefresh="true">
// 			<button onClick={props.onClick} className={props.buttonDesign} type="button">
// 				<Typography>{props.value}</Typography>
// 			</button>
// 		</Link>
// 	)
// }

// const customBackdrop = withStyles(() => ({
// 	root : {
// 		backgroundColor : "rgba(0, 0, 0, 0.9)"
// 	}
// }))(Backdrop)

// const useStyles = makeStyles((theme) => ({
// 	modal: {
// 		display: 'flex',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		margin : 'auto',
// 		borderBottom : '1px',
// 	},
// 	paper: {
// 		display : "flex",
// 		flexDirection: "column",
// 		backgroundColor : 'rgba(255, 255, 255, 0)',
// 		borderRadius : '10px',
// 		border : '1px solid',
// 		color: 'white',
// 		width : '300px',
// 		height : '300px',
// 		padding : '10px 10px 0 10px',
// 		'&:focus': {
// 			outline: '0',
// 		}
// 	},
// 	menuButton : props => ({
// 		height : `${100/props.n_pages}%`,
// 		backgroundColor : 'rgba(255, 255, 255, 0)',
// 		border : 'none',
// 		width : '100%',
// 		color: 'white',
// 		textDecoration: 'none',
// 		outline : 'none',
// 		cursor : 'pointer',
// 		'&:hover' : { color : '#dec11e'},
// 		'&:active' : { transform : 'translateY(1px)'}
// 	}),
// 	header : {
// 		fontFamily : "Tangerine, cursive",
// 		fontSize : '2em',
// 		borderBottom : '1px solid',
// 		paddingBottom : '18.7px',
// 		textAlign : 'center',
// 		marginBottom : '2%'
// 	},
// }));

// export default function Menu() {
// 	const {colors} = require('root/values/colors.json')
// 	const {pages} = require('root/values/preferences.json')
// 	const dispatch = useDispatch();
// 	const n_pages = pages.length;
// 	const [open, setOpen] = React.useState(false);
// 	const classes = useStyles({n_pages});

// 	const handleClose = () => {
// 		setOpen(false)
// 	}

// 	const MenuIconButton = () => {
// 		const handleOpen = () => {
// 			setOpen((prev) => !prev);
// 		};

// 		return (
// 			<IconButton
// 				onClick={handleOpen}
// 				type="button"
// 				aria-label="show more"
// 				aria-haspopup="true">
// 				<MenuIcon style={{ color: colors.fontColor }} />
// 			</IconButton>
// 		)
// 	}

// 	const ModalWrapper = ({children}) => {
// 		return (
// 			<Modal
// 				disableAutoFocus={true}
// 				className={classes.modal}
// 				open={open}
// 				onClose={handleClose}
// 				BackdropComponent={customBackdrop}
// 				BackdropProps={{
// 					timeout: 500,
// 				}}
// 			>
// 				{children}
// 			</Modal>
// 		)
// 	}

// 	const MenuContent = () => {
// 		return (
// 			<div className={classes.paper}>
// 				<div style={{height: "30%"}}>
// 					<h1 className={classes.header}>PlantPoint</h1>
// 				</div>
// 				<div style={{height: "70%"}}>
// 					<LinkButton value={'무들로29'} to={'무들로29'} buttonDesign={classes.menuButton} />
// 					<LinkButton value={'일정'} to={'scheduler'} buttonDesign={classes.menuButton} />
// 					<LinkButton value={"설정"} to={"setting"} buttonDesign={classes.menuButton} />
// 					<LinkButton onClick={() => dispatch(logout())} value={"로그아웃"} to={""} buttonDesign={classes.menuButton} />
// 				</div>
// 			</div>
// 		)
// 	}

// 	return (
// 		<ClickAwayListener onClickAway={handleClose}>
// 		<div>
// 			<MenuIconButton />
// 				<ModalWrapper >
// 					<div className={classes.paper}>
// 					<div style={{height: "30%"}}>
// 						<h1 className={classes.header}>PlantPoint</h1>
// 					</div>
// 					<div style={{height: "70%"}}>
// 						<LinkButton value={'무들로29'} to={'무들로29'} buttonDesign={classes.menuButton} />
// 						<LinkButton value={'일정'} to={'scheduler'} buttonDesign={classes.menuButton} />
// 						<LinkButton value={"설정"} to={"setting"} buttonDesign={classes.menuButton} />
// 						<LinkButton onClick={() => dispatch(logout())} value={"로그아웃"} to={""} buttonDesign={classes.menuButton} />
// 					</div>
// 				</div>
// 			</ModalWrapper>
// 		</div>
// 		</ClickAwayListener>
// 	);
// }
