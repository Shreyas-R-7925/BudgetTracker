import React from 'react' 
import {Boxes, VerticalNavbar} from '../components'

const Home = () => {
  return (  
    <div className="flex">
      <VerticalNavbar />
      <div className="ml-40 p-4"> {/* Adjust the margin-left to accommodate navbar width */}
        <Boxes color="blue" comment="BALANCE"/>
        <Boxes color="green" comment="RENT"/>
        <Boxes color="yellow" comment="SHOPPING"/>
        <Boxes color="yellow" comment="FOOD"/>
        <Boxes color="yellow" comment="OTHERS"/>
      </div>
    </div>
  )
}

export default Home