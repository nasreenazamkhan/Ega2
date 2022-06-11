import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../lib/components/txtinput/textInput";
import DataTable from "../../lib/components/table/DataTable";
import { COLUMN_TYPE_STRING } from "../../lib/common/Constants";
import AppButton from "../../lib/components/buttons/appButton";
import FormContainer from "../../lib/components/formContainer/formContainer";
import AddVehicleTypeForm from "./AddVehicleTypeForm";
import {
  OTHER_POPUP,
  NO_DIALOG,
  CONFIRM_DIALOG,
} from "../../lib/common/Constants";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { postHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";
import UpdateTokenPopup  from'./UpdateTokenPopup';

const actions = [   
    { item: 1, tip: 'action', icon: 'edit_headline' }   
];

 let updateTokenForm = {
    tokenNo: "",
    searchTripReferenceNo: "",
    referenceNumber:"",
    containerNo:"",
    createdDate:"",
    truckRegistrationNo:""

  };

  let remoteBaseUrl = "/ptms/app/api/secure/trip/search?requestType=TOKEN";

  const tripCol = [
    { name: "Trip Reference No", type: COLUMN_TYPE_STRING, key: "referenceNumber", id: 1, sort: true },
    { name: "Truck No", type: COLUMN_TYPE_STRING, key: "vehicleRegNo", id: 2, sort: true },
    { name: "Driver Name", type: COLUMN_TYPE_STRING, key: "driverName", id: 3 },
    { name: "Created Date", type: COLUMN_TYPE_STRING, key: "createdDate", id: 4, sort: true, sortActive: true },
    { name: "Start Time", type: COLUMN_TYPE_STRING, key: "startTimeFormatted", id: 5, sort: true, sortActive: true },
    { name: "End Time", type: COLUMN_TYPE_STRING, key: "endTimeFormatted", id: 6, sort: true, sortActive: true },
    { name: "Vehicle Type", type: COLUMN_TYPE_STRING, key: "vehicleType", id: 7, sort: true, sortActive: true}
];



let action;

function UpdateToken() {
  
 const [showPopup, setShowPopup] = useState(NO_DIALOG);
    const [pstate, setPstate] = useState(0);
    const [remoteUrl, setRemoteURl] = useState(remoteBaseUrl);
    const [formvalues, setFormvalues] = useState(updateTokenForm);
    const [tripData, setTripData] = useState();
    let fmk;

  

  

  
  return (
    <Formik initialValues={formvalues}>
      {(formik) => {
        fmk = formik;
        return (
          <FormContainer title="Update Token">
         <Form autoComplete="off">
           <div className="row">
                
          <div className="col-md">
        <TextInput label="Trip Reference No" name={"searchTripReferenceNo"} id={"searchTripReferenceNo"} helperText="Enter trip reference no" />
        </div>
        
        <div className="col">
        <AppDatePicker name={"createdDate"}
        id={"createdDate"} label={"Creation Date"} />
        </div>
        </div>

        <div className="row">   
          <div className="col-md">
        <TextInput label="Truck Registration No" name={"truckRegistrationNo"} id={"truckRegistrationNo"} helperText="Enter truck registration no" />
        </div>

        <div className="col-md">
        <TextInput label="Container No" name={"containerNo"} id={"containerNo"} helperText="Enter Container No" />
        </div>
        </div>
                    <div className="row">                 
                <AppButton text={"Search"} type={"button"} icon="search" handleClick={() => {
                                                setPstate(pstate + 1);
                                                let finalURL = remoteBaseUrl+ "&tripRefNo=" + formik.values.searchTripReferenceNo  
                                                + "&containerNo=" + formik.values.containerNo+ "&createdDate=" +formik.values.createdDate  
                                                  + "&truckRegNo=" + formik.values.truckRegistrationNo;
                                                setRemoteURl(finalURL);
                                                
                                            }}></AppButton>
                  </div>
                   <div className="row">
                                        <div className="col">
                                            <DataTable refresh={pstate} tableKeys={tripCol} remote={true} remoteUrl={remoteUrl} dataRootKey={"elements"}
                                                actions={actions} handleClick={(row, index, action, element) => {
                                                    
                                                    updateTokenForm.referenceNumber = row.referenceNumber;
                                                   
                                                    action="EDIT";
                                                     setPstate(pstate + 1);
                                                    setShowPopup(OTHER_POPUP);
                                                    
                                                }} />
                                        </div>
                                    </div>
            <UpdateTokenPopup isopen={showPopup === OTHER_POPUP} action={action} updateTokenForm={updateTokenForm} onClose={(e) => {
                                        setShowPopup(NO_DIALOG);
                                    }} onConfirm={(e,action) => {
                                       setShowPopup(NO_DIALOG);
                                     console.log(e);
                                        let remoteUrl ;
                                                                          
                                         remoteUrl = endpointContants.updateToken;
                                     
                                        let obj = {
                                            url: remoteUrl,
                                            body: e
                                        };
                                        postHttp(obj, true).then(response => {
                                            setPstate(pstate + 1);
                                        })
                                        .catch(error => {
                                                // const errMsg = error.message;
                                                // dispatch(fetchUserFailure(errMsg));
                                        })
                                
                                    }} />
         </Form>
          </FormContainer>
        );
      }}
    </Formik>
  );
}

export default UpdateToken;
