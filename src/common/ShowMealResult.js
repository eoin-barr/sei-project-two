import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function ShowMealResult() {
  const { mealId } = useParams()
  const [meal, setMeal] = React.useState(null)
  const isLoading = !meal

  const handleAdd = () => {
    let latestLocal = window.localStorage.getItem('food')
    if (latestLocal === null) {
      latestLocal = []
      latestLocal.push(`${meal.idMeal}`)
      window.localStorage.setItem('food', latestLocal.toString())
    } else {
      latestLocal = latestLocal.split(',')
      latestLocal.push(`${meal.idMeal}`)
      console.log(latestLocal)
      window.localStorage.setItem('food', latestLocal.toString())
    }
  }


  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        setMeal(response.data.meals[0])
        console.log(response.data.meals[0])
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [mealId])

  return (
    <div className="hero is-fullheight-with-navbar">
      <section className="section" >
        {isLoading && <p>loading...</p>}
        {meal && (
          <div className="card-container">
            <h2 className="title has-text-centered">Quick Overview</h2>
            <hr />
            <div className="columns">
              <div className="column is-half figure-box">
                <h4 id="sblack" className="title is-4">
                  {meal.strMeal}
                </h4>
                <figure className="image figure-center-meal">
                  <img className="image center-image-meal" src={meal.strMealThumb} aria-label={meal.strMeal} />
                </figure>
              </div>
              <div className="column is-half figure-box">
                <h4 id="sblack" className="title is-4">
                  <span role="img" aria-label="plate">
                    🍽
                  </span>{' '}
                  Category
                </h4>
                <p className="center-the-text">
                  {meal.strCategory}
                </p>
                <hr />
                <h4 id="sblack" className="title is-4">
                  <span role="img" aria-label="test-tube">
                    🎥
                  </span>{' '}
                  {'Prefer to Watch How Its Done?'}
                </h4>
                <p className="center-the-text p-width">
                  If reading isn't your thing.
                  Why not cook along with the pros!
                  <span>
                    <a href={meal.strYoutube}
                      rel="noreferrer"
                      target="_blank">
                      &nbsp;Click here&nbsp;
                    </a>
                  </span>
                  to watch how it's done!
                </p>
                <hr />
                <button className="button return-button" onClick={handleAdd}>Save to My Collection</button>
                <Link to="/index">
                  <button className="button return-button">Back to Main</button>
                </Link>
              </div>
            </div>
            <div className="more-margin">
              <h4 id="sblack" className="title is-4">
                <span role="img" aria-label="plate">
                  🍳
                </span>{' '}
                Cooking Instructions
              </h4>
              <p className="center-the-text">
                {meal.strInstructions}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default ShowMealResult