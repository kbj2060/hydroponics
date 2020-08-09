import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from 'assets/jss/SettingsStyle';
import AppBar from 'components/AppBar/AppBar';
import SettingSlider from '../../components/Setting/Slider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";

function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

const CustomButton = withStyles({
  root : {
    textAlign: 'center',
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
  const { environments } = require('../../PROPERTIES');
  const [settings, setSettings] = useState({
                                        "co2": [],
                                        "humidity": [],
                                        "temperature": [],
                                        })
  const [isApplied, setIsApplied] = useState(false)
  const [open, setOpen] = React.useState(false);

  const applySettings = async () => {
    await axios.post('/api/applySettings',{
      params: { settings : settings }
    })
  }

  useEffect(() => {
    if(isApplied) { applySettings(); }
    return () => {
      setIsApplied(false)
    }
  }, [isApplied]);

  const getSettingFromSlider = (value) => {
    const temp = settings;
    temp[Object.keys(value)[0]] = Object.values(value)[0];
    setSettings(temp);
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
            { environments.map((environment,index) =>
              <SettingSlider key={environment.toString()} environment={environment}
                             getSettingFromSlider={getSettingFromSlider} isApplied={isApplied}/> )}
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
