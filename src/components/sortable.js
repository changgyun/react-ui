import React from 'react';
import $ from 'jquery';
import { Sortable } from 'react-sortable';
import tumblrAPI from '../components/tumblrList.json';
import CityRow from '../components/reartime';
import SimpleBarChart from '../components/SimpleBarChart';
import TagCloud from '../components/Tagcloud';
import PieChart from '../components/PieChart';
import RadarChart from '../components/RadarChart';
import LineChart from '../components/LineChart';
import AreaChart from '../components/AreaChart';

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
            windowWidth: window.innerWidth,
        };
    },

    handleResize: function(e) {
        this.setState({
            windowWidth: window.innerWidth,
        });
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    componentWillMount: function(){
        this.loadtmData();
    },

    displayName: 'SortableListItem',
    render: function() {
        console.log(this.state.windowWidth)
        var tmData = this.state.tmData;

        switch (this.props.children.type) {
            case "apply":

                const tmLength = tmData.length;

                return (
                    <div {...this.props} className="list-item apply">
                        <h2>{this.props.children.title}</h2>
                        <div>
                            {tmLength}
                        </div>
                    </div>
            )
            case "date":

                var dayDate = [];
                var lineChart = [];
                for(let i=0;i < tmData.length;i++) {
                    var sub = new Object();
                    sub['name'] = tmData[i].tags[0];
                    sub['type'] = tmData[i].type;
                    sub['amt'] = tmData[i].date.substring(0, 7);
                    lineChart.push(sub);
                    dayDate.push(tmData[i].date.substring(0, 10));
                }

                var linetagChart = [];
                for (var i=0; i<lineChart.length; i++) {
                    var key = lineChart[i].amt.toString();
                    if (!linetagChart[key]) {
                        linetagChart[key] = 1;
                    } else {
                        linetagChart[key] = linetagChart[key] + 1;
                    }
                }

                for(var i in linetagChart){
                    var sub = new Object();
                    for (var j=0; j<lineChart.length; j++) {
                        if (i == lineChart[j].amt) {
                            sub['name'] = i;
                        }
                    }
                    sub['cnt'] = linetagChart[i];
                    linetagChart.push(sub);
                }

                linetagChart.reverse()

                var dayDate = dayDate.map(function(item, i) {
                    return (
                        <div>
                            {item}
                        </div>
                    );
                }, this);

                return (
                    <div {...this.props} className="list-item date">
                        <h2>{this.props.children.title}</h2>
                        <AreaChart datedata={linetagChart}/>
                    </div>
            )
            // <LineChart datedata={linetagChart}/>
            case "dvid":

                var gnbPost = [];
                for(let i=0;i < tmData.length;i++) {
                    gnbPost.push(tmData[i].tags[0]);
                }

                var PiePostChart = [];

                for (var i=0; i<gnbPost.length; i++) {
                    var key = gnbPost[i].toString();
                    if (!PiePostChart[key]) {
                        PiePostChart[key] = 1
                    } else {
                        PiePostChart[key] = PiePostChart[key] + 1;
                    }
                }

                var PieDateChart = [];
                for(var i in PiePostChart){
                    var sub = new Object();
                    sub['subject'] =i;
                    sub['A'] = PiePostChart[i];
                    PieDateChart.push(sub);
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
                        <h2>{this.props.children.title}</h2>
                        <RadarChart typedata={PieDateChart}/>
                    </div>
            )
            case "tag":

                var typeChart = [];
                for(let i=0;i < tmData.length;i++) {
                    typeChart.push(tmData[i].type);
                }

                var typePostChart = [];

                for (var i=0; i<typeChart.length; i++) {
                    var key = typeChart[i].toString();
                    if (!typePostChart[key]) {
                        typePostChart[key] = 1
                    } else {
                        typePostChart[key] = typePostChart[key] + 1;
                    }
                }

                var typeDateChart = [];
                for(var i in typePostChart){
                    var sub = new Object();
                    sub['name'] =i;
                    sub['value'] = typePostChart[i];
                    typeDateChart.push(sub);
                }

                var item = typeChart.map(function(item, i) {
                    return (
                        <div>
                            {item}
                        </div>
                    );
                }, this);

                return (
                    <div {...this.props} className="list-item tag">
                        <h2>{this.props.children.title}</h2>
                        <PieChart PieTagdata={typeDateChart}/>
                    </div>
            )
            case "environment":
                var ua = window.navigator.userAgent;
                return (
                    <div {...this.props} className="list-item environment">
                        <h2>{this.props.children.title}</h2>
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
                    if (a.indexOf(b) < 0 ) {
                        a.push(b);
                    }
                    return a;
                },[]);

                var cludeChart = []
                for (var i=0; i<tagClude.length; i++) {
                    var key = tagClude[i].toString();
                    if (!cludeChart[key]) {
                        cludeChart[key] = 1
                    } else {
                        cludeChart[key] = cludeChart[key] + 1;
                    }
                }

                var PieDateChart = [];
                for(var i in cludeChart){
                    var sub = new Object();
                    sub['value'] =i;
                    sub['count'] = cludeChart[i];
                    PieDateChart.push(sub);
                }

                var tagClude = tagMenuUniq.map(function(item, i) {
                    return (
                        <div>
                            {item}
                        </div>
                    );
                }, this);

                return (
                    <div {...this.props} className="list-item tagClude">
                        <h2>{this.props.children.title}</h2>
                        <TagCloud tag={PieDateChart} />
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
                        <h2>{this.props.children.title}</h2>
                        <SimpleBarChart weekDate={daychart} />
                    </div>
            )
            default:
                return (
                    <div {...this.props} className="list-item">
                        <h2>{this.props.children.title}</h2>
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