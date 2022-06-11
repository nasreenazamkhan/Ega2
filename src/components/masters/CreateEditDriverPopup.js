
import React, { useEffect,useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import TextInput from '../../lib/components/txtinput/textInput';
import { AppDialog } from '../../lib/components/dialog/dialogBox';
import AppButton from '../../lib/components/buttons/appButton';
import AppAutoCompleteAsyc from '../../lib/components/autocomplete/appAutoCompleteAsyc';
import AppSwitch from '../../lib/components/switch/appSwitch';

const transporterKvmapping = { "label": "transporterLocales.name", "value": "code" };


const CreateEditDriverPopup = (props) => {
  
  const [formvalues, setFormvalues] =useState({});
    const onSubmit = (values, f) => {
        console.log(f);
        console.log(values);
        f.resetForm();
        props.onConfirm(values,props.action);
    }

    const validationSchema = 
    Yup.object({
        transporterCode: (formvalues.transporterCode ? Yup.string().required('Please select the transporter') : ''),
        code: Yup.string().required('Code is Required') ,
        driverLocales: Yup.object({
            name: Yup.string().required('Name is Required'),
            description:Yup.string().required('Description is Required')
        }), 
        
    });
    
    useEffect(() => {
        console.log('On load');
        console.log("Props ::",props)
        setFormvalues(props.createEditFormData);
    });
    const handleConfirm = (fmk) => {
        fmk.submitForm();
    }

    const handleClose = (fmk) => {
        fmk.resetForm();
        props.onClose();
    }

  const  RenderTransporterInfo=()=>{
      if(props.createEditFormData.userType==="ADMIN"){
           return <>
        <Grid item xs={12}>
            <AppAutoCompleteAsyc name={"transporterCode"} label="Type to search for a transporter" id={"transporterCode"}
                    kvMapping={transporterKvmapping}
                       remoteUrl="/ptms/app/api/secure/transporter/fetchByName"
                       onSelect ={()=>{}}/>
        </Grid>
      </> 
      }
else{
    return <>
    </>
}

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
                            <AppDialog title="Create/Edit Driver" confirmTxt="Submit" onClose={() => { handleClose(formik) }}
                                isopen={props.isopen} 
                                isConfirm={true} onConfirm={() => { handleConfirm(formik) }}>
                                <Form autoComplete="off">
                                    <Grid container spacing={2}>
                                       <RenderTransporterInfo/>
                                        <Grid item xs={12}><TextInput label="Code" name={"code"} id={"code"}
                                            helperText="Please Enter Code" /></Grid>
                                        <Grid item xs={12}><TextInput label="Name" name={"driverLocales.name"} id={"name"}
                                            helperText="Please Enter Name" /></Grid>
                                        <Grid item xs={12}><TextInput label="Description" name={"driverLocales.description"} id={"description"}
                                            helperText="Please Enter Description" /></Grid>
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
export default React.memo(CreateEditDriverPopup);