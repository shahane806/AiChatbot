export const prompt_reducer = (state = "",action)=>{
    switch(action?.type){
        case "set_prompt":{
            return state = action?.payload;
        }
        case "get_prompt":{
            return state;
        }
        case "clear_prompt":{
            return state = "";
        }
        default:{
            return state;
        }
    }
}