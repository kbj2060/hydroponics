import React, {Component} from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import './timeSpanPicker.css';
import PropTypes from 'prop-types';
import {store} from "../../redux/store";

const config = {
  labelsPAdding: 13,
  segmentsColorsArray: ['#bbb', '#ddd'],
  defaultInnerRadiusIndex: 1.4,
  defaultChartPadding: 60
};

class CircularTimespanpicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    outerRadius : PropTypes.number,
    innerRadius : PropTypes.number,
    showResults : PropTypes.bool,
    onClick   : PropTypes.func,
    subject : PropTypes.string,

    interval : (props, propName, componentName) => {
      const interval = props[propName];
      if ( !Number.isInteger(interval) || interval > 60 || 60 % interval) {
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. Validation failed.
                    Expects integer equal or less than 60 and 60 is divisible by it`
        );
      }
    },
    boundaryHour : (props, propName, componentName) => {
      const boundaryHour = props[propName];
      if ( !Number.isInteger(boundaryHour) || boundaryHour > 24) {
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. Validation failed.
                    Expects integer less than 24`
        );
      }
    },
  };

  static defaultProps = {
    outerRadius : 100,
    interval : 60,
    boundaryHour: 0,
    showResults : true,
    onClick   : (value) => { console.log (value) },
  };

  oneToNArray(n){
    return Array.from({ length: n }, (_, i) => i+1)
  }

  hourToMoment(clickedValue){
    const clickedStartValue = clickedValue[0];
    const clickedFinishValue = clickedValue[1];
    const { initialObject: { boundaryHour }, ...segments } = this.state;
    const segmentPreviousValue = segments[clickedFinishValue];
    const segmentCurrentValue = {
      [String(clickedFinishValue)]: segmentPreviousValue
        ? null
        : [
          moment().set('hour', boundaryHour).set('minute', 0).minute(clickedStartValue),
          moment().set('hour', boundaryHour).set('minute', 0).minute(clickedFinishValue)
        ]
    };
    return Object.values(segmentCurrentValue)[0]
  }

  componentDidMount() {
    const { subject, interval } = this.props;
    const {start:selectedStartHours, end:selectedEndHours} = store.getState()['controlSetting'][subject]

    const selectedStart = this.getSelectedHours(selectedStartHours);
    const selectedEnd = this.getSelectedHours(selectedEndHours);
    let selectedHours = {}

    selectedEnd.forEach((end, index) => {
      const distance = end - selectedStart[index];
      if(distance > 0) {
        for (let d in this.oneToNArray(distance)) {
          const oneUnitEnd = (end - d) * interval;
          selectedHours[oneUnitEnd] = this.hourToMoment([oneUnitEnd - interval ,oneUnitEnd])
        }
      } else {
        const lastHour = 24 * interval
        selectedHours[[24 * interval]] = this.hourToMoment([lastHour - interval ,lastHour])}
    });

    this.setState({...selectedHours})
  }

  componentWillMount() {
    let { outerRadius, innerRadius, interval, boundaryHour, onClick, showResults, subject } = this.props;
    innerRadius = (innerRadius && innerRadius < outerRadius) ? innerRadius : outerRadius/config.defaultInnerRadiusIndex;

    const width = outerRadius * 2 + config.defaultChartPadding;
    const segmentsInHour = 1;
    const totalNumberOfSegments = 24; //24시로 설정하고 간격을 1시간으로 바꾸어 12시간짜리를 24시간으로 바꿈.
    const boundaryIsPostMeridiem = boundaryHour > 12;

    const pie = d3.pie().sort(null).value(d => 1);
    const segmentsArray = pie(new Array(totalNumberOfSegments));
    const hoursLabelsArray = pie(new Array(24));
    const colorScale = d3.scaleOrdinal().domain([0, 1, 2]).range(config.segmentsColorsArray);
    const segmentsArcFn = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
    const minutesArcFn = d3.arc()
      .outerRadius(outerRadius + config.labelsPAdding)
      .innerRadius(outerRadius + config.labelsPAdding)
      .startAngle(d => d.startAngle + Math.PI / totalNumberOfSegments)
      .endAngle(d => d.endAngle + Math.PI  / totalNumberOfSegments);
    const hoursArcFn = d3.arc()
      .outerRadius(outerRadius + config.labelsPAdding)
      .innerRadius(outerRadius + config.labelsPAdding)
      .startAngle(d => d.startAngle - 0.13)
      .endAngle(d => d.endAngle - 0.13);

    const initialObject = {
      interval, boundaryHour, width, segmentsInHour, boundaryIsPostMeridiem,
      segmentsArcFn, minutesArcFn, hoursArcFn, segmentsArray, showResults, onClick,
      hoursLabelsArray, colorScale, innerRadius, outerRadius, totalNumberOfSegments, subject
    };
    this.setState({ initialObject })
  }


  getSelectedHours(hoursList) {
    return hoursList.map((hour) => {
      return parseInt(hour.split(':')[0])
    })
  }

  /* On click on segment convert simple segment's value [startValue, endValue] in moment.js object and save it in a state as "chosen" */
  handleClick(clickedValue, isEntered) {
    /* skip handling if click anf hover were started out of segments*/
    if (isEntered && !this.state.initialObject.mouseIsClickedDown) return;
    const clickedStartValue = clickedValue[0];
    const clickedFinishValue = clickedValue[1];
    const { initialObject: { boundaryHour,  onClick }, ...segments } = this.state;
    const segmentPreviousValue = segments[clickedFinishValue];
    const segmentCurrentValue = {
      [String(clickedFinishValue)]: segmentPreviousValue
        ? null
        : [
          moment().set('hour', boundaryHour).set('minute', 0).minute(clickedStartValue),
          moment().set('hour', boundaryHour).set('minute', 0).minute(clickedFinishValue)
        ]
    };

    this.setState(segmentCurrentValue);
    onClick(this.getReducedArray({...this.state, ...segmentCurrentValue}));
  }

  /* Define an hours labels. "showSingleBoundaryHour" set displaying of doubled boundary hours (e.g. '8|20', '16|4') */
  getHoursLabels(boundary, index, showSingleBoundaryHour) {
    const hour24 = index + 12,
      hour12 = showSingleBoundaryHour ? index: index || "00",
      isInBottomQuadrants = (index > 3 && index < 10);

    if (boundary > 12) {
      boundary = boundary - 12;
      if (index === boundary) return showSingleBoundaryHour ? hour24 : isInBottomQuadrants ? `${hour24} | ${hour12}` : `${hour12} | ${hour24}`;
      return index < boundary ? hour12: hour24;
    } else {
      if (index === boundary) return showSingleBoundaryHour ? hour12 :  isInBottomQuadrants ? `${hour12} | ${hour24}`: `${hour24} | ${hour12}`;
      return index < boundary ? hour24 : hour12;
    }
  }

  /* combine the neighbour short time spans in one union (e.g. '5:20-5:30' and '5:30-5:40' will be combined in a '5:20-5:40') */
  getReducedArray(state) {
    const keysArr = Object.keys(state).filter(key => key !== 'initialObject' && state[key]);

    if (keysArr.length) {
      if(keysArr.length === 1)  {
        /* if is single, returns it - no needs to combine */
        return [state[keysArr[0]]];
      } else {
        /* combine time spans */
        return keysArr.reduce((prev, currentKey) => {
          let tempArr = Array.isArray(prev) ? prev : [state[prev]],
            lastElement = tempArr[tempArr.length - 1],
            currentElement = state[currentKey];

          if (!currentElement[0].diff(lastElement[1], 'minutes')) {
            /*if last element finished in the same time current started, combine them as ['start of the last', 'end of the current]*/
            tempArr[tempArr.length - 1] = [lastElement[0], currentElement[1]]
          } else {
            tempArr.push(currentElement);
          }
          return tempArr
        });
      }
    }
    /* if there is no chosen spans in the state, returns empty array */
    return []
  }

  getBoundaryLinesRotationDegree() {
    let { boundaryHour, boundaryIsPostMeridiem } = this.state.initialObject;
    return 30 * (boundaryIsPostMeridiem ? boundaryHour - 12 : boundaryHour);
    /* 1 hour = 360 / 12 = 30 degrees */
  }

  setSegmentsValue(index) {
    const {interval, boundaryHour, totalNumberOfSegments, segmentsInHour, boundaryIsPostMeridiem } = this.state.initialObject;
    index = boundaryIsPostMeridiem ? index + totalNumberOfSegments : index;
    const boundaryIndex = boundaryHour * segmentsInHour;
    const recalculatedIndex = index - boundaryIndex + (index < boundaryIndex ? totalNumberOfSegments : 0);
    const startMinutes = recalculatedIndex * interval;
    return [startMinutes, startMinutes + interval]
  }

  storeMouseIsClickedDown(mouseIsClickedDown) {
    const { initialObject } = this.state;
    this.setState({initialObject: { ...initialObject, mouseIsClickedDown }})
  }

  render() {
    if (!this.state.initialObject) return null;
    const {
      interval, boundaryHour, width, segmentsInHour,
      segmentsArcFn, minutesArcFn, hoursArcFn, segmentsArray,
      hoursLabelsArray, colorScale, outerRadius, innerRadius, showResults
    } = this.state.initialObject;

    return (
      <div className="timepickerwrapper"
           onMouseDown={()=>{this.storeMouseIsClickedDown(true)}}
           onMouseUp={()=>{this.storeMouseIsClickedDown(false)}}
           onMouseLeave={()=>{this.storeMouseIsClickedDown(false)}}
      >
        <svg width={width} height={width}>
          <g transform={`translate(${width/2},${width/2})`}>
            {segmentsArray.map((item, index) =>(
              <Segment
                key={index}
                index={index}
                item={item}
                segmentArcFn={segmentsArcFn}
                minutesArcFn={minutesArcFn}
                label={((index % segmentsInHour) + 1) * interval}
                fill={colorScale((Math.floor(index/segmentsInHour)) % 2)}
                value={this.setSegmentsValue(index)}
                handleClick={this.handleClick.bind(this)}
                isActive={this.state[this.setSegmentsValue(index)[1]]}
              />
            ))}
            <g className="hoursLabelsGroup">
              {hoursLabelsArray.map((item, index) => (
                <text
                  key={index}
                  className={`hourLabel${index === boundaryHour ? " boundary": ""}`}
                  transform={`translate(${hoursArcFn.centroid(item)})`}
                  dy=".35em"
                  style={{'textAnchor':'middle'}}
                >
                  {this.getHoursLabels(boundaryHour, index, true)}
                </text>
              ))}
            </g>
            <g className="boundaryGroup">
              <path
                className="boundaryLine"
                d={`M 0 -${innerRadius-20} V -${outerRadius+4}`}
                transform={`rotate(${this.getBoundaryLinesRotationDegree()})`}
              />
            </g>
          </g>
        </svg>
        {showResults ? <TimeResults results={this.getReducedArray(this.state)} /> : null}
      </div>
    );
  }
}
export default CircularTimespanpicker;


/* Stateless Components */
function TimeResults(props) {
  const { results } = props;
  return results.length ?
    (<div className="results">
      <h6>Selected Time</h6>
      {results.map((segment, n)=>(
          segment.length ? <p key={n}>{segment[0].format('H:mm')} - {segment[1].format('H:mm')}</p> : null
        )
      )}
    </div>)
    : null
}

function Segment(props) {
  const {item, segmentArcFn, minutesArcFn, label, fill, value, handleClick, isActive } = props;

  return (
    <g className={`segment${isActive ? " active":""}`}
       onClick={()=>{handleClick(value)}}
       onMouseDown={()=>{handleClick(value, true)}}
    >
      <path
        d={segmentArcFn(item)}
        fill={fill}
        onMouseLeave={()=>{handleClick(value, true)}}
        onDragLeave={()=>{handleClick(value, true)}}
        onMouseDown={()=>{handleClick(value, true)}}
      />
      {
        label === 60 ? null :
          <text
            className="minuteLabel"
            transform={`translate(${minutesArcFn.centroid(item)})`}
            dy=".35em"
          >
            {label}
          </text>
      }
    </g>
  )
}