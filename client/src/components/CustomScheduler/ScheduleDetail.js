import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from "@material-ui/core/Typography";
import DatePicker from "./DatePicker";
import Grid from "@material-ui/core/Grid";
import {CustomLocale} from "./CustomLocale";
import {OutlinedInput, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";

const drawerWidth = 300
const useStyles = makeStyles({
  drawer: {
    height: '100%',
    minWidth : `${drawerWidth}px`,
    overflow: 'hidden',
  },
  container: {
    height: '100%',
    minWidth : `${drawerWidth-10}px`,
  },
  header: {
    padding : '3% 0',
    textAlign : 'center',
  },
  gridContainer: {
    width: '100%',
    height: 'auto',
    minWidth : `${drawerWidth-10}px`,
  },
  gridItem: {
    padding : '1% 0',
  },
  title: {
    width : `${drawerWidth-30}px`,
  },
  drawerPaper : {
      backgroundColor: '#D9D8D2',
      height: '100%',
      minWidth : `${drawerWidth-10}px`,
      overflow: 'hidden',
  },
  buttonGrid: {
    width : `100%`,
    textAlign: 'center',
    padding : '2%'
  },
  button : {
    margin : '0 2%'
  },
  textfield:{
    width : `${drawerWidth-30}px`,
  }
});

export default function ScheduleDetail(props) {
  const classes = useStyles();
  const {toggleDrawer, selectedRow, reviseRow} = props;
  const [selectedDays, setSelectedDays] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(true);

  const closeDrawer = () => {
    toggleDrawer();
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const obj2moment = (obj) => {
    return moment(new Date(obj.year, obj.month-1, obj.day)).format('YYYY-MM-DD')
  }

  const renderCustomInput = ({ ref }) => {
    const start = obj2moment(selectedDays[0]);
    const len = selectedDays.length - 1;
    return(
      <input
        readOnly
        ref={ref}
        value={selectedDays.length ? `${start} 외 ${len}일` : "날짜 설정"}
        style={{
          width: `100%`,
          textAlign: 'center',
          padding: '1rem 1.5rem',
          border: '1px solid #595957',
          borderRadius: '100px',
          color: 'black',
          outline: 'none',
          backgroundColor: 'transparent'
        }}
      />
    )
  }

  const reviseSchedule = async () => {
    await axios.post("/api/post/revise/schedules", {
      params : {
        id : selectedRow.id,
        dates : selectedDays,
        title : title,
        content : content
      }
    }).then(() => {
      reviseRow(selectedRow.id, selectedDays.map((day) => obj2moment(day)), title, content, selectedDays.length);
    })
  }

  const handleSaveClick = () => {
    reviseSchedule();
    closeDrawer();
  }

  const cleanup = () => {
    setTitle("")
    setContent("")
    setSelectedDays([]);
  }

  useEffect(() => {
    setContent(selectedRow.content);
    setTitle(selectedRow.title);
    setSelectedDays(selectedRow['date']?selectedRow['date'].map((date) => {
      const [year, month, day] = date.split('-')
      return {"year": parseInt(year), "month":parseInt(month), "day":parseInt(day)}
    }):[]);
    return () => {
      cleanup();
    }
  }, [])

   const scheduleDetail = () => (
      <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.gridContainer}  >
        <Grid item className={classes.gridItem}>
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
          <TextField
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            classes={{root:classes.textfield}}
            color="secondary"
          />
        </Grid>
        <Grid item className={classes.gridItem}>
          <OutlinedInput
            classes={{root:classes.textfield}}
            value={content}
            color="secondary"
            onChange={handleContentChange}
            multiline={true}
            rows={10}
          />
        </Grid>
        <Grid item className={classes.buttonGrid}>
          <Button onClick={handleSaveClick}  className={classes.button} variant="outlined">
            저장
          </Button>
          <Button onClick={closeDrawer} className={classes.button} variant="outlined">
            취소
          </Button>
        </Grid>
      </Grid>
  );

  return (
      <Drawer classes={{ paper: classes.drawerPaper }} anchor={'right'} open={open} onClose={closeDrawer}>
        {console.log("Detail Rendering")}
        <Typography className={classes.header}>일정 세부 내역</Typography>
        {scheduleDetail()}
      </Drawer>
  );
}

{/*<OutlinedInput
            className={classes.date}
            id="year"
            value={date.year}
            onChange={handleChange('year')}
            endAdornment={<InputAdornment position="end">년</InputAdornment>}
          />
          <OutlinedInput
            className={classes.date}
            id="month"
            value={date.month}
            onChange={handleChange('month')}
            endAdornment={<InputAdornment position="end">월</InputAdornment>}
          />
          <OutlinedInput
            className={classes.date}
            id="day"
            value={date.day}
            onChange={handleChange('day')}
            endAdornment={<InputAdornment position="end">일</InputAdornment>}
          />*/}

          {/*<Grid>
          <RadioGroup row className={classes.radioGroup} aria-label="position" value={isRepeat} onChange={handleIsRepeatChange}>
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="반복 일정"
              labelPlacement="start"
            />
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="하루 일정"
              labelPlacement="start"
            />
          </RadioGroup>
        </Grid>*/}