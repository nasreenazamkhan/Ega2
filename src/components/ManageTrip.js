import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import  FormContainer  from '../lib/components/formContainer/formContainer';
import  AppDateTimePicker  from '../lib/components/datepicker/appDateTimePicker';
import SelectBox from '../lib/components/select/selectBox';
import { useLocation } from "react-router-dom";
import TripService from '../service/TripService';
import NormalTable from '../lib/components/table/NormalTable';
import AppButton from '../lib/components/buttons/appButton';
import TextInput from '../lib/components/txtinput/textInput';
import Fileupload from '../lib/components/fileupload/fileupload';
import LabelComponent from '../lib/components/static/LabelComponent';

import * as endpointContants from '../utils/ptmsEndpoints';




let tripForm = {
    startTime:'',
    endTime: '',
    status:'',
    upload:''

};

const validationSchema = Yup.object({
    // startTime: Yup.date().required("Start time is required"),
    // endTime: Yup.date().required("End time is required"),
   
    status:Yup.string().required("Status is required")
   
});



export default function ManageTrip() {

    const [formvalues, setFormvalues] = useState(tripForm);
    const location = useLocation();
    let tripRefNo=location.state.tripReferenceNo;
    const[containerDetails,setContainerDetails]=useState([]);
    const[tripData,setTripData]=useState([]);
    const[errors,setErrors]=useState([]);
   
    const tableKeys = [
        { name: "Container Number", type: 0, key: "container_number" }
       // { name: "Request Boe Number", type: 0, key: "requestBoeNumber" },
        // { name: "Vehicle Registration Number", type: 0, key: "vehicleRegistrationNumber" },
        //  { name: "Driver Code", type: 0, key: "driverCode" },
        //  { name: "Drop Time", type: 0, key: "dropTimeFormatted" },
        // { name: "Time slot", type: 0, key: "timeSlot" }
    ];


    const validateForm=(values)=>
    {
        const errors = [];

        if(values.startTime) 
        {
            if(!values.endTime && !values.upload && values.status!=='START')
            errors.push("Please select status as STARTED");

            if(values.upload && !values.endTime)
            errors.push("Please select endTime ");
                  
        }
        if(values.endTime) 
        {
            if(!values.startTime)
            errors.push("Start Time is required");

            if(!values.upload && values.status!=='COMPL')
            errors.push("Please select endTime As Completed");                

        }
        if(values.upload)
        {
            if(!values.startTime || !values.endTime)  
            errors.push("Please select start time as well as endTime");

            if(values.status!=='POD_UPL')
            errors.push("Please select status as Proof Of Document Uploaded");

        }

        setErrors(errors);
    }



    const onSubmit = values => {
        console.log("values", values);
        validateForm(values);
        console.log("errors",errors);
        const formdata={startTimeFormatted:values.startTime,endTimeFormatted:values.endTime,referenceNumber:tripRefNo,status:values.status,upload:values.upload
        }


            TripService.updateTrip(formdata)
        .then(response => {
             
            console.log("success");
           
        })
        .catch(error => {
        });



      
    }




    useEffect(() => {
        const loadContainerDetailsForTrip=async() => {
        
            TripService.fetchContainerDetailsForTrip(tripRefNo)
            .then(response => {
                console.log("response",response.data.dataItems);
                setTripData(response.data.dataItems);
                setContainerDetails(response.data.dataItems[0].requestContainerList);
                console.log("containerdetails",response.data.dataItems[0].requestContainerList);
               
               
            })
            .catch(error => {
                console.log("error");
            });
           
        };
       
        loadContainerDetailsForTrip();
    }, [tripRefNo]);
    
    

    const statusOptions = [
        { "label": "STARTED", "value": "START" }, { "label": "COMPLETED", "value": "COMPL" }, { "label": "Proof Of Document Uploaded", "value": "POD_UPL" }
    ];



    let fmk;
  
    if(tripData)
    {
        console.log("rendering",containerDetails);

    return (
        <Formik initialValues={formvalues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
    >{
        formik => {
            fmk = formik;
            return (
               
                <>
                   <FormContainer title="Add Trip">
                       <Form>
                 
                       {errors.map(error => (
                    <p style={{color:'red'}} key={error}>Error: {error}</p>
                  ))}
                   {/* <div className="row" >
                   <div className="col">
                       <NormalTable tableData={containerDetails}
                           tableKeys={tableKeys}
                           chkbox={true}
                        />
                   </div>
               </div>  */}
                 <div className="row">
                     <div className="col-md"><LabelComponent labelType={1} label="Trip Reference Number" value={tripRefNo}>
                        </LabelComponent></div> </div>


         
                 
                 <div className="row">
                                         <div className="col-md">
                                            <AppDateTimePicker name={"startTime"} value={tripData.startTime} label="Start Time" />
                                        </div>
                                        <div className="col-md">
                                            <AppDateTimePicker name={"endTime"}  label="End Time" />
                                        </div>  
                                        <div className="col-md">
                                            <SelectBox label={"Status"} name={"status"}
                                                options={statusOptions} 
                                                />
                                        </div> 
            
                                        <div className="col-md">
                                            <Fileupload name={"upload"} id={"upload"} label={"Upload"} />
                                        </div>

                                        </div>

                                    

                <div className="button-holder"  >
                   <div className="col">
                   <AppButton  text={"Submit"} type={"submit"} icon="check" ></AppButton>
                   </div>
                   </div>

                                    
                   </Form>
                                       
                </FormContainer>
                </>
                )
        }  
    }
    </Formik >
      
    )

    }
}