import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import TextInput from '../../lib/components/txtinput/textInput';
import { AppDialog } from '../../lib/components/dialog/dialogBox';
import AppButton from '../../lib/components/buttons/appButton';
import AppAutoCompleteAsyc from '../../lib/components/autocomplete/appAutoCompleteAsyc';
import AppSwitch from '../../lib/components/switch/appSwitch';

const truckAggKvmapping = { "label": "truckAggregatorLocale.name", "value": "code" };


const TransporterPopup = (props) => {
    const initialValues = {
        truckAggregatorCode: '',
        code: '',
        name: '',
        description: '',
        isActive: false
    }
    const onSubmit = (values, f) => {
        console.log(f);
        console.log(values);
        f.resetForm();
        props.onConfirm(values);
    }


    const validationSchema = Yup.object({
        truckAggregatorCode: Yup.string().required('Please select the truck aggregator'),
        code: Yup.string().required('Code is Required'),
        name: Yup.string().required('Name is Required'),
        description: Yup.string().required('Description is Required'),
    });
    useEffect(() => {
    }, []);
    const handleConfirm = (fmk) => {
        if (fmk.values.code.trim() === '') {
            fmk.setFieldTouched('code');
            fmk.validateField('code');
            return;
        }
        if (fmk.values.truckAggregatorCode.trim() === '') {
            fmk.setFieldTouched('truckAggregatorCode');
            fmk.validateField('truckAggregatorCode');
            return;
        }
        if (fmk.values.name.trim() === '') {
            fmk.setFieldTouched('name');
            fmk.validateField('name');
            return;
        }
        if (fmk.values.description.trim() === '') {
            fmk.setFieldTouched('description');
            fmk.validateField('description');
            return;
        }
        fmk.submitForm();
    }

    const handleClose = (fmk) => {
        fmk.resetForm();
        props.onClose();
    }
    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {
                formik => {
                    return (
                        <>
                            <AppDialog title="Create Transporter" onClose={() => { handleClose(formik) }}
                                isopen={props.isopen}
                                isConfirm={true} onConfirm={() => { handleConfirm(formik) }}>
                                <Form autoComplete="off">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <AppAutoCompleteAsyc name={"truckAggregatorCode"} label="Type to search for a truck aggregator"
                                                kvMapping={truckAggKvmapping}
                                                remoteUrl="/ptms/app/api/secure/truckAggregator/fetchByName"
                                                onSelect ={()=>{}}/>
                                        </Grid>
                                        <Grid item xs={12}><TextInput label="Code" name={"code"} id={"code"}
                                            helperText="Please Enter Code" /></Grid>
                                        <Grid item xs={12}><TextInput label="Name" name={"name"} id={"name"}
                                            helperText="Please Enter Name" /></Grid>
                                        <Grid item xs={12}><TextInput label="Description" name={"description"} id={"description"}
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
export default React.memo(TransporterPopup);