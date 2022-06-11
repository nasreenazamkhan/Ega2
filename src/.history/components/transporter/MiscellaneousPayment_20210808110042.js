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

  const [request,setRequest]=useState();


    


    useEffect(() => {
        console.log("useEffect MiscellaneousPayment ")
        RequestBoeService.fetchInvoicesForPayment(props.statusData.bookingNumber).then((response) => {
          console.log(response);
          setRequest(response.data.dataItems[0]);
        
        
        })
        .catch(() => {
          console.log("error");
        });

  

  }, [props.statusData.bookingNumber]);

  return (
    <>
    {request &&  <Card>
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
                 <TableCell colSpan={5} >
                     <InputLabel style={{fontSize:'26px',color:'#0E1B3D',fontFamily:'Dubai Medium'}}> Invoice Details</InputLabel>
                     
                 </TableCell>
                 <TableCell  >
                 <Grid container spacing={1}>
                     <Grid item>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Total Amount Paid</InputLabel>
                     </Grid>
                     <Grid item>
                        
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.paidAmount}</InputLabel>
                         </Grid>
                     </Grid>
                     
                     
                 </TableCell>
                 <TableCell  >
                 <Grid container  spacing={1}>
                     <Grid item>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Total Amount to be Paid</InputLabel>
                     </Grid>
                     <Grid item>
                        
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.unpaidAmount}</InputLabel>
                         </Grid>
                     </Grid>
                   
                     
                 </TableCell>
               

             </TableRow>
         </TableBody>


     </Table>

      </CardContent>
      </Card> }

      
         

     
        
    </>
    )




}
export default MiscellaneousPayment;