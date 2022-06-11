import { postHttp } from '../lib/common/HttpService';
import * as endpointContants from '../utils/ptmsEndpoints';

class ConfirmUserDetailsService {

saveFormData(formData) {

    const remoteUrl = endpointContants.saveUserDetails ;

    let obj =  { url: remoteUrl ,
        body:formData
     };

   return  postHttp(obj, true).catch(error => {

    return error;
   });
           
}

}

export default new ConfirmUserDetailsService()
           
