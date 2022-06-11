import React from 'react'
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp, postHttp } from '../lib/common/HttpService';

class RequestContainerService {
    fetchPod(jobRefNo, containerNumber) {
        const remoteUrl = `${endpointContants.fetchPod}?referenceNumber=${jobRefNo}&containerNumber=${containerNumber}`;


        let obj = { url: remoteUrl };


        return getHttp(obj, false);

    }

    approvePod(values) {
        const remoteUrl = endpointContants.approvePod;

        let obj = {
            url: remoteUrl,
            body: values
        };

        return postHttp(obj, true).catch(error => {

            return error;
        });
    }

    fetchEtoken(jobRefNo, containerNumber, tokenType) {
        const remoteUrl = `${endpointContants.fetchEtoken}?jobRefNo=${jobRefNo}&containerNumber=${containerNumber}&tokenType=${tokenType}`;


        let obj = { url: remoteUrl };


        return getHttp(obj, false).catch(error => {

            return error;
        });

    }

    rejectPod(values) {
        const remoteUrl = endpointContants.rejectPod;

        let obj = {
            url: remoteUrl,
            body: values
        };

        return postHttp(obj, true).catch(error => {

            return error;
        });
    }

    requestForToken(values) {
        console.log("request for token ::",values);
        const remoteUrl = endpointContants.requestForToken;

        let obj = {
            url: remoteUrl,
            body: values
        };

        return postHttp(obj, true).catch(error => {

            return error;
        });
    }
    updateContainerDetails = (data) => {
        let remoteUrl = `${endpointContants.apiBaseUrl}/requestContainerDetails/updateRequestContainerDetails`;
        let obj = { url: remoteUrl, body: data };

        return postHttp(obj, true)
            .catch(error => {
                return error;
            });

    };

    start(values) {
        const remoteUrl = endpointContants.start;

        let obj = {
            url: remoteUrl,
            body: values
        };

        return postHttp(obj, true).catch(error => {

            return error;
        });
    }

    cancelContainer(data) {
        const remoteUrl = `${endpointContants.cancelContainer}`;
        let obj = { url: remoteUrl ,body:data};
        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

    saveRatingAndFeedback(data){
        const remoteUrl = `${endpointContants.ratingAndFeedback}`;
        let obj = { url: remoteUrl ,body:data};
        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

}


export default new RequestContainerService()