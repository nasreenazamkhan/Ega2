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
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import TransporterService from "../../service/TransporterService";
import { useLocation } from "react-router-dom";
import TransporterStatusDetails from  './TransporterStatusDetails';
import RequestBoeService from "../../service/RequestBoeService";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import Link from "@material-ui/core/Link";


function BookingInvoice(props) {
    const location = useLocation();
    const [bookingReferenceNumber,setBookingReferenceNumber] = useState(props.bookingReferenceNumber);
    const [requestDetailsData,setRequestDetailsData] = useState(props.bookingData);
    const[render,setRender]=useState(0);
    const[showToaster,setShowToaster]=useState("NO TOASTER");
    const[fetchList,setFetchList]=useState(0);
    const[invoice,setInvoice]=useState();

    console.log(props.showBooking);
  

  useEffect(() => {
   if(props.showRecords) 
   {
    RequestBoeService.fetchAllInvoices(bookingReferenceNumber,"BOOKINGINV").then((response) => {
      console.log(response);
      if(response?.data?.dataItems[0])
      {
      response.data.dataItems[0].invoiceDocSize=0;    
      setInvoice( response.data.dataItems[0]);
      setRender(render+1);

      
      }
      else{
     setInvoice({
            serialNo:1,
             invoiceDocCount:0,
            bookingReferenceNumber:bookingReferenceNumber, 
             invoiceNumber:'',
             invoiceDate:'',
             vatAmount:'',
             invoiceAmount:'',
             transporterRemarks:'',
             invoiceDocs:[],
             fileName:'',
             invoiceDocSize:0,
             invoiceType:'BOOKINGINV'
      })
      }
    
    
     })
     .catch((error) => {
      console.log("error");
    });
}
  
   },[bookingReferenceNumber,fetchList])

    const uploadInvoices=(invoice)=>
    {
        const invoiceList=[];
        invoiceList.push(invoice);
         TransporterService.uploadInvoices(invoiceList).then((res) => {
           console.log("res",res);
           if(res.status==='success')
           {
            setShowToaster("SUCCESS");
            setFetchList(fetchList+1);
           
           
         
            setRender(render+1);
          }
  
         })
         .catch((error) => {
          console.log("error");
        });
    }

    const deleteInvoice=()=>
  {
    invoice.fileName='';
    setRender(render+1);
  }

  const deleteInvoiceDocs=(fileName)=>
  {
  
    const docIndex=invoice.invoiceDocs.findIndex(x=>x.fileName===fileName);
    invoice.invoiceDocs.splice(docIndex,1);
    setRender(render+1);
  }
  
  
    const renderReupload=()=>{
      return(
        
        <img src="./reUploadInv.png" style={{height:'50px',marginTop:'15px'}}/>
      )
  
    }
  
    const renderUpload=(invoice)=>{
     
     if(invoice.fileName==='')
     return(
     <img src="./uploadMisInvoice.png" style={{height:'80px',marginLeft:'-5px'}} />
     )
     else
     return(
     <img src="./uploadInvDisabled.png" style={{height:'70px',marginTop:'10px'}} />
     )
  
    
      
    }
  

    

    const formValues = {
        invoiceDate:'',
        
      };
      const LabelHeader = withStyles((theme) => ({
        root: {
               fontSize:'16px',
               color:'#434343',
               fontFamily: "Dubai Regular",
        
      
        },
        
       })
      )(InputLabel);
    
      const methods = useForm({
        // resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: formValues,
      });

   

    return(
        <>
         <div className="row">
      <div className="col-md-6">

    <InputLabel style={{fontSize:'21px',color:'#0E1B3D',fontFamily:'Dubai Medium',fontWeight:'bold'}}>Invoice Details</InputLabel>
    </div>
    <div className="col-md-6">
    <Button
            variant="contained"
            style={{marginTop:'5px',float:'right'}}
            color="primary"
            onClick={() => uploadInvoices(invoice)}
          >
    Send For Approval
          </Button>
          </div>
          </div>
     <br></br>


     <div className="row">
     <div className="col-md-8">
     {invoice &&( invoice.status==='Invoice Approved' ||  invoice.status==='Invoice Submitted' ) && 
     <>
    
     <Grid item container xs={12} sm spacing={1}>
            <Grid item xs={4} sm={4}>
                <LabelHeader
                >
                Invoice Number
                </LabelHeader>
                <LabelHeader
                >
               {invoice.invoiceNumber}
                </LabelHeader>
                </Grid>
              <Grid item xs={4} sm={4}>
                <LabelHeader
                 
                >
                 Invoice Date
                </LabelHeader>

                <LabelHeader
                > {invoice.invoiceDate}</LabelHeader>
              </Grid>
              <Grid item xs={4} sm={4}>
              <LabelHeader
                 
                 >
                 Vat Amount
                 </LabelHeader>
                 <LabelHeader
                 
                 >
                {invoice.vatAmount}
                 </LabelHeader>
 
 
                 
              </Grid>
              <Grid item xs={4} sm={4}>
              <LabelHeader
                 
                 >
                 Invoice Amount
                 </LabelHeader>
 
                 <LabelHeader
                 
                 >
                {invoice.invoiceAmount}
                 </LabelHeader>
              </Grid>
            
              <Grid item xs={4} sm={4}>
              <LabelHeader   
                 >
                Invoice Total Amount
                 </LabelHeader>
                 <LabelHeader   
                 >
                     {invoice.invoiceTotalAmount}
                
                 </LabelHeader> 
 
                
              </Grid>
              <Grid item xs={4} sm={4}>
              <LabelHeader   
                 >
                Transporter Comments
                 </LabelHeader>
                 <LabelHeader   
                 >
                  {invoice.transporterRemarks}
                 </LabelHeader> 
 
                
              </Grid>
             
            
              </Grid> 



     
    
  
     </>

                    }
                    {/* {invoice && (invoice.status!=='Invoice Approved' && invoice.status!=='Invoice Submitted') && */}
        { invoice && (invoice.status==='Invoice Rejected'|| invoice.status===undefined ) &&
       
    <FormProvider {...methods}>
          <Grid item container xs={12} sm spacing={1}>
            <Grid item xs={6} sm={4}>
                <LabelHeader
                >
                Invoice Number
                </LabelHeader>
                <TextField
                            variant="outlined"
                            size="small"
                            label="Enter Number"
                            defaultValue={ invoice.invoiceNumber}
                            onBlur={(e) => {
                              invoice.invoiceNumber = e.target.value;                  
                            }}
                          />
                
                </Grid>
              <Grid item xs={6} sm={4}>
                <LabelHeader
                 
                >
                 Invoice Date
                </LabelHeader>

                <ApplnDatePicker name={"invoiceDate"} iconColor="#1FA5FF" disablePastDate={true}  
                height="40px" width="170px" value={ invoice.invoiceDate }
                             
                onChange={(e) => {
                  invoice.invoiceDate = methods.getValues().invoiceDate;
              
                  }}
                          
                         />
              </Grid>
              <Grid item xs={6} sm={4}>
              <LabelHeader
                 
                 >
                 Vat Amount
                 </LabelHeader>
 
                 <TextField
                            variant="outlined"
                            size="small"
                             label="Enter Amount"
                             defaultValue={ invoice.vatAmount}
                             onBlur={(e) => {
                               invoice.vatAmount = e.target.value;
                             }}
                           />
              </Grid>
              <Grid item xs={6} sm={4}>
              <LabelHeader
                 
                 >
                 Invoice Amount
                 </LabelHeader>
 
                 <TextField
                            variant="outlined"
                            size="small"
                             label="Enter Amount"
                             defaultValue={ invoice?.invoiceAmount}
                            
                             onBlur={(e) => {
                               invoice.invoiceAmount = e.target.value;
                              
                             }}
                           />
              </Grid>
              <Grid item xs={6} sm={4}>
              <LabelHeader
                 
                 >
                 Invoice Total Amount
                 </LabelHeader>
 
                 <TextField
                            variant="outlined"
                            size="small"
                             label="Enter Total Amount"
                             defaultValue={ invoice?.invoiceTotalAmount}
                             onBlur={(e) => {
                               invoice.invoiceTotalAmount = e.target.value;
                              
                             }}
                           />
              </Grid>
              <Grid item xs={6} sm={4}>
              <LabelHeader   
                 >
                Transporter Remarks (if Any)
                 </LabelHeader>
 
                 <TextField label="Enter Remarks" variant="outlined" style ={{width: '100%'}} multiline="true"
                    defaultValue={ invoice?.transporterRemarks}
                   onBlur={(e)=>{
                    invoice.transporterRemarks=e.target.value;
                    }}
        ></TextField>
              </Grid>
              {/* {(invoice.status==='Invoice Rejected' || invoice.status==='Invoice Approved' ) && <Grid item xs={6} sm={2}>
              <LabelHeader   
                 >
                Remarks
                 </LabelHeader>
 
               <LabelHeader>{invoice.remarks}</LabelHeader>
              </Grid>} */}
              </Grid>
               <Grid item container xs={12} sm >


 
                


 <Grid item xs={4} sm={3}>
<label htmlFor="bookingInvoice">
<input
                      type="file"
                      name="bookingInvoice"
                      id="bookingInvoice"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        
                        const file = e.target.files[0];
                        e.target.value = '';
                        console.log("???????????", );
                       
                        let promiseData = new Promise(
                          (resolve, reject) => {
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              resolve(event.target.result);
                            };

                            reader.onerror = (err) => {
                              reject(err);
                            };

                            reader.readAsDataURL(file);
                          }
                        );

                        promiseData.then((result) => {
                          const contentArr = result.split(",");
                          const fileType = contentArr[0]
                            .replace("data:", "")
                            .replace(";base64", "");
                        
                          console.log("file type::", fileType);
                          console.log("file size::", file.size);
                        
                            if (file.size <= 500000) {
                               invoice.fileContent = contentArr[1];
                               invoice.fileType = fileType;
              
                               invoice.fileName = file.name;
                               setRender(render + 1);
                              
                             } else {
                               console.log("file size error");
                              // container.upload = false;
                              
                             //  validate(container,job);
                           //  setShowToaster1(true);
                           }
                
                      //  onChange={() => { selectFile(Event, job,props.key) }}
                        })
                      }}
                    />
 
 {invoice?.status==='Invoice Rejected'? renderReupload(): renderUpload(invoice)} 

