import {Line} from 'react-chartjs-2';
import React, {useEffect} from "react";

const check_empty = (value) => {
    if (value == "" || value == null || (typeof value == "object" && !Object.keys(value).length)){
        return true;
    }
}

export default function CustomLine(props) {
    const { values, width, height, date } = props;
    if (check_empty(values) || check_empty(date)){
        return <Line width={width} height={height}/>;
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
        state.datasets[index].data = values[index];
    });
    console.log(state)
    return(
        <Line data={state} width={width} height={height}/>
    )
}

