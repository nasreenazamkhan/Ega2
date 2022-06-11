import React, { useState, useEffect } from "react";
import {  Button } from "@material-ui/core/";
import {
  TextField,
  InputLabel,
  Grid,
  withStyles,
} from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";

import BookingService from "../../service/BookingService";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import Link from "@material-ui/core/Link";



function Invoice(props) {
    const [invoice,setInvoice]=useState(props.invoice);
    const [render,setRender]=useState(0);
    console.log("invoice",props.invoice)
    


    const invoiceForm = {
        invoiceNumber: props.invoice.invoiceNumber,
        invoiceDate: props.invoice.invoiceDate,
        vatAmount: props.invoice.vatAmount,
        invoiceAmount: props.invoice.invoiceAmount,
        description: props.invoice.description
      };

      console.log("invoiceForm",invoiceForm);

   const downloadFile=(invoice)=>
      {
        const linkSource = `data:${invoice.filetype};base64,${invoice.fileContent}`;
            const downloadLink = document.createElement("a");
        
            downloadLink.href = linkSource;
            downloadLink.download =invoice.fileName;
            downloadLink.target = "_blank";
            // alert(downloadLink);
            downloadLink.click();
      }
    
    
    

    const LabelHeader = withStyles((theme) => ({
        root: {
          fontSize: "18px",
          color: "#757575",
          fontFamily: "Dubai Medium",
          marginTop: "1px",
        },
      }))(InputLabel);
      
      const LabelData = withStyles((theme) => ({
        root: {
          fontWeight:"bold",
          fontSize: "16px",
          color: "#000000",
          fontFamily: "Dubai Regular",
          marginTop: "2px",
          
        },
      }))(InputLabel);

      const methods = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: invoiceForm,
      });
      
    return (
        <>
       
            <FormProvider {...methods}>
           <form>
           {invoice.status!=='Invoice Submitted' &&
           <>
           <Grid item container xs={12} sm spacing={1}>
            <Grid item xs={4} sm={2}>
                <LabelHeader
                >
                Invoice Number
                </LabelHeader>
                <LabelHeader
                >
               {invoice.invoiceNumber}
                </LabelHeader>
                </Grid>
              <Grid item xs={4} sm={2}>
                <LabelHeader
                 
                >
                 Invoice Date
                </LabelHeader>

                <LabelHeader
                > {invoice.invoiceDate}</LabelHeader>
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader
                 
                 >
                 Vat Amount
                 </LabelHeader>
                 <LabelHeader
                 
                 >
                {invoice.vatAmount}
                 </LabelHeader>
 
 
                 
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader
                 
                 >
                 Invoice Amount
                 </LabelHeader>
 
                 <LabelHeader
                 
                 >
                {invoice.invoiceAmount}
                 </LabelHeader>
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader   
                 >
                Description
                 </LabelHeader>
                 <LabelHeader   
                 >
                  {invoice.description}
                 </LabelHeader> 
 
                
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader   
                 >
                Remarks
                 </LabelHeader>
                 <LabelHeader   
                 >
                     {invoice.remarks}
                
                 </LabelHeader> 
 
                
              </Grid>
             
            
              </Grid> 

       <Grid item container xs={12} sm  alignItems="flex-end">
       <Grid item xs={4} sm={2}>
              <LabelHeader   
                 >
                Invoice Total
                 </LabelHeader>
                 <LabelHeader   
                 >
                  {invoice.invoiceTotalAmount}
                 </LabelHeader> 
 
                
              </Grid>

              <Grid item xs={4} sm={2}>
              <LabelHeader   
                 >
                DT Invoice Number
                 </LabelHeader>
                 <LabelHeader   
                 >
                  {invoice.dtInvoiceNumber}
                 </LabelHeader> 
 
                
              </Grid>

              <Grid item xs={4} sm={2}>
                       <LabelHeader   
                 >
               Payment Status
                 </LabelHeader>
                 <LabelHeader   
                 >
                  {invoice.paymentStatus}
                 </LabelHeader> 
                    </Grid>

               {props.payment &&  invoice.status==='SETTLED' &&  <Grid item xs={4} sm={2}>
                       <LabelHeader   
                 >
             Settled On
                 </LabelHeader>
                 <LabelHeader   
                 >
                  {invoice.settledOn}
                 </LabelHeader>
                
                    </Grid>}

                    || invoice.paymentStatus.includes('PAID'))  &&   <Grid item xs={4} sm={2}>
                       <LabelHeader   
                 >
             Settled On
                 </LabelHeader>
                 <TextField
                             variant="outlined"
                             size="small"
                            
                             name={"invoiceNumber"}
                             defaultValue={invoice.settledOn}
                             onBlur={(e) => {
                               invoice.settledOn = e.target.value;                  
                             }}
                           />
                
                    </Grid>}

              <Grid item xs={4} sm={2}>
                      <Button
                        variant="contained"
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#EB9743",
                          marginLeft:'10px'
                        
                        }}
                      >
                        {invoice.status}
                      </Button>
                    </Grid>

                    </Grid>


           <Grid item container xs={12} sm  alignItems="flex-end">    

              {invoice.fileName && <Grid item xs={4} sm={2}>
      
     
       <Link style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}  onClick={()=>downloadFile(invoice)}  >{invoice.fileName}
      
       </Link> </Grid>}

       {invoice.invoiceDocs  && invoice.invoiceDocs.map((invoiceDoc,ind)=>
       (
        <Grid item xs={4} sm={2}>
        <Link style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}  onClick={()=>downloadFile(invoiceDoc)}  >{invoiceDoc.fileName}
        </Link>
        </Grid>
       )) 
       
       
     }
      
      
     </Grid>
              </>
              }


           {!props?.payment && invoice.status==='Invoice Submitted' &&  <Grid item container xs={12} sm spacing={1}>
             <Grid item xs={6} sm={2}>
                 <LabelHeader
                >
                 Invoice Number
                 </LabelHeader>
                 <TextField
                             variant="outlined"
                             size="small"
                            
                             name={"invoiceNumber"}
                             defaultValue={invoice.invoiceNumber}
                             onBlur={(e) => {
                               invoice.invoiceNumber = e.target.value;                  
                             }}
                           />
                
                 </Grid>
           <Grid item xs={6} sm={2}>
                 <LabelHeader
                 
                >
                 Invoice Date
                </LabelHeader>

                 <ApplnDatePicker name={"invoiceDate"} iconColor="#1FA5FF" disablePastDate={true}  
                 height="40px" width="170px"     value={invoice.invoiceDate}
                             
                 onChange={(e) => {
                   invoice.invoiceDate = methods.getValues().invoiceDate;
              
                   }}
                          
                          />
              </Grid>
               <Grid item xs={6} sm={2}>
               <LabelHeader
                 
                  >
                 Vat Amount
                  </LabelHeader>
 
                  <TextField
                            variant="outlined"
                             size="small"
                            
                              name={"vatAmount"}
                              defaultValue={invoice.vatAmount}
                              onBlur={(e) => {
                               invoice.vatAmount = e.target.value;
                             }}
                           />
               </Grid>
            <Grid item xs={6} sm={2}>
               <LabelHeader
                 
                  >
                  Invoice Amount
                  </LabelHeader>
 
                  <TextField
                            variant="outlined"
                            size="small"
                           
                              name={"invoiceAmount"}
                              defaultValue={invoice.invoiceAmount}
                              onBlur={(e) => {
                               invoice.invoiceAmount = e.target.value;
                              
                              }}
                           />
               </Grid>
              <Grid item xs={6} sm={2}>
               <LabelHeader
                 
                  >
                  Invoice Total Amount
                  </LabelHeader>
 
                 <TextField
                             variant="outlined"
                             size="small"
                              
                              name={"invoiceTotalAmount"}
                              defaultValue={invoice.invoiceTotalAmount}
                              onBlur={(e) => {
                                invoice.invoiceTotalAmount = e.target.value;
                              
                              }}
                            />
               </Grid>
               <Grid item xs={6} sm={2}>
               <LabelHeader
                 
                  >
                 DT Invoice Number
                  </LabelHeader>
 
                 <TextField
                             variant="outlined"
                             size="small"
                        
                              onBlur={(e) => {
                                invoice.dtInvoiceNumber = e.target.value;
                              
                              }}
                            />
               </Grid>
              
               <Grid item xs={6} sm={2}>
               <LabelHeader   
                 >
                 Admin Comments
                  </LabelHeader>
 
                  <TextField label="Enter Comments" variant="outlined" style ={{width: '100%'}} multiline={true}
                     onBlur={(e)=>{
                     invoice.remarks=e.target.value;
                     }}
         ></TextField>
               </Grid> 
               <Grid item xs={6} sm={2}>
               <LabelHeader   
                 >
                 Description
                  </LabelHeader>
 
                  <TextField variant="outlined" style ={{width: '100%'}} multiline={true}
                    defaultValue={invoice.description}
                     onBlur={(e)=>{
                     invoice.description=e.target.value;
                     }}
         ></TextField>
               </Grid> 
             
               <Grid item sm={8} >
               <Button
                                style={{
                                  textTransform: "none",
                                  backgroundColor: "#63BB7A",
                                  color: "white",
                                  borderRadius: "8px",
                                }}
                                variant="contained"
                                onClick={() => {
                                  invoice.status="approved"
                                    BookingService.approveRejectInvoice(invoice).then((res) => {
                                      if(res?.status==='success')
                                      {
                                        invoice.status="Invoice Approved";
                                        setRender(render+1);
                                      }
                                    })
                                  }}
                               
                              >
                                Approve
                              </Button>


                         
                                <Button
                                  style={{
                                    textTransform: "none",
                                    backgroundColor: "#FF7275",
                                    color: "white",
                                    borderRadius: "8px",
                                    marginLeft:"20px"
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    invoice.status="reject"
                                    BookingService.approveRejectInvoice(invoice).then((res) => {
                                      if(res?.status==='success')
                                      {
                                         invoice.status="Invoice Rejected";
                                         setRender(render+1);
                                      }
                                    })
                                  }}
                                >
                                  Reject
                                </Button>
                                </Grid>
                              
              
                {invoice.fileName && <Grid item xs={4} sm={2}>
       <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.fileName}
       <img style={{marginLeft:'2px'}}
                      src="./invoices.svg"  
                      onClick={() => {downloadFile(invoice)}}/>
       </InputLabel>
      </Grid>}

               {invoice.invoiceDocs[0]?.fileName &&  <Grid item xs={4} sm={2}>
      <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[0]?.fileName}
      <img style={{marginLeft:'2px'}}
                      src="./invoices.svg"  
                      onClick={() => {downloadFile(invoice.invoiceDocs[0])}}/>
   </InputLabel>
        </Grid>}
        {invoice.invoiceDocs[1]?.fileName &&  <Grid item xs={4} sm={2}>
        <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[1]?.fileName}
        <img style={{marginLeft:'2px'}}
                      src="./invoices.svg"  
                      onClick={() => {downloadFile(invoice.invoiceDocs[1])}}/>
        </InputLabel>
        
        </Grid>}
        
    
        {invoice.invoiceDocs[2]?.fileName && <Grid item xs={4} sm={2}>
        <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[2]?.fileName}
        <img style={{marginLeft:'2px'}}
                      src="./invoices.svg"  
                      onClick={() => {downloadFile(invoice.invoiceDocs[2])}}/>
        </InputLabel>
        </Grid>}
    
        
    
     
              </Grid> }
              <hr></hr>
              </form>
              </FormProvider>

        </>
    )
  


}
export default React.memo(Invoice);