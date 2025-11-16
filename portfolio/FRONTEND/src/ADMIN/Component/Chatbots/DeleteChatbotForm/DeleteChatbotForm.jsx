import React, { useState } from 'react'
import Skeleton from "@mui/material/Skeleton";
import { deleteChatbot } from '../../../../API/api';
import { deleteChatbotFromReducer } from '../../../../State/action-creators';
import { useDispatch } from 'react-redux';

const DeleteChatbotForm = () => {
  const [_id,setId]  = useState(undefined);
  const dispatch = useDispatch();
  const [deleteBtnClicked,setDeleteBtnClicked] = useState(false)
  const handleDeleteChatbot = async(e) =>{
    e.preventDefault();
    setDeleteBtnClicked(true)
    console.log(_id)
    await deleteChatbot(JSON.parse(localStorage.getItem("admin-info"))?._id,localStorage.getItem("admin-access-token"),_id).then((res)=>{
    
      if(res?.status == 200){
        deleteChatbotFromReducer(_id,dispatch)
        alert(res?.data?.Message)
        
        
      }
      else{
        alert(res?.data?.Message)
      }

    })
    setTimeout(() => {
      setId(undefined)
      setDeleteBtnClicked(false)
    }, 3000);
  }
  return (
    <div className='Dashboard-Component-1 width_100percent '>
       {
        !deleteBtnClicked &&  <form>
        <input
          type="text"
          className="inputText"
          name="id"
          onChange={(e)=>{setId(e.target.value)}}
          placeholder="Enter Chatbot _id"
          required
        />
      <button
          onClick={(e)=>{handleDeleteChatbot(e)}}
          className="uploadBtn"
        >Delete</button>
      </form>
       }
       {
        deleteBtnClicked && <>
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={100}
          animation="wave"
          style={{
            marginTop: "-5px",
          }}
        />
</>
       }
    </div>
  )
}

export default DeleteChatbotForm
