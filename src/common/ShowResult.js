import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function ShowResult() {
  const { beerId } = useParams()
  const [beer, setBeer] = React.useState(null)
  const isLoading = !beer

  const handleAdd = () => {
    let latestLocal = window.localStorage.getItem('beer')
    if (latestLocal === null) {
      latestLocal = []
      latestLocal.push(`${beer.id}`)
      window.localStorage.setItem('beer', latestLocal.toString())
    } else {
      latestLocal = latestLocal.split(',')
      latestLocal.push(`${beer.id}`)
      console.log(latestLocal)
      window.localStorage.setItem('beer', latestLocal.toString())
    }
  }


  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://api.punkapi.com/v2/beers/${beerId}`)
        setBeer(response.data[0])
        console.log(response.data[0])
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [beerId])

  return (
    <div className="hero is-fullheight-with-navbar">
      <section className="section">
        <div className="container have-card-bg-white">
          {isLoading && <p>loading...</p>}
          {beer && (
            <div className="card-container">
              <h2 id="sblack" className="title has-text-centered">Quick Overview</h2>
              <hr />
              <div className="columns">
                <div className="column is-half figure-box">
                  <figure className="image figure-center">
                    <img className="image center-image" src={beer.image_url} arial-label={beer.name} />
                  </figure>
                </div>
                <div className="column is-half figure-box">
                  <h4 id="sblack" className="title is-4">
                    <span role="img" aria-label="beer">
                      🍻
                    </span>{' '}
                    {beer.name}
                  </h4>
                  <p className="center-the-text">{beer.description}</p>
                  <hr />
                  <h4 id="sblack" className="title is-4">
                    <span role="img" aria-label="plate">
                      🍽️
                    </span>{' '}
                    Goes Well With...
                  </h4>
                  <ul>
                    <li>{beer.food_pairing[0]}</li>
                    <li>{beer.food_pairing[1]}</li>
                    <li>{beer.food_pairing[2]}</li>
                  </ul>
                  <hr />
                  <h4 id="sblack" className="title is-4">
                    <span role="img" aria-label="test-tube">
                      🧪
                    </span>{' '}
                    Feeling Creative?
                  </h4>
                  <p className="center-the-text">
                    Why not try and make the beer yourself!
                    <span>
                      <a href={`https://brewdogrecipes.com/?q=${beer.name.replaceAll(' ', '+').toLowerCase()}`}
                        rel="noreferrer"
                        target="_blank">
                        &nbsp;Click here&nbsp;
                      </a>
                    </span>
                    to check out the full recipe!
                  </p>
                  <hr />
                  <button className="button return-button" onClick={handleAdd}>Save to My Collection</button>
                  <Link to="/index">
                    <button className="button return-button">Back to Main</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )




}

export default ShowResult