import React, { useState } from 'react';
import DataTable from '../../lib/components/table/DataTable';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../lib/components/txtinput/textInput';
import NormalTable from '../../lib/components/table/NormalTable';
import { COLUMN_TYPE_STRING, COLUMN_TYPE_NUMBER, CONFIRM_DIALOG } from '../../lib/common/Constants';
import { getHttp } from '../../lib/common/HttpService';
import AppButton from '../../lib/components/buttons/appButton';
import FormContainer from '../../lib/components/formContainer/formContainer';
import { OTHER_POPUP, NO_DIALOG } from '../../lib/common/Constants';
import { useHistory } from "react-router-dom";
import ConfirmDialog from '../../lib/components/dialog/confirmDialog';
import * as endpointContants from '../../utils/ptmsEndpoints';
import { postHttp } from '../../lib/common/HttpService';


const truckAggreagatorCol = [
    { name: "Code", type: COLUMN_TYPE_NUMBER, key: "code", id: 1, sort: true },
    { name: "Name", type: COLUMN_TYPE_STRING, key: "truckAggregatorLocales.name", id: 2, sort: true },
    { name: "Description", type: COLUMN_TYPE_STRING, key: "truckAggregatorLocales.description", id: 3 },
    { name: "Created Date", type: COLUMN_TYPE_STRING, key: "creationDate", id: 4, sort: true, sortActive: true },
    { name: "Active", type: COLUMN_TYPE_STRING, key: "isActive", id: 5 }
];

let truckForm = {
    code: '',
    name: ''
};
let remoteBaseUrl = "/ptms/app/api/secure/truckAggregator/search";



const actions = [
    { item: 1, tip: 'view', icon: 'view_headline' },
    { item: 2, tip: 'edit', icon: 'edit_headline' },
    { item: 3, tip: 'delete', icon: 'delete_headline' }

];
let actionIndex = 0;
let truckAggregatorCode = "";

//let history = useHistory();
function ManageTruckAggregator() {
    const [showPopup, setShowPopup] = useState(NO_DIALOG);
    const [pstate, setPstate] = useState(0);
    const [remoteUrl, setRemoteURl] = useState(remoteBaseUrl);
    const [formvalues, setFormvalues] = useState(truckForm);
    let fmk;




    return (
        <Formik initialValues={formvalues}>
            {
                formik => {
                    fmk = formik;
                    return (
                        <>
                            {/* <DebugForm f={fmk.values} /> */}
                            <FormContainer title="Page Header">
                                <Form autoComplete="off">
                                    <div className="row">
                                        <div className="col-md">
                                            <TextInput label="Code" name={"code"} id={"code"} helperText="Search by code" />
                                        </div>

                                        <div className="col-md">
                                            <TextInput label="Description" name={"name"} id={"name"} helperText="Search by description" />
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

                                            <AppButton text={"Search"} type={"button"} icon="search" handleClick={() => {
                                                setPstate(pstate + 1);
                                                let finalURL = remoteUrl + "?code=" + formik.values.code
                                                    + "&name=" + formik.values.name
                                                setRemoteURl(finalURL);
                                            }}></AppButton>


                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <DataTable refresh={pstate} tableKeys={truckAggreagatorCol} remote={true} remoteUrl={remoteUrl} dataRootKey={"elements"}
                                                actions={actions} handleClick={(row, index, action, element) => {
                                                    console.log(row.code);
                                                    console.log(index);
                                                    console.log(action);
                                                    console.log(element);
                                                    actionIndex = element.item;
                                                    truckAggregatorCode = row.code;
                                                    setShowPopup(CONFIRM_DIALOG);
                                                }} />
                                        </div>
                                    </div>

                                    <ConfirmDialog isopen={showPopup === CONFIRM_DIALOG} onClose={(e) => {
                                        setShowPopup(NO_DIALOG);
                                    }} onConfirm={(e) => {
                                        console.log(e);
                                        if (actionIndex === 3) {
                                            const remoteUrl = endpointContants.deleteTruckAggregrator + "/" + truckAggregatorCode;
                                            let obj = {
                                                url: remoteUrl,
                                                body: { truckAggCode: truckAggregatorCode }
                                            };
                                            postHttp(obj, true).then(response => {

                                                setPstate(pstate + 1);
                                            })
                                                .catch(error => {
                                                    // const errMsg = error.message;
                                                    // dispatch(fetchUserFailure(errMsg));
                                                })
                                        }
                                        setShowPopup(NO_DIALOG);

                                    }}
                                    >
                                        Do you want to delete the Truck Aggregator?
                                        </ConfirmDialog>
                                </Form>
                            </FormContainer>
                        </>
                    )
                }
            }
        </Formik>
    )
}

export default ManageTruckAggregator
