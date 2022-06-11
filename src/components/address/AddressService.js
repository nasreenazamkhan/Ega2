import React from 'react';
import * as endpointContants from '../../utils/ptmsEndpoints';
import { getHttp,postHttp } from '../../lib/common/HttpService';

class AddressService {

   


    fetchAddress()
    {
        const remoteUrl =`${endpointContants.fetchAddress}`;

       // const remoteUrl = '${endpointContants.fetchTrucksForTransporter}?transporterCode=${transporterCode}&vehicleType=${vehicleType}';
     
        let obj = { url: remoteUrl };


       return getHttp(obj, false);
           

    }

    fetchAddressList(){
         const remoteUrl =`${endpointContants.fetchAddressList}`;
          let obj = { url: remoteUrl };
       return getHttp(obj, false);
    }

    deleteAddress(addressCode) {
        const remoteUrl = endpointContants.deleteAddress+"/"+addressCode;
        console.log("e in dete::", addressCode);
    let obj = { url: remoteUrl};

    return postHttp(obj, true).catch((error) => {
      return error;
    });
    }
}

export default new AddressService()
