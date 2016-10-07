import React from 'react';
import $ from 'jquery';
import Masonry from 'react-masonry-component';
import tumblrAPI from '../components/tumblrList.json';
import Loading from '../components/Loading';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ChatOutline from 'material-ui/svg-icons/communication/chat-bubble-outline';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
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

    render() {
        return (
            <div className="chipLayout">
                {this.props.tagsMenuList.map( ( tags, index ) => {
                    return <Chip onTouchTap={this.props.onTouchTap} style={styles.chip}>{tags}</Chip>
                })}
            </div>
            /*<Chip
                onTouchTap={this.chipFilter}
                style={styles.chip}
            >
                {this.props.tagsMenuList}
            </Chip>*/
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
                    <CardMedia
                        className="cardImages"
                    >
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
/*const urlData = 'http://api.tumblr.com/v2/blog/conrad-woo.tumblr.com/posts?' +
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
                this.setState({items: data.response.posts});
                this.setState({elements: data.response.posts});
                const postlen = data.response.posts.length;
                const tagMenu = [];
                for(let i=0;i < postlen;i++) {
                    const tagslen =  data.response.posts[i].tags.length;
                    for(let j=0;j < tagslen;j++){
                        tagMenu.push(data.response.posts[i].tags[j]);
                    }
                }
                const tagMenuUniq = tagMenu.reduce(function(a,b){
                    if (a.indexOf(b) < 0 ) a.push(b);
                    return a;
                },[]);
                this.setState({tagMenu: tagMenuUniq});

                console.log(data)
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
            items: [],
            currentItems: [],
            elements: [],
            isInfiniteLoading: false,
            isLastAlert: false,
            ListNum: 8,
            UpdateListNum: 8,
        };
    },

    componentWillMount: function(){
        this.setState({items: this.state.data});
        this.loadTumblr();
    },

    componentDidMount: function() {
        this.buildElements(0, this.state.ListNum);
        window.addEventListener('scroll', this.scrollEnd);
    },

    filterList : function(event, text){
        var updatedList = this.state.items;
        var currentList = this.state.currentItems;
        if (text != "") {
            updatedList = updatedList.filter(function(item){
                var tagLength = item.tags.length;
                var tagMerge = "";
                var tagFilter = "";
                for (var i = 0; i < tagLength; ++i) {
                    tagMerge += item.tags[i];
                }
                if(tagLength > 0){
                    tagFilter = item.tags.join();
                }
                return tagFilter.toLowerCase().search(
                        event.target.value.toLowerCase()) !== -1;
            });
            this.setState({items: updatedList});
        } else {
            this.setState({items: currentList});
        }
    },

    filterAutoList : function(searchText){
        var updatedList = this.state.items;
        var currentList = this.state.currentItems;
        if (searchText != "") {
            updatedList = updatedList.filter(function(item){
                var tagLength = item.tags.length;
                var tagMerge = "";
                var tagFilter = "";
                for (var i = 0; i < tagLength; ++i) {
                    tagMerge += item.tags[i];
                }
                if(tagLength > 0){
                    tagFilter = item.tags.join();
                }
                return tagFilter.toLowerCase().search(
                        searchText.toLowerCase()) !== -1;
            });
            this.setState({items: updatedList});
        } else {
            this.setState({items: currentList});
        }
    },

    buildElements: function(start, end) {
        var infintyList = this.state.data;
        var infintyLength= this.state.data.length;
        var elements = [];
        if (end > infintyLength) {
            end = infintyLength;
        }
        for (var i = start; i < end; i++) {
            infintyList[i].key = i;
            elements.push(infintyList[i]);
        }
        if (end == this.state.ListNum) {
            this.eleInit(elements)
        } else {
            return elements;
        }
    },

    scrollEnd: function() {
        var scrollHeight = document.body.scrollHeight;
        var clientHeight = document.body.clientHeight;
        var ScrollTop = document.body.scrollTop;
        var scrollPos = scrollHeight - ScrollTop;
        var infintyLength= this.state.data.length;
        var elemLength = this.state.items.length;
        console.log(clientHeight +"------------"+ scrollPos)
        if (clientHeight == scrollPos){
            var that = this;
            if (infintyLength != elemLength){
                this.setState({
                    isInfiniteLoading: true
                });
            } else {
                this.setState({
                    isLastAlert: true
                });
            }
            setTimeout(function() {
                var elemLength = that.state.items.length,
                    newElements = that.buildElements(elemLength, elemLength + that.state.UpdateListNum);
                that.setState({
                    isInfiniteLoading: false,
                    items: that.state.items.concat(newElements),
                    currentItems: that.state.items.concat(newElements)
                });
            }, 2500);
        }
    },

    eleInit: function(elements) {
        this.setState({items: elements});
        this.setState({currentItems: elements});
    },

    handleClose: function() {
        this.setState({isLastAlert: false});
    },

    chipFilter: function(event) {
        console.log('2')
    },

    render : function(){
        const tumblrList = this.state.items.map(function(tumblr){
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

        /*const tumblrtag = this.state.tagMenu.map(function(tumblrtags){
            return*//*(
                <Mychip
                    tagsMenuList={tumblrtags}
                />
            )*//*
        });*/

        const tumblrtag = this.state.tagMenu;

        const alertActions = [
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return(
            <div className="container">
                <div className="contents">
                    <h2>Conrad</h2>
                    <div className="view">
                        <div className="content_tem">
                            <h3>tumblr API</h3>
                            <div style={styles.wrapper}>
                                <Mychip
                                    tagsMenuList={tumblrtag}
                                    onTouchTap={this.chipFilter}
                                />
                            </div>
                            <AutoComplete
                                floatingLabelText="Tag search"
                                filter={AutoComplete.filterAutoList}
                                onNewRequest={this.filterAutoList}
                                onUpdateInput={this.filterAutoList}
                                openOnFocus={true}
                                dataSource={tumblrtag}
                            />
                            { this.state.isInfiniteLoading ? <Loading /> : null }
                            <Dialog
                                actions={alertActions}
                                modal={false}
                                open={this.state.isLastAlert}
                                onRequestClose={this.handleClose}
                            >
                                The end of the current line.
                            </Dialog>
                            <Masonry
                                className={'my-gallery-class'}
                                options={masonryOptions}
                                disableImagesLoaded={false}>
                                {tumblrList}
                            </Masonry>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default tumblrList;