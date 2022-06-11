import axios from "axios"
import { startLoading, endLoading, getLoginUserAccessToken } from "./storeAccess";


interface HttpParam {
    url: string;
    body?: string;
    paramValues?:any
}

axios.interceptors.response.use(res => {
    return res;
}, (error) => {
        switch (error.response.status) {
       
        case 408:
             console.log('Session Expired');
             break;
       
        default:
            
   }
//return Promise.reject(error);
        return error;
});

export const postHttp = (obj: HttpParam, showLoading = true) => {
    let accessToken = getLoginUserAccessToken();

    let config = {
        headers: {
            access_token: accessToken,
        },
        params: {
            locale: 'en'
          }
    }
    if (showLoading === true)
        startLoading();

    return axios.post(obj.url, obj.body, config)
        .then(response => {
            endLoading();
            return response.data;
        })
        .catch(error => {
            endLoading();
           console.log("Error on post resquest " ,error?.response?.data);
            return error?.response?.data;
        })

}

export const getHttp = (obj: HttpParam, showLoading = true) => {

    let accessToken = getLoginUserAccessToken();

    let config = {
        headers: {
            access_token: accessToken,
        },
        params: {
           ...obj.paramValues,
            locale: 'en'
          }
    }
    if (showLoading === true)
        startLoading();

    return axios.get(obj.url, config)
        .then(response => {
            endLoading();
            console.log("response is ")
            return response?.data;
        })
        // .then(response => {
        //     endLoading();
        //     return response;
        // })
        .catch(error => {
            endLoading();
            console.log("Error on get resquest ***" );

            return error?.response?.statusText;

        })

}

export const getHttpAsync = async (obj: HttpParam, showLoading = true) => {

    let accessToken = getLoginUserAccessToken();
    let data = '';
    let config = {
        headers: {
            access_token: accessToken,
        }
    }
    if (showLoading === true)
        startLoading();

    try {
        const response = await axios.get(obj.url, config);
        data = await response.data;
    } catch (error) {
        data = error;
    }
    endLoading();
    return data;
}

// export const getHttp2 = (obj, showLoading = true) => {

//     if (showLoading === true)
//         startLoading();

//     return new Promise((resolve,reject)=>{

//     })
//     return axios.get(obj.url)
//     // .then(response => {
//     //     endLoading();
//     //     return response.data;
//     // })
//     // .catch(error => {
//     //     endLoading();
//     //     return error;

//     // })

// }

