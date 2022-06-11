
import React, { useEffect,useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import TextInput from '../../lib/components/txtinput/textInput';
import { AppDialog } from '../../lib/components/dialog/dialogBox';
import SelectBox from '../../lib/components/select/selectBox';


const UpdateTokenPopup = (props) => {
   
   const formData ={
       tokenNo: ""
   }

   const timeOptions = [
        { "label": "Select", "value": "0" }, 
        { "label": "1AM", "value": "1AM" }, 
        { "label": "2AM", "value": "2AM" }, 
        { "label": "3AM", "value": "3AM" }, 
        { "label": "4AM", "value": "4AM" }, 
        { "label": "5AM", "value": "5AM" }, 
        { "label": "6AM", "value": "6AM" }, 
        { "label": "7AM", "value": "7AM" }, 
        { "label": "8AM", "value": "8AM" }, 
        { "label": "9AM", "value": "9AM" }, 
        { "label": "10AM", "value": "10AM" }, 
        { "label": "11AM", "value": "11AM" }, 
        { "label": "12AM", "value": "12AM" },
        { "label": "1PM", "value": "1PM" }, 
        { "label": "2PM", "value": "2PM" }, 
        { "label": "3PM", "value": "3PM" }, 
        { "label": "4PM", "value": "4PM" }, 
        { "label": "5PM", "value": "5PM" }, 
        { "label": "6PM", "value": "6PM" }, 
        { "label": "7PM", "value": "7PM" }, 
        { "label": "8PM", "value": "8PM" }, 
        { "label": "9PM", "value": "9PM" }, 
        { "label": "10PM", "value": "10PM" }, 
        { "label": "11PM", "value": "11PM" }, 
        { "label": "12PM", "value": "12PM" }
    ];


//  console.log("ref",props.updateTokenFormData.referenceNumber);
  const [formvalues, setFormvalues] =useState(props.updateTokenForm);
    const onSubmit = (values, f) => {
        console.log(f);
        console.log(values);
        f.resetForm();
        props.onConfirm(values,props.action);
    }

    const validationSchema = 
    Yup.object({
        tokenNo: Yup.string().required('Please enter token no')
        
        });
        

       useEffect(() => {
        console.log('On load');
        setFormvalues(props.updateTokenForm);
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
                            <AppDialog title="Update Token" confirmTxt="Submit" onClose={() => { handleClose(formik) }}
                                isopen={props.isopen} 
                                isConfirm={true} onConfirm={() => { handleConfirm(formik) }}>
                                <Form autoComplete="off">
                                    <Grid container spacing={2}>
                                        
                                        <Grid item xs={12}><TextInput label="Token Number" name={"tokenNo"} id={"tokenNo"}
                                            helperText="Please Enter Token Number" /></Grid>
                                       
                                    
                                    <Grid item xs={12}>
                                    <SelectBox label={"Token Slot From"} name={"tokenSlotFrom"}
                                     options={timeOptions} 
                                            />
                                             </Grid>
                                              <Grid item xs={12}>
                                    <SelectBox label={"Token Slot To"} name={"tokenSlotTo"}
                                     options={timeOptions} 
                                            />
                                             </Grid>
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
export default React.memo(UpdateTokenPopup);