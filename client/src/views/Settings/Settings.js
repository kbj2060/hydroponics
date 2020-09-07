import React, {useState, useEffect, useCallback} from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../assets/jss/SettingsStyle';
import AppBar from 'root/client/src/components/AppBar';
import RangeSlider from 'root/client/src/components/SettingSlider/RangeSlider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import {store} from "../../redux/store";
import Box from "@material-ui/core/Box";
import AutomationButton from "../../components/AutomationCard";
import SettingExplanation from "../../components/SettingExplanation";
import {ColorCircularProgress} from "../../components/utils/ColorCircularProgress";
import Tooltip from '@material-ui/core/Tooltip';

function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

const CustomButton = withStyles({
  root : {
    background: "rgba(255, 255, 255, 0)",
    color: "#FFF",
    '&:hover' : {
      background : "#FFCB3A",
      color : 'white'
    }
  },
})(Button);

export default function Settings() {
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

  const fetchSettings = async () => {
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
  }

  useEffect(() => {
    console.log(store.getState()['authentication']);
    fetchSettings();
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

  const handleOnClick = async () => {
    setOpen(true);
    setIsApplied(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setOpen(false);
  };

  if(isLoading){
    return <ColorCircularProgress />
  }

  return (
    <div className={classes.root}>
{/*
      <AppBar />
*/}
      <Grid container className={classes.container}>

{/*        <Grid item xs={12} sm={6} md={6} className={classes.item}>
          <Card className={classes.controlCardButtons}>
            <div className={classes.controlCardDiv}>
              {settingKeys.map((settingKey) =>(
              <Box key={settingKey.toString()} className={classes.controlCardBox} display='flex'>
                <Box className={classes.alignButtonIcon} flexGrow={1} p={1} >
                  <Tooltip className={classes.textColor} title="Add" placement="top-start">
                    <Button>{WordsTable[settingKey]}</Button>
                  </Tooltip>
                </Box>
                <Box className={classes.alignNameBox} flexGrow={1} p={1} >
                  <SettingExplanation setting={settingKey} values={settings[settingKey]}/>
                </Box>
                <Box className={classes.alignButtonIcon} p={1} flexGrow={1}>
                  <AutomationCard setting={settingKey} />
                </Box>
              </Box>
              ))}
            </div>
          </Card>
        </Grid>*/}

        <Grid item xs={12} sm={6} md={6} className={classes.item}>
          <Card className={classes.parentItem}>
            <Grid container style={{marginBottom: '20px'}}>
            { settingKeys.map((settingKey) =>(
              <Grid key={settingKey.toString()} item xs={12} sm={6} md={6} className={classes.slider}>
                <RangeSlider key={settingKey.toString()} values={settings[settingKey]} isApplied={isApplied}  settingKey={settingKey}/>
              </Grid>)
            )}
            </Grid>
            <CustomButton onClick={ handleOnClick } size="medium">
              <Typography>적용</Typography>
            </CustomButton>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                설정 완료!
              </Alert>
            </Snackbar>
          </Card>
        </Grid>

      </Grid>
  </div>
  );
}
