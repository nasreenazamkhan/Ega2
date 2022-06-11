
import * as endpointContants from '../../utils/ptmsEndpoints';
import { getHttp } from '../../lib/common/HttpService';
import { postHttp } from '../../lib/common/HttpService';

class AssignTokenService {

    fetchPendingTokenJobs(referenceNumber,status) {
        const remoteUrl =`${endpointContants.fetchPendingTokenJobs}?referenceNumber=${referenceNumber}&status=${status}`;

         let obj = { url: remoteUrl };
 
        return getHttp(obj, false);
    }

    updateToken(requestDetails)
    {
        let obj = {
            url: `${endpointContants.updateToken}`,
            body: requestDetails,
          };

          return postHttp(obj, true).catch(error => {
            return error;
        });
    }


fetchPendingPODJobs() {
    const remoteUrl =`${endpointContants.fetchPendingPODJobs}`;

    let obj = { url: remoteUrl };

   return getHttp(obj, false);
}
}
export default new AssignTokenService();