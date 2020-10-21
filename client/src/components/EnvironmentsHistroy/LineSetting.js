import React from 'react';
import {checkEmpty} from "../utils/CheckEmpty";
import 'chartjs-plugin-annotation';

let getOptions = {
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
}

export default function LineSetting (history, environment) {
	const [options, setOptions] = React.useState(getOptions);
	const {WordsTable} = require('root/values/strings');
	const {plants} = require('root/values/preferences');
	const {colors} = require('root/values/colors');
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
				label: WordsTable[`plant${num}`],
				fill: false,
				lineTension: 0.5,
				backgroundColor: '#efcf76',
				borderColor: `${colors[num]}`,
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

	Object.keys(history).forEach((h, i) => {
		state.datasets[i].data = Object.values(history[h])
	})

	const firstKey = Object.keys(history)[0]
	state.labels = Object.keys(history[firstKey])

	return { state, options };
}