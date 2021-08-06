import { Link } from 'react-router-dom'
import React from 'react'

function CollectionButton() {

  const [click, setClick] = React.useState(0)

  const isBeers = window.localStorage.getItem('beer')
  const isFood = window.localStorage.getItem('food')
  const dontShowButton = (!isBeers || !isFood)

  const handleClick = () => {
    setClick(click + 1)
  }


  return (
    <>
      {dontShowButton ?
        <div className="has-text-centered add-margin-left" onClick={handleClick}>
          Once you have added <br />
          both a beer and meal <br />
          to your collection <br />
          <strong>double click here</strong>  to <br />
          see your collection!

        </div>
        : (
          <div className="has-text-centered is-fullwidth">
            <Link to='/collection' className='button is-fullwidth'> My Collection</Link>
          </div>
        )}
    </>

  )

}
export default CollectionButton