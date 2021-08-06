import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import CollectionButton from './CollectionButton'


function BeerCard() {
  const [beers, setBeers] = React.useState(null)
  const [click, setClicks] = React.useState(0)
  const [abv, setAbv] = React.useState('Any')
  const isLoading = !beers


  const isBeers = window.localStorage.getItem('beer')
  const isFood = window.localStorage.getItem('food')
  const dontShowButton = (!isBeers || !isFood)

  const handleAdd = () => {
    let latestLocal = window.localStorage.getItem('beer')
    if (latestLocal === null) {
      latestLocal = []
      latestLocal.push(`${filterBeers().id}`)
      window.localStorage.setItem('beer', latestLocal.toString())
    } else {
      latestLocal = latestLocal.split(',')
      latestLocal.push(`${filterBeers().id}`)
      console.log(latestLocal)
      window.localStorage.setItem('beer', latestLocal.toString())
    }
  }





  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers?page=2&per_page=80')
        setBeers(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const handleClick = () => {
    setClicks(click + 1)
  }

  const ans = Math.floor(Math.random() * 10)

  const filterBeers = () => {
    const newArr = beers.filter(beer => {
      return (
        abv === 'Any' ||
        (abv === 'Low' && beer.abv <= 5) ||
        (abv === 'Medium' && (beer.abv > 5 && beer.abv < 10)) ||
        (abv === 'High' && beer.abv >= 10)
      )
    })
    const result = newArr[ans]
    return result
  }

  const handleBeerChange = (e) => {
    console.log(filterBeers().name)
    console.log(filterBeers().id)
    setAbv(e.target.value)
  }


  return (
    <>
      <section className="section beer-section">
        <div className="container">
          <div className="columns ">

            {isLoading ?
              <p>...loading</p>
              :
              <div className="column ">
                <div className="h1-container">
                  <h1 className="title h1">Beer</h1>
                </div>
                <div className="level">
                  <div className="select">
                    <select onChange={handleBeerChange}>
                      <option selected disabled>ABV</option>
                      <option value="Any">Any</option>
                      <option value="Low">{'Low (< 5)'}</option>
                      <option value="Medium">{'Medium (5 - 10)'}</option>
                      <option value="High">{'High (> 10)'}</option>
                    </select>
                  </div>
                </div>
                <div key={filterBeers().id} >
                  <div className="card">
                    <div className="card-header">
                      <div className="title">
                        {filterBeers().name}
                      </div>
                    </div>
                    <div className="card-image">
                      <figure className="image center-image">
                        <img src={filterBeers().image_url} />
                      </figure>
                    </div>
                    <div className="card-content display-center">
                      <h5>ABV {filterBeers().abv}</h5>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="btn-container">
            <button onClick={handleClick} className="beer-button button is-half-width">Change Beer</button>
            <Link to={`/beer/${beers ? filterBeers().id : ''}`}>
              <button className="beer-button button is-fullwidth">Tell Me More</button>
            </Link>
            <button className="beer-button button is-half-width" onClick={handleAdd}>Save Beer to My Collection</button>
          </div>
        </div>
      </section >
      <div className="collection-button">
        <CollectionButton />
      </div>
    </>
  )

}
export default BeerCard