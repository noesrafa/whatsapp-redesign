import { SET_USER } from "../actions/sign.action.js";

const initialState = {
    user: ''
}

const sign_reducer = ( state = initialState, action) => {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: (action.payload)
            }
    
        default:
            return state;
    }
}

export default sign_reducer;