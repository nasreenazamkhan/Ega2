import React from 'react'
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp } from '../lib/common/HttpService';

class RequestBoeService {

   


    fetchRequestDetails(transactionCode,containerNumber)
    {
        const remoteUrl =`${endpointContants.fetchRequestDetails}/${transactionCode}?containerNumber=${containerNumber}`;

       // const remoteUrl = '${endpointContants.fetchTrucksForTransporter}?transporterCode=${transporterCode}&vehicleType=${vehicleType}';
     
        let obj = { url: remoteUrl };


       return getHttp(obj, false);
           

    }

   fetchSupportingFiles(referenceNumber)
   {
       const remoteUrl = `${endpointContants.fetchSupportingFiles}?referenceNumber=${referenceNumber}`;

       let obj = { url: remoteUrl};

       return getHttp(obj,false);
   }

}

export default new RequestBoeService()
