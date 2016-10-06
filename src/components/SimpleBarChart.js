import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const SimpleBarChart = React.createClass({
    render () {
        return (
            <BarChart width={300} height={300} data={this.props.weekDate}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="weeklist" fill="#82ca9d" />
            </BarChart>
        );
    }
})

export default SimpleBarChart;