import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './common/Home'
import CardIndex from './common/CardIndex'
import ShowResult from './common/ShowResult'
import ShowMealResult from './common/ShowMealResult'
import Collection from './common/Collection'
import BrokenMeal from './common/BrokenMeal'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/collection" component={Collection} />
        <Route path="/beer/:beerId" component={ShowResult} />
        <Route path="/meal/:mealId" component={ShowMealResult} />
        <Route exact path="/" component={Home} />
        <Route exact path="/index" component={CardIndex} />
        <Route exact path="/meal" component={BrokenMeal} />

      </Switch>
    </BrowserRouter>
  )
}

export default App
