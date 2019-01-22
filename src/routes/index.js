import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Note from '../components/Note';

const Routes = (props) => {
    const { viewInfo, toggleEdit } = props;
    return (
        <Switch>
            <Route
                exact path='/'
                render = { props => <Note {...props} viewInfo={viewInfo} toggleEdit={toggleEdit}/> } // eslint-disable-line no-shadow
            />
            <Route
                exact path='/notes/:fileName'
                render = { props => <Note {...props} viewInfo={viewInfo} toggleEdit={toggleEdit}/> } // eslint-disable-line no-shadow
            />
            <Route
                exact path='*'
                render = { props => <Note {...props} viewInfo={viewInfo} toggleEdit={toggleEdit}/> } // eslint-disable-line no-shadow
            />
        </Switch>
    );
};

Routes.propTypes = {
    viewInfo: PropTypes.object,
    toggleEdit: PropTypes.function,
};

export default Routes;
