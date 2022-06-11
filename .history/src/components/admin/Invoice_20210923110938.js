import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core/";
import { TextField, InputLabel, Grid, withStyles,Box } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";

import BookingService from "../../service/BookingService";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import Link from "@material-ui/core/Link";
import { NO_DIALOG, ALERT_DIALOG, CONFIRM_DIALOG } from "../../lib/common/Constants";

import ConfirmDialog from "../../lib/components/dialog/confirmDialog";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function Invoice(props) {
  const [invoice, setInvoice] = useState(props.invoice);
  const [render, setRender] = useState(0);

  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [lengthMsg, setMaxLengthMsg] = useState('');
  const todayDate = new Date();




  console.log("invoice", props.invoice);


  const handleClose = () => {
    setShowPopup(NO_DIALOG);
  }

  

  const useStyles = makeStyles((theme) => ({

    cancelButton: {
      border: "1px solid #0E1B3D",
      color: "#0E1B3D",
      width: '100px',
      height: '35px',
      paddingRight: '15px',
      fontSize: '12px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderRadius: '3px'
    },
    confirmButton: {
      backgroundColor: "#1360D2",
      color: "#fff",
      width: '100px',
      height: '35px',
      fontSize: '12px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderRadius: '3px'
    },

  }));
  const classes = useStyles();


  
const approveInvoice=()=>{
  invoice.status='approved';
 BookingService.approveRejectInvoice(invoice).then((res) => {
                      if (res?.status === "success") {
                        invoice.status = "Invoice Approved";
                        setShowPopup(NO_DIALOG);
                        props.onUpdateFilteredList(res.data.dataItems[0]);
            
                      }
                    })
                    .catch(() => {
                      invoice.status='';
                      console.log("error");
                    });
  }

  const rejectInvoice=()=>
  {
    invoice.status='rejected';
    BookingService.approveRejectInvoice(invoice).then((res) => {
      if (res?.status === "success") {
        //props.onUpdateFilteredList(res.data.dataItems[0]);
        invoice.status = "Invoice Rejected";
       // setShowToaster('ERROR');
        setShowPopup(NO_DIALOG);
        setRender(render + 1);
      }
    })
    .catch(() => {
      invoice.status='';
      console.log("error");
    });
}
  

  const invoiceForm = {
    invoiceNumber: props.invoice.invoiceNumber,
    invoiceDate: props.invoice.invoiceDate,
    vatAmount: props.invoice.vatAmount,
    invoiceAmount: props.invoice.invoiceAmount,
    description: props.invoice.description,
    settledOn: props.invoice.settledOn,
  };

  console.log("invoiceForm", invoiceForm);

  const downloadFile = (invoice) => {
    const linkSource = `data:${invoice.filetype};base64,${invoice.fileContent}`;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = invoice.fileName;
    downloadLink.target = "_blank";
    // alert(downloadLink);
    downloadLink.click();
  };

  const LabelHeader = withStyles((theme) => ({
    root: {
      fontSize: "18px",
      color: "#757575",
      fontFamily: "Dubai Medium",
      marginTop: "1px",
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
    },
    
  }))(InputLabel);

  const LabelData = withStyles((theme) => ({
    root: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#000000",
      fontFamily: "Dubai Regular",
      marginTop: "2px",
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
    },
  }))(InputLabel);

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: invoiceForm,
  });

  return (
    <>
    
      <FormProvider {...methods}>
        <form>
          {invoice.status !== "Invoice Submitted" && (
            <>
              <Grid item container xs={12} sm spacing={1}>
                <Grid item xs={4} sm={2} >
                  <LabelHeader>Invoice Number</LabelHeader>
                  <LabelHeader>{invoice.invoiceNumber}</LabelHeader>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <LabelHeader>Invoice Date</LabelHeader>

                  <LabelHeader> {invoice.invoiceDate}</LabelHeader>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <LabelHeader>Vat Amount</LabelHeader>
                  <LabelHeader>{invoice.vatAmount} AED</LabelHeader>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <LabelHeader>Invoice Amount</LabelHeader>

                  <LabelHeader>{invoice.invoiceAmount} AED</LabelHeader>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <LabelHeader>Description</LabelHeader>
                  <LabelHeader>{invoice.description}</LabelHeader>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <LabelHeader>Remarks</LabelHeader>
                  <LabelHeader>{invoice.remarks}</LabelHeader>
                </Grid>
              </Grid>

              <Grid item container xs={12} sm alignItems="flex-end">
                <Grid item xs={4} sm={2}>
                  <LabelHeader>Invoice Total</LabelHeader>
                  <LabelHeader>{invoice.invoiceTotalAmount} AED </LabelHeader>
                </Grid>

             {invoice.status!=='Invoice Rejected'  && <Grid item xs={4} sm={2}>
                  <LabelHeader>DT Invoice Number</LabelHeader>
                  <LabelHeader>{invoice.dtInvoiceNumber}</LabelHeader>
                </Grid>}

                <Grid item xs={4} sm={2}>
                  <LabelHeader>Payment Status</LabelHeader>
                  <LabelHeader>{invoice.paymentStatus}</LabelHeader>
                </Grid>

                <Grid item xs={4} sm={2}>
                
              
           { (invoice.status==='Invoice Approved' || invoice.status==='PAID') && 
             <Grid container alignItems="flex-end">
           <Grid item>
              <FiberManualRecordIcon style={{ fill: '#63BB7A', marginRight: '3px' }}></FiberManualRecordIcon>
            </Grid>
            <Grid item>
              <InputLabel style={{ color: '#63BB7A' }}> {invoice.status}</InputLabel>
            </Grid>
           
          </Grid>}

          { (invoice.status==='Invoice Rejected' ) && 
             <Grid container alignItems="flex-end">
           <Grid item>
              <FiberManualRecordIcon style={{ fill: '#FF0000', marginRight: '3px' }}></FiberManualRecordIcon>
            </Grid>
            <Grid item>
              <InputLabel style={{ color: '#FF0000' }}> {invoice.status}</InputLabel>
            </Grid>
           
          </Grid>}
        
                 
                </Grid>

                {/* {invoice.status!=='Invoice Rejected'  &&  <Grid item xs={4} sm={2}>
                  <LabelHeader>DT Invoice</LabelHeader>
  
                </Grid> } */}

                {props.payment &&
                  invoice.status === "Invoice Approved" &&
                  (invoice.paymentStatus.includes("PAID IN ADVANCE") ||
                    invoice.paymentStatus.includes("PAID")) && (
                    <>
                      <Grid item xs={4} sm={2}>
                        <LabelHeader>Settled On</LabelHeader>
                        <ApplnDatePicker
                          name={"settledOn"}
                          iconColor="#1FA5FF"
                          disablePastDate={true}
                          height="40px"
                          width="170px"
                          value={invoice.settledOn}
                          onChange={(e) => {
                            invoice.settledOn = e;
                          }}
                        />
                      </Grid>

                      <Grid item xs={4} sm={2}>
                        <Button
                          style={{
                            textTransform: "none",
                            backgroundColor: "#63BB7A",
                            color: "white",
                            borderRadius: "8px",
                            marginLeft: "5px",
                          }}
                          variant="contained"
                          onClick={() => {
                            invoice.status = "Settled";
                            BookingService.updateSettledOnDate(invoice).then(
                              (res) => {
                                if (res?.status === "success") {
                                  invoice.status = "Invoice Settled";
                                  invoice.paymentStatus = "SETTLED";
                                  setRender(render + 1);
                                }
                              }
                            );
                          }}
                        >
                          Update
                        </Button>
                      </Grid>

                      <Grid item xs={4} sm={2}>
                        <LabelHeader>DT Invoice</LabelHeader>
                        <InputLabel
                          style={{
                            fontSize: "16px",
                            color: "#000000",
                            fontFamily: "Dubai Regular",
                            fontWeight: "bold"
                          }}
                        >
                         
                          <img
                            style={{ marginLeft: "5px" }}
                            src="./Invoice_icon.svg"
                            onClick={() => {
                              downloadFile(invoice.invoiceDocs[2]);
                            }}
                          />
                        </InputLabel>
                      </Grid>
                    </>
                  )}

                {props.payment && invoice.status === "Invoice Settled" && (
                  <Grid item xs={4} sm={2}>
                    <LabelHeader>Settled On</LabelHeader>
                    <LabelHeader>{invoice.settledOn}</LabelHeader>
                  </Grid>
                )}
              </Grid>

              <Grid item container xs={12} sm alignItems="flex-end">
                {invoice.fileName &&
                <> 
                
          
                  <Grid item xs={4} sm={2}>
                  <InputLabel
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Dubai Regular",
                      fontWeight: "bold",
                    }}
                  >
                    {invoice.fileName}
                        
                    <img
                      style={{ marginLeft: "8px" }}
                      src="./Invoice_icon.svg"
                      onClick={() => {
                        downloadFile(invoice);
                      }}
                    />
                  </InputLabel>
                  </Grid>
                
                
                  </>
                }

                {invoice.invoiceDocs &&
                  invoice.invoiceDocs.map((invoiceDoc, ind) => (
                
                    <Grid item xs={4} sm={2}>
                     <InputLabel
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Dubai Regular",
                      fontWeight: "bold",
                    }}
                  >
                    {invoiceDoc.fileName}
                        
                    <img
                      style={{ marginLeft: "8px" }}
                      src="./Invoice_icon.svg"
                      onClick={() => {
                        downloadFile(invoiceDoc);
                      }}
                    />
                  </InputLabel>
                    </Grid>
                 
                  ))}
              </Grid>
            </>
          )}

          {!props?.payment && invoice.status === "Invoice Submitted" && (
            <Grid item container xs={12} sm spacing={1} alignItems="flex-end">
              <Grid item xs={6} sm={2}>
                <LabelHeader>Invoice Number</LabelHeader>
                <TextField
                  variant="outlined"
                  size="small"
                  name={"invoiceNumber"}
                  defaultValue={invoice.invoiceNumber}
                  onBlur={(e) => {
                    invoice.invoiceNumber = e.target.value;
                  }}
                  inputProps={{ maxLength: 250 }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <LabelHeader>Invoice Date</LabelHeader>

                <ApplnDatePicker
                  name={"invoiceDate"}
                  iconColor="#1FA5FF"
                  disablePastDate={false}
                  maxDate={todayDate}
                  height="40px"
                  width="170px"
                  value={invoice.invoiceDate}
                  onChange={(e) => {
                    invoice.invoiceDate = e;
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <LabelHeader>Vat Amount</LabelHeader>

                <TextField
                  variant="outlined"
                  size="small"
                  name={"vatAmount"}
                  defaultValue={invoice.vatAmount}
                  onBlur={(e) => {
                    invoice.vatAmount = e.target.value;
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <LabelHeader>Invoice Amount</LabelHeader>

                <TextField
                  variant="outlined"
                  size="small"
                  name={"invoiceAmount"}
                  defaultValue={invoice.invoiceAmount}
                  onBlur={(e) => {
                    invoice.invoiceAmount = e.target.value;
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}>
                <LabelHeader>Invoice Total Amount</LabelHeader>

                <TextField
                  variant="outlined"
                  size="small"
                  name={"invoiceTotalAmount"}
                  defaultValue={invoice.invoiceTotalAmount}
                  onBlur={(e) => {
                    invoice.invoiceTotalAmount = e.target.value;
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={2}></Grid>

              <Grid item xs={6} sm={2}>
                <LabelHeader>Admin Comments</LabelHeader>

                <TextField
                  label="Enter Comments"
                  variant="outlined"
                  style={{ width: "100%" }}
                  multiline={true}
                  onBlur={(e) => {
                    invoice.remarks = e.target.value;
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6} sm={2}>
                <LabelHeader>Description</LabelHeader>

                <TextField
                  variant="outlined"
                  style={{ width: "100%" }}
                  multiline={true}
                  defaultValue={invoice.description}
                  onBlur={(e) => {
                    invoice.description = e.target.value;
                  }}
                ></TextField>
              </Grid>

              <Grid item sm={8}>
                <Button
                  style={{
                    textTransform: "none",
                    backgroundColor: "#63BB7A",
                    color: "white",
                    borderRadius: "8px",
                  
                  }}
                  variant="contained"
                  onClick={() => {
                    invoice.toStatus = "approved";
                    setShowPopup(ALERT_DIALOG);

                   
                  }}
                >
                  Approve
                </Button>

                <Button
                  style={{
                    textTransform: "none",
                    backgroundColor: "#FF7275",
                    color: "white",
                    borderRadius: "8px",
                    marginLeft: "20px",
                  
                  }}
                  variant="contained"
                  onClick={() => {
                    invoice.toStatus = "reject";  
                    setShowPopup(ALERT_DIALOG);
                  }}>
                  Reject
                </Button>
              </Grid>

              {invoice.fileName && (
                  
                <Grid item xs={4} sm={2}>
                  <InputLabel
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Dubai Regular",
                      fontWeight: "bold",
                    }}
                  >
                    {invoice.fileName}
                        
                    <img
                      style={{ marginLeft: "8px" }}
                      src="./Invoice_icon.svg"
                      onClick={() => {
                        downloadFile(invoice);
                      }}
                    />
                  </InputLabel>
                 
               
                </Grid>
               
              )}

              {invoice.invoiceDocs[0]?.fileName && (
              
                <Grid item xs={4} sm={2}>
                  <InputLabel
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Dubai Regular",
                      fontWeight: "bold",
                    }}
                  >
                    {invoice.invoiceDocs[0]?.fileName}
                    <img
                      style={{ marginLeft: "2px" }}
                      src="./Invoice_icon.svg"
                      onClick={() => {
                        downloadFile(invoice.invoiceDocs[0]);
                      }}
                    />
                  </InputLabel>
                </Grid>
              
              )}
              {invoice.invoiceDocs[1]?.fileName && (
                <Grid item xs={4} sm={2}>
                  <InputLabel
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Dubai Regular",
                      fontWeight: "bold",
                    }}
                  >
                    {invoice.invoiceDocs[1]?.fileName}
                    <img
                      style={{ marginLeft: "2px" }}
                      src="./Invoice_icon.svg"
                      onClick={() => {
                        downloadFile(invoice.invoiceDocs[1]);
                      }}
                    />
                  </InputLabel>
                </Grid>
              )}

              {invoice.invoiceDocs[2]?.fileName && (
                <Grid item xs={4} sm={2}>
                  <InputLabel
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      fontFamily: "Dubai Regular",
                      fontWeight: "bold",
                    }}
                  >
                    {invoice.invoiceDocs[2]?.fileName}
                    <img
                      style={{ marginLeft: "2px" }}
                      src="./Invoice_icon.svg"
                      onClick={() => {
                        downloadFile(invoice.invoiceDocs[2]);
                      }}
                    />
                  </InputLabel>
                </Grid>
              )}
            </Grid>
          )}
          <hr></hr>
        </form>
      </FormProvider>

    


{showPopup === ALERT_DIALOG && <ConfirmDialog
          fullWidth={true}
          isopen={showPopup === ALERT_DIALOG}
          title={"Attention!"}
          children={invoice.toStatus==='approved'?"Are You sure to approve this Invoice?":"Are You sure to reject this Invoice?"}
          confirmTxt={"Yes"}
          closeTxt={"No"}
          confirmButtonCss={classes.confirmButton}
          closeButtonCss={classes.cancelButton}
          onClose={() => {
            setShowPopup(NO_DIALOG);
          }}
          onConfirm={(e) => {
            if(invoice.toStatus==='approved')
                                      approveInvoice();
                                      else
                                      rejectInvoice();
          }}
        />}



                
    </>
  );
}
export default Invoice;
