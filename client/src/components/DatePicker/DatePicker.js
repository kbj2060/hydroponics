import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        color: 'white',
      },
    },
    MuiIconButton : {
      label : {
        color : 'white'
      }
    },
  },
});

const MAX_ITEMS_VIEW = 60;

const CustomButton = withStyles({
  root : {
      backgroundColor: '#343B3C',
      color:'white',
      fontSize : '14px',
      marginTop : '50px',
      '&:hover' : {
          backgroundColor: '#343B3C',
      }
  },
})(Button);

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '20%',
    marginTop : '17px',
    color : 'white',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  datepicker:{
    width:'40%',
    padding : "0 2% 0 2%",
  },
  text : {
    color : 'white',
  }
}));

function renderRow(props) {
  const { index, style, data } = props;
  return (
        <ListItem button style={style} key={index}>
          <ListItemText primary={
          <Typography>{data[index].measurement}</Typography>}/>
          <ListItemText primary={
          <Typography>{data[index].value}</Typography>} />
          <ListItemText primary={
          <Typography>{data[index].updatedAt}</Typography>} />
        </ListItem>
  );
}

export default function MaterialUIPickers() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState({
    from : Date.now(),
    to : Date.now(),
  });
  const [figure, setFigure] = React.useState('');

  const handleOnClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setFigure(event.target.value);
  };
  const handleDateChange = (date, side) => {
    setSelectedDate({[side] : date});
  };

  return (
    <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <div style={{ width : "-webkit-fill-available"}}>
          <FormControl className={classes.formControl}>
            <InputLabel style={{color:'white'}} id="figure input">Figure</InputLabel>
            <Select
              labelId="figure"
              id="figure select"
              value={figure}
              onChange={handleChange}
              autoWidth
            >
              <MenuItem value={"TEMP"}>TEMP</MenuItem>
              <MenuItem value={"HUM"}>HUM</MenuItem>
              <MenuItem value={"LUX"}>LUX</MenuItem>
              <MenuItem value={"CO2"}>CO2</MenuItem>
              <MenuItem value={"PH"}>PH</MenuItem>
              <MenuItem value={"EC"}>EC</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{marginTop : '30px'}}>
          <KeyboardDatePicker
            InputProps={{ className: classes.text }}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-from"
            label="FROM"
            value={selectedDate.from}
            onChange={(e) => handleDateChange(e, 'from')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
          InputProps={{ className: classes.text }}
            margin="normal" 
            id="time-picker-from"
            label="Time picker1"
            value={selectedDate.from}
            onChange={(e) => handleDateChange(e, 'from')}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </div>
        <div>
        <KeyboardDatePicker
          InputProps={{ className: classes.text }}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-to"
          label="TO"
          value={selectedDate.to}
          onChange={(e) => handleDateChange(e, 'to')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          InputProps={{ className: classes.text }}
          margin="normal"
          id="time-picker2"
          label="Time picker2"
          value={selectedDate.to}
          onChange={(e) => handleDateChange(e, 'to')}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </div>
      </Grid>
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
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
                OK
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  )
}