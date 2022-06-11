import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import  FormContainer  from '../lib/components/formContainer/formContainer';
import  AppDateTimePicker  from '../lib/components/datepicker/appDateTimePicker';
import SelectBox from '../lib/components/select/selectBox';

import * as endpointContants from '../utils/ptmsEndpoints';




let tripForm = {
    startTime: '',
    endTime: '',
    driverCode: '',
    truckCode: '',

};

const validationSchema = Yup.object({
    startTime: Yup.date().required('Start Time is Required'),
    endTime: Yup.string().required('End Time is Required')
 
});




function Trip() {
    const [formvalues, setFormvalues] = useState(tripForm);
    const [driverOptions, setDriverData] = useState([]);
    const loadDriverData = async () => {
    let param1='Tr001';
    //let url=endpointContants.fetchDriversForTransporter +'/Tr001'
    let url=`${endpointContants.fetchRequestDetails} /${param1}`;
    console.log("url is",url);


    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let driversFromApi = data.map(driver => {
        return {value: driver.value, label: driver.value}
      });
      setDriverData(driversFromApi);
    }).catch(error => {
      console.log(error);
    });

    }

    useEffect(() => {
        loadDriverData();
       
    }, []);
    console.log("driverOptions",driverOptions);



    let fmk;
    const simulateLoad = () => {
        setFormvalues(tripForm);
    }

    const onSubmit = values => {
        console.log(values);
    }


   //const driverOptions = [{ "label": "Driver 1", "value": "v" }, { "label": "Driver 2", "value": "nv" }];
    const truckOptions = [{ "label": "Truck 1", "value": "v" }, { "label": "Truck 2", "value": "nv" }];

   


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
                 { <div className="row">
                                        <div className="col-md">
                                            <AppDateTimePicker name={"dateTime"} label="Start Time" />
                                        </div>
                                        <div className="col-md">
                                            <AppDateTimePicker name={"dateTime"} label="End Time" />
                                        </div>
                                         <div className="col-md">
                                            <SelectBox label={"Driver"} name={"driverCode"}
                                                options={driverOptions} />
                                        </div> 
                                        <div className="col-md">
                                            <SelectBox label={"Truck"} name={"truckCode"}
                                                options={truckOptions} />
                                        </div>
                                    </div>  
                                    
                }
                                       
                </FormContainer>
                </>
                )
        }  
    }
    </Formik >
      
    )
}

export default Trip;
