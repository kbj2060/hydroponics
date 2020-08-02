import {Line} from 'react-chartjs-2';
import React from "react";

export default function CustomLine(props) {
    const { values, width, height } = props;

    let state = {
        labels: [],
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
        state.datasets[index].data = values[index];
    });
    console.log(state);

    return(
        <Line data={state} width={width} height={height}/>
    )
}

