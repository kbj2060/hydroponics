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
import {shallowEqual, useSelector} from "react-redux";

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
  const month = useSelector(state =>
    state.date.month ,shallowEqual)

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

  const cleanup = () => {
    setSelectedDay(null);
    setIsAdd(false);
  }

  useEffect(() => {
    setSelectedDay(null)
    return () => cleanup()
	}, [month])


  useEffect(() => {
    setIsAdd(false);
  }, [selectedDay])

  return (
    CheckLogin()?
      <div className={classes.root}>
        <AppBar page={'일정'} />
        <CssBaseline />
        {console.log("Scheduler", month, selectedDay, isAdd)}
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
          <Grid item xs={12} sm={12} md={4} className={classes.item}>
            {isAdd
              ? <ScheduleAdd selectedDay={selectedDay} handleAddFinish={handleAddFinish} />
              : <ScheduleTable selectedDay={selectedDay}/>
            }
          </Grid>
        </Grid>
      </div> :  <Redirect to={'/'} />
      );
    }
