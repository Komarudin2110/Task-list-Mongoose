import { combineReducers } from 'redux'

let initState = {
    _id: 0,
    username: ''
}

let authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, _id: action.payload._id, username: action.payload.username }

        case "LOGOUT_SUCCESS":
            return { ...initState }

        default:
            return state
    }
}


let reducer = combineReducers(
    {
        auth: authReducer
    }
)

export default reducer