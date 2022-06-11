import React from 'react'
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp } from '../lib/common/HttpService';

class RefVehicleTypeService {

   fetchVehicleType() {
      let remoteUrl = `${endpointContants.fetchVehicleType}`;

      let obj = { url: remoteUrl };
      return getHttp(obj, false);
   }

   update() {
      let remoteUrl = `${endpointContants.fetchVehicleType}`;

      let obj = { url: remoteUrl };
      return getHttp(obj, false);
   }
}

export default new RefVehicleTypeService()