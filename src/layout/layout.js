import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Content from './Content';
import Bottom from './Bottom';

require('../scss/style.scss');

class layout extends React.Component {
    render(){
        return  (
            <div>
                <Header />
                <Content />
                <Bottom />
            </div>
        );
    }
}

export default layout;