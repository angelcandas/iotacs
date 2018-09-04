
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import './RadarChartDemo.css';



export default class RadarChartDemo extends Component {
    constructor(props){
        super(props);
        this.state={
            value:50,
            units: 'ºC'
        }
        //this.update();
    }
    componentDidMount(){
        //this.setState({value: (Math.random() * 100).toFixed(2) - 0});
        this.setState({value:this.props.data,units: this.props.units})
    }
    /*update = () =>{       
        setInterval(()=> {
            this.setState({value: (Math.random() * 100).toFixed(2) - 0});
        },2000);
    }*/
    render() {
      const {units,data,datamin,datamax} = this.props;
      let option = {
            container:{
                height: '200',
            },
            series: {  
                        detail:{
                            fontSize:15,
                            fontWeight: 'bold',
                        },
                        
                        padding:0,
                        margin:0,
                        center: ['50%', '50%'],
                        type: 'gauge',
                        min: datamin,
                        max: datamax,
                        splitNumber: 5,
                        radius: '100%',
                        axisLine: {     
                        lineStyle: {      
                            width: 10
                            },
                        },            
                        splitLine: {
                            length: 10,       
                            lineStyle: {       
                                color: 'auto'
                            }
                        },
                        data:[{value: data,name: units}] ,
                },

            }
        
           
        return (
                <div className='flex-column justify-center tc'>
                    <div style={{width: 'auto', height: '120px'}}>
                        <ReactEcharts option={option} style={{width: 'auto', height: '150px'}} />
                    </div>
                </div>
            )
    }
}