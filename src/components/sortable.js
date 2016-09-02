import React from 'react';
import $ from 'jquery';
import { Sortable } from 'react-sortable';
import tumblrAPI from '../components/tumblrList.json';

var ListItem = React.createClass({

    loadtmData: function() {
        /*$.ajax({
         url: urlData,
         dataType: 'jsonp',
         success: function(data) {
         this.setState({data: data.response.posts});
         console.log(data.response)
         }.bind(this),
         error: function(xhr, status, err) {
         console.error(this.props.url, status, err.toString());
         }.bind(this)
         });*/
        $.ajax({
            url: tumblrAPI,
            dataType: 'json',
            async: false,
            success: function(tmData) {
                this.setState({tmData: tmData.response.posts});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },


    getInitialState: function() {
        return {
            tmData: [],
        };
    },

    componentWillMount: function(){
        this.loadtmData();
    },

    displayName: 'SortableListItem',
    render: function() {

        var tmData = this.state.tmData;

        switch (this.props.children.type) {
            case "apply":

                const tmLength = tmData.length;

                return (
                <div {...this.props} className="list-item apply">
                    {this.props.children.title}
                    <div>{tmLength}</div>
                </div>
            )
            case "date":

                var tmDate = [];
                for(let i=0;i < tmData.length;i++) {
                    tmDate.push(tmData[i].date);
                }

                return (
                <div {...this.props} className="list-item date">
                    {this.props.children.title}
                    <div>{tmDate}</div>
                </div>
            )
            case "dvid":   return (
                <div {...this.props} className="list-item dvid">
                    {this.props.children.title}
                </div>
            )
            case "tag":   return (
                <div {...this.props} className="list-item tag">
                    {this.props.children.title}
                </div>
            )
            case "environment":   return (
                <div {...this.props} className="list-item environment">
                    {this.props.children.title}
                </div>
            )
            case "tagClude":   return (
                <div {...this.props} className="list-item tagClude">
                    {this.props.children.title}
                </div>
            )
            case "week":   return (
                <div {...this.props} className="list-item week">
                    {this.props.children.title}
                </div>
            )
            default: return (
                <div {...this.props} className="list-item">
                    {this.props.children.title}
                </div>
            )
        }
    }
})

var SortableListItem = Sortable(ListItem);

var SortableList = React.createClass({

    getInitialState: function() {
        return {
            draggingIndex: null,
            data: this.props.data,
            tmData: this.props.tmData
        };
    },

    updateState: function(obj) {
        this.setState(obj);
    },

    render: function() {
        var childProps = { className: 'myClass1' };
        var listItems = this.state.data.map(function(item, i) {
            return (
                <SortableListItem
                    key={i}
                    updateState={this.updateState}
                    items={this.state.data}
                    draggingIndex={this.state.draggingIndex}
                    sortId={i}
                    outline="list"
                    childProps={childProps}
                >{item}</SortableListItem>
            );
        }, this);
        return (
            <div className="list">
                {listItems}
            </div>
        )
    }
});


export default SortableList;