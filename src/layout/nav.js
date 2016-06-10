import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../components/Home';
import Button from '../components/Button';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class Header extends React.Component {
    render(){
        return (
            <div>
                    <ul>
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="button">Button</Link></li>
                    </ul>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    {this.props.children}
                </MuiThemeProvider>
            </div>
        );
    }
}


ReactDOM.render(<Router history = {browserHistory}>
    <Route path = "/" component = {Header}>
        <IndexRoute component = {Home} />
        <Route path = "home" component = {Home} />
        <Route path = "button" component = {Button} />
    </Route>
</Router>, document.getElementById('nav'));

export default Header;