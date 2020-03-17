import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  formControl: {
    width: '20%',
    marginTop : '17px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  datepicker:{
    width:'40%',
    padding : "0 2% 0 2%"
  }
}));

export default function MaterialUIPickers() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState({
    from : new Date('2014-08-18T21:11:54'),
    to : new Date('2014-08-18T21:11:54'),
  });
  const [figure, setFigure] = React.useState('');

  const handleChange = event => {
    setFigure(event.target.value);
  };
  const handleDateChange = (date, side) => {
    setSelectedDate({[side] : date});
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <div style={{width : "-webkit-fill-available"}}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Figure</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={figure}
              onChange={handleChange}
              autoWidth
            >
              <MenuItem value={10}>TEMP</MenuItem>
              <MenuItem value={20}>HUM</MenuItem>
              <MenuItem value={30}>LUX</MenuItem>
              <MenuItem value={30}>CO2</MenuItem>
              <MenuItem value={30}>PH</MenuItem>
              <MenuItem value={30}>EC</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <KeyboardDatePicker
          className={classes.datepicker}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="FROM"
            value={selectedDate.from}
            onChange={(e) => handleDateChange(e, 'from')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal" 
            id="time-picker"
            label="Time picker"
            value={selectedDate.from}
            onChange={(e) => handleDateChange(e, 'from')}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </div>
        <div>
        <KeyboardDatePicker
        className={classes.datepicker}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="TO"
          value={selectedDate.to}
          onChange={(e) => handleDateChange(e, 'to')}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate.to}
          onChange={(e) => handleDateChange(e, 'to')}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </div>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}