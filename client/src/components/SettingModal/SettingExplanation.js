import React, {useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import TemperatureIcon from '../../assets/icons/TemperatureIcon'
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ToysIcon from '@material-ui/icons/Toys';
import OpacityIcon from '@material-ui/icons/Opacity';
import {checkEmpty} from '../utils/CheckEmpty';
import Chip from '@material-ui/core/Chip';
import LoopIcon from '@material-ui/icons/Loop';
import {store} from "../../redux/store";
import {useDispatch} from "react-redux";
import {saveSetting} from "../../redux/modules/ControlSetting";
import {ColorCircularProgress} from "../utils/ColorCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.6rem'
  },
  chip: {
    color: 'white',
    borderColor: 'white'
  },
  icon: {
    padding: theme.spacing(1),
  },
  table: {
    display: 'flex',
    flexDirection : 'column',
  },
  title : {
    color: 'white'
  },
  detailExplanation: {
    display:'flex',
    flexDirection: 'row',
  },
  explanation: {
    color: 'white',
    margin: '0',
  },
  cell : {
    display: 'flex',
    padding: theme.spacing(1)
  }
}))

const getRangeMin = (subject) => {
  return subject.range[0]
}

const getRangeMax = (subject) => {
  return subject.range[1]
}

export default function SettingExplanation({position}) {
  const [setting, setSetting] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const {defaultSetting} = require('root/init_setting')

  // HEAD(이전 설정) 데이터 불러오기 함수
  const getAutoFromJson = async () => {
    await axios.get('/api/get/load/auto/json').then(({data}) => {
      if(checkEmpty(data)){ data = defaultSetting }
      setSetting(data);
      dispatch(saveSetting(data));
      setIsLoading(false);
    })
  }

  // TAIL(현재 설정) 데이터 보여주기 함수
  const getAutoFromStore = () => {
    setSetting(store.getState()['controlSetting']);
    setIsLoading(false);
  }

  const getAutoEnable = (subject) => {
    if(!checkEmpty(subject)){
      return setting[subject]['enable']
    }
  }

  const getOffChips = () => {
    return (<Chip key={'off'} className={classes.chip} variant="outlined" size="small" label={"자동화 꺼짐"} /> )
  }

  const getCycleChips = (subject) => {
    if(!checkEmpty(setting[subject])){
      let {start, end, term} = setting[subject];
      let result = [];
      result.push(<Chip key={'loop'} className={classes.chip} icon={<LoopIcon style={{color: 'white'}}/>} variant="outlined" size="small" label={`${term} 일`} />)
      start.map((s, i) => {
        const label = `${s} - ${end[i]}`;
        result.push(<Chip key={label} className={classes.chip} variant="outlined" size="small" label={label} />);
      });
      return result;
    }
  }

  const getRangeLEDChips= () => {
    if(!checkEmpty(setting.led)){
        return (
          <>
            <Chip className={classes.chip} variant="outlined" size="small" label={`${getRangeMin(setting.led)}시 켜기`} />
            <Chip className={classes.chip} variant="outlined" size="small" label={`${getRangeMax(setting.led)}시 끄기`} />
          </>
        )}
  }

  const getRangeTempChips = () => {
    if(!checkEmpty(setting.temperature)){
      const _min = getRangeMin(setting.temperature), _max = getRangeMax(setting.temperature);
      const _mean = (_min+_max)/2
      return (
          <>
            <Chip className={classes.chip} variant="outlined" size="small" label={`${_min}°C 난방 켜기`} />
            <Chip className={classes.chip} variant="outlined" size="small" label={`${_mean}°C 끄기`} />
            <Chip className={classes.chip} variant="outlined" size="small" label={`${_max}°C 냉방 켜기`} />
          </>
      )}
  }

  useEffect(() => {
    position === 'head' ? getAutoFromJson() : getAutoFromStore()
  }, [])

  if(isLoading){
    return <ColorCircularProgress />
  }

  return(
    <table className={classes.table}>
      <tbody>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <WbSunnyIcon />
        </td>
        <td style={{margin: 'auto'}}>
            {!getAutoEnable('led') ? getOffChips() : getRangeLEDChips()}
        </td>
      </tr>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <TemperatureIcon />
        </td>
        <td style={{margin: 'auto'}}>
            {!getAutoEnable('temperature') ? getOffChips() : getRangeTempChips()}
        </td>
      </tr>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <ToysIcon />
        </td>
        <td style={{margin: 'auto'}}>
            {!getAutoEnable('fan') ? getOffChips() : getCycleChips('fan')}
        </td>
      </tr>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <OpacityIcon />
        </td>
        <td style={{margin: 'auto'}}>
            {!getAutoEnable('waterpump') ? getOffChips() : getCycleChips('waterpump')}
        </td>
      </tr>
      </tbody>
    </table>
  )
}