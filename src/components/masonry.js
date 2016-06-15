var React = require('react');
var Masonry = require('react-masonry-component');

var masonryOptions = {
    transitionDuration: 0
};

var MyCard = React.createClass({
    render() {
        return (
            <div style={{padding:'1em'}}>
                <div style={{border:'1px solid black', width:'100px', height:'100px'}}>
                    {this.props.title}
                    <img src={this.props.img} />
                </div>
            </div>
        );
    }
});

var Gallery = React.createClass({

    render: function () {
        var MyGallery = React.createClass({
            render() {
                var children = this.props.cards.map(function(card) {
                    return (
                        <MyCard title={card.title}/>
                    );
                });

                return (
                    <Masonry
                        className={'my-gallery-class'}
                        elementType={'ul'}
                        options={masonryOptions}
                        disableImagesLoaded={false}>
                        {children}
                    </Masonry>
                );
            }
        });
        var cards = [
            { title: 'A', img: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'B', img: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'C', img: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'D', img: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'E', img: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'F', img: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'}
        ];
        return (
            <div>
                <MyGallery cards={cards}/>
            </div>

        );
    }
});

module.exports = Gallery;