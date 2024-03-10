import React from 'react' 
import { VerticalNavbar } from '../components'

const Report = ({username, id}) => {
  console.log("in report page", id);
  return (
    <div>
        <VerticalNavbar username={username}/> 
        <h1>Report</h1>
    </div>
  )
}

export default Report