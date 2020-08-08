import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import useStyles from 'assets/jss/DashboardStyle';
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";

const CurrentFlowing = withStyles((theme) => ({
	icon:{
		height : '1.1em',
		width : '1.1em',
		margin : 'auto',
		verticalAlign: 'middle',
		textAlign:'center',
	}
}))(({classes, ...props}) => {
	return (
		<svg className={classes.icon} fill={props.fillColor}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path d="M400.4 175.8c-1.7-3.4-4.3-5.1-7.7-5.1H292L391.9 12.8c1.7-2.6 1.7-6 0-8.5S387.6 0 384.2 0H247.6c-3.4 0-6 1.7-7.7 4.3l-128 256c-1.7 2.6-1.7 6 0 8.5 1.7 2.6 5.1 4.3 7.7 4.3h87.9l-95.6 227.8c-1.7 3.4 0 7.7 3.4 10.2 0.9 0.9 2.6 0.9 4.3 0.9 2.6 0 5.1-0.9 6.8-2.6l273.1-324.3C401.2 182.6 402.1 179.2 400.4 175.8zM149.5 454.8l78.5-187.7c0.9-2.6 0.9-5.1-0.9-7.7 -1.7-1.7-4.3-3.4-6.8-3.4h-87L252.8 17.1h116.1L268.1 174.9c-1.7 2.6-1.7 6 0 8.5s4.3 4.3 7.7 4.3h99L149.5 454.8z"/>
		</svg>
	)
})

// TODO: UpdateTime의 2배 시간동안 current와 switch가 안맞을 시 알림!
export default function CurrentDot({machine}) {
	const {currentUpdateTime, n_machines } = require('../../properties');
	const [currents, setCurrents] = React.useState({});
	const [checklist, setChecklist] = React.useState([]);
	const classes = useStyles();
	// TODO: Settings 페이지에서 설정값 불러오기.
	const min = 1.2
	const max = 3

	const fetchCurrent = async () => {
		await axios.get('/api/getStatus', {
			params : {
				selects : [...Array(n_machines[machine]).keys()].map(index => {
					return `${machine}_current_${++index}`
				}),
				table: 'current',
				num : 1
			}}).then(( {data:queriedCurrent} ) => {
			const recentIndex = 0;
			setCurrents(queriedCurrent[recentIndex]);
		})
	}

	const checkCurrentRange = (current, min, max) => {
		if (current < min || current > max) { return false; }
		else { return true; }
	}

	const handleChecklist = () => {
		Object.values(currents).forEach((value) => {
			let checkCurrent = checkCurrentRange(value, min, max)
			setChecklist(
				[ checkCurrent]
			);
		})
	}

	const currentNotFlowing = (checks) => {
		return checks.some((element) => element === false)
	}

	const checkChecklist = () => {
		if ( typeof checklist === 'undefined'){
			setIsLoading(true);
		} else { return setIsLoading(false); }
	}

	useEffect(() => {
		const interval = setInterval(() => {
			fetchCurrent();
		}, currentUpdateTime);
		return () => {
			clearInterval(interval);
		}
	}, []);

	useEffect(() => {
		handleChecklist();
		return () => {
			setChecklist([]);
		}
	}, [currents])

	return (
		<Box className={classes.alignNameBox}  p={1} flexGrow={1} >
			{
				currentNotFlowing(checklist) ?
				<CurrentFlowing fillColor={'black'}/> : <CurrentFlowing fillColor={'#FFCB3A'}/>}
		</Box>
	);
}
