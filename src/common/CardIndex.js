// import React from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import IndivCard from './IndivCard'
import BeerCard from './BeerCard'
import FoodCard from './FoodCard'

function CardIndex() {

  return (
    <div className="master-div">
      <div className="second-master-div">
        <BeerCard />
        <FoodCard />
      </div>
    </div>
  )
}

export default CardIndex