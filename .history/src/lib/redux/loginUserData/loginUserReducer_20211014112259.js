import { LOGIN_USER_SUCCESS, REFRESH_USER_SUCCESS, CONFIRM_USER_DETAILS, SESSION_EXPIRED } from "./loginUserType"

const initialState = {
    user: {
        access_token: '',
        refresh_token: '',
        expires_in_seconds: 900000,
        created_Time: new Date(),
        user_type:'',
        agentCode:'',
        userDetails: {
            email: '',
            landLineNumber: '',
            mobileNumber: '',
            confirmDetails: false,
            firstName:'',
            lastName:'',
            onBoarded:'N'
        }
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
                    expires_in_seconds: 900000,
                    userDetails: action.payload.userDetails? action.payload.userDetails: {
                        email: '',
                        landLineNumber: '',
                        mobileNumber: '',
                        confirmDetails: false,
                        firstName:'',
                        lastName:'',
                        isOnBoarded:'N'
                        
                    },
                    user_type:action.payload.user_type,
                    agentCode:action.payload.agentCode;
                },
                login: true
            }
        case REFRESH_USER_SUCCESS:
            return {
                user: {
                    access_token: action.payload.access_token,
                    refresh_token: action.payload.refresh_token,
                    created_time: new Date(),
                    expires_in_seconds: 900000,
                    userDetails: action.payload.userDetails,
                    userType:action.payload.userType
                },
                login: true
            }
            case SESSION_EXPIRED:
                return {
                    user: {
                        access_token: '',

                        
                    },
                    login: false
                   
                }

        default:
            return state;

    }
}

export default loginUserReducer;