import React from 'react';
import { useSubscription } from '@apollo/react-hooks';
import Circle from 'react-circle';
import Typography from '@material-ui/core/Typography';
import { NEW_FIGURE } from 'resolvers/resolvers';

export default function Figure(props) {
    const { measurement } = props;
    let { loading, error, data } = useSubscription(NEW_FIGURE, { variables:  { measurement }  });
    
    if (error) { console.log(error); }
    let value = null;

    data === undefined || loading ?
                    (value = 0):
                    (value = data.newFigure.value)

    return (
        <div>
            <Typography style={{padding : '5px 0 5px 0',
                                color : 'white',
                                fontWeight : 'bold',}}>{measurement}</Typography>
            <Circle progress={value} size={90} textColor="white" progressColor="#ffcd12" bgColor="white" roundedStroke={true} lineWidth={24}/>
        </div>
    );
}
