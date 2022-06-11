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



function VerifyDocument() {
    
  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(location.state.referenceNumber);
    const [jobs, setJobs] = useState();
    const [render, setRender] = useState(0);
    const [tabSelected, setTabSelected] = useState("VERIFY POD");
    const [selectedRows, setSelectedRows] = useState([]);
    const [pstate, setPstate] = useState(0);
  const [rerender, setRerender] = useState(0);
  const [showToaster, setShowToaster] = useState(null);

    const [tabLabels, setTabLabels] = useState([
        "VERIFY POD",
        "VERIFY INVOICES",
        "PAYMENTS"
       
    ]);
    


    
  useEffect(() => {
        RequestBoeService.fetchRequestDetailsWithDocuments(referenceNumber).then((response) => {
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
          <Typography variant="h2" style={{textAlign:"left"}}>Verify Document</Typography>
          <CustomTabs
              labelList={tabLabels}
             
              onSelected={(e) => {
                console.log("selected", e);
                if (e === 0) {
               
                  setTabSelected("VERIFY POD");
                  setSelectedRows([]);
                  setPstate(pstate + 1);
                }
                if (e === 1) {
                    setTabSelected("VERIFY INVOICES");
                    setSelectedRows([]);
                    setPstate(pstate + 1);
                }
                if (e === 2) {
                  setTabSelected("PAYMENTS");
                  setSelectedRows([]);
                  setPstate(pstate + 1);
              }
                
              }}
          ></CustomTabs>
        </div>
            </div>  
        {jobs &&   <div className="row">
          <div className="col-md-12">
          {tabSelected === "VERIFY POD"  && <VerifyPodCard job={jobs} podCount={location.state.podCount}
             
            ></VerifyPodCard> } 
          {tabSelected === "VERIFY INVOICES"  && <VerifyInvoicesMain job={jobs}
             invoiceCount={location.state.invoiceCount}
               
             
            ></VerifyInvoicesMain> }

         {tabSelected === "PAYMENTS"  && <PaymentsMain job={jobs}
         payment={true}
              
             
            ></PaymentsMain> }
          </div>
          
      
            </div>  }
            </>
    )
    
}
export default React.memo(VerifyDocument);