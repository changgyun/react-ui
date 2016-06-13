import React from 'react';
import ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import getCustomTheme from './themeCustom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

import Nav from './nav';
import Home from '../components/Home';
import Button from '../components/Button';

var GnbStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none'
};

require('../scss/style.scss');

class layout extends React.Component {
    render(){
        return  (
            <MuiThemeProvider muiTheme={getCustomTheme()}>
                <div className="layout_container">
                    <Nav />
                    <div className="container">
                        <div className="contents">
                            <h2>Coresystem UI</h2>
                            <Button />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default layout;