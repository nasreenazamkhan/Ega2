import axios from "axios"
import { startLoading, endLoading, getLoginUserAccessToken } from "./storeAccess";


interface HttpParam {
    url: string;
    body?: string;
}

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
            return error;

        })

}

export const getHttp = (obj: HttpParam, showLoading = true) => {

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

    return axios.get(obj.url, config)
        .then(response => {
            endLoading();
            return response.data;
        })
        .catch(error => {
            endLoading();
            return error;

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

