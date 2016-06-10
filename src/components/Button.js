import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};

const MyAwesomeReactComponent = () => (
    <div>
        <h2>Button</h2>
        <RaisedButton label="Default" style={style} className="muidocs-checkbox-example" />
        <RaisedButton label="Primary" primary={true} style={style} />
        <RaisedButton label="Secondary" secondary={true} style={style} />
        <RaisedButton label="Disabled" disabled={true} style={style} />
    </div>
);

export default MyAwesomeReactComponent;