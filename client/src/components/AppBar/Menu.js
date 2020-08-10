import React, {useEffect} from "react";
import Popup from "reactjs-popup";
import { makeStyles } from '@material-ui/core/styles';
import { Link,  useHistory  } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const contentStyle = {
	backgroundColor : 'rgba(255, 255, 255, 0)',
	borderRadius : '10px',
	width:'300px',
	height:'300px',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign : 'center',
	zIndex : '100',
};

const styles = makeStyles(() => ({
	popupWrapper : {
		width : "100%",
		display : 'grid',
	},
	header : {
		borderBottom : '1px solid',
		paddingBottom : '18.7px',
		marginLeft : '30px',
		marginRight : '30px',
	},
	button : {
		background: "rgba(255, 255, 255, 0)",
		color: "#FFF",
		border: "none",
		textDecoration: 'none',
		outline : 'none',
		cursor : 'pointer',
		'&:hover' : { color : '#FFCB3A'},
		'&:active' : { transform : 'translateY(2px)'}
	},
	})
)

const Menu = (props) => {
	const classes = styles();
	const [open, setOpen] = React.useState(false)

	const handleClose = () => {
		setOpen(false);
	}

	const handleClick = (e) => {
		e.preventDefault();
		setOpen((prev) => !prev);
	}

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<Popup
				lockScroll={true}
				open={open}
				onOpen={handleClick}
				trigger={props.MenuButton}
				modal
				contentStyle={contentStyle}>
				<div className={classes.popupWrapper}>
					<h1 className={classes.header}>SMART FARM</h1>
					<Link  to="/dashboard">
						<button type="button" onClick={handleClick} className={classes.button}><h2>DASHBOARD</h2></button>
					</Link>
					<Link  to="/settings">
						<button type="button" onClick={handleClick} className={classes.button}><h2>SETTING</h2></button>
					</Link>
					<Link to="/">
						<button type="button" onClick={handleClick} className={classes.button}><h2>LOGOUT</h2></button>
					</Link>
				</div>
			</Popup>
		</ClickAwayListener>
	)
};

export default Menu;
