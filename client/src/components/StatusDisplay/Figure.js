import React, {useLayoutEffect, useRef, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    borderRadius: '50%',
    background: props => props.customTheme,
    boxShadow: props => props.neumInShadow,
    backgroundColor : 'rgba(255, 255, 255, 0)',
    height: props => props.dimensions.width,
    margin: '5%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center'
  },
  title : {
    fontFamily : "Nanum Gothic",
    padding : '5px 0 5px 0',
    color : props => props.fontColor,
    fontWeight : 'bold'
  },
  environmentValues: {
    padding : '5px 0 5px 0',
    color : props => props.fontColor,
    textAlign : 'center',
    fontSize : '1rem',
    fontWeight : 'bold',
  }
});

export default function Figure(props) {
  const { environment, values, plant } = props;
  const { unitsTable, WordsTable } = require('root/values/strings.json');
  const {environments} = require('root/values/preferences.json')
  const {colors} = require('root/values/colors.json')
  const n_environment = environments.length;
  const roundFigureRef = useRef();
  const [width, setWidth] = React.useState(window.innerWidth);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  const classes = useStyles({
    dimensions: dimensions,
    n_environment : n_environment,
    customTheme : colors.customTheme,
    plantColor : colors[plant],
    neumInShadow : colors.neumInShadow,
    fontColor : colors.fontColor
  });

  useLayoutEffect(() => {
    if (roundFigureRef.current) {
      setDimensions({
        width: roundFigureRef.current.offsetWidth,
        height: roundFigureRef.current.offsetHeight
      });
    }
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    });
    return () => {
      setDimensions({width: 0, height: 0 })
    }
  }, [width]);

  return (
      <div >
          <Typography className={classes.title}>{WordsTable[environment]}</Typography>
          <Paper className={classes.root} ref={roundFigureRef}>
            <div>
              <span className={classes.environmentValues}>{values}{unitsTable[environment]}</span>
            </div>
          </Paper>
      </div>
  );
}
