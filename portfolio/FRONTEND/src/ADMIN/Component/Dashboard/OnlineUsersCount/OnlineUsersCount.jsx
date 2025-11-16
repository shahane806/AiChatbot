import React from 'react'
const OnlineUserCount = ({count,TotalUsers}) => {
  return (
    <div className='totalAccounts-metrics'>
          <h3>Online</h3>
          <p className='totalAccounts-metrics-count'>{count}/{TotalUsers}</p>
    </div>
  )
}

export default OnlineUserCount
