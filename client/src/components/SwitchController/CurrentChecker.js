import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import useStyles from '../../assets/jss/DashboardStyle';
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";
import {ColorCircularProgress} from "../utils/ColorCircularProgress";
import {checkEmpty} from "../utils/CheckEmpty";

const CurrentFlowing = withStyles((theme) => ({
	icon:{
		height : '1.3em',
		width : '1.3em',
		margin : 'auto',
		verticalAlign: 'middle',
		textAlign:'center',
	}
}))(({classes, ...props}) => {
	const {fillColor} = props;
	return (
		<svg className={classes.icon} fill={fillColor} x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
			<g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
				<path d="M4019.2,2676.1L2377.6,340l1119.5-10.8l1119.5-10.8L3063.6-2205.4c-854.2-1387-1563.9-2543.2-1576.8-2566.9c-15.1-30.2,0-21.6,49.6,23.7c41,36.7,1300.7,1197.2,2802,2577.7C5839.7-790.3,7392.8,637.6,7789.7,1004.3c396.9,364.6,724.8,673,729.1,686c4.3,10.8-498.3,21.6-1287.8,23.7l-1296.4,6.5l1121.7,1632.9c616.9,897.3,1121.7,1637.2,1121.7,1643.7c0,6.5-565.1,12.9-1257.5,12.9H5662.8L4019.2,2676.1z"/></g></g>
		</svg>
	)
})

export default function CurrentChecker({machine}) {
	const {currentUpdateTime, n_machines } = require('root/init_setting');
	const sections = Array.from(Array(n_machines[machine]), (_, i) => i + 1)
	const [current, setCurrent] = React.useState({});
	const [disable, setDisable] = React.useState(false);
	const [flowing, setFlowing] = React.useState(false);
	const classes = useStyles();
	const [isLoading, setIsLoading] = React.useState(true);
	const criteria = 1;

	sections.forEach((section, index) => {
		current[`${machine}${section}`] = 0
	})

	const fetchCurrent = async () => {
		await axios.get('/api/get/current', {
			params : {
				selects : ['section', 'current'],
				machine : machine,
			}}).then(( {data} ) => {
				if(checkEmpty(data) || !currentActivationCheck(data)){
					setDisable(true);
					setFlowing(false);
				}
				else {
					setCurrent(data);
					setFlowing(true);
					setDisable(false);
				}
				setIsLoading(false);
		})
	}

	const currentActivationCheck = (currentsDict) => {
		const currentsCheck = (element) => element >= criteria;
		return Object.values(currentsDict).some(currentsCheck);
	}

	useEffect(() => {
		fetchCurrent();
		const interval = setInterval(() => {
			fetchCurrent();
		}, currentUpdateTime);
		return () => {
			clearInterval(interval);
			setDisable(false);
		}
	}, []);

	if(isLoading){
		return <ColorCircularProgress />
	}

	if(disable){
		return <div className={classes.disable} />
	}

	return (
		<Box className={classes.optionBox}  p={1} flexGrow={1} >
			{
				flowing ?
				<CurrentFlowing fillColor={'#FFCB3A'}/> : <CurrentFlowing fillColor={'#1E2425'}/>
			}
		</Box>
	);
}
