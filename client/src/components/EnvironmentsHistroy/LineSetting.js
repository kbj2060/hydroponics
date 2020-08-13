import React, {useEffect} from 'react';
import axios from "axios";
import 'chartjs-plugin-annotation';

let options =  {
	legend: {
		display: false
	},
	scales: {
		xAxes: [{
			type: 'time',
			time: {
				displayFormats: {
					minute: 'h:mm a'
				},
				parser: 'YYYY/MM/DD HH:mm:ss',
			}
		}],
	},
	annotation: {
		annotations: [
			{
				type: "line",
				mode: "horizontal",
				scaleID: "y-axis-0",
				value: 129,
				borderColor: "black",
				borderWidth: 10,
				label: {
					backgroundColor: "red",
					content: "Test Label",
					enabled: true
				}
			},
			{
				type: "line",
				mode: "horizontal",
				scaleID: "y-axis-0",
				value: 30,
				borderColor: "RED",
				borderWidth: 10,
				label: {
					backgroundColor: "red",
					content: "Test Label",
					enabled: true
				}
			}
		]
	}
}

let state = {
	labels: '',
	datasets: [
		{
			label: 'PLANT1',
			fill: false,
			lineTension: 0.5,
			backgroundColor: '#efcf76',
			borderColor: '#FF925D',
			borderWidth: 2,
			data: []
		},
		{
			label: 'PLANT2',
			fill: false,
			lineTension: 0.5,
			backgroundColor: '#efcf76',
			borderColor: '#FFCB3A',
			borderWidth: 2,
			data: []
		},
		{
			label: 'PLANT3',
			fill: false,
			lineTension: 0.5,
			backgroundColor: '#efcf76',
			borderColor: '#FF4F61',
			borderWidth: 2,
			data: []
		},
		{
			label: 'MIN',
			fill: false,
			lineTension: 0.5,
			backgroundColor: '#efcf76',
			borderColor: '#FF4F61',
			borderWidth: 2,
			data: []
		},
		{
			label: 'MAX',
			fill: false,
			lineTension: 0.5,
			backgroundColor: '#efcf76',
			borderColor: '#FF4F61',
			borderWidth: 2,
			data: []
		},
	]
}

const checkEmpty = (value) => {
	if (value == "" || value == null || (typeof value == "object" && !Object.keys(value).length)){
		return true;
	}
}

export default function LineSetting (history, environment) {
	const [range, setRange] = React.useState({});

	const fetchSetting = async () => {
		try {
			await axios.get('/api/getStatus', {
				params: {
					selects: [`${environment}_min`, `${environment}_max`],
					table: ['setting'],
					num: 1
				}
			}).then(({data}) => {

			})
		} catch (e) {
			console.log('FETCH SETTING ERROR.');
		}
	}

	useEffect(() => {
		fetchSetting();
	}, [])

	if(checkEmpty(history)){
		return {state, options}
	}

	history.forEach((dataset, index) => {
			state.datasets[index].data = Object.values(history[index]);
	});

	state.labels = Object.keys(history[0])

	return {state, options};
}