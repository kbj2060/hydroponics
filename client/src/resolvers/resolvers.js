import gql from 'graphql-tag';

const SWITCH_FEED = gql`
    query switchFeedQuery($filter: String, $skip:Int, $first:Int, $orderBy: SwitchOrderByInput, $last: Int){
      switchFeed(filter: $filter, skip: $skip, first: $first, orderBy : $orderBy, last: $last){
          switches{
            machine
            status
            updatedAt
          }
          count
      }
}`;

const FIGURE_FEED = gql`
    query figureFeedQuery($filter: String, $skip:Int, $first:Int, $orderBy: SwitchOrderByInput, $last: Int){
      figureFeed(filter: $filter, skip: $skip, first: $first, orderBy : $orderBy, last: $last){
          figures{
            measurement
            value
            updatedAt
          }
          count
      }
}`;

const SWITCH_CONTROL = gql`
    mutation switchControlMutation( $machine: SwitchFormat!, $status:Boolean! ){
      switchControl(machine: $machine, status: $status){
        updatedAt
        machine
        status
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
    SWITCH_CONTROL,
    SWITCH_FEED,
    FIGURE_FEED
}
