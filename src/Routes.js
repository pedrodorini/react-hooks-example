import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'

import App from './App'
import Greeting from './Greeting'

export default function() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/greeting" component={Greeting} />
      </Switch>
    </BrowserRouter>
  )
}