</label>

            </Grid>
           
            <Grid item xs={4} sm={3}>
            <label htmlFor="supportingDoc">
<input
                      type="file"
                      name="supportingDoc"
                      id="supportingDoc"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        
                        const file = e.target.files[0];
                        e.target.value = '';
                        console.log("???????????", );
                       
                        let promiseData = new Promise(
                          (resolve, reject) => {
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              resolve(event.target.result);
                            };

                            reader.onerror = (err) => {
                              reject(err);
                            };

                            reader.readAsDataURL(file);
                          }
                        );

                        promiseData.then((result) => {
                          const contentArr = result.split(",");
                          const fileType = contentArr[0]
                            .replace("data:", "")
                            .replace(";base64", "");
                         
                          console.log("file type::", fileType);
                          console.log("file size::", file.size);
                           let misc={};

                           if(invoice.invoiceDocSize===0)
                           {
                            invoice.invoiceDocs=[];
                           }
                          
                     
                            if (invoice.invoiceDocSize <= 1500000) {
                              misc.fileContent = contentArr[1];
                              misc.fileType = fileType;
                              invoice.invoiceDocSize=invoice.invoiceDocSize+file.size;
                              
                              misc.fileName = file.name;
                              invoice.invoiceDocs.push(misc);
                             
                              setRender(render + 1);
                             
                            } else {
                              console.log("file size error");
                              
                            }
                          })

                        }}
                       
                    />

