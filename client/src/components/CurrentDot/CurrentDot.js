import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import useStyles from 'assets/jss/DashboardStyle';
import Paper from "@material-ui/core/Paper";
import axios from "axios";

export default function CurrentDot({machine}) {
	const {currentUpdateTime, n_machines } = require('../../properties');
	const [currents, setCurrents] = React.useState({});
	const [checklist, setChecklist] = React.useState([]);
	const classes = useStyles();
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
			}
		}).then(( {data:queriedCurrent}) => {
			const recentIndex = 0;
			setCurrents(queriedCurrent[recentIndex]);
		})
	}

	const checkCurrentRange = (current, min, max) => {
		console.log(current)
		if (current < min || current > max) { return false; }
		else { return true; }
	}

	const handleChecklist = () => {
		console.log(currents)
		Object.values(currents).forEach((value) => {
			let checkCurrent = checkCurrentRange(value, min, max)
			console.log(checklist,checkCurrent)

			setChecklist(
				[...checklist, checkCurrent]
			);
		})
	}

	const checkNotOkay = (checks) => {
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


	return (
		<Box className={classes.alignNameBox}  p={1} flexGrow={1} >
			{
				checkNotOkay(checklist) === true ? <Paper className={
					classes.brightRedDot} /> : <Paper className={
					classes.brightGreenDot} />
			}
		</Box>
	);
}
