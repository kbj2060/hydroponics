import React from 'react';
import Grid from "@material-ui/core/Grid";
import {CustomAntSwitch} from "../utils/CustomAntSwitch";
import {useDispatch} from "react-redux";
import {store} from "../../redux/store";
import {controlSetting} from "../../redux/modules/ControlSetting";

export default function AutoSwitchWrapper({name:setting}) {
  const {colors} = require('../../values/colors.json')
  const reduxSetting = store.getState()['auto'][setting];
  const [status, setStatus] = React.useState(reduxSetting.enable);
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    event.persist();
    const updatedStatus = event.target.checked;
    console.log(store.getState())
    dispatch(controlSetting({
      [setting]: {...reduxSetting, enable : updatedStatus}
    }));
    setStatus(updatedStatus);
  }

  return(
    <Grid container>
      <Grid item style={{color:colors.fontColor,padding:'0.1rem'}}>끄기</Grid>
      <Grid item style={{display:'flex', alignItems:'center'}}>
        <CustomAntSwitch checked={status}
                         onChange={handleChange}
                         value={setting}
                         name={setting}/>
      </Grid>
      <Grid item style={{color:colors.fontColor,padding:'0.1rem'}}>켜기</Grid>
    </Grid>
  )
}