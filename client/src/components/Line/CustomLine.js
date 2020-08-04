import {Line} from 'react-chartjs-2';
import React, {useEffect} from "react";

const check_empty = (value) => {
    if (value == "" || value == null || (typeof value == "object" && !Object.keys(value).length)){
        return true;
    }
}

export default function CustomLine(props) {
    const { history, width, height, date } = props;
    if (check_empty(history) || check_empty(date)){
        return <Line width={width} height={height}/>;
    }
    let options =  {
        responsive: true,
          legend: {
            display: false
        },
        scales: {
              xAxes: [{
                  type: 'time',
                  time: {
                      displayFormats: {
                          minute: 'h:mm a'
                      },
                      parser: 'YYYY/MM/DD HH:mm:ss',
                  }
            }]
        }
    }
    let state = {
        labels: date,
        datasets: [
            {
                label: 'PLANT1',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#efcf76',
                borderColor: '#FF925D',
                borderWidth: 2,
                data: []
            },
            {
                label: 'PLANT2',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#efcf76',
                borderColor: '#FFCB3A',
                borderWidth: 2,
                data: []
            },
            {
                label: 'PLANT3',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#efcf76',
                borderColor: '#FF4F61',
                borderWidth: 2,
                data: []
            }
        ]
    }

    state.datasets.forEach((dataset, index, arr) => {
        state.datasets[index].data = history[index];
    });

    return(
        <Line options={options} data={state} width={width} height={height}/>
    )
}

