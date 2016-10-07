import React from 'react';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip, ResponsiveContainer} from 'recharts';

const TwoLevelPieChart = React.createClass({
    render () {
        return (
            <ResponsiveContainer>
                <RadarChart outerRadius={150} data={this.props.typedata} margin={{top: 10, right: 0, left: 0, bottom: 20}}>
                    <Radar name="cnt" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    <PolarGrid />
                    <Legend />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis fillOpacity={0}/>
                    <Tooltip/>
                </RadarChart>
            </ResponsiveContainer>
        );
    }
})

export default TwoLevelPieChart;