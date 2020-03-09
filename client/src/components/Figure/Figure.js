import React, {useEffect} from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import Circle from 'react-circle';
import Typography from '@material-ui/core/Typography';

const NEW_FIGURE = gql`
    subscription newFigureSubscription ($measurement: measurementFormat) {
        newFigure{
            value
            measurement
            updatedAt
        }
    }
`;
function subscriptFigure( measurement) {
    const {
      data: { newFigure },
      loading,
    } = useSubscription(NEW_FIGURE, { variables: { measurement } });
    return (
    <div>
        <Typography style={{padding : '5px 0 5px 0',
                            color : '#405C5A',
                            fontWeight : 'bold',}}>{subject}</Typography>
        <Circle progress={value} size={100} textColor="#405C5A" progressColor="#405C5A" bgColor="#ABBFBE" roundedStroke={true} lineWidth={24}/>
    </div>);
}

export default function Figure(props) {
    const { subject } = props;
    subscriptFigure(subject)
}

