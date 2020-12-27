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
import {Typography} from "@material-ui/core";

const LinkButton = (props) => {
	return (
		<Link to={`/${props.to}`} forcerefresh="true">
			<button onClick={props.onClick} className={props.buttonDesign} type="button">
				<Typography>{props.value}</Typography>
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
		'&:hover' : { color : '#dec11e'},
		'&:active' : { transform : 'translateY(1px)'}
	}),
	header : {
		fontFamily : "Tangerine, cursive",
		fontSize : '2em',
		borderBottom : '1px solid',
		paddingBottom : '18.7px',
		textAlign : 'center',
		marginBottom : '2%'
	},
}));

export default function Menu() {
	const {colors} = require('root/values/colors.json')
	const {pages} = require('root/values/preferences.json')
	const {WordsTable} = require('root/values/strings.json');
	const dispatch = useDispatch();
	const n_pages = pages.length;
	const [open, setOpen] = React.useState(false);
	const classes = useStyles({n_pages});

	const handleOpen = () => {
		setOpen((prev) => !prev);
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
				<MenuIcon style={{ color: colors.fontColor }} />
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
						<h1 className={classes.header}>Kairos</h1>
					</div>
					<div style={{height: "70%"}}>
						<LinkButton value={'무들로29'} to={'무들로29'} buttonDesign={classes.menuButton} />
						<LinkButton value={'일정'} to={'scheduler'} buttonDesign={classes.menuButton} />
						<LinkButton value={"설정"} to={"setting"} buttonDesign={classes.menuButton} />
						<LinkButton onClick={() => dispatch(logout())} value={"로그아웃"} to={""} buttonDesign={classes.menuButton} />
					</div>
				</div>

			</Modal>
		</div>
		</ClickAwayListener>
	);
}
