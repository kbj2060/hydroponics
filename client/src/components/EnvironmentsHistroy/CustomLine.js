import {Line} from 'react-chartjs-2';
import React from "react";
import {checkEmpty} from "../utils/CheckEmpty";
import 'chartjs-plugin-annotation';

const {colors} = require('root/values/colors.json');
let getOptions = {
  legend: {
    display: true
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: colors.graphGridColor
      },
      ticks: {
        fontColor: colors.fontColor
      },
      type: 'time',
      time: {
        unit: "hour",
        displayFormats: {
          minute: 'hA'
        },
        parser: "YYYY/MM/DD HH:mm:ss",
      }
    }],
    yAxes: [{
      gridLines: {
        color: colors.graphGridColor
      },
      ticks: {
        fontColor: colors.graphGridColor
      },
    }]
  },
  /*annotation: {
    annotations: [
      {
        type: "line",
        mode: "horizontal",
        scaleID: "y-axis-0",
        value: max,
        borderColor: "#FF4F61",
        borderWidth: '0.5',
        label: {
          backgroundColor: "#FF4F61",
          content: "MAX",
          enabled: false
        }
      },
      {
        type: "line",
        mode: "horizontal",
        scaleID: "y-axis-0",
        value: min,
        borderColor: "#FF4F61",
        borderWidth: '0.5',
        label: {
          backgroundColor: "#FF4F61",
          content: "MIN",
          enabled: false
        }
      }
    ]
  }*/
}

export default function CustomLine(props) {
    const { history, width, height, primary_key } = props;
    const options = getOptions;
    const {WordsTable} = require('root/values/strings.json');
    const {sections} = require('root/values/preferences.json');
    const {colors} = require('root/values/colors.json');
    const n_sections = sections.length;
    let state = {
        labels: '',
        datasets: []
    }
    if (checkEmpty(history)){ return <Line options={options} data={state} width={width} height={height}/> }

    const makeDataset = (n_plant) => {
      let n;
      let datasets = []
      for(n = 0; n < n_plant; n++){
        const section = sections[n];
        const data = Object.values(history[section])
        datasets.push({
          label: WordsTable[`plant-${section}`],
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#efcf76',
          borderColor: `${colors[section]}`,
          borderWidth: 2,
          pointRadius: 0,
          data: data
        },)
      }
      return datasets
    }

    state.datasets = makeDataset(n_sections);
    state.labels = Object.keys(history[primary_key]);

    return <Line options={options} data={state} width={width} height={height}/>
}

