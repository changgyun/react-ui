import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var GnbStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none'
};

var DrawerStyle = {
    boxShadow: 'none',
};

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    render(){
        return (
            <div>
                <AppBar
                    title="Coresystem UI"
                    iconElementLeft={
                        <IconButton
                            linkButton={true}
                            onTouchTap={this.handleToggle.bind(this)}
                            tooltip="menu"
                        ><NavigationClose /></IconButton>
                    }
                    style={GnbStyle}
                    isInitiallyOpen={ true }
                />
                <Drawer
                    width={500}
                    style={DrawerStyle}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <MenuItem style={DrawerStyle} onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>
                    <MenuItem style={DrawerStyle} onTouchTap={this.handleClose.bind(this)}>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}


export default Header;
