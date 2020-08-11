let options =  {
	responsive: true,
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
		}]
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
		}
	]
}

export const LineSetting = (history) => {
	state.datasets.forEach((dataset, index) => {
		try{
			state.datasets[index].data = Object.values(history[index]);
		} catch (error){
			state.datasets[index].data = [];
		}
	});
	try{
		state.labels = Object.keys(history[0])
	} catch (error) {
		state.labels = '';
	}
	return {state, options};
}