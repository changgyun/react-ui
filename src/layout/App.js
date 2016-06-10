import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';

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