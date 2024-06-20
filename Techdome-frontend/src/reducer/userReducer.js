import { LOGIN_SUCCESS, LOGIN_REQUEST, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL, LOGOUT_SUCCESS } from "../constants/userConstants";


const userReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }


        case LOAD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
            }

        case LOGOUT_SUCCESS:
            return {
                user: null,
                isAuthenticated: false,
            }

        default:
            return state;
    }
}

export default userReducer;