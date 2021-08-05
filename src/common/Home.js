import React from 'react'
import PopUp from './PopUp'

function Home() {
  const [popUp, setPopUp] = React.useState(false)
  const duringPopUp = popUp ? ' during-popup' : ''


  return (
    <section className="hero is-fullheight is-black">
      <div className="hero-body">
        <div className="container ">
          <div className={'Checkout' + 'start-btn' + duringPopUp}>
            <div onClick={() => setPopUp(true)} className={`start-btn ${duringPopUp}`}>Click Here To Start</div>
            {popUp && <PopUp setPopUp={setPopUp} />}
          </div>
        </div>
      </div>
    </section>








  )
}
export default Home