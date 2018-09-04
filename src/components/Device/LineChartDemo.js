import React, { Component } from 'react';
import { Chart } from 'primereact/components/chart/Chart';

export default class LineChartDemo extends Component {
        constructor(props){
            super(props);
            this.state={
                data:{
                    data:0,
                    ts: '',
                },
            }
            this.datos=[];
            //this.color=this.getRandomColor();
            this.color='#577399';
            for (var i = 6; i >= 0; i--) {
                this.datos[i]=Math.random()*66;
            }


            
        }

        getRandomColor() {
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }
        componentDidMount(){
                    const token =  this.props.token;
        }

        refresh=(token) =>{

        fetch(this.props.URL_SERV+token,{
            method: 'get',
            headers: {'content-type': 'application/json'}
        })
        .then(response => response.json())
        .then(data =>{
            const tempdata=[];
            const actualdata=this.state.data;
            data.forEach((dato,index)=>{
                tempdata[index]=dato.data;
            })
            this.setState({data:tempdata})
            this.props.onDataChange(tempdata[tempdata.length-1])
            return(tempdata)
        })
        .catch(err=>{
            console.log(err)
        })
    }


    render() {
        const {data,units}=this.props;
        let x= new Array(data.length);
        let datin= new Array(data.length);
        data.forEach( (dato,index)=>{
            datin[index]=dato.data;
            x[index]=' ';
        });
        var graphic = {

            labels: x,
            datasets: [
                {   label: units,
                    data: datin,
                    fill: false,
                    borderColor: this.color,
            }]   
        };

        return (
                <div className=''>
                    <div>
                        <Chart type="line" height="50" data={graphic} />
                    </div>
                </div>
        )
    }
}
