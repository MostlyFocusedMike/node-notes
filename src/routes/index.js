import React from "react"
import {Switch, Route} from "react-router-dom"
import Note from '../components/Note'

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Note} />
      <Route exact path="/notes/:fileName" component={Note} />
      {/* <Route exact path="/videos" component={VideosPage} />
      <Route exact path="/videos/new" component={NewVideoPage} />
      <Route exact path="/videos/:id" component={VideoPage} />
      <Route exact path="/users" component={UsersPage} />
      <Route exact path="/users/:username" component={UserPage} />
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/login" component={LoginPage} /> */}
      <Route path="*" component={Note} />
    </Switch>
  )
}

export default Routes