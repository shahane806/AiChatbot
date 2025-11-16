import React from 'react'

const AdminAccountCount = ({count}) => {
  return (
    <div className='totalAccounts-metrics'>
    <h3>Admin Accounts</h3>
    <p className='totalAccounts-metrics-count'>{count}</p>
</div>
  )
}

export default AdminAccountCount
