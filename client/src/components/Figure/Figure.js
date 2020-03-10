import React from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import Circle from 'react-circle';
import Typography from '@material-ui/core/Typography';
import { NEW_FIGURE } from 'resolvers/resolvers';

// const NEW_FIGURE = gql`
//     subscription newFigureSubscription ($measurement: MeasurementFormat) {
//         newFigure(measurement: $measurement){
//             value
//             measurement
//             updatedAt
//         }
//     }
// `;

export default function Figure(props) {
    const { measurement } = props;
    let { loading, error, data } = useSubscription(NEW_FIGURE, { variables:  { measurement }  });
    if (error) { console.log(error); }
    let value = 0;

    data === undefined || loading ?
        (console.log('No subscripted data!')):
        (value = data.newFigure.value)

    return (
        <div>
            { console.log(data) }
            <Typography style={{padding : '5px 0 5px 0',
                                color : '#405C5A',
                                fontWeight : 'bold',}}>{measurement}</Typography>
            <Circle progress={value} size={100} textColor="#405C5A" progressColor="#405C5A" bgColor="#ABBFBE" roundedStroke={true} lineWidth={24}/>
        </div>
    );
}
    // const subscriptFigure = (measuerment) => {
        
    //     if (loading) { return <span>Loading...</span>; }
    //       if (error) { return <span>Error</span>; }
    //       return (
    //       <div>
    //           <Typography style={{padding : '5px 0 5px 0',
    //                               color : '#405C5A',
    //                               fontWeight : 'bold',}}>{subject}</Typography>
    //           <Circle progress={data} size={100} textColor="#405C5A" progressColor="#405C5A" bgColor="#ABBFBE" roundedStroke={true} lineWidth={24}/>
    //       </div>);
    // }


    // subscriptFigure(subject)

