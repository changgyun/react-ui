import React from 'react';
import ReactDOM from 'react-dom';
import SortableList from '../components/sortable';

require('../scss/main.scss');

var data = {
    items: [
        "Gold",
        "Crimson",
        "Hotpink",
        "Blueviolet",
        "Cornflowerblue"
    ]
};

class Home extends React.Component {
    render(){
        return (
            <div className="mainContainer">
                <SortableList data={data} />
            </div>
        );
    }
}

export default Home;


