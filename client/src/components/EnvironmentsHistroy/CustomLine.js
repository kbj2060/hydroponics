import {Line} from 'react-chartjs-2';
import React from "react";
import LineSetting from "./LineSetting";
import {checkEmpty} from "../utils";

export default function CustomLine(props) {
    const { history, width, height, environment } = props;
    const { state, options } = LineSetting(history, environment);

    if (checkEmpty(history)){ return <Line options={options} data={state} width={width} height={height}/> }

    return( <Line  options={options} data={state} width={width} height={height}/> )
}

