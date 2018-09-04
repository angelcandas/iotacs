import React,{Component} from 'react';
import {Line} from 'react-chartjs-2';

export default class GoogleGauge extends Component {
	constructor(){
		super();

	}
	componentDidMount(){

	}

	render(){
		const data={

			title: "Test Graph",
			xAxisID: "rojo",
			yAxisID: "azul",
			datasets:[{
			data:[0,1,2,3,4,5,6,7,8,9,10,11,10,9,8,7,6,5,4,3,2,1],
			labels:["data"],	
			borderWidth: 1,
			}]
		}

		
		return(
			<Line

				data={data}
				width={400}
				height={200}
				options={{
					fill:false,
					responsive: true,
					maintainAspectRatio: true
				}}
			/>
		)
	}
}