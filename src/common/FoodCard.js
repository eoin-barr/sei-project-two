import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'


function FoodCard() {

  const [selection, setSelection] = React.useState('any')
  const [food, setFood] = React.useState()
  const [randFood, setRandFood] = React.useState()
  const [length, setLength] = React.useState(1)



  const handleAdd = () => {
    let latestLocal = window.localStorage.getItem('food')
    if (latestLocal === null) {
      latestLocal = []
      latestLocal.push(`${randFood.idMeal}`)
      window.localStorage.setItem('food', latestLocal.toString())
    } else {
      latestLocal = latestLocal.split(',')
      latestLocal.push(`${randFood.idMeal}`)
      console.log(latestLocal)
      window.localStorage.setItem('food', latestLocal.toString())
    }
  }


  const handleChange = (e) => {
    setSelection(e.target.value)

  }

  const handleRandomize = () => {
    if (length === 1) {
      const getInfoTwo = async () => {
        try {
          const res = await axios.get('http://www.themealdb.com/api/json/v1/1/random.php')
          setRandFood(res.data['meals'][0])
        } catch (err) {
          console.log(err)
        }
      }
      getInfoTwo()
    } else {
      setRandFood(food['meals'][Math.floor(Math.random() * length)])
    }
  }

  React.useEffect(() => {

    const getInfo = async () => {

      if (selection === 'any') {
        try {
          setLength(1)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          const res = await axios.get(`http://www.themealdb.com/api/json/v1/1/filter.php?a=${selection}`)
          setFood(res.data)
          setLength(res.data['meals'].length)
        } catch (err) {
          console.log(err)
        }
      }
    }
    getInfo()
  }, [selection])


  return (

    <section className='section food-section'>
      <div className='container'>
        <div className='columns flex-style' >

          <div className='card-content'>
            <div className="h1-container">
              <h1 className="title h1" >Food</h1>
            </div>
            <div className="level">
              <div className='select' >
                <select onChange={handleChange}>
                  <option selected disabled>Cuisine</option>
                  <option name='Any' value='any'>Any</option>
                  <option name='italian' value='italian'>Italian</option>
                  <option name='chinese' value='chinese'>Chinese</option>
                  <option name='thai' value='thai'>Thai</option>
                  <option name='indian' value='indian'>Indian</option>
                  <option name='american' value='american'>American</option>
                </select>
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header'>

              <div className="title">
                {randFood ? randFood.strMeal : 'Pizza'}
              </div>
            </div>

            <div className='card-image'>
              <figure className='image food-center-image'>
                <img className="img-food" src={randFood ? randFood.strMealThumb : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg'} alt='placeholder image' />
              </figure>
            </div>
            <p className='has-text-centered card-content'> {randFood ? randFood.strMeal : 'Vegetarian'}</p>
          </div>



        </div>
        <div className="btn-container">
          <button className='button food-button is-half-width' onClick={handleRandomize}>Change Meal</button>
          <Link to={`/meal/${randFood ? randFood.idMeal : ''}`}>
            <button className="button food-button is-fullwidth">Tell Me More</button>
          </Link>
          <button className='button food-button is-half-width' onClick={handleAdd}>Save Meal to My Collection</button>

        </div>
      </div>
    </section>
  )
}

export default FoodCard