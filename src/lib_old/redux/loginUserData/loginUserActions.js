import { LOGIN_USER_SUCCESS, REFRESH_USER_SUCCESS } from "./loginUserType"
import axios from 'axios';
import { getHttp } from "../../common/HttpService";

export const loginUserSuccess = (user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload: user
    }
}

export const refreshUserSuccess = (user) => {
    return {
        type: REFRESH_USER_SUCCESS,
        payload: user
    }
}




export const loginUser = () => {
    return (dispatch) => {
        // dispatch(fetchUserRequest);
        console.log(' Login User');
        const remoteUrl = "/ptms/app/api/auth/getToken";
        getHttp({ url: remoteUrl }, false)
            .then(response => {

                // const users = response.data;
                let user = { access_token: response.token, refresh_token: response.validity }
                dispatch(loginUserSuccess(user));

            })
            .catch(error => {
                // const errMsg = error.message;
                // dispatch(fetchUserFailure(errMsg));
            })
    }
}
export const loginWithAuthData = (obj) => {
  return (dispatch) => {
    let user = {
      access_token: obj.access_token,
      refresh_token: obj.refresh_token,
    };
    dispatch(loginUserSuccess(user));
  };
};
