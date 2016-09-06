import React from 'react';
import $ from 'jquery';
import { Sortable } from 'react-sortable';
import tumblrAPI from '../components/tumblrList.json';
import CityRow from '../components/reartime';
import SimpleBarChart from '../components/SimpleBarChart';

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
                        <div>
                            {tmLength}
                        </div>
                    </div>
            )
            case "date":

                var dayDate = [];
                for(let i=0;i < tmData.length;i++) {
                    dayDate.push(tmData[i].date.substring(0, 10));
                }
                var dayDate = dayDate.map(function(item, i) {
                    return (
                        <div>
                            {item}
                        </div>
                    );
                }, this);

                return (
                    <div {...this.props} className="list-item date">
                        {this.props.children.title}
                        <div>
                            {dayDate}
                        </div>
                    </div>
            )
            case "dvid":

                var gnbPost = [];
                for(let i=0;i < tmData.length;i++) {
                    gnbPost.push(tmData[i].tags[0]);
                }

                var gnbPost = gnbPost.map(function(item, i) {
                    return (
                        <div>
                            {item}
                        </div>
                    );
                }, this);

                return (
                    <div {...this.props} className="list-item dvid">
                        {this.props.children.title}
                        <div>
                            {gnbPost}
                        </div>
                    </div>
            )
            case "tag":

                var format = [];
                for(let i=0;i < tmData.length;i++) {
                    format.push(tmData[i].format);
                }

                var format = format.map(function(item, i) {
                    return (
                        <div>
                            {item}
                        </div>
                    );
                }, this);

                return (
                    <div {...this.props} className="list-item tag">
                        {this.props.children.title}
                        <div>
                            {format}
                        </div>
                    </div>
            )
            case "environment":
                var ua = window.navigator.userAgent;
                return (
                    <div {...this.props} className="list-item environment">
                        {this.props.children.title}
                        <div>날짜</div>
                        <CityRow name="CityRow" UTCOffset="5"/>
                        <div>pc</div>
                        <div>{ua}</div>
                    </div>
            )
            case "tagClude":

                var tagClude = [];
                for(let i=0;i < tmData.length;i++) {
                    const tagslen =  tmData[i].tags.length;
                    for(let j=0;j < tagslen;j++){
                        tagClude.push(tmData[i].tags[j]);
                    }
                }

                const tagMenuUniq = tagClude.reduce(function(a,b){
                    if (a.indexOf(b) < 0 ) a.push(b);
                    return a;
                },[]);

                var tagClude = tagMenuUniq.map(function(item, i) {
                    return (
                        <div>
                            {item}
                        </div>
                    );
                }, this);

                return (
                    <div {...this.props} className="list-item tagClude">
                        {this.props.children.title}
                        <div>
                            {tagClude}
                        </div>
                    </div>
            )
            case "week":
                var dayDate = [];
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";

                function getWeekday(sDate) {

                    var yy = parseInt(sDate.substr(0, 4), 10);
                    var mm = parseInt(sDate.substr(5, 2), 10);
                    var dd = parseInt(sDate.substr(8), 10);

                    var weekday = new Array(7);
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";

                    var d = new Date(yy,mm - 1, dd);
                    return weekday[d.getDay()];
                }

                var sunNum = [];
                var monNum = [];
                var tueNum = [];
                var wenNum = [];
                var thuNum = [];
                var friNum = [];
                var satNum = [];

                for(let i=0;i < tmData.length;i++) {
                    dayDate.push(getWeekday(tmData[i].date.substring(0, 10)));

                    switch (getWeekday(tmData[i].date.substring(0, 10))) {
                        case "Sunday":
                            sunNum.push(getWeekday(tmData[i].date.substring(0, 10)));
                            break;
                        case "Monday":
                            monNum.push(getWeekday(tmData[i].date.substring(0, 10)));
                            break;
                        case "Tuesday":
                            tueNum.push(getWeekday(tmData[i].date.substring(0, 10)));
                            break;
                        case "Wednesday":
                            wenNum.push(getWeekday(tmData[i].date.substring(0, 10)));
                            break;
                        case "Thursday":
                            thuNum.push(getWeekday(tmData[i].date.substring(0, 10)));
                            break;
                        case "Friday":
                            friNum.push(getWeekday(tmData[i].date.substring(0, 10)));
                            break;
                        case "Saturday":
                            satNum.push(getWeekday(tmData[i].date.substring(0, 10)));
                            break;
                    }
                }

                console.log(sunNum)
                console.log(monNum)
                console.log(wenNum)

                var daychart = []

                for(let i=0;i < weekday.length;i++) {
                    var sub = new Object();
                    var applyList;
                    sub['name'] = weekday[i].substring(0, 3);
                    switch (weekday[i]) {
                        case "Sunday":
                            applyList = sunNum.length;
                            sub['weeklist'] = applyList;
                            break;
                        case "Monday":
                            applyList = monNum.length;
                            sub['weeklist'] = applyList;
                            break;
                        case "Tuesday":
                            applyList = tueNum.length;
                            sub['weeklist'] = applyList;
                            break;
                        case "Wednesday":
                            applyList = wenNum.length;
                            sub['weeklist'] = applyList;
                            break;
                        case "Thursday":
                            applyList = thuNum.length;
                            sub['weeklist'] = applyList;
                            break;
                        case "Friday":
                            applyList = friNum.length;
                            sub['weeklist'] = applyList;
                            break;
                        case "Saturday":
                            applyList = satNum.length;
                            sub['weeklist'] = applyList;
                            break;
                    }
                    daychart.push(sub);
                }

                var dayDate = dayDate.map(function(item, i) {
                    return (
                        <div>
                            {item}
                        </div>
                    );
                }, this);

                return (
                    <div {...this.props} className="list-item week">
                        {this.props.children.title}
                        <div>
                            {dayDate}
                        </div>
                        <SimpleBarChart weekDate={daychart} />
                    </div>
            )
            default:
                return (
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