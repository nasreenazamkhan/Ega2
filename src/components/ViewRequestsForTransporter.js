import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as EndpointContants from '../utils/ptmsEndpoints';
import LabelComponent from '../lib/components/static/LabelComponent';
import * as Yup from 'yup';
import FormContainer from '../lib/components/formContainer/formContainer';
import DataTable from '../lib/components/table/DataTable';
import { COLUMN_TYPE_NUMBER, COLUMN_TYPE_STRING, OTHER_POPUP, NO_DIALOG } from '../lib/common/Constants';
import { useHistory } from "react-router-dom";



const requestsBoeCol = [

    { name: "Request  Number", type: COLUMN_TYPE_STRING, key: "referenceNumber", id: 2 },
    { name: "Status", type: COLUMN_TYPE_STRING, key: "refStatus.refStatusLocales.name", id: 3 },
    { name: "Requested Date", type: COLUMN_TYPE_STRING, key: "creationDate", id: 4},
    { name: "No Of Containers", type: COLUMN_TYPE_NUMBER, key: "noOfContainers", id: 5 },
  


];


const containerCol = [
    { name: "Request Number", type: COLUMN_TYPE_STRING, key: "requestDetailsNumber", id: 1 },
    { name: "Boe Number", type: COLUMN_TYPE_STRING, key: "requestBoeNumber", id: 1 },
    { name: "Container Number", type: COLUMN_TYPE_STRING, key: "container_number", id: 2 },
    { name: "Status", type: COLUMN_TYPE_STRING, key: "refStatus.refStatusLocales.name", id: 1 },
    { name: "Request Delivery Time", type: COLUMN_TYPE_STRING, key: "dropTimeFormatted", id: 1 },
    


];



const tripCol = [

    { name: "Trip Reference Number", type: COLUMN_TYPE_STRING, key: "referenceNumber", id: 1 },
    { name: "No Of Containers", type: COLUMN_TYPE_NUMBER, key: "noOfContainers", id: 2 },
    { name: "Creation Date", type: COLUMN_TYPE_STRING, key: "createdDate", id: 3 },
  


];



let remoteRequestBoeUrl = `/ptms/app/api/secure/transporter/searchRequest`;
let remoteContainerUrl = `/ptms/app/api/secure/transporter/searchContainers`;
let remoteTripUrl = `/ptms/app/api/secure/trip/search?requestType=TRIP`;




let remoteBaseUrl = "/ptms/app/api/secure/transporter/search";

export default function ViewRequestsForTransporter() {


    const [pstate, setPstate] = useState(0);
    const [requestBoeUrl, setRequestBoeUrl] = useState(remoteRequestBoeUrl);
    const [requestContainerUrl, setRequestContainerUrl] = useState(remoteContainerUrl);
    const [tripUrl, setTripUrl] = useState(remoteTripUrl);

    let history = useHistory();

    const actions = [{ item: 0, tip: 'view', color: 'green', icon: 'view_headline' }];
    let fmk;
    return (
        <Formik>
            {
                formik => {
                    fmk = formik;
                    return (
                        <>

                            <FormContainer title="View Requests">
                                <Form autoComplete="off">
                                <div className="row">
                                    <div className="col">
                                           <LabelComponent labelType={1} label="ALL REQUESTS"></LabelComponent>
                                           </div>
                                        </div>

                                    <div className="row">
                                        <div className="col">
                                            <DataTable refresh={pstate} tableKeys={requestsBoeCol} remote={true} remoteUrl={requestBoeUrl} dataRootKey={"elements"}
                                                actions={actions}
                                                handleClick={(row, index, action, element) => {
                                                    history.push('/assignTruckAndDriver/',{transactionCode:row.referenceNumber,refVehicleTypeCode:row.refVehicleType.code})
                                             
                                                }} />
                                        </div>

                                    </div>

                                    <div className="row">
                                    <div className="col">
                                           <LabelComponent labelType={1} label="UNASSIGNED CONTAINERS"></LabelComponent>
                                           </div>
                                        </div>

                                      

                                    <div className="row">
                                        <div className="col">
                                            <DataTable refresh={pstate} tableKeys={containerCol} remote={true} remoteUrl={requestContainerUrl} dataRootKey={"elements"}
                                                actions={actions}
                                                handleClick={(row, index, action, element) => {
                                                    history.push('/assignTruckAndDriver',{transactionCode:row.requestDetailsNumber,refVehicleTypeCode:row.refVehicleTypeCode,containerNo:row.container_number});
                        
                                                }}
                                                />
                                               
                                        </div>

                                    </div>


                                    <div className="row">
                                    <div className="col">
                                           <LabelComponent labelType={1} label="MANAGE TRIP"></LabelComponent>
                                           </div>
                                        </div>

                                        <div className="row">
                                        <div className="col">
                                            <DataTable refresh={pstate} tableKeys={tripCol} remote={true} remoteUrl={tripUrl} dataRootKey={"elements"}
                                                actions={actions}
                                                handleClick={(row, index, action, element) => {
                                                    console.log("referecne number");
                                                    console.log(row.referenceNumber);
                                                    history.push('/manageTrip',{tripReferenceNo:row.referenceNumber});
                        
                                                }}
                                                />
                                               
                                        </div>

                                    </div>
                                 

                                </Form>
                            </FormContainer>
                        </>
                    )


            }



            }

        </Formik>

    )
}
