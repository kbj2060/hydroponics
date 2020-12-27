import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from 'root/client/src/components/AppBar';
import {CheckLogin} from "root/client/src/components/utils/CheckLogin";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Calendar} from "root/client/src/components/CustomScheduler/Calendar";
import "root/client/src/components/CustomScheduler/DatePicker.css";
import {CustomLocale} from "root/client/src/components/CustomScheduler/CustomLocale";
import ScheduleTable from "root/client/src/components/CustomScheduler/ScheduleTable";
import ScheduleAdd from "../../components/CustomScheduler/SchdeuleAdd";
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {store} from "../../redux/store";

const useStyles = makeStyles(() => ({
  root: {
    overflow: 'hidden',
    flexGrow: 1,
  },
  container : {
    justifyContent : 'center',
    backgroundColor : 'rgba(255, 255, 255, 0)',
  },
  item : {
    height : '440px',
    textAlign : 'center',
    padding : '8px',
    width : 'auto',
    borderRadius : '20px',
  },
  title: {
    padding : '3% 0',
  },
  parent : {
    height: '75%',
    width : '100%',
    textAlign: 'center',
    justifyContent : 'center',
    display : 'flex',
    alignItems : 'center'
  },
}))

export default function Scheduler() {
  const {colors} = require('root/values/colors.json')
  const [selectedDay, setSelectedDay] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [month, setMonth] = useState(null);

  const classes = useStyles({
    customTheme : colors.customTheme,
    neumOutShadow : colors.neumOutShadow,
    fontColor : colors.fontColor
  });

  const handleAddSchedule = () => {
    setIsAdd(true);
  }

  const handleAddFinish = () => {
    setIsAdd(false);
    setSelectedDay(null);
  }

  const handleRefresh = () => {
    setSelectedDay(null);
    setIsAdd(false);
  }

  const renderFooter = () => (
    <ButtonGroup color="secondary">
      <Button onClick={handleAddSchedule}>일정 추가</Button>
      <Button onClick={handleRefresh}>{month}월 일정</Button>
    </ButtonGroup>
  )

  useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setMonth(store.getState()['saveDate']['month'])
		})
		return () => { unsubscribe(); }
	}, [])

  useEffect(() => {
    setIsAdd(false)
  }, [selectedDay])

  if(!month){ return null }
  return (
    CheckLogin()?
      <div className={classes.root}>
        <AppBar page={'일정'} />
        <CssBaseline />
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={12} md={5} className={classes.item}>
            <Calendar value={selectedDay}
                      colorPrimary="#595957"
                      colorPrimaryLight="rgba(59, 59, 57, 0.2)"
                      locale={CustomLocale}
                      onChange={setSelectedDay}
                      isDatepicker={false}
                      renderFooter={renderFooter}
                      shouldHighlightWeekends />
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={classes.item}>
            {isAdd ? <ScheduleAdd selectedDay={selectedDay} handleAddFinish={handleAddFinish} />:<ScheduleTable selectedDay={selectedDay}/>}
          </Grid>
          {console.log("Scheduler Rendering", isAdd, month, selectedDay)}
        </Grid>
      </div> :  <Redirect to={'/'} />
      );
    }
