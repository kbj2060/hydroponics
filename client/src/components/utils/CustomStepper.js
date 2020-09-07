import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircularTimespanpicker from "../TimeSpanPicker";
import RangeSlider from "../SettingSlider/RangeSlider";
import {useDispatch} from "react-redux";
import {controlSetting} from "../../redux/modules/ControlSetting";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor : 'rgba(255, 255, 255, 0)',
  },
  wrapper: {
    textAlign: 'center',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',
    backgroundColor : 'rgba(255, 255, 255, 0.1)',
    borderRadius : '15px',
    padding : '20px',
  },
  stepper : {
    backgroundColor : 'rgba(255,255,255,0)',
    paddingBottom: '0px',
  },
  backButton: {
    backgroundColor: 'gray',
    color: 'black !important',
    marginRight: theme.spacing(1),
  },
  instructions: {
    paddingBottom: '24px',
    color: 'white',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  alternativeLabel: {
    color: 'white',
  },
  active : {
    color: '#FFCB3A !important'
  },
  completed: {
    color: 'gray !important'
  },
  iconActive: {
    color: '#FFCB3A !important'
  },
  iconCompleted: {
    color: 'gray !important'
  },
  NextButton: {
    backgroundColor : '#FFCB3A !important'
  },
  iconButtonColor: {
    color: '#FFCB3A !important'
  }
}));

function getStepContent(stepIndex, contentComponents) {
  try{
    return contentComponents[stepIndex]
  } catch (e){
    return 'not found'
  }
}

export default function CustomStepper({modalClose}) {
  const classes = useStyles();
  const {settings:steps, WordsTable, settingMinMax} = require('root/init_setting')
  const fs = require('fs');
  const dispatch = useDispatch();

  const interval = 30;
  const [activeStep, setActiveStep] = React.useState(0);
  const [apply, setApplied] = React.useState(false);
  const [settings, setSettings] = React.useState(settingMinMax);

  const labels = steps.map((step) => {
    return `${WordsTable[step]} 제어 `
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleApply = () => {
    modalClose();
  };

  const handleTimePicker = (time, settingSubject) => {
    let start=[], end=[], range={};
    time.map((t) => {
      start.push(t[0].format('hh:mm'))
      end.push(t[1].format('hh:mm'))
    })
    range['start'] = start
    range['end']= end
    dispatch(controlSetting({[settingSubject] : range } ));
  }

  const stepperComponents = {
    'led' : <RangeSlider key={'led'} values={settingMinMax['led']} settingKey={'led'}/>,
    'temperature' : <RangeSlider key={'temperature'} values={settingMinMax['temperature']} settingKey={'temperature'}/>,
    'fan' : (
      <div style={{flexDirection: 'row', display:'flex', justifyContent:'center'}}>
        <div style={{position: 'relative'}}>
        <CircularTimespanpicker key={'fan'}
                                onClick={(time) => handleTimePicker(time, "fan")}
                                boundaryHour="12" interval={interval} showResults={false} />
        </div>
        <div style={{position: 'absolute', display:'flex', top: '333px'}}>
          <p>매일</p>
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical outlined primary button group"
          >
            <IconButton classes={{root : classes.iconButtonColor}} size='small'>
              <ArrowDropUpIcon />
            </IconButton>
            <IconButton classes={{root : classes.iconButtonColor}} size='small'>
              <ArrowDropDownIcon />
            </IconButton>
          </ButtonGroup>
        </div>
        </div>),
    'waterpump' : <CircularTimespanpicker key={'waterpump'}
                                          onClick={(time) => handleTimePicker(time, "waterpump")}
                                          boundaryHour="12" interval={interval} showResults={false} />,
  }

  return (
    // TODO : root 의 높이를 받는 CircularTimespanpicker 컴포넌트 새로운 파일로 만들 것.
    <div className={classes.root}>
      <div className={classes.wrapper}>

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
              <Button className={classes.NextButton} onClick={handleApply}> 저장 </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(steps[activeStep], stepperComponents)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  뒤로
                </Button>
                {activeStep === steps.length - 1 ? (
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
