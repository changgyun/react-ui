import React from 'react';
import $ from 'jquery';
import Masonry from 'react-masonry-component';
import tumblrAPI from '../components/tumblrList.json';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ChatOutline from 'material-ui/svg-icons/communication/chat-bubble-outline';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

const masonryOptions = {
    transitionDuration: 0
};

const Mychip = React.createClass({
    getInitialState () {
        return {
            chipToggle: false
        };
    },
    handleRequestDelete() {
        this.setState({chipToggle: true});
    },
    handleTouchTap() {
        this.setState({chipToggle: false});
    },
    handleTag(el) {
    },
    render() {
        return (
            <Chip
                className={this.state.chipToggle ? 'chip' : 'chip active'}
                backgroundColor={this.state.chipToggle ? 'rgba(212,212,212,.1)' : 'rgba(212,212,212,1)'}
                onRequestDelete={this.handleRequestDelete.bind(this)}
                onTouchTap={this.handleTouchTap.bind(this)}
                style={styles.chip}
            >
                <div onClick={this.handleTag(this.props.tagsMenuList)}>
                    {this.props.tagsMenuList}
                </div>
            </Chip>
            /*<Chip
             backgroundColor={blue300}
             onRequestDelete={handleRequestDelete}
             onTouchTap={handleTouchTap}
             style={styles.chip}
             >
             Colored Chip
             </Chip>*/
        );
    }
});

const MyCard = React.createClass({
    getInitialState () {
        return {
            open: false,
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
            <div className="cardContainer" data-filter={this.props.tagText}>
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
                        className="tumblrHead"
                        title={this.props.userName}
                        subtitle={this.props.date}
                    />
                    <CardText>
                        <div className="commentBox">
                            {this.props.captionText}
                        </div>
                    </CardText>
                    <CardActions className="tumblrTag">
                        <div>
                            {this.props.tagText}
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
});

/*const urlData = 'http://api.tumblr.com/v2/blog/woosys.tumblr.com/posts?' +
    'tag=region&' +
        //'tag=italy&' +
    'api_key=tiR2XYIkXPsuYbtvDIQGR1k5iC4YBRdKxSvlZZW2jNzcxkoRtb&' +
    'callback=JSON_CALLBACK';*/


const tumblrList = React.createClass({
    loadTumblr: function() {
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
            success: function(data) {
                this.setState({data: data.response.posts});

                const postlen = data.response.posts.length;
                const tagMenu = [];
                for(let i=0;i < postlen;i++) {
                    const tagslen =  data.response.posts[i].tags.length;
                    for(let j=0;j < tagslen;j++){
                        tagMenu.push(data.response.posts[i].tags[j] + '-' + i);
                    }
                }

                console.log(tagMenu)

                const tagMenuUniq = tagMenu.reduce(function(a,b){
                    if (a.indexOf(b) < 0 ) a.push(b);
                    return a;
                },[]);

                this.setState({tagMenu: tagMenuUniq});


            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {
            data: [],
            tagMenu: [],
        };
    },

    componentDidMount: function() {
        this.loadTumblr();
        //setInterval(this.loadInstagram, 3000000);
    },

    render : function(){
        const tumblrList = this.state.data.map(function(tumblr){
            const captionText = tumblr.caption.replace(/(<([^>]+)>)/gi, "");
            const tumblrTaglist = tumblr.tags.join(', ');

            return(
                <MyCard
                    photoImages={tumblr.photos[0].alt_sizes[2].url}
                    date={tumblr.date}
                    captionText={captionText}
                    userName={tumblr.blog_name}
                    tagText={tumblrTaglist}
                />
            )
        });

        const tumblrtag = this.state.tagMenu.map(function(tumblrtags){

            return(
                <Mychip
                    tagsMenuList={tumblrtags}
                />
            )
        });
        return(
            <div className="content_tem">
                <h3>tumblr API</h3>
                <div style={styles.wrapper}>
                    {tumblrtag}
                </div>
                <Masonry
                    className={'my-gallery-class'}
                    elementType={'ul'}
                    options={masonryOptions}
                    disableImagesLoaded={false}>
                    {tumblrList}
                </Masonry>
            </div>
        );
    }
});

export default tumblrList;