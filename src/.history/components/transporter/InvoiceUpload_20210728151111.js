import { validate } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import AssignTokenService from "./AssignTokenService";
import VerifyPodCard from "./VerifyPodCard";
import VerifyInvoicesMain from "./VerifyInvoicesMain";
import PaymentsMain from "./PaymentsMain";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import ErrorToast from "../../lib/components/toast/ErrorToast";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import {Typography } from "@material-ui/core";

import RequestBoeService from "../../service/RequestBoeService"

import { useLocation } from "react-router-dom";
import BookingService from "../../service/BookingService";
import MiscellaneousInvoices from "./MiscellaneousInvoices"



function InvoiceUpload() {
    
  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(location.state.referenceNumber);
    const [jobs, setJobs] = useState();
  
    const [tabSelected, setTabSelected] = useState("Booking");
  
    const [pstate, setPstate] = useState(0);
 

    const [tabLabels, setTabLabels] = useState([
        "Booking",
        "Miscellaneous",
      
       
    ]);
    


    
  useEffect(() => {
        BookingService.getBookingByNumber(referenceNumber).then((response) => {
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
                    setTabSelected("Misc");
                 
                    setPstate(pstate + 1);
                }
            
                
              }}
          ></CustomTabs>
        </div>
            </div>  
        {jobs &&   <div className="row">
          <div className="col-md-12">
          {/* {tabSelected === "Booking"  && <BookingInvoice job={jobs} podCount={location.state.podCount}
             
            ></BookingInvoice> } */}
          {tabSelected === "VERIFY INVOICES"  && <MiscellaneousInvoices job={jobs}
             invoiceCount={location.state.invoiceCount}
               
             
            ></MiscellaneousInvoices> }

 
          </div>
          
      
            </div>  }
            </>
    )
    
}
export default React.memo(InvoiceUpload);