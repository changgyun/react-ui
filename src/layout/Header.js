import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
=======
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

//import Custom_nav from './nav';
import pa_home from './../custom/home';
import pa_button from './../custom/button';
>>>>>>> c141faa11c0d52a5b85d92b0c1558051862349fa

class Header extends React.Component {
    render(){
        return (
            <div>
<<<<<<< HEAD
                <h1>Coresystem UI</h1>
            </div>
        );
    }
}

export default Header;
=======
                <h1>React ui Custom</h1>
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
    <Route path = "/" component = {Header}>
        <IndexRoute component = {pa_home} />
        <Route path = "home" component = {pa_home} />
        <Route path = "Button" component = {pa_button} />
    </Route>
</Router>, document.getElementById('react_app'));

export default Header;
>>>>>>> c141faa11c0d52a5b85d92b0c1558051862349fa
