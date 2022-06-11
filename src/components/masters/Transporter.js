import React, { useState } from 'react';
import DataTable from '../../lib/components/table/DataTable';
import { COLUMN_TYPE_NUMBER, COLUMN_TYPE_STRING, OTHER_POPUP, NO_DIALOG } from '../../lib/common/Constants';
import { Formik, Form } from 'formik';
import FormContainer from '../../lib/components/formContainer/formContainer';
import AppAutoCompleteAsyc from '../../lib/components/autocomplete/appAutoCompleteAsyc';
import TextInput from '../../lib/components/txtinput/textInput';
import AppDatePicker from '../../lib/components/datepicker/appDatePicker';
import AppButton from '../../lib/components/buttons/appButton';
import DebugForm from '../../lib/common/debugForm';
import TransporterPopup from './TransporterPopup';


const transporterCol = [
    { name: "Code", type: COLUMN_TYPE_NUMBER, key: "code", id: 1, sort: true },
    { name: "Name", type: COLUMN_TYPE_STRING, key: "transporterLocales.name", id: 2, sort: true },
    { name: "Description", type: COLUMN_TYPE_STRING, key: "transporterLocales.description", id: 3 },
    { name: "Created Date", type: COLUMN_TYPE_STRING, key: "creationDate", id: 4, sort: true, sortActive: true },
    { name: "Active", type: COLUMN_TYPE_STRING, key: "isActive", id: 5 }
];

const truckAggKvmapping = { "label": "transporterLocales.name", "value": "code" };

const tableAction = [
    { item: 2, tip: 'edit', icon: 'edit_headline' }
];

let transporterform = {
    truckAggregatorCode: '',
    code: '',
    name: '',
    createdDate: '',
};
let remoteBaseUrl = "/ptms/app/api/secure/transporter/search";
function Transporter() {
    let fmk;

    // const onSubmit = values => {
    //     console.log(values);
    // }
    const [showPopup, setShowPopup] = useState(NO_DIALOG);
    const [pstate, setPstate] = useState(0);
    const [remoteUrl, setRemoteURl] = useState(remoteBaseUrl);
    const [formvalues, setFormvalues] = useState(transporterform);

    return (
        <Formik initialValues={formvalues}>
            {
                formik => {
                    fmk = formik;
                    return (
                        <>
                            {/* <DebugForm f={fmk.values} /> */}
                            <FormContainer title="Manage Transporter">
                                <Form autoComplete="off">
                                    <div className="row">
                                        <div className="col-md">
                                            <AppAutoCompleteAsyc name={"truckAggregatorCode"} label="Type to search for a truck aggregator"
                                                kvMapping={truckAggKvmapping}
                                                remoteUrl="/ptms/app/api/secure/truckAggregator/fetchByName"
                                                onSelect ={()=>{}}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <TextInput label="Code" name={"code"} id={"code"}
                                                helperText="Search by code" />
                                        </div>
                                        <div className="col">
                                            <TextInput label="Name" name={"name"} id={"name"}
                                                helperText="Search by name" />
                                        </div>
                                        <div className="col">
                                            <AppDatePicker name={"createdDate"}
                                                id={"createdDate"} label={"Creation Date"} />
                                        </div>
                                    </div>

                                    <div className="row button-holder">
                                        <div className="col">
                                            <AppButton text={"Reset"} type={"button"} icon="clearall" handleClick={() => {
                                                fmk.resetForm();
                                                setPstate(pstate + 1);
                                                setRemoteURl(remoteBaseUrl);
                                            }}></AppButton>

                                            <AppButton text={"Create"} type={"button"} icon="add" handleClick={() => {
                                                setShowPopup(OTHER_POPUP);
                                            }}></AppButton>
                                            <AppButton text={"Search"} type={"button"} icon="search" handleClick={() => {
                                                setPstate(pstate + 1);
                                                let finalURL = remoteBaseUrl + "?truckAggregatorCode=" + formik.values.truckAggregatorCode
                                                    + "&code=" + formik.values.code
                                                    + "&name=" + formik.values.name
                                                    + "&createdDate=" + formik.values.createdDate
                                                setRemoteURl(finalURL);
                                            }}></AppButton>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <DataTable refresh={pstate} tableKeys={transporterCol} remote={true} remoteUrl={remoteUrl} dataRootKey={"elements"} actions={tableAction} />
                                        </div>
                                    </div>
                                    <TransporterPopup isopen={showPopup === OTHER_POPUP} onClose={(e) => {
                                        setShowPopup(NO_DIALOG);
                                    }} onConfirm={(e) => {
                                        setShowPopup(NO_DIALOG);
                                        console.log(e);
                                        let abc = formik.values.myNameArry;
                                        abc.push(e)
                                        formik.setFieldValue('myNameArry', abc);
                                    }} />
                                </Form>
                            </FormContainer>
                        </>
                    )
                }
            }
        </Formik >
    )
}

export default Transporter;