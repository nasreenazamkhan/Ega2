import { postHttp } from '../lib/common/HttpService';
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp } from '../lib/common/HttpService';
import { checkForExistingTrip } from './../utils/ptmsEndpoints';



class AssignTruckAndDriverService {

    assignTruckAndTokenAdmin(containerData) {

        const remoteUrl = endpointContants.assignTruckAndTokenAdmin ;

        let obj =  { url: remoteUrl ,
            body:containerData
         };

       return  postHttp(obj, true).catch(error => {
    
        return error;
       });
               
    }

    addToMyJobs(containerData)
    {
        const remoteUrl = endpointContants.addToMyJobs ;
        let obj =  { url: remoteUrl ,
            body:containerData
         };
         return  postHttp(obj, true).catch(error => {
    
            return error;
           });



    }
    
    fetchTrucksForUserTypes()
    {
        const remoteUrl =`${endpointContants.fetchTruckByUserTypes}`;

       // const remoteUrl = '${endpointContants.fetchTrucksForTransporter}?transporterCode=${transporterCode}&vehicleType=${vehicleType}';
     


        let obj = { url: remoteUrl };


       return getHttp(obj, false);
           

    }

    fetchTrucksForTransporter(transporter)
    {
        const remoteUrl =`${endpointContants.fetchTrucksForTransporter}?transporter=${transporter}`;

       // const remoteUrl = '${endpointContants.fetchTrucksForTransporter}?transporterCode=${transporterCode}&vehicleType=${vehicleType}';
     


        let obj = { url: remoteUrl };


       return getHttp(obj, false);
           

    }

    sendJobForApproval(jobList)
    {
        const remoteUrl = endpointContants.sendJobsForApproval ;

        let obj =  { url: remoteUrl ,
            body:jobList
         };

       return  postHttp(obj, true).catch(error => {
    
        return error;
       });
    }


    fetchTransporters()
    {
        const remoteUrl = endpointContants.fetchTransporters ;

        let obj =  { url: remoteUrl };

       return  getHttp(obj, false).catch(error => {
    
        return error;
       });
    }

    fetchOnBoardedTransporters()
    {
        const remoteUrl = endpointContants.fetchOnBoardedTransporters ;

        let obj =  { url: remoteUrl };

       return  getHttp(obj, false).catch(error => {
    
        return error;
       });
    }


           

    }


export default new AssignTruckAndDriverService()