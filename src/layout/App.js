import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Bottom from './Bottom';
import nav from './nav';

require('../scss/style.scss');

class App extends React.Component {
    render(){
        return  (
            <div>
                <Header/>
            </div>
        );
    }
}

export default App;