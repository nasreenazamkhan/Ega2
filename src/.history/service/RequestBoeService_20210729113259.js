import React from 'react'
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp, postHttp } from '../lib/common/HttpService';

class RequestBoeService {

    fetchRequestDetails(transactionCode, containerNumber) {
        const remoteUrl = `${endpointContants.fetchRequestDetails}/${transactionCode}?containerNumber=${containerNumber}`;
        // const remoteUrl = '${endpointContants.fetchTrucksForTransporter}?transporterCode=${transporterCode}&vehicleType=${vehicleType}';
        let obj = { url: remoteUrl };
        return getHttp(obj, false);
    }

    fetchSupportingFiles(referenceNumber) {
        const remoteUrl = `${endpointContants.fetchSupportingFiles}?referenceNumber=${referenceNumber}`;
        let obj = { url: remoteUrl };
        return getHttp(obj, false);
    }

    fetchContainerTypes() {
        const remoteUrl = `${endpointContants.fetchContainerTypes}`;
        let obj = { url: remoteUrl };
        return getHttp(obj, false);
    }

    cancelRequestByAdmin(data) {
        const remoteUrl = `${endpointContants.cancelRequestByAdmin}`;
        let obj = { url: remoteUrl ,body:data};
        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

    updateRequestByAdmin(data) {
        const remoteUrl = `${endpointContants.updateRequestForAdmin}`;
        let obj = { url: remoteUrl ,body:data};
        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

   fetchAllInvoices(referenceNumber,type)
   {
    const remoteUrl = `${endpointContants.fetchAllInvoices}?referenceNumber=${referenceNumber}&type=${type}`;

    let obj = { url: remoteUrl};

    return getHttp(obj,false);
   }

   fetchRequestDetailsWithDocuments(referenceNumber)
   {
    const remoteUrl = `${endpointContants.fetchRequestDetailsWithDocuments}?referenceNumber=${referenceNumber}`;

    let obj = { url: remoteUrl};

    return getHttp(obj,false);
   }

}

export default new RequestBoeService()
