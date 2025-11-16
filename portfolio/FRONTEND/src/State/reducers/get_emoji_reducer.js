export const get_emoji_reducer = (state = {},action)=>{
    switch(action?.type){
        case "get_emoji":{
            return state = action?.payload;
        }
        default : {
            return state;
        }
    }
}