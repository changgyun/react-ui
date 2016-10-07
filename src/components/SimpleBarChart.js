import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const SimpleBarChart = React.createClass({
    render () {
        return (
            <ResponsiveContainer>
                <BarChart data={this.props.weekDate}
                    margin={{top: 10, right: 30, left: 0, bottom: 20}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="weeklist" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
})

export default SimpleBarChart;