{invoice.status==='Invoice Rejected'?<img src="./reUploadDocs.png" style={{height:'50px',marginTop:'15px'}}></img>:<img src="./uploadSupDoc.png" style={{height:'70px',marginTop:'7px'}}></img>}
</label>

            </Grid>
            </Grid> 
            <Grid item container xs={12} sm  alignItems="flex-end">
      
     
      {invoice.fileName && <Grid item xs={4} sm={2}>
      <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.fileName}
      <img 
                     src="./delete.svg"  
                     onClick={() => {deleteInvoice()}}/>
      </InputLabel>
     </Grid>}
   
 
    
     {invoice.invoiceDocs[0]?.fileName &&  <Grid item xs={4} sm={2}>
     <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[0]?.fileName}
     <img 
                     src="./delete.svg"  
                     onClick={() => {deleteInvoiceDocs(invoice.invoiceDocs[0]?.fileName)}}/></InputLabel>
       </Grid>}
  
    
       {invoice.invoiceDocs[1]?.fileName &&  <Grid item xs={4} sm={2}>
       <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[1]?.fileName}
       <img 
                     src="./delete.svg"  
                     onClick={() => {deleteInvoiceDocs(invoice.invoiceDocs[1]?.fileName)}}/>
       </InputLabel>
       
       </Grid>}
       
   
       {invoice.invoiceDocs[2]?.fileName && <Grid item xs={4} sm={2}>
       <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[2]?.fileName}
       <img 
                     src="./delete.svg"  
                     onClick={() => {deleteInvoiceDocs(invoice.invoiceDocs[2]?.fileName)}}/>
       </InputLabel>
       </Grid>}
    
     </Grid> 
    
                 

            
              
      </FormProvider> }
      </div>
      <div className="col-md-4">
      <Grid item container xs={12} sm spacing={1}>
      <Grid item  sm={2}></Grid>
          <Grid item sm={10}  >
              <Table size="small">
                  <TableBody>
                      <TableRow>
                          <TableCell style={{borderBottom:'none'}} colSpan={2}>
    <InputLabel style={{fontSize:'21px',color:'#0E1B3D',fontFamily:'Dubai Medium',fontWeight:'bold',float:'right'}}>Payment Breakup</InputLabel>
    </TableCell>
              
    </TableRow>
    <TableRow>
        <TableCell style={{borderBottom:'none'}}>  <InputLabel style={{fontSize:'18px',color:'#000000',fontFamily:'Dubai Regular',float:'right'}}>Gross Amount</InputLabel></TableCell>
        <TableCell style={{borderBottom:'none'}}>  <InputLabel style={{fontSize:'18px',color:'#000000',fontFamily:'Dubai Regular',float:'right'}}>{requestDetailsData.grossAmount} AED</InputLabel></TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{borderBottom:'none'}}>  <InputLabel style={{fontSize:'18px',color:'#000000',fontFamily:'Dubai Regular',float:'right'}}>Amount Receivable</InputLabel></TableCell>
        <TableCell style={{borderBottom:'none'}}>  <InputLabel style={{fontSize:'18px',color:'#0568AE',fontFamily:'Dubai Regular',float:'right',fontWeight:'bold'}}>{requestDetailsData.grossAmount} AED</InputLabel></TableCell>
        </TableRow>
    </TableBody>
    </Table>
           </Grid>

          </Grid>
          </div></div>

          {invoice && (invoice.status==='Invoice Approved' || invoice.status==='Invoice Submitted') && 
          <>
          <Grid item container xs={12} sm  alignItems="flex-end">
   
   {invoice.fileName && <Grid item xs={4} sm={2}>
  
 
   <Link style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.fileName}
  
   </Link> </Grid>}

   {invoice.invoiceDocs  && invoice.invoiceDocs.map((invoiceDoc)=>
   (
    <Grid item xs={4} sm={2}>
    <Link style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoiceDoc.fileName}
    </Link>
    </Grid>
   )) 
   
   
 }
   <Grid item xs={4} sm={2}>
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "capitalize",
                      backgroundColor: "#EB9743",
                      width:"150px",
                      height:"50px"
                    
                    }}
                  >
                    {invoice.status}
                  </Button>
                </Grid>
  
 </Grid>
 <hr></hr>
 
 </>}

 <TransporterStatusDetails
      requestDetailsData={requestDetailsData}
      isMiscellaneous={true}
    
    ></TransporterStatusDetails>
        

          
{showToaster==='SUCCESS' && 
          <SuccessToast
          icon="check_circle"
          title="Invoice Submitted SuccessFully"
          message="*Invoice Submitted SuccessFully"
          showToast={()=>{setShowToaster("NO TOASTER")}}
          position="top-right"
        />}
        </>



    )
   
}
export default React.memo(BookingInvoice);
  