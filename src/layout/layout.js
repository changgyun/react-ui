import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Nav from './nav';

require('../scss/style.scss');

class layout extends React.Component {
    render(){
        return  (
            <div>
                <Header />
            </div>
        );
    }
}

export default layout;