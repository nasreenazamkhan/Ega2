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


    


    useEffect(() => {
        RequestBoeService.fetchInvoicesForPayment(props.statusData.bookingNumber).then((response) => {
          console.log(response);
        
        
        })
        .catch(() => {
          console.log("error");
        });

  

  }, [referenceNumber]);




}
export default MiscellaneousPayment;