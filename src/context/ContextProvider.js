import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '.';

class MyProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditMode: false,
            isLocal: false,
        };
    }


    toggleEditMode = () => {
        this.setState(prevState => ({
            isEditMode: !prevState.isEditMode,
        }));
    }

    render() {
        const context = Object.assign(
            this.state,
            {
                toggleEditMode: this.toggleEditMode,
            },
        );

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
