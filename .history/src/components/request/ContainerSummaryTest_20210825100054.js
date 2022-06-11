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

import {  useFormContext,Controller } from "react-hook-form";

function ContainerSummaryTest (props)  {
  const { register, control,formState} = useFormContext();


  return (
    <>
     {/* <Grid container spacing={1} >
                       <Grid item >
                       <InputLabel style={{fontSize:'16px',color:'#626262',marginTop:'15px',textAlign:"left" }}>Requester Name</InputLabel>
                       </Grid> 
                       <Grid item >
                       <TextField
          id="subtitle"
          label="Alt Başlık"
          name="subtitle"
          variant="outlined"
        
          size="small"
          inputRef={props.register}
         
          fullWidth
          defaultValue={"Hii"}
        />
                      
                        </Grid>
                      
                       </Grid>
      */}

<Controller
        name="containerSummary.city"
        control={control}
        as={
          <TextField
            ref={register}
            style={{ margin: 20 }}
            variant="outlined"
            size="small"
            label="City"
            error={formState.errors?.containerSummary?.city ? true : false}
            onChange={(e)=>{
                 props.containerSummary.city=e.target.value;
               }}
          />
        }
      />
     hello
    </>
  );
};
export default ContainerSummaryTest;
