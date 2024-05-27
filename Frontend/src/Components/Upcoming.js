import React from 'react'
import Sidebar from './Sidebar'

const Upcoming = () => {
  return (
    <div className="flex  h-screen">
      <Sidebar name="upcoming" />
      <div className="w-full h-screen ">
        <h1>Upcoming</h1>
        {/* <img src={ilustration}></img> */}
      </div>
    </div>
  )
}

export default Upcoming