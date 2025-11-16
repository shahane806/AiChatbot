import React from 'react'

const ChatbotCount = ({count}) => {
  return (
    <div className='totalAccounts-metrics'>
          <h3>Chatbots</h3>
          <p className='totalAccounts-metrics-count'>{count}</p>
    </div>
  )
}

export default ChatbotCount
