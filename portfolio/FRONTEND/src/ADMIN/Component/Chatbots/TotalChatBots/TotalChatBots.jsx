import React from 'react'

const TotalChatBots = ({count}) => {
  return (
    <div className='totalAccounts-metrics'>
    <h3>Total Chatbots</h3>
    <p className='totalAccounts-metrics-count'>{count}</p>
</div>
  )
}

export default TotalChatBots
