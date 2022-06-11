
import * as endpointContants from '../../utils/ptmsEndpoints';
import { getHttp } from '../../lib/common/HttpService';

class AssignTokenService {

    fetchPendingTokenJobs(referenceNumber,status) {
        const remoteUrl =`${endpointContants.fetchPendingTokenJobs}?referenceNumber=${referenceNumber}&status=${status}`;

         let obj = { url: remoteUrl };
 
        return getHttp(obj, false);
    }


fetchPendingPODJobs() {
    const remoteUrl =`${endpointContants.fetchPendingPODJobs}`;

    let obj = { url: remoteUrl };

   return getHttp(obj, false);
}
}
export default new AssignTokenService();