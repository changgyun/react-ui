import React from 'react';
import $ from 'jquery';
import instagramAPI from '../components/instagramList.json';
import Masonry from 'react-masonry-component';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ChatOutline from 'material-ui/svg-icons/communication/chat-bubble-outline';

const masonryOptions = {
    transitionDuration: 0
};

var MyCard = React.createClass({
    getInitialState () {
        return {
            open: false
        };
    },
    handleOpen() {
        this.setState({open: true});
    },
    handleClose() {
        this.setState({open: false});
    },
    render() {

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
                <Card className="cardLayout">
                    <CardMedia>
                        <img src={this.props.photoImages} onClick={this.handleOpen}/>
                        <Dialog
                            contentClassName="imagesModal"
                            title={this.props.captionText}
                            actions={actions}
                            modal={true}
                            open={this.state.open}
                        >
                            <div className="bigImages"><img src={this.props.bigImages}/></div>
                        </Dialog>
                    </CardMedia>
                    <CardHeader
                        title={this.props.userName}
                        subtitle={this.props.date}
                        avatar={this.props.profile}
                    />
                    <CardText>
                        <div className="commentBox">
                            <span>{this.props.captionName} : </span>
                                {this.props.captionText}
                        </div>
                    </CardText>
                    <CardActions>
                        <Badge
                            badgeContent={this.props.commentCount}
                            secondary={true}
                        >
                            <ChatOutline />
                        </Badge>
                        <Badge
                            badgeContent={this.props.likeCount}
                            secondary={true}
                        >
                            <FavoriteBorder />
                        </Badge>
                    </CardActions>
                </Card>
            </div>
        );
    }
});

const PhotoList = React.createClass({
    loadInstagram: function() {
       /* $.ajax({
            //url: "https://api.instagram.com/v1/users/self/?access_token=2119278.7c133df.d8eb9a2bf73f4b1cb74715ec46c9f635",
            url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=2119278.7c133df.d8eb9a2bf73f4b1cb74715ec46c9f635"
            dataType: 'jsonp',
            success: function(data) {
                this.setState({data: data.data});
                console.log(data)
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });*/
        $.ajax({
            url: instagramAPI,
            dataType: 'json',
            async: false,
            success: function(data) {
                this.setState({data: data.data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadInstagram();
        //setInterval(this.loadInstagram, 3000000);
    },

    render : function(){
        const photoList = this.state.data.map(function(photo){
            console.log(photo)
            const date = new Date(photo.created_time * 1000);
            const months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
            const dateFormat = months[date.getMonth()] + " " + date.getDate() + "th " + date.getFullYear();


            return(
                <MyCard
                    likeCount={photo.likes.count}
                    commentCount={photo.comments.count}
                    captionText={photo.caption.text}
                    captionName={photo.caption.from.username}
                    profile={photo.user.profile_picture}
                    userName={photo.user.username}
                    date={dateFormat}
                    photoImages={photo.images.low_resolution.url}
                    bigImages={photo.images.standard_resolution.url} />
            )
        });
        return(
            <div className="content_tem">
                <h3>instagram</h3>
                <Masonry
                    className={'my-gallery-class'}
                    elementType={'ul'}
                    options={masonryOptions}
                    disableImagesLoaded={false}>
                    {photoList}
                </Masonry>
            </div>
        );
    }
});

export default PhotoList;