import React from 'react';
import * as endpointContants from '../utils/ptmsEndpoints';
import { getHttp } from '../lib/common/HttpService';
import axios from "axios";
import {  getLoginUserAccessToken } from "../lib/common/storeAccess";

class CommonService{

   postToExternalSite=(dataToPost, url)=>{
       console.log("dataToPost ::",dataToPost);
        const form = window.document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', url);
        const dataArr = Object.keys(dataToPost);
        for (let i = 0; i < dataArr.length; i++) {
            form.appendChild(this.createHiddenElement(dataArr[i], dataToPost[dataArr[i]]));
        }
        window.document.body.appendChild(form);
        form.submit();
    }

    createHiddenElement=(name, value)=> {
        const hiddenField = document.createElement('input');
        hiddenField.setAttribute('name', name);
        hiddenField.setAttribute('value', value);
        hiddenField.setAttribute('type', 'hidden');
        return hiddenField;
    }

    downloadReceipt = (referenceNumber) => {
        const remoteUrl =`${endpointContants.downloadReceipt}`+"/"+`${referenceNumber}`;
        console.log("remoteUrl::",remoteUrl);

        this.downloadBlob(remoteUrl);
    }
     downloadBlob=(remoteUrl)=>
        {
        let accessToken = getLoginUserAccessToken();
          
         axios(remoteUrl,{
            method: 'GET',
            headers:{                                                                                                                                                                                                                                              
                access_token: accessToken                                                                                                                                                                                                                                                                                                                                                                                                                                      
               }  ,       
            responseType: 'blob' //Force to receive data in a Blob Format
        }).then(response=>{
            const file = new Blob(
                [response.data], 
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
         })
        .catch(error=>
            {
                console.log("error in blob",error); 
            })
 
    }

    downloadInvoiceReceipt = (referenceNumber) => {
        const remoteUrl =`${endpointContants.downloadInvoiceReceipt}`+"/"+`${referenceNumber}`;
        console.log("remoteUrl::",remoteUrl);
        this.downloadBlob(remoteUrl);
    }

    downloadInvoice = (referenceNumber) => {
        
        const remoteUrl =`${endpointContants.downloadInvoice}`+"/"+`${referenceNumber}`;

        console.log("remoteUrl::",remoteUrl);
      
       
 
 
         this.downloadBlob(remoteUrl);
    }
}

export default new CommonService()