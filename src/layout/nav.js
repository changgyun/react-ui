import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var DrawerStyle = {
    boxShadow: 'none',
    fontSize:'20px',
    color:'#fff'
};

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            menuData: [
                {title: "Home", link_able: "home"},
                {title: "Button", link_able: "button"},
            ]
        };
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    render(){
        return (
            <div className={(this.state.open ? 'nav open' : 'nav')}>
                <IconButton
                    linkButton={true}
                    onTouchTap={this.handleToggle.bind(this)}
                    tooltip="menu"
                ><NavigationClose color={white} /></IconButton>
                <Drawer
                    width={500}
                    style={DrawerStyle}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    {this.state.menuData.map((Nav, i) => {
                        return (<MenuItem style={DrawerStyle} onTouchTap={this.handleClose.bind(this)} key={i}><Link to={Nav.link_able}>{Nav.title}</Link></MenuItem>);
                    })}
                </Drawer>
                {this.props.children}
            </div>
        );
    }
}

export default Nav;










/*
import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../components/Home';
import Button from '../components/Button';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class Nav extends React.Component {
    render(){
        return (
            <div>
                <ul>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="button">Button</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(<Router history = {browserHistory}>
    <Route path = "/" component = {Nav}>
        <IndexRoute component = {Home} />
        <Route path = "home" component = {Home} />
        <Route path = "button" component = {Button} />
    </Route>
</Router>, document.getElementById('nav'));

export default Nav;
*/
