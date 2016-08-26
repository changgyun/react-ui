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
                    <img src={this.props.images} />
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
                        <MyCard
                            title={card.title}
                            images={card.images} />
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
            { title: 'A', images: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'B', images: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'C', images: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'D', images: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'E', images: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'},
            { title: 'F', images: 'https://ssl.pstatic.net/sstatic/search/2015/h_logo.png'}
        ];
        return (
            <div className="container">
                <div className="contents">
                    <h2>Conrad</h2>
                    <div className="view">
                        <div className="content_tem">
                            <h3>Masonry</h3>
                            <MyGallery cards={cards}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Gallery;