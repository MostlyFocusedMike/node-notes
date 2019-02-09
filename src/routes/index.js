import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Note from '../components/Note';

const Routes = () => {
    return (
        <Switch>
            <Route
                exact path='/' // TODO make actual welcome component
                component = { Note }
            />
            <Route
                exact path='/notes/:fileName'
                component = { Note }
            />
            <Route
                exact path='*'
                component = { Note }
            />
        </Switch>
    );
};

Routes.propTypes = {
    viewInfo: PropTypes.object,
    toggleEditMode: PropTypes.func,
};

export default Routes;
