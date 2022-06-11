
import React, { useEffect,useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import TextInput from '../../lib/components/txtinput/textInput';
import { AppDialog } from '../../lib/components/dialog/dialogBox';
import AppButton from '../../lib/components/buttons/appButton';
import AppAutoCompleteAsyc from '../../lib/components/autocomplete/appAutoCompleteAsyc';
import AppSwitch from '../../lib/components/switch/appSwitch';

//const transporterKvmapping = { "label": "transporterLocales.name", "value": "code" };


const CreateEditTruckPopup = (props) => {
  
  const [formvalues, setFormvalues] =useState({});
    const onSubmit = (values, f) => {
        console.log(f);
        console.log(values);
        f.resetForm();
        props.onConfirm(values,props.action);
    }

    const validationSchema = 
    Yup.object({
       // transporterCode: Yup.string().required('Please select the transporter'),
        vehicleRegistrationNo: Yup.string().required('Code is Required') ,
        truckLocales: Yup.object({
            name: Yup.string().required('Name is Required'),
            description:Yup.string().required('Description is Required')
        }), 
        
    });
    
    useEffect(() => {
        console.log('On load');
        console.log('props.createEditFormData',props.createEditFormData);
        setFormvalues(props.createEditFormData);
    });
    const handleConfirm = (fmk) => {
        fmk.submitForm();
    }

    const handleClose = (fmk) => {
        fmk.resetForm();
        props.onClose();
    }
    return (
        <Formik initialValues={formvalues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize>
            {
                formik => {
                    return (
                        <>
                            <AppDialog title="Create/Edit Truck" confirmTxt="Submit" onClose={() => { handleClose(formik) }}
                                isopen={props.isopen} 
                                isConfirm={true} onConfirm={() => { handleConfirm(formik) }}>
                                <Form autoComplete="off">
                                    <Grid container spacing={2}>
                                        
                                        <Grid item xs={12}><TextInput label="Code" name={"vehicleRegistrationNo"} id={"vehicleRegistrationNo"}
                                            helperText="Please Enter Code" /></Grid>
                                        <Grid item xs={12}><TextInput label="Name" name={"truckLocales.name"} id={"name"}
                                            helperText="Please Enter Name" /></Grid>
                                        <Grid item xs={12}><TextInput label="Description" name={"truckLocales.description"} id={"description"}
                                            helperText="Please Enter Description" /></Grid>
                                             <Grid item xs={12}><TextInput label="Vehicle Type Code" name={"refVehicleTypeCode"} id={"refVehicleTypeCode"}
                                            helperText="Please Enter Vehicle Type Code" /></Grid>
                                        <Grid item xs={12}><AppSwitch onText="Yes" offText="No" name={"isActive"} label="Active" /></Grid>
                                    </Grid>
                                </Form>
                            </AppDialog>
                        </>
                    )
                }
            }

        </Formik >
    )
}
export default React.memo(CreateEditTruckPopup);