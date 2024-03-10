import React from 'react' 
import { VerticalNavbar } from '../components'

const Settings = ({username, id}) => {
  console.log("in settings page",id);
  return (
    <div>Settings
        <VerticalNavbar username={username}/>  
    </div>
  )
}

export default Settings