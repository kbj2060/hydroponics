import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import withStyles from "@material-ui/core/styles/withStyles";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import "../../assets/css/AutomationCircle.scss"
import CustomStepper from "./CustomStepper";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottom : '1px',
	},
	paper: {
		height: '100%',
		width : '100%',
		maxWidth: '500px',
		display : "flex",
		flexDirection: "column",
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
}));


const customBackdrop = withStyles(() => ({
	root : {
		backgroundColor : "rgba(0, 0, 0, 0.9)"
	}
}))(Backdrop)

export default function SettingModal() {
  	const [open, setOpen] = React.useState(false);
    const classes = useStyles();

  	const handleOpen = () => {
      setOpen((prev) => !prev);
    };

    const handleClose = () => {
      setOpen(false)
    }

    return(
		<ClickAwayListener onClickAway={handleClose}>
      <div>

        <Button onClick={handleOpen} type="button">
					<div className="circle" />
        </Button>

        <Modal
					className={classes.modal}
          disableAutoFocus={true}
          open={open}
          BackdropComponent={customBackdrop}
          BackdropProps={{
            timeout: 500,
          }}>
				  <div className={classes.paper}>

						<CustomStepper modalClose={handleClose}/>

          </div>
        </Modal>
      </div>
		</ClickAwayListener>
    )
}