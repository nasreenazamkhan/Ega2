import { postHttp } from '../lib/common/HttpService';
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp } from '../lib/common/HttpService';
import { checkForExistingTrip } from './../utils/ptmsEndpoints';



class JobService {

    

    fetchSettlements()
    {
        const remoteUrl =`${endpointContants.fetchSettlements}`;

  
        let obj = { url: remoteUrl };


       return getHttp(obj, false);
           

    }

   

    }


export default new JobService()