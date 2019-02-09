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

    checkIfLocal = () => {
        if (window.location.href.match('//localhost:')) {
            console.log('I ran');
            this.setState({
                isEditMode: true,
                isLocal: true,
            });
        }
    }

    render() {
        const context = Object.assign(
            this.state,
            {
                toggleEditMode: this.toggleEditMode,
                checkIfLocal: this.checkIfLocal,
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
