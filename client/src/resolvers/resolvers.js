import gql from 'graphql-tag';

const SWITCH_FEED = gql`
  query switchFeedQuery($filter: String, $skip:Int, $first:Int, $orderBy: SwitchOrderByInput, $last: Int){
    switchFeed(filter: $filter, skip: $skip, first: $first, orderBy : $orderBy, last: $last){
        switches{
          status
          updatedAt
        }
        count
    }
}`;

const FIGURE_FEED = gql`
  query figureFeedQuery($filter: String, $skip:Int, $first:Int, $orderBy: FigureOrderByInput, $last: Int){
    figureFeed(filter: $filter, skip: $skip, first: $first, orderBy : $orderBy, last: $last){
        figures{
          value
          updatedAt
        }
    }
}`;

const GET_CURRENT_USER = gql`
  query getCurrentUserQuery {
    getCurrentUser{
      name
      type
    }
  }`;

const GET_SETTING = gql`
  query getSettingQuery( $last: Int){
    getSetting(last: $last){
      subjects{
        measurement
        min
        max
      }
      appliedBy{
        name
      }
    }
  }
`;

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


const SETTING = gql`
  mutation settingMutation ($measurement: [MeasurementFormat!]!, $min:[Float!]!, $max:[Float!]!) {
      setting(measurement: $measurement, min: $min, max: $max){
        id
        subjects{
          min
          max
          measurement
        }
        appliedBy{
          name
        }
      }
  }
`;

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
    SETTING,
    SWITCH_FEED,
    FIGURE_FEED,
    GET_CURRENT_USER,
    GET_SETTING
}
