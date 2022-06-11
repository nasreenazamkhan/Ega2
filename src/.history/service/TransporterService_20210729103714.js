
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp,postHttp } from '../lib/common/HttpService';


class TransporterService {

    fetchCountForDashBoard() {
        const remoteUrl = endpointContants.countRequestDetailsByStatus ;
         let obj = { url: remoteUrl };
         return getHttp(obj, false);           
    }

    countSettlements() {
        const remoteUrl = endpointContants.countSettlements ;
         let obj = { url: remoteUrl };
         return getHttp(obj, false); 
    }

    countTrucks() {
        const remoteUrl = endpointContants.countTrucks ;
         let obj = { url: remoteUrl };
         return getHttp(obj, false);     
    }

    countjobs() {
        const remoteUrl = endpointContants.countJobs ;
        let obj = { url: remoteUrl };
        return getHttp(obj, false);
    }

    fetchDriverItems() {
        const remoteUrl = endpointContants.fetchDriversForTransporter ;
         let obj = { url: remoteUrl };
         return getHttp(obj, false);   
    }

    reAssigntruck(data){
        console.log("data in reAssign ::",data);
        const remoteUrl = endpointContants.reAssigntruck;
        let obj = { url: remoteUrl ,body:data};
        return postHttp(obj, true).catch(error => {
            return error;
        });
    }

    fetchOnBoardedTransporters() {
        const remoteUrl = endpointContants.fetchOnBoardedTransporters ;
         let obj = { url: remoteUrl };
         return getHttp(obj, false);   
    }

    uploadInvoices(data){
       
        const remoteUrl = endpointContants.uploadMiscellaneousInvoices;
        let obj = { url: remoteUrl ,body:data};
        return postHttp(obj, true).catch(error => {
            return error;
        });
    }


}


export default new TransporterService()