import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from 'react-image-timeline';
import TimeLineCom from '../components/TimeLineCom';

class history extends React.Component {
    render(){
        return (
            <div className="container">
                <div className="contents">
                    <h2>Conrad</h2>
                    <div className="view">
                        <div className="content_tem">
                            <h3>history</h3>
                            <TimeLineCom  />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default history;
