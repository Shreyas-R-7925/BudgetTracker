import React from 'react' 
import { Notifications, VerticalNavbar } from '../components' 

const Targets = ({username, id}) => {
  return (
    <div className='flex'>
        <VerticalNavbar username={username} /> 
        <div className='mt-10 ml-20'>
            <Notifications username={username} id={id}/>
        </div>
        
    </div>
  )
}

export default Targets