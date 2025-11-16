export const show_emoji_pannel_reducer = (state = {isOpen : true},action)=>{
  switch(action.type){
    case "show_emoji_pannel":{
        return state = {isOpen : !state.isOpen}
    }
    default : {
        return state;
    }
  }
}