import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from 'assets/jss/settingsStyle';
import AppBar from 'components/AppBar/AppBar';
import SettingSlider from 'components/Slider/Slider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { SETTING } from 'resolvers/resolvers'
const CustomButton = withStyles({
  root : {
    backgroundColor: '#405C5A',
    color:'white',
    '&:hover' : {
      backgroundColor: '#405C5A',
    }
  },
  
})(Button);

export default function Settings() {
  const classes = useStyles();
  const measurementArr = [ "LUX", "HUM", "TEMP", "CO2", "PH", "EC" ]
  const [values, setValues] = useState({
    "LUX": [0,0], 
    "HUM": [0,0], 
    "TEMP": [0,0], 
    "CO2": [0,0], 
    "PH": [0,0], 
    "EC": [0,0]
  })
  const [isApplied, setIsApplied] = useState(false)
  const [ settingMutation ] = useMutation(SETTING);
  
  const handleOnClick = () => {
    setIsApplied(true);
  }
  
  const getValue = (measurement, value, idx) => {
    var _values = values
    _values[measurement] = value;
    setValues(_values);
    if(idx === Object.keys(values).length - 1){
      setIsApplied(false);
      var start = []
      var end = []
      var measurement = []
      Object.keys(values).map((key, i) => {
        start.push(values[key][0])
        end.push(values[key][1])
        measurement.push(key)
      })
      settingMutation({variables: {
        measurement: measurement,
        start: start,
        end: end,
      }})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

console.log(isApplied)

  return (
    <div className={classes.root}>
      <AppBar />
      <Grid container style={{padding :'15px 30px 15px 30px'}}>
        <Grid item xs={12} sm={12} md={12} style={{padding:'15px',}}>
          <Card className={classes.parentItem}>
            <div style={{display:'grid', gridTemplateColumns: 'auto auto auto',padding: '3% 0 3% 0'}}>
            { measurementArr.map((measurement,index) => <SettingSlider  key={measurement.toString()} 
                                                                        measurement={measurement} 
                                                                        isApplied={isApplied}
                                                                        getValue={getValue} 
                                                                        index={index} /> )}
            </div>
            <CustomButton onClick={ handleOnClick } 
                          variant="contained" 
                          className={classes.applyButton} 
                          size="medium"> APPLY </CustomButton>
          </Card>
        </Grid>
      </Grid>
  </div>
  );
}