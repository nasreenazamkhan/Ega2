import React, { useState ,useEffect} from "react";
import { FormProvider, useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Paper,TextBox } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import { withStyles ,createStyles} from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import moment from "moment";
import Button from "@material-ui/core/Button";
import UploadDocumentPopup from "../transporter/UploadDocumentPopup";
import Link from "@material-ui/core/Link";

import {  useFormContext } from "react-hook-form";

const ContainerSummaryTest = (props) => {


  const { register ,formState} = useFormContext(); 

  return (
    <>
     <Grid container spacing={1} >
                       <Grid item >
                       <InputLabel style={{fontSize:'16px',color:'#626262',marginTop:'15px',textAlign:"left" }}>Requester Name</InputLabel>
                       </Grid> 
                       <Grid item >
                         {/* <TextField variant="outlined" size="small" name="requestorName" id="requestorName" inputRef={register("requestorName")}
                         
                        // defaultValue={props.containerSummary.containers?.requesterName}
                          // onChange={(e)=>{
                          //   props.containerSummary.containers.requesterName=e.target.value;
                          // }}
                         
                          error={formState.errors?.requestorName ? true : false}
                        ></TextField>  */}

<input
        {...register("first", {
          required: true
        })}
        placeholder="First"
      />
                      
                        </Grid>
                      
                       </Grid>
     
     hello
    </>
  );
};
export default ContainerSummaryTest;
