import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import RangeSlider from "./RangeSlider";
import TimePickerWrapper from "./TimePickerWrapper";
import {store} from "../../redux/store";
import axios from "axios";
import CloseIcon from '@material-ui/icons/Close';
import SettingExplanation from "./SettingExplanation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AutoSwitchWrapper from "./AutoSwitchWrapper";
import {loadState, saveState} from "../LocalStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonLabel: {
    fontSize: '0.8rem',
    color: props => props.font,
  },
  wrapper: {
    textAlign: 'center',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : '#D9D8D2',
    borderRadius : '15px',
    padding : '20px',
  },
  stepper : {
    backgroundColor : 'rgba(255,255,255,0)',
    paddingBottom: theme.spacing(1),
  },
  backButton: {
    float:'left',
    color: props => props.font,
    marginRight: theme.spacing(1),
  },
  instructions: {
    paddingBottom: theme.spacing(1),
    color: props => props.font,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  alternativeLabel: {
    color: props => props.font,
    fontSize : '0.9rem'
  },
  active : {
    color: '#dec11e !important'
  },
  completed: {
    color: 'gray !important'
  },
  iconActive: {
    color: '#dec11e !important'
  },
  iconCompleted: {
    color: 'gray !important'
  },
  NextButton: {
    float:'right',
    color: props => props.font,
  },
  iconButtonColor: {
    color: '#dec11e !important'
  }
}));

function getStepContent(stepIndex, contentComponents) {
  try{
    return contentComponents[stepIndex]
  } catch (e){
    return 'not found'
  }
}

const getSteps = (step) => {
  let result = step;
  result.push('tail');
  result.unshift('head');
  return result;
}

const getLabels = (steps, WordsTable) => {
  return steps.map((step, index) => {
    if(index === 0){ return '현재 설정' }
    else if(index === steps.length - 1){ return '적용' }
    else { return `${WordsTable[step]}` }
  });
}

const autoSwitchDisable = (index, len) => {
    return index === 0 || index === len -1;
}

const cloneObj = obj => JSON.parse(JSON.stringify(obj));

export default function CustomStepper({modalClose}) {
  const {colors} = require('root/values/colors.json')
  const classes = useStyles({
      fontColor: colors.fontColor
    });
  const [activeStep, setActiveStep] = React.useState(0);
  const {WordsTable} = require('root/values/strings.json')
  const han_current_page = decodeURI(window.location.pathname.replace('/',''))
  const current_page = WordsTable[han_current_page]
  const {autoItem} = require('root/values/preferences.json')
  const copied = cloneObj(autoItem[current_page]);
  const steps = getSteps(copied);
  const labels = getLabels(steps, WordsTable);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleApply = async () => {
    const user = loadState('authentication')['status']['currentUser'];
    const controlSetting = store.getState()['auto']
    saveState('auto', controlSetting);
    await axios.post('/api/post/save/auto',{
      params: {
        controlSetting : controlSetting,
        user : user,
	      section : current_page
      }
    }).then(()=>{
      modalClose();
    })
  };

  const stepperComponents = {
    'head' : <SettingExplanation key={'head'} position={'head'} />,
    'led' : <RangeSlider key={'led'} settingKey={'led'}/>,
    'heater' : <RangeSlider key={'heater'} settingKey={'heater'}/>,
    'cooler' : <RangeSlider key={'cooler'} settingKey={'cooler'}/>,
    'fan' : <TimePickerWrapper key={'fan'} setting={'fan'} outerSize={150} />,
    'waterpump' : <TimePickerWrapper key={'waterpump'} setting={'waterpump'} outerSize={150} />,
    'tail' : <SettingExplanation key={'tail'} position={'tail'} />,
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
                {console.log("Stepper")}
        <div style={{display:'flex'}}>
          <CloseIcon onClick={modalClose} style={{marginLeft:'auto', color:colors.fontColor, cursor:'pointer'}}/>
        </div>
        <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
          {labels.map((label) => (
            <Step key={label}>
              <StepLabel classes={{
                alternativeLabel: classes.alternativeLabel,
                active : classes.active,
                completed : classes.completed,
                iconContainer : classes.iconContainer,
              }} StepIconProps={{
                classes : {
                  active : classes.iconActive,
                  completed : classes.iconCompleted
                }
              }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Button className={classes.NextButton} onClick={modalClose}> 닫기 </Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(steps[activeStep], stepperComponents)}
              </div>
              <div style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'}}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  뒤로
                </Button>
                <div style={{display: 'inline-flex'}}>
                  {autoSwitchDisable(activeStep, steps.length)
                    ? null
                    : <FormControlLabel
                      value="자동화"
                      control={ <AutoSwitchWrapper key={Object.keys(stepperComponents)[activeStep]}
                                                   name={Object.keys(stepperComponents)[activeStep]}/> }
                      label="자동화"
                      labelPlacement="top"
                      classes={{
                       label:classes.buttonLabel
                      }}
                    />
                  }

                </div>
                {
                  activeStep === steps.length - 1 ? (
                  <Button className={classes.NextButton} onClick={handleApply}>
                    저장
                  </Button>
                  ) :
                  <Button className={classes.NextButton} onClick={handleNext}>
                    다음
                  </Button>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
