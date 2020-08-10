import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link,  useHistory  } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function TransitionsModal() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClose}>
		<div>
			<button type="button" onClick={handleOpen}>
				react-transition-group
			</button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.popupWrapper}>
						<h1 className={classes.header}>SMART FARM</h1>
						<Link  to="/dashboard"><h2>DASHBOARD</h2> </Link>
						<Link  to="/settings"><h2>SETTING</h2></Link>
						<Link to="/">LOGOUT</Link>
					</div>
				</Fade>
			</Modal>
		</div>
		</ClickAwayListener>
	);
}

/*

const getModalStyle = {
	backgroundColor : 'rgba(255, 255, 255, 0)',
	borderRadius : '10px',
	width:'300px',
	height:'300px',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign : 'center',
}

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
		setOpen((prev) => !prev);
	}

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>

			</Modal>
		</ClickAwayListener>
	)
};

export default Menu;
*/
