import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from 'assets/jss/settingsStyle';
import AppBar from 'components/AppBar/AppBar';
import SettingSlider from 'components/Slider/Slider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/react-hooks';
import { SETTING } from 'resolvers/resolvers'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from 'resolvers/resolvers';
import { useHistory } from "react-router-dom";

function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

const CustomButton = withStyles({
  root : {
    backgroundColor: '#405C5A',
    color:'white',
    fontSize : '14px',
    '&:hover' : {
      backgroundColor: '#405C5A',
    }
  },
})(Button);

export default function Settings() {
  const classes = useStyles();
  const history = useHistory();
  const measurementArr = [ "LUX", "HUM", "TEMP", "CO2", "PH", "EC" ]
  const [values, setValues] = useState({"LUX": [0,0], 
                                        "HUM": [0,0], 
                                        "TEMP": [0,0], 
                                        "CO2": [0,0], 
                                        "PH": [0,0], 
                                        "EC": [0,0]})
  const [isApplied, setIsApplied] = useState(false)
  const [ settingMutation ] = useMutation(SETTING);
  const { loading, error, data  } = useQuery(GET_CURRENT_USER);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (loading || error) { return }
    if (data && data.getCurrentUser.type !== "ADMIN"){
      history.push('/dashboard')
    }
  }, [data])

  const getValue = (measurement, value, idx) => {
    var _values = values
    _values[measurement] = value;
    setValues(_values);
    if(idx === Object.keys(values).length - 1){
      setIsApplied(false);
      var min = []
      var max = []
      var measurement = []
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
                          size="medium"> APPLY 
            </CustomButton>
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