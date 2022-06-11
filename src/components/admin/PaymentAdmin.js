import React, { useState, useEffect } from "react";
import { Card, Button } from "@material-ui/core/";
import {
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  Box,
  Grid,
} from "@material-ui/core";

import JobService from "../../service/JobService";
import {
  ALERT_DIALOG,
  NO_DIALOG,
  CONFIRM_DIALOG,
} from "../../lib/common/Constants";

import ConfirmDialog from "../../lib/components/dialog/confirmDialog";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },

  label: {
    fontSize: 13,
    color: "black",
  },

  labelData: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },
  cancelButton: {
    background: "#dc4e4e",
    color: "#fff",
    textTransform: "none",
    float:"center"
   
  },
  confirmButton: {
    background: "#4CAB5B",
    color: "#fff",
    textTransform: "none",
    float:"center"
    
  },
}));

const rejectForm = {
    remarks:""
   };

const onFileDownload = (job) => {
  JobService.fetchInvoice(job.referenceNumber)
    .then((response) => {
      if (response.isAxiosError) throw new Error(response.status);
      else {
        const linkSource = `data:${response.data.dataItems[0].filetype};base64,${response.data.dataItems[0].fileContent}`;
        const downloadLink = document.createElement("a");

        downloadLink.href = linkSource;
        downloadLink.download = response.data.dataItems[0].fileName;
        downloadLink.target = "_blank";
        // alert(downloadLink);
        downloadLink.click();
      }
    })

    .catch(() => {
      console.log("error");
    });
};

function PaymentAdmin(props) {
  const classes = useStyles();
  const [job, setJob] = useState(props.job);
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [rejectRemarks, setRejectRemarks] = useState();
  const[formValues,setFormValues]=useState(rejectForm);
  const[invoiceStatus,setInvoiceStatus]=useState("");
  const [refNo,setRefNo]=useState("");
  const [error,setError]=useState(false);



  return (
    <>
      <Card
        style={{ width: "1200px", marginTop: "20px", borderRadius: "25px" }}
      >
        <Table>
          <TableBody>
            <TableRow key={job.referenceNumber}>
              <TableCell
                style={{ borderRight: "1px solid #D3D3D3", width: "70%" }}
              >
                <Grid container spacing={0}>
                  <Grid container item xs={8} spacing={1}>
                    <Grid item>
                      <Box
                        style={{
                          width: "2rem",
                          height: "2rem",
                          color: "white",
                          textAlign: "center",
                          marginTop: "-5px",
                          backgroundColor: "#0E1B3D",
                          marginLeft: "40px",
                          border: "2px solid #ccc",
                        }}
                      >
                        {props.index + 1}
                      </Box>
                    </Grid>
                    <Grid item>
                      <InputLabel>
                        Order Number#{job.referenceNumber}
                      </InputLabel>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        Consignee Name
                      </InputLabel>

                      <InputLabel style={{ fontSize: "13px", color: "black" ,marginTop:"2px"}}>
                        {job.contactDetails}
                      </InputLabel>
                    </Grid>

                    <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        Date & Time
                      </InputLabel>

                      <InputLabel style={{ fontSize: "13px", color: "black" ,marginTop:"2px"}}>
                        {job.dateAndTime}
                      </InputLabel>
                    </Grid>

                    <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        Uploaded On
                      </InputLabel>

                      <InputLabel style={{ fontSize: "13px", color: "black",marginTop:"2px" }}>
                        {job.uploadedOn}
                      </InputLabel>
                    </Grid>

                    <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        No Of Containers
                      </InputLabel>

                      <InputLabel style={{ fontSize: "13px", color: "black",marginTop:"2px" }}>
                        {job.noOfContainers}
                      </InputLabel>
                    </Grid>

                    <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                      Reference Number
                      </InputLabel>
                      {!job.paymentRefNo && 
                      <TextField 
                       id="referenceNo"
                       variant="outlined"
                       size="small"
                       error={error}
                       value={refNo}
                       onChange={(event) => {
          
                        setRefNo(event.target.value);
                     
                   
                  
                  }}
                ></TextField> }

                  {job.paymentRefNo &&   <InputLabel style={{ fontSize: "13px", color: "black" }}>
                     {job.paymentRefNo}
                      </InputLabel>}
       
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        <img src="./location-pin.svg" /> {job.dropAddress}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        Truck Number
                      </InputLabel>

                      <InputLabel style={{ fontSize: "13px", color: "black" ,marginTop:"2px"}}>
                        {job.vehicleRegNo}
                      </InputLabel>
                    </Grid>
                    {/* <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        Truck Type
                      </InputLabel>

                      <InputLabel style={{ fontSize: "13px", color: "black" ,marginTop:"2px"}}>
                        {job.vehicleType}
                      </InputLabel>
                    </Grid> */}
                    <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        Contact Name
                      </InputLabel>

                      <InputLabel style={{ fontSize: "13px", color: "black" ,marginTop:"2px"}}>
                        {job.driverName}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <InputLabel style={{ fontSize: "13px", color: "black" }}>
                        Contact Number
                      </InputLabel>

                      <InputLabel style={{ fontSize: "13px", color: "black",marginTop:"2px" }}>
                        {job.driverContactNo}
                      </InputLabel>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={3}>
                  <Grid item xs={4}></Grid>

                  <Grid item xs={6}>
                    <img id="file"
                      src="./document.svg"
                      onClick={() => onFileDownload(job)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={3}></Grid>
                  {job.settlementStatus==='INVAPPR' &&
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{
                        textTransform: "capitalize",
                        backgroundColor: "#63BB7A",
                        color: "#ffffff",
                       
                      }}
                      onClick={() => {
                        if(refNo.length===0)
                        {
                          setError(true);
                          setShowPopup(NO_DIALOG);
                        }
                        else
                        {
                        setShowPopup(ALERT_DIALOG);
                        }
                      }}
                   
                    >
                      MARK AS PAID 
                    </Button>
                  </Grid>}

                  {job.settlementStatus==='SETTLED' &&
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      style={{
                        textTransform: "capitalize",
                        backgroundColor: "#63BB7A",
                        color: "#ffffff",
                        width:"150px"
                      }}
                    
                   
                    >
                     AMOUNT PAID
                    </Button>
                  </Grid>}
                
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      {showPopup === ALERT_DIALOG &&  <ConfirmDialog
                      isopen={true}
                      title={"Attention!"}
                      children={"Would you like to mark the job as Paid?"}
                      confirmTxt={"Yes"}
                      closeTxt={"No"}
                      closeButtonCss={classes.cancelButton}
                      confirmButtonCss={classes.confirmButton}
                      onClose={() => {
                        setShowPopup(NO_DIALOG);
                      }}
                      onConfirm={(e) =>{
                       
                     
                       
                         JobService.markJobAsPaid(job.referenceNumber,refNo)
                         .then((response) => {
                        if (response.isAxiosError) throw new Error(response.status);
                         else
                         {
                           console.log("payment successful");
                              props.pageRerender();
                              setShowPopup(NO_DIALOG);

                        } 
                      
           
          })
   
          .catch(() => {
            console.log("error");
          });
        
                      
                      }}
                    />}
    
    </>
  );
}
export default React.memo(PaymentAdmin);
