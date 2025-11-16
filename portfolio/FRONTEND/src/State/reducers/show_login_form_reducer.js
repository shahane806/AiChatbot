export const show_login_form_reducer = (state = true, action) =>{
    switch(action?.type){
        case "show_login_form":{
            return state = !state;
        }
        default :{
            return state
        }
    }

}