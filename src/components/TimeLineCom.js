import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from 'react-image-timeline';
import {getSampleData} from './TimeLineData';

class TimeLineCom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: getSampleData(false),
        };
    }

    render() {
        const {events} = this.state;
        const timeline = <Timeline events={events}/>;
        return <div>
            {timeline}
        </div>;
    }
}

TimeLineCom.propTypes = {};
TimeLineCom.displayName = 'TimelineExample';

export default TimeLineCom;
