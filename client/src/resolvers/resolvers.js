import gql from 'graphql-tag';

const SWITCH_CONTROL = gql`
    mutation switchControlMutation( $machine: SwitchFormat!, $status:Boolean! ){
      switchControl(machine: $machine, status: $status){
        updatedAt
        controledBy {
          name
        }
     }
}`;

const NEW_SWITCH = gql`
    subscription newSwitchSubscription ($machine: SwitchFormat!) {
        newSwitch(machine: $machine){
          machine
          status
          updatedAt
          controledBy{
            name
          }
        }
    }
`;

const NEW_FIGURE = gql`
    subscription newFigureSubscription ($measurement: MeasurementFormat) {
        newFigure(measurement: $measurement){
            value
            measurement
            updatedAt
        }
    }
`;

export{
    NEW_FIGURE,
    NEW_SWITCH,
    SWITCH_CONTROL
}
