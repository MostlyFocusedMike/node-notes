import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '.';

class MyProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }

    addOne = () => {
        this.setState(prevState => ({
            counter: prevState.counter + 1,
        }));
    }

    render() {
        const context = {
            counter: this.state.counter,
            addOne: this.addOne,
        };

        return (
            <AppContext.Provider value={ context }>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

MyProvider.propTypes = {
    children: PropTypes.object,
};

export default MyProvider;
