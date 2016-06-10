import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};

const RaButton = () => (
    <div>
        <h2>Button</h2>
        <RaisedButton label="Default" style={style} />
        <RaisedButton label="Primary" primary={true} style={style} />
        <RaisedButton label="Secondary" secondary={true} style={style} />
        <RaisedButton label="Disabled" disabled={true} style={style} />
    </div>
);

export default RaButton;
/*

import React from 'react';
import { AppBar } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
*/
/*
 import getMuiTheme from 'material-ui/styles/getMuiTheme';
 import { CustomTheme } from '../layout/themeCustom';*//*



const style = {
    margin: 12,
};

class Button extends React.Component {
    */
/* getChildContext() {
     return {muiTheme: getMuiTheme(CustomTheme)};
     }*//*


    render () {
        return
        <div>
            <h2>Button</h2>
            <RaisedButton label="Default" style={style} className="muidocs-checkbox-example" />
            <RaisedButton label="Primary" primary={true} style={style} />
            <RaisedButton label="Secondary" secondary={true} style={style} />
            <RaisedButton label="Disabled" disabled={true} style={style} />
        </div>
    }
}

export default Button;*/
