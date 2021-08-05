import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './common/Home'
import CardIndex from './common/CardIndex'
import ShowResult from './common/ShowResult'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:beerId/:mealId" component={ShowResult} />
        <Route path="/home" component={Home} />
        <Route exact path="/" component={CardIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
