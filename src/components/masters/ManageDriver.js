import React, { useState } from 'react';
import DataTable from '../../lib/components/table/DataTable';
import { Formik, Form } from 'formik';
import TextInput from '../../lib/components/txtinput/textInput';
import { COLUMN_TYPE_STRING, COLUMN_TYPE_NUMBER, CONFIRM_DIALOG } from '../../lib/common/Constants';
import AppButton from '../../lib/components/buttons/appButton';
import FormContainer from '../../lib/components/formContainer/formContainer';
import { OTHER_POPUP, NO_DIALOG } from '../../lib/common/Constants';
import * as endpointContants from '../../utils/ptmsEndpoints';
import { postHttp } from '../../lib/common/HttpService';
import AppDatePicker from '../../lib/components/datepicker/appDatePicker';
import CreateEditDriverPopup  from'./CreateEditDriverPopup';

const actions = [   
    { item: 1, tip: 'action', icon: 'edit_headline' }   
];

const driverCol = [
    { name: "Code", type: COLUMN_TYPE_NUMBER, key: "code", id: 1, sort: true },
    { name: "Name", type: COLUMN_TYPE_STRING, key: "driverLocales.name", id: 2, sort: true },
    { name: "Description", type: COLUMN_TYPE_STRING, key: "driverLocales.description", id: 3 },
    { name: "Created Date", type: COLUMN_TYPE_STRING, key: "creationDate", id: 4, sort: true, sortActive: true },
    { name: "Active", type: COLUMN_TYPE_STRING, key: "isActive", id: 5 }
];

let manageDriverForm = {
    code: '',
    name: '',
    createdDate:''
};
let remoteBaseUrl = "/ptms/app/api/secure/driver/search";

let createEditFormData = {
    transporterCode: '',
    code:'',
    driverLocales:{
    name:'',
    description:''
    },
    isActive:true
}
let action;

function ManageDriver() {
    const [showPopup, setShowPopup] = useState(NO_DIALOG);
    const [pstate, setPstate] = useState(0);
    const [remoteUrl, setRemoteURl] = useState(remoteBaseUrl);
    const [formvalues, setFormvalues] = useState(manageDriverForm);
    const [action, setAction] = useState(" ");
    let fmk;

    return (
        <Formik initialValues={formvalues}>
            {
                formik => {
                    fmk = formik;
                    return (
                        <>
                            {/* <DebugForm f={fmk.values} /> */}
                            <FormContainer title="Manage Driver">
                                <Form autoComplete="off">
                                {/* <div className="row">
                                        <div className="col-md">
                                            <AppAutoCompleteAsyc name={"truckAggregatorCode"} label="Type to search for a truck aggregator"
                                                kvMapping={truckAggKvmapping}
                                                remoteUrl="/ptms/app/api/secure/truckAggregator/fetchByName" />
                                        </div>
                                    </div> */}
                                    <div className="row">
                                        <div className="col-md">
                                            <TextInput label="Code" name={"code"} id={"code"} helperText="Search by code" />
                                        </div>

                                        <div className="col-md">
                                            <TextInput label="Name" name={"name"} id={"name"} helperText="Search by name" />
                                        </div>
                                        <div className="col">
                                            <AppDatePicker name={"createdDate"}
                                                id={"createdDate"} label={"Creation Date"} />
                                        </div>
                                    </div>
                                   
                                    <div className="row button-holder">
                                        <div className="col">
                                            <AppButton text={"Reset"} type={"button"} icon="refresh" handleClick={() => {
                                                fmk.resetForm();
                                                setPstate(pstate + 1);
                                                let finalURL = remoteBaseUrl;
                                                setRemoteURl(finalURL);
                                            }}></AppButton>

                                            <AppButton text={"Create"} type={"button"} icon="add" handleClick={() => {
                                               let formData = {
                                                    transporterCode: '',
                                                    code:'',
                                                    driverLocales:{
                                                    name:'',
                                                    description:''
                                                    },
                                                    isActive:false
                                                }
                                                createEditFormData=formData;
                                                setAction("ADD");
                                                setShowPopup(OTHER_POPUP);
                                            }}></AppButton>

                                            <AppButton text={"Search"} type={"button"} icon="search" handleClick={() => {
                                                setPstate(pstate + 1);
                                                let finalURL = remoteBaseUrl + "?code=" + formik.values.code
                                                    + "&name=" + formik.values.name+ "&createdDate=" +formik.values.createdDate
                                                setRemoteURl(finalURL);
                                            }}></AppButton>


                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <DataTable refresh={pstate} tableKeys={driverCol} remote={true} remoteUrl={remoteUrl} dataRootKey={"elements"}
                                                actions={actions} handleClick={(row, index, action, element) => {
                                                    console.log(row.code);
                                                    console.log(index);
                                                    console.log(action);
                                                    console.log(element);
                                                    //row.isActive=row.isActive?'Y':true,false;
                                                    // actionIndex = element.item;
                                                    // code = row.code;
                                                    createEditFormData=row;
                                                    createEditFormData.isActive=createEditFormData.isActive==='YES'?true:false;
                                                    setAction("EDIT");
                                                     setPstate(pstate + 1);
                                                    setShowPopup(OTHER_POPUP);
                                                    
                                                }} />
                                        </div>
                                    </div>
                                    <CreateEditDriverPopup isopen={showPopup === OTHER_POPUP} action={action} createEditFormData={createEditFormData} onClose={(e) => {
                                        setShowPopup(NO_DIALOG);
                                    }} onConfirm={(e,action) => {
                                       setShowPopup(NO_DIALOG);
                                        console.log(e);  
                                        console.log("action ::",action);
                                        let remoteUrl ;
                                        if(action==='ADD')                                          
                                         remoteUrl = endpointContants.createDriver;
                                         if(action==='EDIT')                                          
                                         remoteUrl = endpointContants.updateDriver;
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
                        </>
                    )
                }
            }
        </Formik>
    )
}

export default ManageDriver
