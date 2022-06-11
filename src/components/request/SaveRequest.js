import React,{ useEffect,useState} from 'react';
import AppButton from '../../lib/components/buttons/appButton';
import { Formik, Form } from 'formik';
import FormContainer from '../../lib/components/formContainer/formContainer';
import { postHttp ,getHttp} from '../../lib/common/HttpService';
import { useHistory } from "react-router-dom";
import CommonService from '../../service/CommonService';
import AppRadio from "../../lib/components/radio/appRadio";
import { FormProvider, useForm } from "react-hook-form";
import ApplnSelectBox from "../../lib/components/select/ApplnSelectBox";

export default function SaveRequest(props){

    const methods = useForm({
  //  resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  defaultValues: "",
  });

 const { handleSubmit,reset} = methods;

let remoteBaseUrl = "/ptms/app/api/secure/";

const paymentOptions = [{"label": "Instant", "value": "Instant"}, {"label": "Hold", "value": "Hold"}]

 

 

const [formvalues, setFormvalues] = useState("");
const [pstate, setPstate] = useState(0);
  const [masterVals, setMasterVals] = useState({
    statusOpts: [],
    compMouted: false,
  });

useEffect(() => {
    setMasterVals((prevstate) => ({
      statusOpts: [
        { label: "", value: "-1" },
        { label: "Instant", value: "Instant" },
        { label: "Hold", value: "Hold" },
      ],
      compMouted: true,
    }));
  }, []);

const onSubmit = (data) => {

    const formData = {
consigneeCode : 'abc',
containerList : [
{ container_number:'c007', iso_code:'1000' ,requestBoeNumber:'r001',dpwTransactionId:'T-0000000225',consigneeName:'xyz', consigneeNumber:'c1',zoneTariffCode:'JEAJAFZAS',consigneeEmail:'abc@gmail.com',dropAddress:'sharjah',dropTime:'',dropInterval:'4AM-6AM'},
{ container_number:'c008', iso_code:'1001' ,requestBoeNumber:'r002',dpwTransactionId:'T-0000000225',consigneeName:'xyzq', consigneeNumber:'c2',zoneTariffCode:'JEAJAFZAS',consigneeEmail:'abcs@gmail.com',dropAddress:'sharjah',dropTime:'',dropInterval:'4AM-6AM'}

],
refVehicleTypeCode : '123',
noOfVehicle : 1,
paymentType : ''
 }

  console.log("Datta:::",data);
      formData.paymentType=   data.paymentType;   
 let finalURL = remoteBaseUrl + "/requestDetails/saveRequestDetails"

                                                
     let obj = {
     url: finalURL,
     body: formData
     }; 
    postHttp(obj, true).then(res => {
     console.log("save response ::",res);
  
     setPstate(pstate + 1);
     if(data.paymentType === 'Instant'){
     const dataVal= {
                serviceOwnerID: res.data.dataItems[0].serviceOwnerID,
                serviceID: res.data.dataItems[0].serviceID,
                serviceChannel: res.data.dataItems[0].serviceChannel,
                licenseKey: res.data.dataItems[0].licenseKey,
                customerReferenceNumber: res.data.dataItems[0].customerReferenceNumber,
                serviceDescription: res.data.dataItems[0].serviceDescription,
                responseURL: res.data.dataItems[0].responseURL,
                serviceCost: res.data.dataItems[0].serviceCost,
                soTransactionID: res.data.dataItems[0].soTransactionID,
                documentationCharges: res.data.dataItems[0].documentationCharges,
                signature: res.data.dataItems[0].signature,
                popup: res.data.dataItems[0].popup,
                buEncryptionMode: res.data.dataItems[0].buEncryptionMode,
                
              };
              console.log("dataVal",dataVal);
    CommonService.postToExternalSite(dataVal,res.data.dataItems[0].gatewayUrl)
     }
     else if (data.paymentType==='Hold'){
     const dataVal= {
                serviceOwnerId: res.data.dataItems[0].serviceOwnerID,
                serviceId: res.data.dataItems[0].serviceID,
                serviceChannel: res.data.dataItems[0].serviceChannel,
                licenseKey: res.data.dataItems[0].licenseKey,
                custRefNo: res.data.dataItems[0].customerReferenceNumber,
                reqDescription: res.data.dataItems[0].serviceDescription,
                responseUrl: res.data.dataItems[0].responseURL,
                serviceCost: res.data.dataItems[0].serviceCost,
                soReqId: res.data.dataItems[0].soTransactionID,
                signature: res.data.dataItems[0].signature,
                popup: res.data.dataItems[0].popup,
                customerTokenId: res.data.dataItems[0].customerTokenId
              };
              console.log("dataVal",dataVal);
    CommonService.postToExternalSite(dataVal,res.data.dataItems[0].rosoomPaymentAuthorisationUrl)
     }
    })
    }
        
    return (
        <>
      {masterVals.compMouted &&(
    <FormProvider {...methods}>
     <FormContainer>
     <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
    <div className="row">
     <div className="col-md">
     <ApplnSelectBox label="Payment Type" name="paymentType"
     helperText="Select Payment Type"
     options={masterVals.statusOpts}/>
        </div>
    <AppButton  text="Submit"
                 type="submit">save</AppButton>
    </div>
      </form>
    </FormContainer>
    </FormProvider>
   )
     }
     </>)
}


