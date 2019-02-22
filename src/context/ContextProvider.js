import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '.';
import Constants from '../constants';

class MyProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditMode: false,
            isLocal: false,
            selectedPlugin: 'markdown',
            extension: Constants.EXTENSIONS.MARKDOWN,
        };
    }


    toggleEditMode = () => {
        this.setState(prevState => ({
            isEditMode: !prevState.isEditMode,
        }));
    }

    changeExtension = (extension) => {
        this.setState({ extension });
    }

    checkIfLocal = () => {
        if (window.location.href.match('//localhost:')) {
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
                changeExtension: this.changeExtension,
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
