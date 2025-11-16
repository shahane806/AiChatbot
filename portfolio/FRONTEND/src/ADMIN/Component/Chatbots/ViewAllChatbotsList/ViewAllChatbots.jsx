import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { viewAllChatbots } from '../../../../API/api'

const ViewAllChatbots = () => {
  let allChatbotsState = useSelector((state)=>{return state?.chatbot_reducer})
  const [allChatbots,setAllChatbots] = useState(allChatbotsState)
  const [count ,setCount] = useState(0)
  const viewChatbots = async()=>{
    await viewAllChatbots(JSON.parse(localStorage.getItem("admin-info"))?._id,localStorage.getItem("admin-access-token")).then(res=>{ setAllChatbots(res?.data); setCount(res?.data?.length); localStorage.setItem("chatbotCount",res?.data?.length) })
  }
  useEffect(()=>{
    viewChatbots()

  },[allChatbotsState,])
  
   return (
    <div className='Dashboard-Component-1 width_95percent  marginTop_10px disflex align-item-start justify-content-center '>
          {count == 0 && <h3 className='spanHeading fontSize_30px '>No Chatbot Found</h3>}
          {
            count !=0 &&  <table className="Dashboard-Components-Online-Account-Details-Table">
            <thead>
            <th>Sr.No</th>
            <th>_id</th>
            <th>Icon</th>
            <th>Name</th>
            <th>BackendUrl</th>
            <th>FrontendUrl</th>
            </thead>
            <tbody>
            
         {allChatbots?.map((e,i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e?.payload?._id||e?._id}</td>
                  <td>{e?.payload?.chatbotIcon||e?.icon}</td>
                  <td>{e?.payload?.chatbotName||e?.name}</td>
                  <td>{e?.payload?.chatbotBackendUrl||e?.backendUrl}</td>
                  <td>{e?.payload?.chatbotUIPath||e?.frontendUrl}</td>
                </tr>
              );
            })}
            </tbody>
    
          </table>
          }

  </div>
  )
}

export default ViewAllChatbots
