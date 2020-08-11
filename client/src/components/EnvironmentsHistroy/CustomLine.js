import {Line} from 'react-chartjs-2';
import React from "react";
import {LineSetting} from "./LineSetting";

const checkEmpty = (value) => {
    if (value == "" || value == null || (typeof value == "object" && !Object.keys(value).length)){
        return true;
    }
}

export default function CustomLine(props) {
    const { history, width, height } = props;
    const {state, options} = LineSetting(history);

    if (checkEmpty(history)){
        return <Line width={width} height={height}/>
    }

    return(
        <Line options={options} data={state} width={width} height={height}/>
    )
}

