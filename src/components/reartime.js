import React from 'react';

var CityRow = React.createClass({
    setTime: function(){

        var currentdate = new Date();

        var hours = currentdate.getUTCHours() + parseInt(this.props.UTCOffset);
        var year = currentdate.getFullYear();
        var number = currentdate.getDate();
        var weekday = new Array(7);
        weekday[0]=  "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var day = weekday[currentdate.getDay()];
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var stmonth = month[currentdate.getMonth()];

        if( hours >= 24 ){ hours -= 24; }
        if( hours < 0   ){ hours += 12; }

        hours = hours + "";
        if( hours.length == 1 ){ hours = "0" + hours; }

        var minutes = currentdate.getUTCMinutes();

        minutes = minutes + "";
        if( minutes.length == 1 ){ minutes = "0" + minutes; }

        var seconds = currentdate.getUTCSeconds();
        this.setState({
            year: year,
            month: stmonth,
            number: number,
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
    },
    componentWillMount: function(){
        this.setTime();
    },
    componentDidMount: function(){
        window.setInterval(function () {
            this.setTime();
        }.bind(this), 1000);
    },
    render: function() {

        return(
            <div className="city-row" ref="cityRow">
                <div>{this.state.year}</div>
                <div>{this.state.month}</div>
                <div>{this.state.number}</div>
                <div>{this.state.day}</div>
                <div>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</div>
            </div>
        )
    }
});

export default CityRow;
