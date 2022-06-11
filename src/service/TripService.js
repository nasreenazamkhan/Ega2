import { postHttp } from '../lib/common/HttpService';
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp } from '../lib/common/HttpService';
import { checkForExistingTrip } from './../utils/ptmsEndpoints';



class TripService {

    saveFormData(formData) {

        const remoteUrl = endpointContants.saveTruckAndDriverInfo ;

        let obj =  { url: remoteUrl ,
            body:formData
         };

       return  postHttp(obj, true).catch(error => {
    
        return error;
       });
               
    }



    fetchContainerDetailsForTrip(tripRefNo)
    {
        const remoteUrl =`${endpointContants.fetchContainerDetailsForTrip}?tripRefNo=${tripRefNo}`;

       // const remoteUrl = '${endpointContants.fetchTrucksForTransporter}?transporterCode=${transporterCode}&vehicleType=${vehicleType}';
     


        let obj = { url: remoteUrl };


       return getHttp(obj, false);
           

    }



    updateTrip(values) {

        const remoteUrl = endpointContants.updateTrip ;

        let obj =  { url: remoteUrl ,
            body:values
         };

       return  postHttp(obj, true).catch(error => {
    
        return error;
       });
               
    }

}

export default new TripService()