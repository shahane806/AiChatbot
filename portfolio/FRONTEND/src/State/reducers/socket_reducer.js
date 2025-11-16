export const socket_reducer = (state = null, action)=>{
    
    switch(action.type){
        case "getSocket":{
            return state
        }
        case "setSocket":{
            return state = action.payload
        }
        default :{
            return state
        }
    }
}