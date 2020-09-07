import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../assets/jss/SettingsStyle';
import RangeSlider from 'root/client/src/components/SettingSlider/RangeSlider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import {store} from "../../redux/store";
import {ColorCircularProgress} from "../../components/utils/ColorCircularProgress";
import TimeSpanPicker from "../TimeSpanPicker";
import CustomStepper from "../utils/CustomStepper";
import CircularTimespanpicker from "../TimeSpanPicker";

function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

export default function Settings({modalClose}) {
  const classes = useStyles();
  const { settings:settingKeys, WordsTable, settingType } = require('root/init_setting');
  const [isApplied, setIsApplied] = useState(false)
  const [settings, setSettings] = useState({})
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  const handleNull = (obj) => {
    const IndexOfNull = 1;
    Object.keys(obj).forEach(function(key) {
      if(obj[key][IndexOfNull] === null) { obj[key][IndexOfNull] = 0; }
    })
    return obj
  }

  const applySettings = async (settings) => {
    await axios.post('/api/post/apply/settings',{
      params: { settings : settings }
    })
  }

/*  const fetchSettings = async () => {
    await axios.get('/api/get/settings', {
      params : {
        settingKeys : settingKeys,
        selects : ['category', 'type', 'min', 'max'],
        num : 1
      }
    }).then(({data}) => {
      setSettings(data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
      console.log("SLIDER FETCH ERROR");
    })
  }*/

  useEffect(() => {
    console.log(store.getState()['authentication']);
/*
    fetchSettings();
*/
  }, []);

  useEffect(() => {
    if(isApplied) {
      const SettingsFromStore = handleNull(store.getState()['controlSetting']);
      setSettings(store.getState()['controlSetting']);
      applySettings(SettingsFromStore).then(() => {
        console.log('applied completed!')
      });
    }
    return () => { setIsApplied(false)}
  }, [isApplied])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    <div className={classes.root}>
      <Card className={classes.parentItem}>
        <Grid container className={classes.modalContainer}>
            <CustomStepper modalClose={modalClose} />
        </Grid>
      </Card>
    </div>
  );
}
