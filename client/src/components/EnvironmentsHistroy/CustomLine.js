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
    const { history, width, height } = props;
    const options = getOptions;
    const {WordsTable} = require('root/values/strings.json');
    const {sections} = require('root/values/preferences.json');
    const {colors} = require('root/values/colors.json');
    const n_sections = sections.length;
    let primary_key = ""
    let data_len = {};
    let state = {
        labels: '',
        datasets: []
    }
    if (checkEmpty(history)){ return <Line options={options} data={state} width={width} height={height}/> }

    function makeBasicDataset(n_plant){
      let n;
      let datasets = []
      for(n = 0; n < n_plant; n++){
        let section = sections[n];
        datasets.push({
          label: WordsTable[`plant-${section}`],
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#efcf76',
          borderColor: `${colors[section]}`,
          borderWidth: 2,
          pointRadius: 0,
          data: []
        },)
      }
      return datasets
    }

    state.datasets = makeBasicDataset(n_sections);
    Object.keys(history).forEach((h, i) => {
      state.datasets[i].data = Object.values(history[h])
      data_len[h] = Object.values(history[h]).length
    })

    primary_key = Object.keys(data_len).reduce((a, b) => data_len[a] > data_len[b] ? a : b);
    state.labels = Object.keys(history[primary_key])
    return(<Line options={options} data={state} width={width} height={height}/>)
}

