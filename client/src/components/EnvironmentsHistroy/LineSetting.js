import React, {useEffect, useCallback} from 'react';
import {checkEmpty} from "../utils/CheckEmpty";
import axios from "axios";
import 'chartjs-plugin-annotation';

let getOptions = (data) => {
	const min = data['min'];
	const max = data['max'];

	return ({
		legend: {
			display: true
		},
		scales: {
			xAxes: [{
				display: true,
				type: 'time',
				time: {
					unit: "hour",
					displayFormats: {
						minute: 'hA'
					},
					parser: "YYYY/MM/DD HH:mm:ss",
				}
			}],
		},
		/*annotation: {
			annotations: [
				{
					type: "line",
					mode: "horizontal",
					scaleID: "y-axis-0",
					value: max,
					borderColor: "#FF4F61",
					borderWidth: '0.5',
					label: {
						backgroundColor: "#FF4F61",
						content: "MAX",
						enabled: false
					}
				},
				{
					type: "line",
					mode: "horizontal",
					scaleID: "y-axis-0",
					value: min,
					borderColor: "#FF4F61",
					borderWidth: '0.5',
					label: {
						backgroundColor: "#FF4F61",
						content: "MIN",
						enabled: false
					}
				}
			]
		}*/
})}

export default function LineSetting (history, environment) {
	const [options, setOptions] = React.useState({});
	const {plants, circleColorTable} = require('root/init_setting');
	const n_plants = plants.length;

	let state = {
		labels: '',
		datasets: []
	}

	function makeBasicDataset(n_plant){
		let n;
		let datasets = []
		for(n = 0; n < n_plant; n++){
			let num = plants[n];
			datasets.push({
				label: `${num}지점 `,
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#efcf76',
				borderColor: `${circleColorTable[num]}`,
				borderWidth: 2,
				pointRadius: 0,
				data: []
			},)
		}
		return datasets
	}

/*	const fetchLineSetting = useCallback(async () => {
		try {
			await axios.get('/api/get/lineLimit', {
				params: { environment: environment, }
			}).then(({data}) => {
				setOptions(getOptions(data[0]));
			})} catch (e) {
			console.log('FETCH SETTING ERROR.');
		}
	}, [environment])*/

/*	useEffect(() => {
		fetchLineSetting();
	}, [fetchLineSetting])*/

	state.datasets = makeBasicDataset(n_plants);
	if(checkEmpty(history)){ return {state, options} }

	Object.keys(history).map((h, i) => {
		state.datasets[i].data = Object.values(history[h])
	})

	const firstKey = Object.keys(history)[0]
	state.labels = Object.keys(history[firstKey])
	console.log(state)
	return { state, options };
}