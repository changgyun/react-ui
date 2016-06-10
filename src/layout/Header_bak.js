import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class Header extends React.Component {
    render(){
        return (
            <div>
            <h1>Header</h1>
                <ul>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="about">About</Link></li>
                    <li><Link to="articles">Articles</Link></li>
                </ul>
                {this.props.children}
            </div>

        );
    }
}

class Home extends React.Component {
    render() {
        return (
            <h2>Hey, I am HOME!</h2>
        );
    }
}

class About extends React.Component {
    render() {
        return (
            <h2>Hey, I am ABOUT!</h2>
        );
    }
}

class Articles extends React.Component {
    render() {
        return (
            <h2>Hey, I am ARTCILES!</h2>
        );
    }
}


ReactDOM.render(<Router history = {browserHistory}>
    <Route path = "/" component = {Header}>
        <IndexRoute component = {Home} />
        <Route path = "home" component = {Home} />
        <Route path = "about" component = {About} />
        <Route path = "articles" component = {Articles} />
    </Route>
</Router>, document.getElementById('app'));

export default Header;