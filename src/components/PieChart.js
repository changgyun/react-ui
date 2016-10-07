import React from 'react';
import {PieChart, Pie, Sector, Cell, Legend, Tooltip, ResponsiveContainer} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const RADIAN = Math.PI / 180;

const SimplePieChart = React.createClass({
    render () {
        return (
            <ResponsiveContainer>
                <PieChart onMouseEnter={this.onPieEnter} margin={{top: 0, right: 0, left: 0, bottom: 20}}>
                    <Pie
                        data={this.props.PieTagdata}
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
            </ResponsiveContainer>
        );
    }
})

export default SimplePieChart;