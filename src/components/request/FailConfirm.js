import React, { useEffect, useState ,Fragment} from 'react';
import { Formik, Form } from 'formik';
import FormContainer from '../../lib/components/formContainer/formContainer';
import {useParams} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"; 
import { Link} from "react-router-dom"; 
import Alert from '@material-ui/lab/Alert';


let confirmationForm ={
    referenceNumber:''
}

    const useStyles = makeStyles((theme) => ({
    root: {
   textAlign:'center',
    marginTop: theme.spacing(35),
  
}
}));
export default function FailConfirm() {

let { referenceNumber } = useParams();
const classes = useStyles();



useEffect(() => {
    console.log("referenceNumber ::",referenceNumber);
},[]
);
return (
    <Fragment >
    
    <div className={classes.root}>
   
   <img src="C:\Users\paraminfo.anisha\Documents\greenTick.png"></img>
   <h1>Payment Failed</h1>
  <p > Your payment has been Failed</p>
<Typography  variant="body2" component="h4" >{`An Email Confirmation will be sent to shortly with booking details`}</Typography>
  
<Typography  variant="body3" component="h5" >Booking number#{`${referenceNumber}`}</Typography>
 <p>Check your status by going to <Link textColor="green"> My Booking </Link> page </p>
 <p>Reinitialise to proceed for payment</p> 

 
 
 </div>

     </Fragment>);
}