import React from "react"
import {Switch, Route} from "react-router-dom"
import Note from '../components/Note'

const Routes = (props) => {
  console.log('props', props)
  return (
    <Switch>
      <Route 
        exact path="/" 
        render={(props) => <Note {...props} />}
      />
      <Route 
        exact path="/notes/:fileName" 
        render={(props) => <Note {...props} />}
      />
      <Route 
        exact path="*" 
        render={(props) => <Note {...props} />}
      />
    </Switch>
  )
}

export default Routes