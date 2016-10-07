import React from 'react';
import ReactDOM from 'react-dom';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const SimpleLineChart = React.createClass({
    render () {
        return (
            <ResponsiveContainer>
                <AreaChart data={this.props.datedata} margin={{top: 10, right: 30, left: 0, bottom: 20}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Area type='monotone' dataKey='cnt' stroke='#8dd1e1' fill='#8dd1e1' />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
})

export default SimpleLineChart;