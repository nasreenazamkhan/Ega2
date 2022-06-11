import { FETCH_USER_REQUEST, FETCH_USER_FAILURE, FETCH_USER_SUCCESS } from "./userType"

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                error: '',
                users: action.payload,
                loading: false
            }

        case FETCH_USER_FAILURE:
            return {
                users: [],
                error: action.payload,
                loading: false
            }
        default:
            return state;

    }
}

export default userReducer;