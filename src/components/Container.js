import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import FormContainer from '../lib/components/formContainer/formContainer';
import LabelComponent from '../lib/components/static/LabelComponent';
import AppAutoCompleteAsyc from '../lib/components/autocomplete/appAutoCompleteAsyc';
import * as EndpointContants from '../utils/ptmsEndpoints';
import AppButton from '../lib/components/buttons/appButton';
import * as Yup from 'yup';
import SelectBox from '../lib/components/select/selectBox';


import AssignTruckAndDriverService from '../service/AssignTruckAndDriverService';
import { NO_DIALOG } from '../lib/common/Constants';
import { OTHER_POPUP } from './../lib/common/Constants';
import { useHistory } from "react-router-dom";

import TripConfirmPopUp from './TripConfirmPopUp';



let containersForm = {
    vehicleRegistrationNo: '',
    driverCode: '',
    toTime:'0',
    fromTime:'0'
};


const validationSchema = Yup.object({
    vehicleRegistrationNo: Yup.string().required('Vehicle Registration Number is Required')
    
});
const Container = (props) => {
    const [formvalues, setFormvalues] = useState(containersForm);
    const [showPopup, setShowPopup] = useState(NO_DIALOG);
    const [tripData, setTripData] = useState();
    const [savedState, setSavedState] = useState();


    let history = useHistory();

 
    let vehicleType = props.refVehicleType;

    const truckKVmapping = { "label": "label", "value": "value" };
    const truckUrl = `${EndpointContants.fetchTrucksForTransporter}/${vehicleType}`;


    const driverKVmapping = { "label": "label", "value": "value" };
    const driverUrl = `${EndpointContants.fetchDriversForTransporter}`;
    let fmk;

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




    const onSubmit = values => {
        console.log("values", values);


        let formData={container_number: props.containerData.container_number, vehicleRegistrationNumber: values.vehicleRegistrationNo,
            dropTime:props.containerData.dropTimeFormatted,timeSlot:values.fromTime+'-'+values.toTime, transactionCode: props.orderId,isoCode:props.containerData.iso_code}

         console.log("values form", formData);
            AssignTruckAndDriverService.checkForExistingTrip(formData)
        .then(response => {
        
            if(response.data.dataItems[0].referenceNumber)
            {
             setTripData(response.data.dataItems[0]);
             setShowPopup(OTHER_POPUP);
            }
            else{
                saveFormData("NO") ; 
            }
           
        })
        .catch(error => {
        });



      
    }

    const saveFormData=(confirmation)=>{

      
        var  containers
        if(confirmation==='NO')
        {
           let tripData=null;
           containers = [{ container_number: props.containerData.container_number,requestBoeNumber:props.containerData.requestBoeNumber,vehicleRegistrationNumber: fmk.values.vehicleRegistrationNo,
            driverCode: fmk.values.driverCode,dropTimeFormatted:props.containerData.dropTimeFormatted,timeSlot:fmk.values.fromTime+'-'+fmk.values.toTime,trip:tripData }];
            
        }
         else if(confirmation==='YES'){
         containers = [{ container_number: props.containerData.container_number,vehicleRegistrationNumber: fmk.values.vehicleRegistrationNo,
                driverCode: fmk.values.driverCode,dropTimeFormatted:props.containerData.dropTimeFormatted,timeSlot:fmk.values.fromTime+'-'+fmk.values.toTime,trip:tripData }];

         }
        

        let assignTruckForm = {  containerList:containers, referenceNumber: props.orderId };


          AssignTruckAndDriverService.saveFormData(assignTruckForm)
             .then(response => {
                 console.log("Save Success");
                 setSavedState(response.data.dataItems[0]);

             })
             .catch(error => {
             });



        
    }


    const RenderTruckInfo=()=>{
        

        if(savedState)
        {
            console.log("render truck Name in saved");
            return <>
            <LabelComponent labelType={1} label="Vehicle Registration Number" value={savedState.trip.vehicleRegNo}></LabelComponent>
          </> 
        }

       else if(props.containerData.trip && props.containerData.trip.vehicleRegNo)
        {
            console.log("render truck Name if");
            return <>
         <LabelComponent labelType={1} label="Vehicle Registration Number" value={props.containerData.trip.vehicleRegNo}></LabelComponent>
          </>
          
        }
        else
        {
            console.log("render truck Name else");
            return <>
            <AppAutoCompleteAsyc name={"vehicleRegistrationNo"} label="Vehicle Registration Number"
                                              kvMapping={truckKVmapping}
                    remoteUrl={truckUrl}
                    onSelect ={()=>{}}/>
          </>
        

    }

}




const RenderDriverInfo=()=>{

    if(savedState)
        {
            console.log("render driver name in saved");
            return <>
            <LabelComponent labelType={1} label="DriverName" value={savedState.trip.driverName}></LabelComponent>
          </> 
        }


    if(props.containerData.trip && props.containerData.trip.driverName)
    {
        console.log("render driver Name if");
        return <>
        <LabelComponent labelType={1} label="DriverName" value={props.containerData.trip.driverName}></LabelComponent>
     </>
      
    }
    else
    {
        console.log("render driver Name else");
        return <>
        <AppAutoCompleteAsyc name={"driverCode"} label="Driver Code"
                                           kvMapping={driverKVmapping}
                remoteUrl={driverUrl}
                onSelect ={()=>{}}/>
   </>
   

}

}


const RenderTimeInfo=()=>{

    if(savedState)
    {
        console.log("render driver name in saved");
        return <>
        <LabelComponent labelType={1} label="DriverName" value={savedState.timeSlot}></LabelComponent>
      </> 
    }


    if(props.containerData.timeSlot)
    {
        return <>
        <LabelComponent labelType={1} label="Time Slot" value={props.containerData.timeSlot}></LabelComponent>
     </>
    }
    else
    {
        return <>
        <SelectBox label={"From Time"} name={"fromTime"}
        options={timeOptions} 
         />

        <SelectBox label={"To Time"} name={"toTime"}
        options={timeOptions}  />
        </>
    }


    
}

const RenderTripInfo=()=>{
    if(savedState)
    {
        console.log("render trip in saved");
        return <>
        <LabelComponent labelType={1} label="Trip Reference Number" value={savedState.trip.referenceNumber}></LabelComponent>
      </> 
    }
    else if(props.containerData.trip)
    {
        return <>
        <LabelComponent labelType={1} label="Trip Reference Number" value={props.containerData.trip.referenceNumber}></LabelComponent>
      </>  
    }
    return <></>
        
}




    return (
        <Formik initialValues={formvalues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
                     enableReinitialize>
            {
                formik => {
                    fmk = formik;
                    return (
                        <>
                            <FormContainer>
                                <Form autoComplete="off">
                                    <div className="row">
                                    <div className="col-md-3">
                                        <LabelComponent labelType={1} label="Request Boe Number" value={props.containerData.requestBoeNumber}></LabelComponent>
                                        </div>
                                        <div className="col-md-3">
                                        <LabelComponent labelType={1} label="Container Number" value={props.containerData.container_number}></LabelComponent>
                                        </div>
                                        <div className="col-md-3">
                                        <LabelComponent labelType={1} label="Consignee name" value={props.containerData.consigneeName}></LabelComponent>
                                        </div>
                                        <div className="col-md-3">
                                        <LabelComponent labelType={1} label="Drop Time" value={props.containerData.dropTimeFormatted}></LabelComponent>
                                        </div>
                                       
                                        
                                        
                                
                                       
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        <LabelComponent labelType={1} label="ISO Code" value={props.containerData.iso_code}></LabelComponent>
                                        </div>

                                        <div className="col-md-3">
                                           <RenderTruckInfo/>
                                           </div> 
                                    
                                        <div className="col-md-3">
                                          <RenderDriverInfo/>
                                        </div>
                                        <div className="col-md-3">
                                        <RenderTimeInfo/> 
                                        </div>
   
                                    </div>

                                    <div className="row">
                                    <div className="col-md-3">
                                        <RenderTripInfo/> 
                                        </div>
                                    </div>

                                    <div className="button-holder"  >
                                    <div className="col">


                                    <AppButton text={"Back"} type={"button"}   handleClick={() => {
                                                    history.push('/transporterTasks');
                        
                                                }}></AppButton>


                                    {
                                    (!(savedState||props.containerData.trip))?
                                    (  
                                    <AppButton  text={"Submit"} type={"submit"} icon="check" ></AppButton>
                                 ):(<p></p>)

                                 
                }
                                 

                                   

                                    </div>

                                    </div>

                                   

                                   
                                   

                                    <TripConfirmPopUp isopen={showPopup === OTHER_POPUP} tripData={tripData} onClose={(e) => {
                                        saveFormData(e);
                                        setShowPopup(NO_DIALOG);
                                    }} onConfirm={(e) => {
                                        saveFormData(e);
                                        setShowPopup(NO_DIALOG);

                                    
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

export default Container;