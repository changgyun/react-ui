import React from 'react';


const Loading = React.createClass({
    render() {
        return (
            <div className="loading">
                <div className="loginBoix">
                    <div className="thecube">
                        <div className="cube c1"></div>
                        <div className="cube c2"></div>
                        <div className="cube c4"></div>
                        <div className="cube c3"></div>
                    </div>
                    <div className="cubetext">Loading..</div>
                </div>
            </div>
        );
    }
});

export default Loading;