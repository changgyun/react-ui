import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 10,
};

const RaButton = () => (
    <div className="container">
        <div className="contents">
            <h2>Conrad</h2>
            <div className="view">
                <div className="content_tem">
                    <h3>Button</h3>
                    <RaisedButton label="Default" style={style} />
                    <RaisedButton label="Primary" primary={true} style={style} />
                    <RaisedButton label="Secondary" secondary={true} style={style} />
                    <RaisedButton label="Disabled" disabled={true} style={style} />
                </div>
            </div>
        </div>
    </div>
);

export default RaButton;