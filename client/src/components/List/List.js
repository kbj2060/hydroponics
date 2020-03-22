import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));
const CustomButton = withStyles({
  root : {
      backgroundColor: '#405C5A',
      color:'white',
      fontSize : '14px',
      marginTop : '50px',
      '&:hover' : {
          backgroundColor: '#405C5A',
      }
  },
})(Button);

function renderRow(props) {
  const { index, style } = props;

  return (
        <ListItem button style={style} key={index}>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function CustomList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOnClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CustomButton onClick={ handleOnClick } 
                    variant="contained" 
                    size="medium"> APPLY </CustomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogContent>
          <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
            {renderRow}
          </FixedSizeList>          
          <DialogActions>
            <Button onClick={handleClose} color="#405C5A" autoFocus>
                OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}