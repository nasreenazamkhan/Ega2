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


function Invoice(props) {
    const [invoice,setInvoice]=useState(props.invoice);

    const invoiceForm = {
        invoiceNumber: props.invoice.invoiceNumber,
        invoiceDate: props.invoice.invoiceDate,
        vatAmount: props.invoice.vatAmount,
        invoiceAmount: props.invoice.invoiceAmount,
        description: props.invoice.description
      };
    

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

      const methods = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: invoiceForm,
      });
      
    return (
        <>
       
            <FormProvider {...methods}>
           <form>
           <Grid item container xs={12} sm spacing={1}>
             <Grid item xs={6} sm={2}>
                 <LabelHeader
                >
                 Invoice Number
                 </LabelHeader>
                 <TextField
                             variant="outlined"
                             size="small"
                             label="Enter Number"
                             onBlur={(e) => {
                               invoice.invoiceNumber = e.target.value;                  
                             }}
                           />
                
                 </Grid>
           <Grid item xs={6} sm={2}>
                 <LabelHeader
                 
                >
                 Invoice Date
                </LabelHeader>

                 <ApplnDatePicker name={"invoiceDate"} iconColor="#1FA5FF" disablePastDate={true}  
                 height="40px" width="170px"
                             
                 onChange={(e) => {
                   invoice.invoiceDate = methods.getValues().invoiceDate;
              
                   }}
                          
                          />
              </Grid>
               <Grid item xs={6} sm={2}>
               <LabelHeader
                 
                  >
                 Vat Amount
                  </LabelHeader>
 
                  <TextField
                            variant="outlined"
                             size="small"
                              label="Enter Amount"
                              onBlur={(e) => {
                               invoice.vatAmount = e.target.value;
                             }}
                           />
               </Grid>
            <Grid item xs={6} sm={2}>
               <LabelHeader
                 
                  >
                  Invoice Amount
                  </LabelHeader>
 
                  <TextField
                            variant="outlined"
                            size="small"
                              label="Enter Amount"
                              onBlur={(e) => {
                               invoice.invoiceAmount = e.target.value;
                              
                              }}
                           />
               </Grid>
              <Grid item xs={6} sm={2}>
               <LabelHeader
                 
                  >
                  Invoice Total Amount
                  </LabelHeader>
 
                 <TextField
                             variant="outlined"
                             size="small"
                              label="Enter Total Amount"
                              onBlur={(e) => {
                                invoice.invoiceTotalAmount = e.target.value;
                              
                              }}
                            />
               </Grid>
                 <Grid item xs={6} sm={2}>
               <LabelHeader   
                 >
                 Description
                  </LabelHeader>
 
                  <TextField label="Enter Description" variant="outlined" style ={{width: '100%'}} multiline="true"
                     onBlur={(e)=>{
                     invoice.description=e.target.value;
                     }}
         ></TextField>
               </Grid> 
               <Grid item xs={6} sm={2}>
               <LabelHeader   
                 >
                 Admin Comments
                  </LabelHeader>
 
                  <TextField label="Enter Comments" variant="outlined" style ={{width: '100%'}} multiline="true"
                     onBlur={(e)=>{
                     invoice.remarks=e.target.value;
                     }}
         ></TextField>
               </Grid> 
               <Grid item xs={6} sm={2}>
               <LabelHeader
                 
                  >
                 DT Invoice Number
                  </LabelHeader>
 
                 <TextField
                             variant="outlined"
                             size="small"
                              label="Enter DT Invoice Number"
                              onBlur={(e) => {
                                invoice.dtInvoiceNumber = e.target.value;
                              
                              }}
                            />
               </Grid>
               <Grid item xs={8} sm={5}>
               <Button
                                style={{
                                  textTransform: "none",
                                  backgroundColor: "#63BB7A",
                                  color: "white",
                                  borderRadius: "8px",
                                }}
                                variant="contained"
                                onClick={() => {
                                 // setShowPopup(ALERT_DIALOG);
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
                                    marginLeft:"20px"
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    //setShowPopup(CONFIRM_DIALOG);
                                  }}
                                >
                                  Reject
                                </Button>
                                </Grid>
              
               {/* {invoice.fileName && <Grid item xs={4} sm={2}>
       <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.fileName}
      
       </InputLabel>
      </Grid>}

               {invoice.invoiceDocs[0]?.fileName &&  <Grid item xs={4} sm={2}>
      <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[0]?.fileName}
   </InputLabel>
        </Grid>}
        {invoice.invoiceDocs[1]?.fileName &&  <Grid item xs={4} sm={2}>
        <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[1]?.fileName}
        
        </InputLabel>
        
        </Grid>}
        
    
        {invoice.invoiceDocs[2]?.fileName && <Grid item xs={4} sm={2}>
        <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[2]?.fileName}
      
        </InputLabel>
        </Grid>}
        {invoice.invoiceDocs[1]?.fileName &&  <Grid item xs={4} sm={2}>
        <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[1]?.fileName}
     
        </InputLabel>
        
        </Grid>}
        
    
        {invoice.invoiceDocs[2]?.fileName && <Grid item xs={4} sm={2}>
        <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[2]?.fileName}
       
        </InputLabel>
        </Grid>} */}
              </Grid>
              <hr></hr>
              </form>
              </FormProvider>

        </>
    )
  


}
export default React.memo(Invoice);