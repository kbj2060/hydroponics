import React from "react";
import Popup from "reactjs-popup";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const contentStyle = {
	backgroundColor : 'rgba(255, 255, 255, 0)',
	borderRadius : '10px',
	width:'300px',
	height:'300px',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign : 'center',
};

const styles = makeStyles(() => ({
	popupWrapper : {
		width : "100%",
		display : 'grid',
	},
	button : {
		background: "rgba(255, 255, 255, 0)",
		color: "#FFF",
		border: "none",
		textDecoration: 'none',
		outline : 'none',
		'&:hover' : { color : '#FFCB3A'},
		'&:active' : { transform : 'translateY(2px)'}
	},
	})
)

const Menu = (props) => {
	const classes = styles();
	const [open, setOpen] = React.useState(false)

	const handleClose = () => {
		setOpen(!open);
	}

	return (
		<Popup
			open={open}
			onOpen={() => setOpen(!open)}
			trigger={props.MenuButton}
			modal
			contentStyle={contentStyle}>
			<div className={classes.popupWrapper}>
				<h1>SMART FARM</h1>
				<Link to={"/dashboard"}>
					<button onClick={handleClose} className={classes.button}><h2 >DASHBOARD</h2></button>
				</Link>
				<Link to={"/settings"}>
					<button onClick={handleClose} className={classes.button}><h2>SETTING</h2></button>
				</Link>
				<Link to={"/"}>
					<button onClick={handleClose} className={classes.button}><h2>LOGOUT</h2></button>
				</Link>
			</div>
		</Popup>
	)
};

export default Menu;
