import React from 'react';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip} from 'recharts';

const TwoLevelPieChart = React.createClass({
    render () {
        return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={300} height={300} data={this.props.typedata}>
                <Radar name="cnt" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                <PolarGrid />
                <Legend />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis fillOpacity={0}/>
                <Tooltip/>
            </RadarChart>
        );
    }
})

export default TwoLevelPieChart;