import { validate } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";


import { useLocation } from "react-router-dom";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import PaymentSummary from './../request/PaymentSummary';





function MiscellaneousPayment() {
    
  const location = useLocation();
  
    const [jobs, setJobs] = useState();
    const [render, setRender] = useState(0);
    const [tabSelected, setTabSelected] = useState("MISCELLANEOUS INVOICES");
    const [selectedRows, setSelectedRows] = useState([]);
    const [pstate, setPstate] = useState(0);
  const [rerender, setRerender] = useState(0);
  const [showToaster, setShowToaster] = useState(null);

    const [tabLabels, setTabLabels] = useState([
        "BOOKING",
        "MISCELLANEOUS INVOICES ",
     
       
    ]);

    console.log("location.state",location)
    


    
   
    
    

  
    
    return (
        <>
            
      <div className="row">
          <div className="col-md-12">
        
          <CustomTabs
              labelList={tabLabels}
             
              onSelected={(e) => {
                console.log("selected", e);
                if (e === 0) {
               
                  setTabSelected("BOOKING");
               
                }
                if (e === 1) {
                    setTabSelected("MISCELLANEOUS INVOICES");
                 
                }
              
                
              }}
          ></CustomTabs>
        </div>
            </div>  
       { <div className="row">
          <div className="col-md-12">
          {tabSelected === "BOOKING"  && <PaymentSummary  statusData={location.state.statusData}  paymentSummary={location.state.paymentSummary} url={location.state.url}
             
            ></PaymentSummary> }
          { tabSelected === "MISCELLANEOUS INVOICES"  && <VerifyInvoicesMain job={jobs}
             invoiceCount={location.state.invoiceCount}
               
             
            ></VerifyInvoicesMain> }

        
          </div>
          
      
            </div>  } 
            </>
    )
    
}
export default React.memo(MiscellaneousPayment);