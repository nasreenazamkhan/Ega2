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
  Card,
  withStyles
} from "@material-ui/core";

import RequestBoeService from "../../service/RequestBoeService";



function MiscellaneousPayment(props) {

    console.log("inside MiscellaneousPayment ");


    


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
      <Card>
      <CardContent>

      <Grid container>
             <Grid item xs={8}>
      <InputLabel
        style={{
          marginTop: "13px",
          marginLeft: "13px",
          fontFamily: "Dubai medium",
          fontSize: "22px",
          whiteSpace: "nowrap",
        }}
      >
        Booking # {props.statusData.bookingNumber}
      </InputLabel>


      </Grid>
      </Grid>

     <Table>
         <TableBody>
             <TableRow>
                 <TableCell >
                     <InputLabel style={{fontSize:'26px',color:'#0E1B3D',fontFamily:'Dubai Medium'}}> Invoice Details</InputLabel>
                      <hr style={{color:'red',width:'20px'}}></hr>
                 </TableCell>

             </TableRow>
         </TableBody>


     </Table>

      </CardContent>
      </Card>

      
         

     
        
    </>
    )




}
export default MiscellaneousPayment;