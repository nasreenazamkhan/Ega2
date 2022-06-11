import React, { useState, useEffect } from "react";

import JobService from "../../service/JobService"; 
import VerifyInvoices from "./VerifyInvoices";
import ErrorToast from "../../lib/components/toast/ErrorToast";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import { Paper,Grid,Typography} from "@material-ui/core";




function VerifyInvoicesMain(props) {
  const [jobs, setJobs] = useState([Props.job]);
  console.log("verifyInvociesMain",props.job)
 
  const [showToaster, setShowToaster] = useState(null);




  // useEffect(() => {
  //   const loadInvoiceSubmittedJobs = async () => {
  //     JobService.fetchInvoiceSubmittedJobs()
  //       .then((response) => {
  //         if (response.isAxiosError) 
  //          setJobs([]);
  //         else{
        
  //         setJobs(response.data.dataItems);
  //         }
        
  //       })
  //       .catch(() => {
  //         console.log("error");
  //       });
  //   };

  //   loadInvoiceSubmittedJobs();
  // }, [showToaster]);


  const [] = React.useState(false);

  return (
    <>
      {jobs && jobs.length>0 ?
       ( jobs.map((job,indx)  => (
          <VerifyInvoices
           job={job}
            key={job.referenceNumber}
            index={indx}
            onApproveReject={(e) => {
              
              setShowToaster(e);
            }}
          ></VerifyInvoices>
        ))):(<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
        <Grid container direction="row" spacing={5}>
          <Grid item sm={12} xs={12}>
            <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
              <b>{'No records found'}</b></Typography>
          </Grid>
        </Grid>
      </Paper>)}

        {showToaster==='APPROVE' && 
          <SuccessToast
          icon="check_circle"
          title="Invoice verified successfully"
          message="*Item moved to completed status with transporter"
          showToast={()=>{setShowToaster(false)}}
          position="top-right"
        />}

{showToaster==='REJECT' && 
          <ErrorToast
          icon="error" 
          title="Invoice rejected!"
          message="*Item sent back to transporter for reupload"
          showToast={()=>{setShowToaster(false)}}
          position="top-right"
        />}
       
       
    </>
  );
}

export default React.memo(VerifyInvoicesMain);
