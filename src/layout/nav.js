import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

/*
import pa_home from '../custom/home';
import pa_button from '../custom/button';
*/

class Custom_nav extends React.Component {
    render(){
        return (
            <div>
            <h1>Header</h1>
                <ul>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="button">Button</Link></li>
                </ul>
                {this.props.children}
            </div>

        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <h2>Hey, I am pa_home!</h2>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <h2>Hey, I am pa_button!</h2>
        );
    }
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="home" component={Home}/>
        <Route path="button" component={Button}/>
    </Router>
), document.getElementById('app'))

ReactDOM.render(<Router history = {hashHistory}>
    <Route path = "/" component = {Custom_nav}>
        <IndexRoute component = {Home} />
        <Route path = "home" component = {Home} />
        <Route path = "Button" component = {Button} />
    </Route>
</Router>, document.getElementById('react_app'));

export default Custom_nav;