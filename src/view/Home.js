import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import mainAPI from '../components/main.json';
import SortableList from '../components/sortable';

require('../scss/main.scss');

var Home = React.createClass({

    loadMain: function() {
        $.ajax({
            url: mainAPI,
            dataType: 'json',
            async: false,
            success: function(mainData) {
                this.setState({mainData: mainData.posts});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {
            mainData: [],
        };
    },

    componentWillMount: function(){
        this.loadMain();
    },

    render(){
        var mainData = this.state.mainData;
        return (
            <div className="mainContainer">
                <SortableList
                    data={mainData}
                />
            </div>
        );
    }
})

export default Home;


