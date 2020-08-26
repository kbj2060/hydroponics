import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../assets/jss/SettingsStyle';
import AppBar from 'root/client/src/components/AppBar';
import SettingSlider from 'root/client/src/components/SettingSlider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import {store} from "../../redux/store";

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
  const { settings:settingKeys } = require('root/init_setting');
  const [isApplied, setIsApplied] = useState(false)
  const [open, setOpen] = React.useState(false);

  const handleNull = (obj) => {
    const IndexOfNull = 1
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

  useEffect(() => {
    console.log(store.getState()['authentication']);
  }, []);

  useEffect(() => {
    if(isApplied) {
      const SettingsFromStore = handleNull(store.getState()['controlSetting']);
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

  return (
    <div className={classes.root}>
      <AppBar />
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={12} className={classes.item}>
          <Card className={classes.parentItem}>
            <Grid container style={{marginBottom: '20px'}}>
            { settingKeys.map((settingKey) =>(
              <Grid key={settingKey.toString()} item xs={12} sm={6} md={6} className={classes.slider}>
                <SettingSlider isApplied={isApplied} key={settingKey.toString()} settingKey={settingKey}/>
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
