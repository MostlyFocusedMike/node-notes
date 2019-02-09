import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import MainViewer from '../components/MainViewer';

const Routes = () => {
    return (
        <Switch>
            <Route
                exact path='/' // TODO make actual welcome component
                component = { MainViewer }
            />
            <Route
                exact path='/notes/:fileName'
                component = { MainViewer }
            />
            <Route
                exact path='*'
                component = { MainViewer }
            />
        </Switch>
    );
};

Routes.propTypes = {
    viewInfo: PropTypes.object,
    toggleEditMode: PropTypes.func,
};

export default Routes;
