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
    // <TableRow key={invoice.serialNumber}>
   
    //  <Grid item container xs={12} sm spacing={1}>
    //         <Grid item xs={6} sm={2}>
    //             <LabelHeader
    //             >
    //             Invoice Number
    //             </LabelHeader>
    //             <TextField
    //                         variant="outlined"
    //                         size="small"
    //                         label="Enter Number"
    //                         onBlur={(e) => {
    //                           invoice.invoiceNumber = e.target.value;                  
    //                         }}
    //                       />
                
    //             </Grid>
    //           <Grid item xs={6} sm={2}>
    //             <LabelHeader
                 
    //             >
    //              Invoice Date
    //             </LabelHeader>

    //             <ApplnDatePicker name={"invoiceDate"} iconColor="#1FA5FF" disablePastDate={true}  
    //             height="40px" width="170px"
                             
    //             onChange={(e) => {
    //               invoice.invoiceDate = methods.getValues().invoiceDate;
              
    //               }}
                          
    //                      />
    //           </Grid>
    //           <Grid item xs={6} sm={2}>
    //           <LabelHeader
                 
    //              >
    //              Vat Amount
    //              </LabelHeader>
 
    //              <TextField
    //                         variant="outlined"
    //                         size="small"
    //                          label="Enter Amount"
    //                          onBlur={(e) => {
    //                            invoice.vatAmount = e.target.value;
    //                          }}
    //                        />
    //           </Grid>
    //           <Grid item xs={6} sm={2}>
    //           <LabelHeader
                 
    //              >
    //              Invoice Amount
    //              </LabelHeader>
 
    //              <TextField
    //                         variant="outlined"
    //                         size="small"
    //                          label="Enter Amount"
    //                          onBlur={(e) => {
    //                            invoice.invoiceAmount = e.target.value;
                              
    //                          }}
    //                        />
    //           </Grid>
    //           <Grid item xs={6} sm={2}>
    //           <LabelHeader
                 
    //              >
    //              Invoice Total Amount
    //              </LabelHeader>
 
    //              <TextField
    //                         variant="outlined"
    //                         size="small"
    //                          label="Enter Total Amount"
    //                          onBlur={(e) => {
    //                            invoice.invoiceTotalAmount = e.target.value;
                              
    //                          }}
    //                        />
    //           </Grid>
    //           <Grid item xs={6} sm={2}>
    //           <LabelHeader   
    //              >
    //             Description
    //              </LabelHeader>
 
    //              <TextField label="Enter Description" variant="outlined" style ={{width: '100%'}} multiline="true"
    //                 onBlur={(e)=>{
    //                 invoice.description=e.target.value;
    //                 }}
    //     ></TextField>
    //           </Grid>
    //           </Grid>
    //    </TableRow>


}
export default React.memo(Invoice);