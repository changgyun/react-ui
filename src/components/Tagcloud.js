import React from 'react';
import { TagCloud } from "react-tagcloud";

const options = {
    luminosity: 'light',
    hue: 'blue'
};

const SimpleCloud = React.createClass({
    render () {
        return (
            <TagCloud minSize={12}
                maxSize={35}
                colorOptions={options}
                tags={this.props.tag}
                onClick={tag => console.log('clicking on tag:', tag)} />
        );
    }
})

export default SimpleCloud;