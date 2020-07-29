import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from 'assets/jss/SettingsStyle';
import AppBar from 'components/AppBar/AppBar';
import SettingSlider from 'components/Slider/Slider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

const CustomButton = withStyles({
  root : {
    backgroundColor: '#343B3C',
    color:'white',
    fontSize : '14px',
    '&:hover' : {
      backgroundColor: '#343B3C',
    }
  },
})(Button);

export default function Settings() {
  const classes = useStyles();
  const measurementArr = ["HUM", "TEMP", "CO2"]
  const [values, setValues] = useState({
                                        "HUM": [0,0], 
                                        "TEMP": [0,0], 
                                        "CO2": [0,0],
                                        })
  const [isApplied, setIsApplied] = useState(false)
  const [open, setOpen] = React.useState(false);

  const getValue = (measurement, value, idx) => {
    let _values = values
    _values[measurement] = value;
    setValues(_values);
    if(idx === Object.keys(values).length - 1){
      setIsApplied(false);
      let min = []
      let max = []
      let measurement = []
      Object.keys(values).map((key, i) => {
        min.push(values[key][0])
        max.push(values[key][1])
        measurement.push(key)
      })
      settingMutation({variables: {
        measurement: measurement,
        min: min,
        max: max,
      }})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  
  const handleOnClick = () => {
    setOpen(true);
    setIsApplied(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar />
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={12} className={classes.item}>
          <Card className={classes.parentItem}>
            <div className={classes.sliderDiv}>
            { measurementArr.map((measurement,index) => <SettingSlider  key={measurement.toString()} 
                                                                        measurement={measurement} 
                                                                        isApplied={isApplied}
                                                                        getValue={getValue} 
                                                                        index={index} /> )}
            </div>
            <CustomButton onClick={ handleOnClick } 
                          variant="contained" 
                          size="medium"> APPLY </CustomButton>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Settings applied!
              </Alert>
            </Snackbar>
          </Card>
        </Grid>
      </Grid>
  </div>
  );
}