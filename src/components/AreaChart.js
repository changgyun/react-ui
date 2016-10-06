import React from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const SimpleLineChart = React.createClass({
    render () {
        return (
            <AreaChart width={500} height={400} data={this.props.datedata}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Area type='monotone' dataKey='cnt' stroke='#8dd1e1' fill='#8dd1e1' />
            </AreaChart>
        );
    }
})

export default SimpleLineChart;