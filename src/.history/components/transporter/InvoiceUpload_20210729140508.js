
import React, { useEffect, useState } from "react";

import CustomTabs from "../../lib/components/tabs/CustomTabs";


import { useLocation } from "react-router-dom";
import BookingService from "../../service/BookingService";
import MiscellaneousInvoices from "./MiscellaneousInvoices";
import BookingInvoice from "./BookingInvoice";



function InvoiceUpload() {
    
  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(location.state.referenceNumber);
    const [jobs, setJobs] = useState();
    const [showBooking, setShowBooking] = useState(location.state.status==='MT_DEL');
  
    const [tabSelected, setTabSelected] = useState("Booking");
  
    const [pstate, setPstate] = useState(0);
 

    const [tabLabels, setTabLabels] = useState([
        "Booking",
        "Miscellaneous",
      
       
    ]);
    


    
  useEffect(() => {
        BookingService.getBookingByNumber(referenceNumber,false).then((response) => {
            console.log("invoice upload",response);
         setJobs(response.data.dataItems[0]);
        
        })
        .catch(() => {
          console.log("error");
        });

  

  }, [referenceNumber]);


    
    

  
    
    return (
        <>
            
      <div className="row">
          <div className="col-md-12">
         
          <CustomTabs
              labelList={tabLabels}
             
              onSelected={(e) => {
                console.log("selected", e);
                if (e === 0) {
               
                  setTabSelected("Booking");
               
                  setPstate(pstate + 1);
                }
                if (e === 1) {
                    setTabSelected("Miscellaneous");
                  
                 
                    setPstate(pstate + 1);
                }
            
                
              }}
          ></CustomTabs>
        </div>
            </div>  
        {jobs &&   <div className="row">
          <div className="col-md-12">
         {tabSelected === "Booking"  && <BookingInvoice   bookingData={jobs} bookingReferenceNumber={jobs.referenceNumber}
             showRecords={jobs.}
            ></BookingInvoice> } 
          {tabSelected === "Miscellaneous"  && <MiscellaneousInvoices  bookingReferenceNumber={jobs.referenceNumber}
          bookingData={jobs}
               
             
            ></MiscellaneousInvoices> }

 
          </div>
          
      
            </div>  }
            </>
    )
    
}
export default React.memo(InvoiceUpload);