import axios from 'axios'
import React from 'react'

function ShowFood() {
  const [food, setFood] = React.useState()
  const [beer, setBeer] = React.useState()

  const isFood = food
  const isBeer = beer


  React.useEffect(() => {
    const codeArray = window.localStorage.getItem('food').split(',')
    console.log(codeArray)

    const linkArray = codeArray.map(code => {
      return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${code}`
    })
    console.log(linkArray)

    axios.all(linkArray.map(l => axios.get(l)))
      .then(function (res) {
        setFood(res)
      })


  }, [])

  React.useEffect(() => {
    const codeArray = window.localStorage.getItem('beer').split(',')
    console.log(codeArray)

    const linkArray = codeArray.map(code => {
      return `https://api.punkapi.com/v2/beers/${code}`
    })
    console.log(linkArray)

    axios.all(linkArray.map(l => axios.get(l)))
      .then(function (res) {
        setBeer(res)
      })


  }, [])

  console.log(food)
  console.log(beer)

  return (
    <>
      <div className="hero">

        <section className="section ">
          <div className="div-flexi">
            <h1 className="h1-flexi">Your Collection</h1>
          </div>
          <div className="container">
            <div className='columns'>
              <div className="flexi">
                {isFood ? food.map((dish, index) => <div className="column is-half" key={index}>

                  <div>
                    <div className="card card-height">
                      <div className="card-header is-fullwidths">

                        <div className="title">
                          {dish.data.meals[0].strMeal}

                        </div>
                      </div>
                      <div className="card-image">
                        <figure className="image food-center-image">
                          <img className="img-food" src={dish.data.meals[0].strMealThumb} />
                        </figure>
                      </div>
                      <div className="card-content display-center">
                        <h5>{dish.data.meals[0].strCategory}</h5>
                      </div>
                    </div>
                  </div>

                </div>)
                  :
                  'loading'
                }
              </div>
              <div className="flexi">
                {isBeer ? beer.map((beer, index) => <div className="column is-half" key={index}>

                  <div >
                    <div className="card card-height">
                      <div className="card-header is-fullwidths">

                        <div className="title">
                          {beer.data[0].name}

                        </div>
                      </div>
                      <div className="card-image">
                        <figure className="image center-image">
                          <img className="img-beer" src={beer.data[0].image_url} />
                        </figure>
                      </div>
                      <div className="card-content display-center">
                        <h5>ABV {beer.data[0].abv}</h5>
                      </div>
                    </div>
                  </div>
                </div>)
                  :
                  'loading'
                }
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default ShowFood