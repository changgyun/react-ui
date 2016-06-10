import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import App from './layout/App';
=======
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
>>>>>>> c141faa11c0d52a5b85d92b0c1558051862349fa

import App from './layout/layout';

ReactDOM.render(<App />, document.getElementById('React_app'));


/*
import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import react_ui from './layout/layout';

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <react_ui />
    </MuiThemeProvider>
);

const rootElement = document.getElementById('app');
ReactDOM.render(<App />, rootElement);*/
