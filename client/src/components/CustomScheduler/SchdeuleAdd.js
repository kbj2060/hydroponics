import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import DatePicker from "./DatePicker";
import {CustomLocale} from "./CustomLocale";
import {OutlinedInput} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {checkEmpty} from "../utils/CheckEmpty";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import moment from "moment";

const useStyles = makeStyles( {
  root: {
    "&.MuiPaper-root": {
      width: '100%',
      height: '100%',
      overflow: 'hidden',

    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#595957',
      },
    },
    "&.MuiFormControl-root": {
      width: "90%",
    },
    "&.MuiOutlinedInput-multiline": {
      width: '90%',
      '&.Mui-focused fieldset': {
        borderColor: '#595957',
      },
      },
  },
  container: {
    height: '100%',
  },
  header: {
    padding : '3% 0',
    textAlign : 'center',
  },
  gridContainer: {
    width: '100%',
    boxShadow : props => props.neumOutShadow,
    backgroundColor : props => props.customTheme,
    borderRadius: "1em",
    height:'100%',
  },
  gridItem: {
    padding : '1% 0',
    width: '100%',
  },
  dateHeader: {
    padding : '1.5% 0',
    width: '100%',
  },
  title: {
    width : `100%`,
  },
  buttonGrid: {
    width : `100%`,
    textAlign: 'center',
    padding : '1%'
  },
  button : {
    margin : '0 2%'
  },
    textfield:{
    width : "90%",
      borderColor : "#595957"
  },
  notchedOutline : {
    borderColor : "#595957"
  }
});


export default function ScheduleAdd({selectedDay, handleAddFinish}) {
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
    customTheme : colors.customTheme,
    neumOutShadow : colors.neumOutShadow,
    fontColor : colors.fontColor
  });
  const [selectedDays, setSelectedDays] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const date2moment = (date) => {
    if (checkEmpty(date))
      return null
    if(typeof(date) === "object")
      return moment(new Date(date.year,date.month-1, date.day)).format('YYYY-MM-DD')
    else if(typeof(date) === "string")
      return moment(new Date(date)).format('YYYY-MM-DD')
  }

  const getToday = () => {
    const today = new Date()
    return {"day":today.getDate(), "month":today.getMonth()+1, "year":today.getFullYear()}
  }

  useEffect(() => {
    selectedDay
      ? setSelectedDays([selectedDay])
      : setSelectedDays([getToday()])
  }, [])

  const renderCustomInput = ({ ref }) => {
    let value = ''
    if (selectedDays.length > 1) {
      value = `${date2moment(selectedDays[0])} 외 ${selectedDays.length - 1}일`
    } else if ( selectedDays.length === 1) {
      value = `${date2moment(selectedDays[0])}`
    } else {
      value = "날짜 설정"
    }
    return (
      <input
        readOnly
        ref={ref}
        value={value}
        style={{
          width: `100%`,
          textAlign: 'center',
          padding: '1rem 1.5rem',
          border: '1px solid #595957',
          borderRadius: '100px',
          color: '#595957',
          outline: 'none',
          backgroundColor: 'transparent'
        }}
      />
    )
  }

  const postSaveSchedules = async () => {
      await axios.post('/api/post/schedules', {
        params: {
          dates: selectedDays.map((day) => date2moment(day)),
          title: title,
          content : content,
          binding : selectedDays.length
        }}).then(({data}) => {
          console.log(data)
      })
    }

  const handleAddSave = () => {
    postSaveSchedules()
    handleAddFinish();
  }

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.gridContainer}  >
        <Grid item className={classes.dateHeader}>
          <DatePicker
          value={selectedDays}
          onChange={setSelectedDays}
          locale={CustomLocale}
          colorPrimary="#595957"
          renderInput={renderCustomInput}
          inputPlaceholder="날짜 설정하기"
          shouldHighlightWeekends
          />
        </Grid>
        <Grid item className={classes.gridItem}>
          <OutlinedInput
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            classes={{root:classes.textfield,
              notchedOutline: classes.notchedOutline}}
            placeholder={"제목"}
            color="secondary"
          />
        </Grid>
        <Grid item className={classes.gridItem}>
          <OutlinedInput
            color="secondary"
            classes={{root:classes.textfield,
            notchedOutline: classes.notchedOutline}}
            placeholder={"내용"}
            value={content}
            onChange={handleContentChange}
            multiline={true}
            rows={8}
          />
        </Grid>
        <Grid item className={classes.buttonGrid}>
          <Button onClick={handleAddSave} className={classes.button} variant="outlined">
            저장
          </Button>
          <Button onClick={handleAddFinish} className={classes.button} variant="outlined">
            취소
          </Button>
        </Grid>
      </Grid>
  )
}
