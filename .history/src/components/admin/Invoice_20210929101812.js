import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core/";
import { TextField, InputLabel, Grid, withStyles, Box, Typography, OutlinedInput } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import BookingService from "../../service/BookingService";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import Link from "@material-ui/core/Link";
import { NO_DIALOG, ALERT_DIALOG, CONFIRM_DIALOG } from "../../lib/common/Constants";
import ConfirmDialog from "../../lib/components/dialog/confirmDialog";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Description } from "@material-ui/icons";

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#168FE4BC",
      color: "#686868",
      borderRadius: '4px',
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '15px',
      fontWeight: 600,
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '10px',
      paddingRight: '10px'
    }
  },
  focused: {},
  notchedOutline: {},
}));

function Invoice(props) {
  const [invoice, setInvoice] = useState(props.invoice);
  const [render, setRender] = useState(0);
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [adminMaxLng, setAdminMaxLng] = useState('');
  const [adminComments, setAdmincomments] = useState('');
  const [descriptionMaxLng, setDescriptionMaxLng] = useState('');
  const [description, setDescription] = useState('');
  const todayDate = new Date();
  const outlinedInputClasses = useOutlinedInputStyles();

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
      fontSize: '14px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderRadius: '3px'
    },
    confirmButton: {
      backgroundColor: "#1360D2",
      color: "#fff",
      width: '100px',
      height: '35px',
      fontSize: '14px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderRadius: '3px'
    },
  }));

  const classes = useStyles();

  const approveInvoice = () => {
    invoice.status = 'approved';
    BookingService.approveRejectInvoice(invoice).then((res) => {
      if (res?.status === "success") {
        invoice.status = "Invoice Approved";
        setShowPopup(NO_DIALOG);
        props.onUpdateFilteredList(res.data.dataItems[0]);
      }
    })
      .catch(() => {
        invoice.status = '';
        console.log("error");
      });
  }

  const rejectInvoice = () => {
    invoice.status = 'rejected';
    BookingService.approveRejectInvoice(invoice).then((res) => {
      if (res?.status === "success") {
        //props.onUpdateFilteredList(res.data.dataItems[0]);
        invoice.status = "Invoice Rejected";
        //setShowToaster('ERROR');
        setShowPopup(NO_DIALOG);
        setRender(render + 1);
      }
    })
      .catch(() => {
        invoice.status = '';
        console.log("error");
      });
  }

  const updateSettledOnDate = () => {
    invoice.status = "Settled";
    BookingService.updateSettledOnDate(invoice).then(
      (res) => {
        if (res?.status === "success") {
          invoice.status = "Invoice Settled";
          invoice.paymentStatus = "SETTLED";

          props.onUpdateFilteredList(res.data.dataItems[0]);
        }
      }
    ).catch(() => {
      invoice.status = '';
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
      fontSize: "15px",
      color: "#434343",
      fontFamily: "Dubai Light",
      fontWeight: 600,
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
              <Grid container spacing={1}>
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
              <Grid container sm alignItems="flex-end">
                <Grid item xs={4} sm={2}>
                  <LabelHeader>Invoice Total</LabelHeader>
                  <LabelHeader>{invoice.invoiceTotalAmount} AED </LabelHeader>
                </Grid>
                {invoice.dtInvoiceNumber && <Grid item xs={4} sm={2}>
                  <LabelHeader>DT Invoice Number</LabelHeader>
                  <LabelHeader>{invoice.dtInvoiceNumber}</LabelHeader>
                </Grid>}
                <Grid item xs={4} sm={2}>
                  <LabelHeader>Payment Status</LabelHeader>
                  <LabelHeader>{invoice.paymentStatus}</LabelHeader>
                </Grid>
                <Grid item xs={4} sm={2}>
                  {(invoice.status === 'Invoice Approved' || invoice.status === 'PAID' || invoice.status === 'Invoice Settled') &&
                    <Grid container alignItems="flex-end">
                      <Grid item>
                        <FiberManualRecordIcon style={{ fill: '#63BB7A', marginRight: '3px' }}></FiberManualRecordIcon>
                      </Grid>
                      <Grid item>
                        <LabelHeader style={{ color: '#63BB7A' }}> {invoice.status}</LabelHeader>
                      </Grid>
                    </Grid>}
                  {(invoice.status === 'Invoice Rejected') &&
                    <Grid container alignItems="flex-end">
                      <Grid item>
                        <FiberManualRecordIcon style={{ fill: '#FF0000', marginRight: '3px' }}></FiberManualRecordIcon>
                      </Grid>
                      <Grid item>
                        <LabelHeader style={{ color: '#FF0000' }}> {invoice.status}</LabelHeader>
                      </Grid>
                    </Grid>}
                </Grid>
                {/* {invoice.status!=='Invoice Rejected'  &&  <Grid item xs={4} sm={2}>
                  <LabelHeader>DT Invoice</LabelHeader>
  
                </Grid> } */}
                {invoice.status !== 'Invoice Rejected' &&
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
                        alt="Not available"
                        src="./Invoice_icon.svg"
                        onClick={() => {
                          downloadFile({ fileType: invoice.invoicePdfType, fileContent: invoice.invoicePdfContent, fileName: invoice.invoicePdfName });
                        }}
                      />
                    </InputLabel>
                  </Grid>}
                {props.payment && invoice.status === "Invoice Settled" && (
                  <Grid item xs={4} sm={2}>
                    <LabelHeader>Settled On</LabelHeader>
                    <LabelHeader>{invoice.settledOn}</LabelHeader>
                  </Grid>
                )}
              </Grid>
              {props.payment &&
                (invoice.paymentStatus==="PAID IN ADVANCE" ||
                  invoice.paymentStatus==="PAID") && (
                  <>
                    <Grid item container xs={12} sm alignItems="flex-end">
                      <Grid item xs={4} sm={2}>
                        <LabelHeader>Settled On</LabelHeader>
                        <ApplnDatePicker
                          name={"settledOn"}
                          iconColor="#1FA5FF"
                          
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
                          classes={{ root: classes.confirmButton }}
                          variant="contained"
                          onClick={() => {
                            updateSettledOnDate();
                          }}
                        >
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
              <Grid container alignItems="flex-end">
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
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={2}>
                <LabelHeader>Invoice Number</LabelHeader>
                <OutlinedInput
                  style={{ height: "40px", width: "170px" }}
                  classes={outlinedInputClasses}
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
              <Grid item xs={2}>
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
              <Grid item xs={2}>
                <LabelHeader>Vat Amount</LabelHeader>
                <OutlinedInput
                  style={{ height: "40px", width: "170px" }}
                  classes={outlinedInputClasses}
                  variant="outlined"
                  size="small"
                  name={"vatAmount"}
                  defaultValue={invoice.vatAmount}
                  onBlur={(e) => {
                    invoice.vatAmount = e.target.value;
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <LabelHeader>Invoice Amount</LabelHeader>
                <OutlinedInput
                  style={{ height: "40px", width: "170px" }}
                  classes={outlinedInputClasses}
                  variant="outlined"
                  size="small"
                  name={"invoiceAmount"}
                  defaultValue={invoice.invoiceAmount}
                  onBlur={(e) => {
                    invoice.invoiceAmount = e.target.value;
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <LabelHeader>Invoice Total Amount</LabelHeader>
                <OutlinedInput
                  style={{ height: "40px", width: "170px" }}
                  classes={outlinedInputClasses}
                  variant="outlined"
                  size="small"
                  name={"invoiceTotalAmount"}
                  defaultValue={invoice.invoiceTotalAmount}
                  onBlur={(e) => {
                    invoice.invoiceTotalAmount = e.target.value;
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <LabelHeader>Admin Comments</LabelHeader>
                <OutlinedInput
                  placeholder="Enter Comments"
                  classes={outlinedInputClasses}
                  variant="outlined"
                  style={{ width: "100%" }}
                  rows={2}
                  multiline={true}
                  inputProps={{
                    maxLength: 250,
                  }}
                  onChange={(e) => {
                    invoice.remarks = e.target.value;
                    setAdmincomments(e.target.value)
                    if (e.target.value.length > 230)
                      setAdminMaxLng(250 - e.target.value.length + ' characters left.')
                    else
                      setAdminMaxLng('')
                  }}
                />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      style={{ textAlign: 'left', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#ff0101', paddingLeft: '5px' }}>
                      {adminMaxLng}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      style={{ fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#777777', textAlign: 'end', paddingRight: '5px' }}>
                      {adminComments.length + '/' + 250}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <LabelHeader>Description</LabelHeader>
                <OutlinedInput
                  classes={outlinedInputClasses}
                  placeholder="Enter Description"
                  variant="outlined"
                  rows={2}
                  style={{ width: "100%" }}
                  multiline={true}
                  inputProps={{
                    maxLength: 250,
                  }}
                  defaultValue={invoice.description}
                  onChange={(e) => {
                    invoice.description = e.target.value;
                    setDescription(e.target.value)
                    if (e.target.value.length > 230)
                      setDescriptionMaxLng(250 - e.target.value.length + ' characters left.')
                    else
                      setDescriptionMaxLng('')
                  }}
                />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      style={{ textAlign: 'left', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#ff0101', paddingLeft: '5px' }}>
                      {descriptionMaxLng}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      style={{ fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#777777', textAlign: 'end', paddingRight: '5px' }}>
                      {description.length + '/' + 250}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} style={{ marginBottom: '60px' }}>
                <Button
                  classes={{ root: classes.confirmButton }}
                  style={{ width: '90px', marginRight: '5px' }}
                  variant="contained"
                  onClick={() => {
                    invoice.toStatus = "approved";
                    setShowPopup(ALERT_DIALOG);
                  }}
                >
                  Approve
                </Button>
                <Button
                  classes={{ root: classes.cancelButton }}
                  style={{ width: '90px' }}
                  variant="outlined"
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
        </form>
      </FormProvider>

      {showPopup === ALERT_DIALOG && <ConfirmDialog
        fullWidth={true}
        isopen={showPopup === ALERT_DIALOG}
        title={"Attention!"}
        children={invoice.toStatus === 'approved' ? "Are You sure to approve this Invoice?" : "Are You sure to reject this Invoice?"}
        confirmTxt={"Yes"}
        closeTxt={"No"}
        confirmButtonCss={classes.confirmButton}
        closeButtonCss={classes.cancelButton}
        onClose={() => {
          setShowPopup(NO_DIALOG);
        }}
        onConfirm={(e) => {
          if (invoice.toStatus === 'approved')
            approveInvoice();
          else
            rejectInvoice();
        }}
      />}
    </>
  );
}
export default Invoice;
