import React from 'react';
import Circle from 'react-circle';
import Typography from '@material-ui/core/Typography';

export default function Figure(props) {
    const { measurement } = props;

    return (
        <div>
            <Typography style={{padding : '5px 0 5px 0',
                                color : 'white',
                                fontWeight : 'bold',}}>{measurement}</Typography>
            <Circle size={90} textColor="white" progressColor="#FFCB3A" bgColor="white" roundedStroke={true} lineWidth={24}/>
        </div>
    );
}
