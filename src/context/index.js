import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './context';

class MyProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

MyProvider.propTypes = {
    children: PropTypes.object,
};

export default MyProvider;
