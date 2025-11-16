import React from 'react'
const UserAccountsCount = ({count}) => {
  return (
    <div className='totalAccounts-metrics'>
          <h3>User Accounts</h3>
          <p className='totalAccounts-metrics-count'>{count}</p>
    </div>
  )
}

export default UserAccountsCount
