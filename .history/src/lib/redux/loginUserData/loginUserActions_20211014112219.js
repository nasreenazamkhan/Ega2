import { LOGIN_USER_SUCCESS, REFRESH_USER_SUCCESS } from "./loginUserType";
import { getHttp } from "../../common/HttpService";
import * as endpointContants from '../../../utils/ptmsEndpoints';

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};

export const refreshUserSuccess = (user) => {
  return {
    type: REFRESH_USER_SUCCESS,
    payload: user,
  };
};



export const loginUser = () => {
    return (dispatch) => {
        // dispatch(fetchUserRequest);
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        let agent_code=params.get('agent_code');
        let agent_type=params.get('agent_type');
      
        console.log(' Login User');
        const remoteUrl = `/ptms/app/api/auth/getToken`;
        getHttp({ url: remoteUrl,paramValues:{agentCode:agent_code,agentType:agent_type}}, false)
            .then(response => {
                // const users = response.data;
                let user = { access_token: response.token, refresh_token: response.validity,user_type:response.userType};
               dispatch(loginUserSuccess(user));
               const remoteUrl =`${endpointContants.fetchConfirmDetailsPage}`;
               let userDetails = {};
               getHttp({ url: remoteUrl }, false)
                    .then(response => {
                    
                      userDetails = response.data.dataItems[0];
                      
                      user.userDetails = userDetails;
                      user.agentCode=agent_code;
                      dispatch(loginUserSuccess(user));
                })
                .catch(error => {
                    // const errMsg = error.message;
                    // dispatch(fetchUserFailure(errMsg));
                })
                
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
