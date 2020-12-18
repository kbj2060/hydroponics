import React, {useCallback, useEffect} from 'react';
import CustomLine from './CustomLine';
import TimerIcon from '../../assets/icons/TimerIcon';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {checkEmpty} from "../utils/CheckEmpty";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() =>({
  foreground : {
    position : 'relative',
    height : 'auto',
    width : 'auto',
    padding : '3px',
    background : props => props.customTheme,
    borderRadius: '20px',
    boxShadow: props => props.neumOutShadow
  },
  title : {
    color : props => props.fontColor,
    textAlign : 'center',
    fontWeight: 'bold',
    padding: '1%',
    fontSize : '1em'
  },
  updateInfo : {
    margin : 0,
    padding: '1%',
    display : 'inlineBlock',
    borderTopWidth : '1px',
    borderTopStyle : 'solid',
    borderTopColor : props => props.customTheme,
    textAlign : 'left',
    verticalAlign : 'middle',
  },
  updateTime : {
    display : 'inline',
    verticalAlign : 'middle',
    fontSize : '0.7em',
    fontWeight : 'bold',
    color : props => props.fontColor,
  },
}));

export default function Index(props) {
  const {WordsTable} = require('root/values/strings.json');
  const {colors} = require('root/values/colors.json');
  const {sections} = require('root/values/preferences.json');
  const han_current_page = decodeURI(window.location.pathname.replace('/',''))
  const current_page = WordsTable[han_current_page]
  const { environment } = props;
  const [history, setHistory] = React.useState([]);
  const [lastUpdate, setLastUpdate] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true)
  const classes = useStyles({
    customTheme : colors.customTheme,
    neumOutShadow : colors.neumOutShadow,
    fontColor : colors.fontColor
  });

  // json 형태로 반환 받아 사용
  //  {
  //    '1': {
  //      '2020/08/27 03:20:49': 1212,
  //      '2020/08/27 03:20:42': 1212,
  //      '2020/08/27 03:20:28': 1212
  //    },
  //    '2': { '2020/08/27 03:22:55': 1212 },
  //    '3': { '2020/08/27 03:23:07': 1212 }
  //  }
  const fetchHistory = useCallback(async () => {
    const getLastUpdatedTime = (data) => {
      if(checkEmpty(data)){ return null }
      let data_len = []
      let primary_key = ''
      Object.keys(data).forEach((h) => { data_len[h] = Object.values(data[h]).length })
      primary_key = Object.keys(data_len).reduce((p, c) => data_len[p] > data_len[c] ? p : c);
      return Object.keys(data[primary_key])[0];
    }

    await axios.get('/api/get/environment/history', {
      params: {
        selects: [environment],
        section: current_page
      }
    }).then(({data})=> {
      setHistory(data);
      setLastUpdate(getLastUpdatedTime(data));
      setIsLoading(false);
    }).catch((err) => {
      console.log("HISTORY FETCH ERROR!");
      console.log(err);
    })
  }, [environment])

  useEffect(() => {
    const {historyUpdateTime} = require('root/values/time.json');
    fetchHistory();
    const interval = setInterval(() => {
      fetchHistory();
    }, parseInt(historyUpdateTime));
    return () => {
      clearInterval(interval)
    };
  }, [fetchHistory]);

  return (
    !isLoading ? <div className={classes.foreground}>
      <Typography className={classes.title}> {WordsTable[environment]} </Typography>
      <CustomLine environment={environment} history={history} width={5} height={2} />
        <div className={classes.updateInfo}>
          <TimerIcon />
          <Typography variant="inherit" className={classes.updateTime}> 마지막 업데이트 : {lastUpdate} </Typography>
        </div>
      </div>: <></>
    )
  }
