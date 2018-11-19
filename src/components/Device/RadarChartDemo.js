
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Chart } from "react-google-charts";
import './RadarChartDemo.css';



export default class RadarChartDemo extends Component {
    constructor(props){
        super(props);
        this.state={
            value: "35",
            units: 'ºC',
            data: "5",
        }
        
        //this.update();
    }
    componentDidMount(){
        //this.setState({value: (Math.random() * 100).toFixed(2) - 0});
        this.setState({value:this.props.data,units: this.props.units})
        let data=parseFloat(this.props.data)
        console.log("Data heredado"+this.props.data)
        if(!isNaN(data)){
            this.setState({data: data})
        }
    }
    /*update = () =>{       
        setInterval(()=> {
            this.setState({value: (Math.random() * 100).toFixed(2) - 0});
        },2000);
    }*/
    render() {
      const {units,data,datamin,datamax} = this.props;
      console.log(this.state)
      console.log(this.props)



      return (

         <Chart
         width={150}
         height={150}
         chartType="Gauge"
         loader={<div>Loading Chart</div>}
         data={[
          ['Label', 'Value'],
          [units, this.state.data],
          ]}
          options={{
              redFrom: 0.9*datamax,
              redTo: 1*datamax,
              yellowFrom: datamax*0.75,
              yellowTo: datamax*0.90,
              minorTicks: datamin,
              majorTicks: datamax,
          }}
          />
          )
  }
}