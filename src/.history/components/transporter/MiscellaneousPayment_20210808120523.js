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

  const TableHeader = withStyles((theme) => ({
    root: {
           fontSize:'18px',
           color:'#434343',
           fontFamily: "Dubai Medium",
    
  
    },
    
   })
  )(InputLabel);

  const StyledTableCell = withStyles((theme) => ({
    root: {
          borderBottom:'0px'
    
  
    },
    
   })
  )(TableCell);


  const TableData = withStyles((theme) => ({
    root: {
           fontSize:'16px',
           color:'#434343',
           fontFamily: "Dubai Regular",
    
  
    },
    
   })
  )(InputLabel);



    


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
    
      <Grid container>
             <Grid item xs={4}>
             <InputLabel style={{fontSize:'26px',color:'#0E1B3D',fontFamily:'Dubai Medium'}}> Invoice Details</InputLabel>
                 </Grid>
                 <Grid item  xs={2}>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Total Amount Paid</InputLabel>
                     </Grid>
                     <Grid item xs={2}> 
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.paidAmount}  AED</InputLabel>
                         </Grid>
                     </Grid>
                    
                         <Grid item>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Total Amount to be Paid</InputLabel>
                     </Grid>
                     <Grid item>
                        
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.unpaidAmount}+ " AED"</InputLabel>
                         </Grid>
                     </Grid>

     <Table>
         <TableBody>
             {/* <TableRow>
                 <TableCell >
                     <InputLabel style={{fontSize:'26px',color:'#0E1B3D',fontFamily:'Dubai Medium'}}> Invoice Details</InputLabel>
                     
                 </TableCell>
                 <TableCell >

                 </TableCell>
                 <TableCell  >
                 <Grid container spacing={1}>
                     <Grid item>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Total Amount Paid</InputLabel>
                     </Grid>
                     <Grid item> 
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.paidAmount} + " AED"</InputLabel>
                         </Grid>
                     </Grid>
                     
                     
                 </TableCell>
                 <TableCell  >
                 <Grid container  spacing={1}>
                     <Grid item>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Total Amount to be Paid</InputLabel>
                     </Grid>
                     <Grid item>
                        
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.unpaidAmount}+ " AED"</InputLabel>
                         </Grid>
                     </Grid>
                   
                     
                 </TableCell>
               

             </TableRow> */}
             <TableRow>
             <TableCell>
                 <TableHeader>Invoice Number</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Invoice Date</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Vat Amount</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Invoice Amount</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Description</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Invoice</TableHeader>

             </TableCell>
             <TableCell>
                 <TableHeader>Payment Status</TableHeader>

             </TableCell>

             </TableRow>
             
             {request.invoiceList.map((invoice)=>(
               <TableRow>
                    <StyledTableCell>
                 <TableHeader>{invoice.invoiceNumber}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.invoiceDate}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.vatAmount}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.invoiceAmount}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.description}</TableHeader>

             </StyledTableCell>
             <StyledTableCell>
            <img src="./Invoice_icon.svg"></img>
                
             </StyledTableCell>
             <StyledTableCell>
                 <TableHeader>{invoice.paymentStatus}</TableHeader>

             </StyledTableCell>

                    </TableRow>

             ))}
            

         </TableBody>


     </Table>

      </CardContent>
      </Card> }

      
         

     
        
    </>
    )




}
export default MiscellaneousPayment;