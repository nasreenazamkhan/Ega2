
import axios from "axios";
import { endLoading, getLoginUserAccessToken } from "../../src/lib/common/storeAccess";

const upload = (file, popUpParams, onUploadProgress) => {
  let formData = new FormData();
  console.log("files :::", file);
  for (var x = 0; x < file.length; x++) {
    formData.append("file", file[x]);
  }
  // formData.append("file", file);
  console.log("formData ::", formData);
  const remoteUrl = "/ptms/app/api/secure/fileUpload/upload";

  let obj = {
    url: remoteUrl,
    body: formData
  };


  let accessToken = getLoginUserAccessToken();

  let config = {
    headers: {
      access_token: accessToken,
      'content-type': 'multipart/form-data',
    },
    params: {
      locale: 'en',
      paramDto: {
        upload: popUpParams.uploadType,
        referenceNumber: popUpParams.referenceNumber,
        dpwTransactionId: popUpParams.dpwTransactionId,
        requestNumber: popUpParams.requestNumber,
        createdBy:popUpParams.createdBy,
        transporterComments: popUpParams.transporterComment
      }
    },
    onUploadProgress,
  }



  return axios.post(obj.url, obj.body, config)
    .then(response => {
      endLoading();
      return response.data;
    })
    .catch(error => {
      endLoading();
      return error;
    })


}

const getFiles = () => {
  const remoteUrl = "ptms/app/api/secure/fileUpload/files";
  let obj = {
    url: remoteUrl,
  };
  let accessToken = getLoginUserAccessToken();
  let config = {
    headers: {
      access_token: accessToken,
    },
    params: {
      locale: 'en'
    },
  }
  return axios.get(obj.url, config)
};

export default {
  upload,
  getFiles,
};