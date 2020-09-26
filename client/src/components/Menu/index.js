import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import withStyles from "@material-ui/core/styles/withStyles";
import {logout} from "../../redux/modules/Authentication";
import {useDispatch} from "react-redux";

const LinkButton = (props) => {
	return (
		<Link to={`/${props.to}`} forcerefresh="true">
			<button onClick={props.onClick} className={props.buttonDesign} type="button">
				<h2>{props.value}</h2>
			</button>
		</Link>
	)
}

const customBackdrop = withStyles(() => ({
	root : {
		backgroundColor : "rgba(0, 0, 0, 0.9)"
	}
}))(Backdrop)

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin : 'auto',
		borderBottom : '1px',
	},
	paper: {
		display : "flex",
		flexDirection: "column",
		backgroundColor : 'rgba(255, 255, 255, 0)',
		borderRadius : '10px',
		border : '1px solid',
		color: 'white',
		width : '300px',
		height : '300px',
		padding : '10px 10px 0 10px',
		'&:focus': {
			outline: '0',
		}
	},
	menuButton : props => ({
		height : `${100/props.n_pages}%`,
		backgroundColor : 'rgba(255, 255, 255, 0)',
		border : 'none',
		width : '100%',
		color: 'white',
		textDecoration: 'none',
		outline : 'none',
		cursor : 'pointer',
		'&:hover' : { color : '#FFCB3A'},
		'&:active' : { transform : 'translateY(1px)'}
	}),
	header : {
		fontSize : '2em',
		borderBottom : '1px solid',
		paddingBottom : '18.7px',
		textAlign : 'center',
		marginBottom : '2%'
	},
}));

export default function Menu() {
	const dispatch = useDispatch();
	const {pages} = require('root/init_setting');
	const n_pages = pages.length;
	const [open, setOpen] = React.useState(false);
	const classes = useStyles({n_pages});

	const handleOpen = () => {
		setOpen((prev) => !prev);
	};

	const handleClick = (value) => {
		value === "logout"? dispatch(logout()) : setOpen(false)
	};

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<ClickAwayListener onClickAway={handleClose}>
		<div>

			<IconButton
				onClick={handleOpen}
				type="button"
				aria-label="show more"
				aria-haspopup="true">
				<MenuIcon style={{ color: 'white' }} />
			</IconButton>

			<Modal
				disableAutoFocus={true}
				className={classes.modal}
				open={open}
				onClose={handleClose}
				BackdropComponent={customBackdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<div className={classes.paper}>

					<div style={{height: "30%"}}>
						<h1 className={classes.header}>WJ</h1>
					</div>
					<div style={{height: "70%"}}>
						<LinkButton onClick={() => {handleClick("dashboard")}} value={"홈"} to={"dashboard"} buttonDesign={classes.menuButton} />
						<LinkButton onClick={() => {handleClick("logout")}} value={"로그아웃"} to={""} buttonDesign={classes.menuButton} />
					</div>
				</div>

			</Modal>
		</div>
		</ClickAwayListener>
	);
}
