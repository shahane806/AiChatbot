export const chatbot_reducer = (state=[],action)=>{
    console.log(state)

    switch(action.type){
        case "addChatbot":{
         return [...state,{payload : action?.payload}]
        
        }
        case "deleteChatbot":{
            let newState = state?.filter((e)=>{return e?._id != action?.payload})
            state = newState
            return state
        }
        case "updateChatbot":{
            
        }break;
        case "viewAllChatbots":{
            return state
        }
        default:{
            return state
        }
    }
}