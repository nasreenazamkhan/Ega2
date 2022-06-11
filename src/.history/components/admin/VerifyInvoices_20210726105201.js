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
  Link,
  Paper,
  TableHead,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import { FormProvider, useForm } from "react-hook-form";

import JobService from "../../service/JobService";
import {
  ALERT_DIALOG,
  NO_DIALOG,
  CONFIRM_DIALOG,
} from "../../lib/common/Constants";
import { Formik, Form } from "formik";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CloseIcon from "@material-ui/icons/Close";
import "../../assets/styles.css";
import { Label } from "@material-ui/icons";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import Invoice from "./Invoice";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },

  label: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
  },

  labelData: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
  },
  drawerStyle: {
    fontSize: "13px",
    color: "grey",
    borderBottom: "1px solid grey",
    width: "200px",
    height:"15px"
  },
}));

const LabelHeader = withStyles((theme) => ({
  root: {
    fontSize: "18px",
    color: "#757575",
    fontFamily: "Dubai Medium",
    marginTop: "1px",
  },
}))(InputLabel);

const LabelData = withStyles((theme) => ({
  root: {
    fontWeight:"bold",
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
    marginTop: "2px",
    
  },
}))(InputLabel);



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

function VerifyInvoices(props) {
  console.log("props in verify invoices::", props);
  const classes = useStyles();
  const [job, setJob] = useState(props.job);
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [rejectRemarks, setRejectRemarks] = useState();
 
  const [viewPopup, setViewPopup] = useState(false);
  const [viewBreakupPopup, setViewBreakupPopup] = useState(false);
  const [invoiceList, setInvoiceList] = useState(props.job.invoiceList);
  console.log("invoiceList",invoiceList);

 

  const RenderApproveDialog = () => {
    return (
      <Dialog open={true}>
        <DialogTitle id="customized-dialog-title">Attention!</DialogTitle>
        <DialogContent>
          Are you sure you want to mark the invoice as verified?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              backgroundColor: "#32CD32",
              color: "#ffffff",
              width: "25px",
              height: "25px",
            }}
            onClick={() => {
              JobService.approveInvoice(job.referenceNumber)
                .then((response) => {
                  setShowPopup(NO_DIALOG);
                  props.onApproveReject("APPROVE");
                })
                .catch(() => {
                  console.log("error");
                });
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              backgroundColor: "#dc4e4e",
              color: "#ffffff",
              width: "25px",
              height: "25px",
            }}
            onClick={() => {
              setShowPopup(NO_DIALOG);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // const RenderRejectDialog = () => {
  //   return (
  //     <Dialog open={true}>
  //       <DialogTitle id="customized-dialog-title">Attention!</DialogTitle>
  //       <DialogContent>
  //         <Formik initialValues={formValues} enableReinitialize>
  //           {(formik) => {
  //             return (
  //               <>
  //                 <Form autoComplete="off">
  //                   <p> Are you sure you want to reject this invoice? </p>
  //                   <TextField
  //                     variant="outlined"
  //                     id="remarks"
  //                     name="remarks"
  //                     rows="5"
  //                     multiline
  //                     placeholder="Please type in reason for rejection"
  //                     fullWidth={true}
  //                     onChange={(event) => {
  //                       formik.values.remarks = event.target.value;
  //                     }}
  //                   />
  //                   <br></br>

  //                   <Button
  //                     variant="contained"
  //                     style={{
  //                       textTransform: "capitalize",
  //                       backgroundColor: "#32CD32",
  //                       color: "#ffffff",
  //                       width: "25px",
  //                       height: "25px",
  //                     }}
  //                     onClick={() => {
  //                       console.log("rejectRemarks", formik.values);
  //                       JobService.rejectInvoice(
  //                         job.referenceNumber,
  //                         formik.values.remarks
  //                       )
  //                         .then((response) => {
  //                           setShowPopup(NO_DIALOG);
  //                           props.onApproveReject("REJECT");
  //                         })
  //                         .catch(() => {
  //                           console.log("error");
  //                         });
  //                     }}
  //                   >
  //                     Yes
  //                   </Button>
  //                   <Button
  //                     variant="contained"
  //                     style={{
  //                       textTransform: "capitalize",
  //                       backgroundColor: "#dc4e4e",
  //                       color: "#ffffff",
  //                       width: "25px",
  //                       height: "25px",
  //                     }}
  //                     onClick={() => {
  //                       setShowPopup(NO_DIALOG);
  //                     }}
  //                   >
  //                     No
  //                   </Button>
  //                 </Form>
  //               </>
  //             );
  //           }}
  //         </Formik>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // };

  return (
    <>
      <Card
        style={{
          width: "1200px",
          marginTop: "20px",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "0px 3px 6px #00000029",
          border: "1px solid #E2E2E2",
          borderRadius: "16px",
          opacity: "1",
        }}
      >
        <Table>
          <TableBody>
            <TableRow key={job.referenceNumber}>
              <TableCell
                style={{ borderRight: "1px solid #D3D3D3", width: "70%" ,borderBottom:"1px solid #D3D3D3"}}
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
              
                  </Grid>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Booking#</LabelHeader>
                      <Link
                          style={{
                              fontSize:'16px',
                              fontFamily:'Dubai Regular',
                              textDecoration: "underline",
                              whiteSpace: "nowrap",
                          }}
                          component="button"
                          variant="body2"
                          onClick={() => {
                            setViewPopup(true);
                          }}
                        >
                      {job.referenceNumber}</Link>
                    </Grid>

                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Booked On</LabelHeader>

                      <LabelData>{job.creationDate}</LabelData>
                    </Grid>

                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Containers</LabelHeader>

                      <LabelData>{"  " +job.noOfContainers}</LabelData>
                    </Grid>

                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Trucks</LabelHeader>
                      <LabelData>{" " +job.truckNumber}</LabelData>
                      </Grid>
                      <Grid item xs={3} sm={2}>
                      <LabelHeader>Amount</LabelHeader>
                     
                    

                      <InputLabel
                        style={{
                          fontSize: "13px",
                          color: "black",
                          marginTop: "2px",
                        }}
                      >
                        <Link
                          style={{
                              fontSize:'16px',
                              fontFamily:'Dubai Regular',
                              textDecoration: "underline",
                              whiteSpace: "nowrap",
                          }}
                          component="button"
                          variant="body2"
                          onClick={() => {
                            setViewPopup(true);
                          }}
                        >
                          {job.amount}
                        </Link>
                      </InputLabel>
                    </Grid>

                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Requestor Company</LabelHeader>
                      <LabelData>{job.companyName}</LabelData>
                      </Grid>

                      <Grid item xs={3} sm={2}>
                      <LabelHeader>Requestor Name</LabelHeader>
                      <LabelData>{job.requesterName}</LabelData>
                      </Grid>


                      <Grid item xs={3} sm={2}>
                      <LabelHeader>Transporter</LabelHeader>
                      <LabelData>{job.assignedTransporter}</LabelData>
                      </Grid>
                  </Grid>
                
                </Grid>
              <hr ></hr>
               
              </TableCell>

            </TableRow>
            </TableBody>
       </Table>
            {invoiceList.map((inv)=>(
            
               <Invoice
                 invoice={inv}
              
              >

              </Invoice>

           
      
           
      ))}
   
       </Card>

     
    </>
  );
}
export default React.memo(VerifyInvoices);
