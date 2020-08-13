import {Line} from 'react-chartjs-2';
import React from "react";
import LineSetting from "./LineSetting";


const checkEmpty = (value) => {
    if (value == "" || value == null || (typeof value == "object" && !Object.keys(value).length)){
        return true;
    }
}

// TODO : 2번 render 되는 이유 알아서 수정
export default function CustomLine(props) {
    const { history, width, height, environment } = props;
    const { state, options } = LineSetting(history, environment);

    if (checkEmpty(history)){ return <Line options={options} data={state} width={width} height={height}/> }

    return( <Line  options={options} data={state} width={width} height={height}/> )
}

