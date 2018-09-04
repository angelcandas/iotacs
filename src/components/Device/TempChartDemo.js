
import React, { Component } from 'react';

export default class TempChartDemo extends Component {
    constructor(props){
        super(props);
        this.state={
            token: '',
            temperatura: 0,
        }
    }
    componentDidMount(){
        this.setState({token: this.props.token})

    }






    render() {
        const {data,units} = this.props;

        let termometro
        
        if(data>=0){
            termometro=<h3 className="ba spartan ma0" >{data+' '+units}</h3>
        }
        else{
            termometro=<h3 className="ba sky ma0">{data+' '+units}</h3>
        }
        return(
            <div className='flex-column align-center'>
            <p className='ma0 pa0'>Last measure</p>
                <div className=" content-section implementation ma0 pa0">
                    {termometro}
                </div>
            </div>
            );
    }
}