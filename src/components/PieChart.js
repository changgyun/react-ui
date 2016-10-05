import React from 'react';
import {PieChart, Pie, Sector, Cell, Legend, Tooltip} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const RADIAN = Math.PI / 180;

const SimplePieChart = React.createClass({
    render () {
        return (
            <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={this.props.PieTagdata}
                    cx={220}
                    cy={200}
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    label
                >
                {
                    this.props.PieTagdata.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                }
                </Pie>
                <Legend />
                <Tooltip/>
            </PieChart>
        );
    }
})

export default SimplePieChart;