import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

class Header extends React.Component {
    render(){
        return (
            <div>
                <h1>Coresystem UI</h1>
            </div>
        );
    }
}

export default Header;
