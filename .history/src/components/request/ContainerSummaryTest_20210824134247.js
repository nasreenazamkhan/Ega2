import {React,useRef} from "react";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers";
import {  useFormContext } from "react-hook-form";
import { InputLabel,TextBox } from "@material-ui/core";





const ContainerSummaryTest = (props) => {


 // const { register ,formState} = useFormContext(); 


  

  return (
    <>
     
     Hello
         
             
              {/* <Grid container spacing={1} >
                       <Grid item >
                       <InputLabel style={{fontSize:'16px',color:'#626262',marginTop:'15px',textAlign:"left" }}>Requester Name</InputLabel>
                       </Grid> 
                       <Grid item >
                         <TextField variant="outlined" size="small" name="requestorName" id="requestorName" inputRef={register("requestorName")}
                         
                        // defaultValue={props.containerSummary.containers?.requesterName}
                          // onChange={(e)=>{
                          //   props.containerSummary.containers.requesterName=e.target.value;
                          // }}
                         
                          error={formState.errors?.requestorName ? true : false}
                        ></TextField> 
                      
                        </Grid>
                        </Grid>
                       */}
                   
        
     
   </>
  );
};
export default ContainerSummaryTest;