import React, { Component } from 'react';
//import { Chart } from 'primereact/components/chart/Chart';
import { Chart } from "react-google-charts";

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
                  //  const token =  this.props.token;
              }

              refresh=(token) =>{

                fetch(this.props.URL_SERV+token,{
                    method: 'get',
                    headers: {'content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
            })
                .then(response => response.json())
                .then(data =>{
                    const tempdata=[];
            //const actualdata=this.state.data;
           // console.log(tempdata)
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
                let rows= new Array(data.length);
                data.forEach( (dato,index)=>{
                    let temp=new Date(dato.ts)
                   // console.log(temp)
                    rows[index]=[temp,+dato.data,+dato.data+5,60-dato.data];
                });
               // console.log(rows)

                return (
                    <div className="w-100 h-100">
                    <Chart
                    chartType="LineChart"
                    rows={rows}
                    columns={[
                        {
                          type: "date",
                          label: "Age"
                      },
                      {
                          type: "number",
                          label: "Weight"
                      },
                                            {
                          type: "number",
                          label: "Weight"
                      },
                                            {
                          type: "number",
                          label: "Happiness"
                      }
                      ]}
                      options={{
        // Chart options
        curveType: "function",
        
        'backgroundColor': {
            'fill': 'none',
            'opacity': 100
        },
        pointSize:5,
        legend:{
          title: units+" timeline",
          hAxis: {title: "Date"},
        vAxis: { title: units },
    }}
}
is3D ={'true'}
width={"100%"}
height={"100%"}
legendToggle={true}
/>
</div>

)
            }
        }
