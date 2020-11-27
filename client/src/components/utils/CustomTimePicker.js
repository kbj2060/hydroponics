import React from 'react';
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const CustomTimePicker = withStyles(() => ({
  root : {
    color : 'white'
  }
}))(TextField)

export default function TimePicker() {
  return(
      <CustomTimePicker
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
  )
}
