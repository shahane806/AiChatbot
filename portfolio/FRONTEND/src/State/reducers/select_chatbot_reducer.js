export const select_chatbot_reducer = async(state=[],action)=>{
    switch(action.type){
        case "selectChatbot":{
            return state = action.payload
        }
        default:{
            return state
        }
    }
}