import React, { useEffect ,useState} from "react";


import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Icon,
  Grid,
  TextField,
  Button,
  InputLabel,
  withStyles
} from "@material-ui/core";

import RequestBoeService from "../../service/RequestBoeService";



function MiscellaneousPayment(props) {

    console.log("inside MiscellaneousPayment ")


    


    useEffect(() => {
        console.log("useEffect MiscellaneousPayment ")
        RequestBoeService.fetchInvoicesForPayment(props.statusData.bookingNumber).then((response) => {
          console.log(response);
        
        
        })
        .catch(() => {
          console.log("error");
        });

  

  }, [props.statusData.bookingNumber]);

  return (
    <>
    </>
    )




}
export default MiscellaneousPayment;