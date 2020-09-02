import React, {useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import {store} from "../../redux/store";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import ReplayIcon from '@material-ui/icons/Replay';
import Chip from "@material-ui/core/Chip";


function CycleChip({setting, icons, value}){
  const [icon] = icons;
  const {unitsTable} = require('root/init_setting');

  return(
    <div style={{width: '100%'}}>
      <Chip style={{width: '100%', color: 'white', backgroundColor: '#FFC936' }} icon={icon} label={`${value} ${unitsTable[setting]}`} />
    </div>
  )
}

function RangeChip({setting, icons, min, max}){
  const [firstIcon, secondIcon] = icons;
  const {unitsTable} = require('root/init_setting');

  return(
    <div style={{width: '100%'}}>
      <Chip style={{ fontSize: '0.7em',color: 'white',width: '50%', backgroundColor: '#3662FF'}}  icon={firstIcon} label={`${min} ${unitsTable[setting]}`} />
      <Chip style={{ fontSize: '0.7em',color: 'white',width: '50%', backgroundColor: '#FF4273'}}  icon={secondIcon} label={`${max} ${unitsTable[setting]}`} />
    </div>
  )
}

function TemperatureChip({setting, icons, min, max}){
  const [PowerIcon, PowerOffIcon] = icons;
  const {unitsTable} = require('root/init_setting');
  const mean = (min+max)/2
  return(
    <div style={{width: '100%'}}>
      <Chip style={{ fontSize: '0.7em', color: 'white',width: '33%', backgroundColor: '#3662FF'}}  icon={PowerIcon} label={`${min} ${unitsTable[setting]}`} />
      <Chip style={{ fontSize: '0.7em', color: 'white',width: '33%', backgroundColor: '#FF4273'}}  icon={PowerOffIcon} label={`${mean} ${unitsTable[setting]}`} />
      <Chip style={{ fontSize: '0.7em', color: 'white',width: '33%', backgroundColor: '#3662FF'}}  icon={PowerIcon} label={`${max} ${unitsTable[setting]}`} />
    </div>
  )
}

export default function SettingExplanation({setting, values}) {
  const [range, setRange] = React.useState(values);
  const iconTable = {
    "fan" : [<ReplayIcon style={{color: 'white'}} />],
    "waterpump" : [<ReplayIcon style={{color: 'white'}} />],
    "temperature" : [<PowerIcon style={{color: 'white'}}/>, <PowerOffIcon style={{color: 'white'}}/>],
    "led" : [<PowerIcon style={{color: 'white'}}/>, <PowerOffIcon style={{color: 'white'}}/>]
  }
  const {settingType} = require('root/init_setting');

  useEffect(() => {
    setRange(values);
  }, []);

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setRange(store.getState()['controlSetting'][setting])
		})
		return () => { unsubscribe(); }
	}, [])

  if(setting === 'temperature'){
    return (
          <Typography variant="subtitle2">
            <TemperatureChip setting={setting} icons={iconTable[setting]} min={range[0]} max={range[1]} />
          </Typography>
    )
  }
  else if(settingType[setting] === 'cycle'){
    return (
      <Typography variant="subtitle2">
          <CycleChip setting={setting} icons={iconTable[setting]} value={range[0]} />
      </Typography>
    )
  }
  else if(settingType[setting] === 'range'){
    return (
      <Typography variant="subtitle2">
          <RangeChip setting={setting} icons={iconTable[setting]} min={range[0]} max={range[1]} />
      </Typography>
    )
  }

}