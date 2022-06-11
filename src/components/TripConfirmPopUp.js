import React, { useEffect,useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import TextInput from '../lib/components/txtinput/textInput';
import { AppDialog } from '../lib/components/dialog/dialogBox';
import AppButton from '../lib/components/buttons/appButton';





const TripConfirmPopUp = (props) => {

  

    console.log('props',props);


    const handleConfirm = () => {
       console.log("inside confirm");
       props.onConfirm("YES");

    }

    const handleClose = (e) => {
        // fmk.resetForm();
        console.log("inside close")
        props.onClose("NO");
    }

  
    if(props.tripData)
    {

    return (
      
                    <>

                        <AppDialog title="Confirm Trip" closeTxt={"NO"} confirmTxt={"YES"} onClose={handleClose}
                            isopen={props.isopen}
                            isConfirm={true} onConfirm={() => { handleConfirm() }}>
                          <h4>Trip with reference number {props.tripData.referenceNumber} already exists for the selected time slot and truck.Do you want to add container to existing trip?</h4>
                        </AppDialog>



                    </>
                
  

       
    )
}
}
export default React.memo(TripConfirmPopUp);