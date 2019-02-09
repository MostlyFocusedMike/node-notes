import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Note from '../components/Note';

const Routes = () => {
    // TODO FIX THIS
    return (
        <Switch>
            <Route
                exact path='/'
                render = { props => <Note {...props} /> }
            />
            <Route
                exact path='/notes/:fileName'
                render = { props => <Note {...props} /> }
            />
            <Route
                exact path='*'
                render = { props => <Note {...props} /> }
            />
        </Switch>
    );
};

Routes.propTypes = {
    viewInfo: PropTypes.object,
    toggleEditMode: PropTypes.func,
};

export default Routes;
