export const chat_reducer = (state = [],action)=>{
    console.log(action)
    switch(action?.type){
        case "send_message":{
            return [...state,{payload : action?.payload}]
        }
        case "clearChat":{
            return state = [];
        }
        default : {
            return state
        }
    }
}