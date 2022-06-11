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
import CommonService from "../../service/CommonService";




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

  const onFileDownload = (invoice) => {
   
          const linkSource = `data:${invoice.filetype};base64,${invoice.fileContent}`;
          const downloadLink = document.createElement("a");
  
          downloadLink.href = linkSource;
          downloadLink.download = invoice.fileName;
          downloadLink.target = "_blank";
          // alert(downloadLink);
          downloadLink.click();
        }
 




    


    useEffect(() => {
        console.log("useEffect MiscellaneousPayment ")
        RequestBoeService.fetchInvoicesForPayment(props.statusData.bookingNumber).then((response) => {
        if (response.isAxiosError)
        setRequest();
        else{
          console.log(response);
          setRequest(response.data.dataItems[0]);
        }
        
        
        })
        .catch(() => {
          console.log("error");
          setRequest();
        });

  

  }, [props.statusData.bookingNumber]);

  return (
    <>
    {request &&  <Card>
      <CardContent>

      <Grid container>
      <Grid item  xs={10}>
      <InputLabel
        style={{
          marginTop: "13px",
       
          fontFamily: "Dubai medium",
          fontSize: "22px",
          whiteSpace: "nowrap",
        }}
      >
        Booking # {props.statusData.bookingNumber}
      </InputLabel>

          </Grid>
          <Grid item  xs={2}>
      <Button
            variant="contained"
            style={{marginTop:'10px',float:'right'}}
            color="primary"
            onClick={() => RequestBoeService.makePaymentForInvoices(request).then((res) => {
                if (res.isAxiosError)
                console.log("error occured during payment");
                else
                { 
              
                const dataVal = {
                serviceOwnerID: res.data.dataItems[0].serviceOwnerID,
                serviceID: res.data.dataItems[0].serviceID,
                serviceChannel: res.data.dataItems[0].serviceChannel,
                licenseKey: res.data.dataItems[0].licenseKey,
                 customerReferenceNumber:
                 res.data.dataItems[0].customerReferenceNumber,
                 serviceDescription: res.data.dataItems[0].serviceDescription,
                 responseURL: res.data.dataItems[0].responseURL,
                serviceCost: res.data.dataItems[0].serviceCost,
                soTransactionID: res.data.dataItems[0].soTransactionID,
               documentationCharges: res.data.dataItems[0].documentationCharges,
               signature: res.data.dataItems[0].signature,
               popup: res.data.dataItems[0].popup,
               buEncryptionMode: res.data.dataItems[0].buEncryptionMode,
             };
             
             CommonService.postToExternalSite(
               dataVal,
               res.data.dataItems[0].gatewayUrl
             );
                }
                
                
                })
                .catch(() => {
                  console.log("error");
                  setRequest();
                })
        
            }>
            Pay Amount
          </Button>
          </Grid>
          </Grid>
      <br></br>


      
    
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
                   
                    
                         <Grid item  xs={2}>
                     <InputLabel style={{fontSize:'20px',color:'#000000',fontFamily:'Dubai Medium'}}> Amount to be Paid</InputLabel>
                     </Grid>
                     <Grid item  xs={2}>
                        
                         <InputLabel style={{fontSize:'20px',color:'#0568AE',fontFamily:'Dubai Medium'}}> {request.unpaidAmount} AED</InputLabel>
                         </Grid>
                     </Grid>
                  
     <Table>
         <TableBody>
           
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
            <img src="./Invoice_icon.svg"  onClick={() => onFileDownload(invoice)}></img>
                
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