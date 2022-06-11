import { LOGIN_USER_SUCCESS, REFRESH_USER_SUCCESS } from "./loginUserType"

const initialState = {
    user: {
        access_token: '',
        refresh_token: '',
        expires_in_seconds: 900000,
        created_Time: new Date()
    },
    login: false
}

const loginUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                user: {
                    access_token: action.payload.access_token,
                    refresh_token: action.refresh_token,
                    created_time: new Date(),
                    expires_in_seconds: 900000

                },
                login: true
            }
        case REFRESH_USER_SUCCESS:
            return {
                user: {
                    access_token: action.payload.access_token,
                    refresh_token: action.payload.refresh_token,
                    created_time: new Date(),
                    expires_in_seconds: 900000
                },
                login: true
            }
        default:
            return state;

    }
}

export default loginUserReducer;