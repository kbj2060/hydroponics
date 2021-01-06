import React from 'react';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  form : {
    width : '100%',
    height : '50%',
    justifyContent: 'center',
    display: 'flex',
    alignItems : 'center',
  },
  radioGroup: {
    margin : 'auto',
    width: '100%',
    height : '100%',
    justifyContent : 'center',
    display : 'flex',
  },
  control: {
    padding : '0 5%',
  }
}))

export default function ThemeChecker() {
  const [value, setValue] = React.useState('female');
  const classes = useStyles({
  });

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return(
    <FormControl className={classes.form} component="fieldset">
      <RadioGroup className={classes.radioGroup} row aria-label="theme" name="theme" value={value} onChange={handleChange}>
        <FormControlLabel className={classes.control} value="Dark" control={<Radio />} label="Dark" />
        <FormControlLabel className={classes.control} value="Light" control={<Radio />} label="Light" />
      </RadioGroup>
    </FormControl>
  )
}
