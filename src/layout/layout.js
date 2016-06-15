/*import React from 'react';
import ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import getCustomTheme from './themeCustom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../components/Home';
import Button from '../components/Button';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class Nav extends React.Component {
    render(){
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                <ul>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="button">Button</Link></li>
                </ul>
                {this.props.children}
            </div>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(<Router history = {browserHistory}>
    <Route path = "/" component = {Nav}>
        <IndexRoute component = {Home} />
        <Route path = "home" component = {Home} />
        <Route path = "button" component = {Button} />
    </Route>
</Router>, document.getElementById('nav'));*/

import React from 'react';
import ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import getCustomTheme from './themeCustom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/menu';

import Nav from './nav';
import Home from '../view/Home';
import Button from '../view/Button';

import Masonry from '../components/masonry';

import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

require('../scss/style.scss');

var DrawerStyle = {
    boxShadow: 'none',
    fontSize:'14px',
    color:'#fff'
};

class layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            menuData: [
                {title: "Home", link_able: "home"},
                {title: "Button", link_able: "button"},
                {title: "Masonry", link_able: "masonry"},
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
        return  (
            <MuiThemeProvider muiTheme={getCustomTheme()}>
                <div className="layout_container" id="layout_container">
                    <div className={(this.state.open ? 'nav open' : 'nav')}>
                        <IconButton
                            linkButton={true}
                            onTouchTap={this.handleToggle.bind(this)}
                            tooltip="menu"
                        >
                        <NavigationClose color={white} /></IconButton>
                        <Drawer
                                className="NavDrawer"
                                docked={false}
                                width={500}
                                style={DrawerStyle}
                                open={this.state.open}
                                onRequestChange={(open) => this.setState({open})}
                            >
                            {this.state.menuData.map((Nav, i) => {
                                return (<Link to={Nav.link_able}><MenuItem style={DrawerStyle} onTouchTap={this.handleClose.bind(this)} key={i}>{Nav.title}</MenuItem></Link>);
                            })}
                        </Drawer>
                    </div>
                    <div className="container">
                        <div className="contents">
                            <h2>Coresystem UI</h2>
                                <div className="view">
                                    {this.props.children}
                                </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

layout.contextTypes = {
    router: React.PropTypes.func.isRequired
}

ReactDOM.render(<Router history = {browserHistory}>
    <Route path = "/" component = {layout}>
        <IndexRoute component = {Home} />
        <Route path = "home" component = {Home} />
        <Route path = "button" component = {Button} />
        <Route path = "masonry" component = {Masonry} />
    </Route>
</Router>, document.getElementById('React_app'));
