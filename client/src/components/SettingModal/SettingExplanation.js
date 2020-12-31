import React, {useEffect} from 'react';
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ToysIcon from '@material-ui/icons/Toys';
import OpacityIcon from '@material-ui/icons/Opacity';
import {checkEmpty} from '../utils/CheckEmpty';
import Chip from '@material-ui/core/Chip';
import LoopIcon from '@material-ui/icons/Loop';
import {store} from "../../redux/store";
import {ColorCircularProgress} from "../utils/ColorCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '0.6rem'
  },
  chip: {
    color : props => props.fontColor,
    borderColor: props => props.borderColor
  },
  icon: {
    padding: theme.spacing(1),
  },
  table: {
    display: 'flex',
    flexDirection : 'column',
  },
  title : {
    color : props => props.fontColor,
  },
  detailExplanation: {
    display:'flex',
    flexDirection: 'row',
  },
  explanation: {
    color : props => props.fontColor,
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
  const {colors} = require('root/values/colors.json')
  const {WordsTable} = require('root/values/strings.json')
  const han_current_page = decodeURI(window.location.pathname.replace('/',''))
  const current_page = WordsTable[han_current_page]
  const [setting, setSetting] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const classes = useStyles({
    borderColor : colors.fontColor,
    fontColor : colors.fontColor
  });
  const {auto:defaultSetting} = require('root/values/defaults.json');
  const {autoItem} = require('root/values/preferences.json')

  // HEAD(이전 설정) 데이터 불러오기 함수
  const getAutoFromDB = async () => {
    await axios.get('/api/get/auto', {
      params: {
        selects : ['item', 'enable', 'duration'],
        where : autoItem[current_page],
	      section: current_page
      }
    }).then(({data}) => {
      console.log(data)
      if(checkEmpty(data)){
        data = defaultSetting;
      }
      setSetting(data);
      //dispatch(saveSetting(data));
      setIsLoading(false);
    })
  }

  // TAIL(현재 설정) 데이터 보여주기 함수
  const getAutoFromStore = () => {
    setSetting(store.getState()['auto']);
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
      result.push(<Chip key={'loop'} className={classes.chip} icon={<LoopIcon style={{color: colors.fontColor}}/>} variant="outlined" size="small" label={`${term} 일`} />)
      start.forEach((s, i) => {
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

  const getCoolerChips = () => {
    if(!checkEmpty(setting.cooler)){
      const _min = getRangeMin(setting.cooler), _max = getRangeMax(setting.cooler);
      return (
          <>
            <Chip className={classes.chip} variant="outlined" size="small" label={`${_min}°C 냉방 끄기`} />
            <Chip className={classes.chip} variant="outlined" size="small" label={`${_max}°C 냉방 켜기`} />
          </>
      )}
  }

  const getHeaterChips = () => {
    if(!checkEmpty(setting.cooler)) {
      const _min = getRangeMin(setting.heater), _max = getRangeMax(setting.heater);
      return (
        <>
          <Chip className={classes.chip} variant="outlined" size="small" label={`${_min}°C 난방 켜기`}/>
          <Chip className={classes.chip} variant="outlined" size="small" label={`${_max}°C 난방 끄기`}/>
        </>
      )
    }
  }

  useEffect(() => {
    position === 'head' ? getAutoFromDB() : getAutoFromStore()
    return () => {
      setIsLoading(true);
    }
  }, [])

  return(
    isLoading?<ColorCircularProgress />:
    <table className={classes.table}>
      <tbody>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <WbSunnyIcon style={{color: colors.defaultIcon}}/>
        </td>
        <td style={{margin: 'auto'}}>
            {!getAutoEnable('led') ? getOffChips() : getRangeLEDChips()}
        </td>
      </tr>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <WhatshotIcon style={{color: colors.defaultIcon}}/>
        </td>
        <td style={{margin: 'auto'}}>
            {!getAutoEnable('heater') ? getOffChips() : getHeaterChips()}
        </td>
      </tr>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <AcUnitIcon style={{color: colors.defaultIcon}}/>
        </td>
        <td style={{margin: 'auto'}}>
          {!getAutoEnable('cooler') ? getOffChips() : getCoolerChips()}
        </td>
      </tr>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <ToysIcon style={{color: colors.defaultIcon}}/>
        </td>
        <td style={{margin: 'auto'}}>
            {!getAutoEnable('fan') ? getOffChips() : getCycleChips('fan')}
        </td>
      </tr>
      <tr className={classes.cell}>
        <td className={classes.icon}>
          <OpacityIcon style={{color: colors.defaultIcon}}/>
        </td>
        <td style={{margin: 'auto'}}>
            {!getAutoEnable('waterpump') ? getOffChips() : getCycleChips('waterpump')}
        </td>
      </tr>
      </tbody>
    </table>
  )
}
