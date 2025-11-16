import React from 'react'
import './style.css'
const TotalUsers = ({count}) => {
  return (
    <div className='totalAccounts-metrics'>
          <h3>Total Accounts</h3>
          <p className='totalAccounts-metrics-count'>{count}</p>
    </div>
  )
}

export default TotalUsers
