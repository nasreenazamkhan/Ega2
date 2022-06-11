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


function MiscellaneousInvoices() {
  const location = useLocation();
  const [bookingReferenceNumber,setBookingReferenceNumber] = useState(location.state.bookingReferenceNumber);
  const [requestDetailsData,setRequestDetailsData] = useState(location.state.bookingData);
  const[invoiceNumber,setInvoiceNumber]=useState(1);
  const[submittedInvoices,setSubmittedInvoices]=useState([]);
  const[showToaster,setShowToaster]=useState("NO TOASTER");
  const[fetchList,setFetchList]=useState(0);
  const[invoiceList,setInvoiceList]=useState([]);

  // const[invoiceList,setInvoiceList]=useState([{
  //   serialNo:1,
  //   invoiceDocCount:0,
  //   bookingReferenceNumber:bookingReferenceNumber, 
  //   invoiceNumber:'',
  //   invoiceDate:'',
  //   vatAmount:'',
  //   invoiceAmount:'',
  //   description:'',
  //   invoiceDocs:[],
  //   fileName:'',
  //   invoiceDocSize:0,
   

  // }]);
  const[render,setRender]=useState(0);
 

  useEffect(() => {
    RequestBoeService.fetchAllInvoices(bookingReferenceNumber).then((response) => {
     console.log(response);
      setSubmittedInvoices(response.data.dataItems);
     var rejectedItems=response.data.dataItems.filter(x=>x.status==='Invoice Rejected');
     console.log(rejectedItems.length);
     var invoiceNo=rejectedItems.length+1;
     rejectedItems.push({
      serialNo:invoiceNo,
      invoiceDocCount:0,
      bookingReferenceNumber:bookingReferenceNumber, 
      invoiceNumber:'',
      invoiceDate:'',
      vatAmount:'',
      invoiceAmount:'',
      description:'',
      invoiceDocs:[],
      fileName:'',
      invoiceDocSize:0,
     
     })
     setInvoiceNumber(invoiceNo);
     setInvoiceList(rejectedItems);
  

     
     invoiceList.push()
   })
   .catch((error) => {
     console.log("error");
   });
  },[bookingReferenceNumber,fetchList])



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

  const addInvoices=()=>
  {
    
    let invoice={ serialNo:invoiceNumber+1,
      invoiceDocCount:0,
      bookingReferenceNumber:bookingReferenceNumber, 
      invoiceNumber:'',
      invoiceDate:'',
      vatAmount:'',
      invoiceAmount:'',
      description:'',
      invoiceDocs:[],
      fileName:'',
      invoiceDocSize:0}
      setInvoiceNumber(invoice.serialNo)
    invoiceList.push(invoice);
  }

  const deleteInvoice=(serialNo)=>
  {
    invoiceList[serialNo-1].fileName='';
    console.log(invoiceList);
    setRender(render+1);
  }

  const deleteInvoiceDocs=(serialNo,fileName)=>
  {
    const docIndex=invoiceList[serialNo-1].invoiceDocs.findIndex(x=>x.fileName===fileName);
    invoiceList[serialNo-1].invoiceDocs.splice(docIndex,1);
    setRender(render+1);
  }

  const uploadInvoices=(invoicelist)=>
  {
       console.log(invoiceList);
       TransporterService.uploadMiscellaneousInvoices(invoiceList).then((res) => {
         console.log("res",res);
         if(res.status==='success')
         {
          setShowToaster("SUCCESS");
          setFetchList(fetchList+1);
          setInvoiceList([]);
          // setInvoiceList([{
          //   serialNo:1,
          //   invoiceDocCount:0,
          //   bookingReferenceNumber:bookingReferenceNumber, 
          //   invoiceNumber:'',
          //   invoiceDate:'',
          //   vatAmount:'',
          //   invoiceAmount:'',
          //   description:'',
          //   invoiceDocs:[],
          //   fileName:'',
          //   invoiceDocSize:0,
           
        
          //}]);
       
          setRender(render+1);
        }

       })
       .catch((error) => {
        console.log("error");
      });
  }

  



  return (
    <>
    <div className="row">
      <div className="col-md-6">

    <InputLabel style={{fontSize:'21px',color:'#0E1B3D',fontFamily:'Dubai Medium',}}>Invoice Details</InputLabel>
    </div>
    <div className="col-md-6">
    <Button
            variant="contained"
            style={{marginTop:'5px',float:'right'}}
            color="primary"
            onClick={() => uploadInvoices(invoiceList)}
          >
    Send For Approval
          </Button>
          </div>
          </div>
     <br></br>




    <FormProvider {...methods}>
    <Table>
      <TableBody>
     
     { submittedInvoices.filter(x=>x.status!=='Invoice Rejected').map((submittedInvoice)=>
     <>
     <TableRow key={submittedInvoice.referenceNumber}>
     <Grid item container xs={12} sm spacing={1}>
            <Grid item xs={4} sm={2}>
                <LabelHeader
                >
                Invoice Number
                </LabelHeader>
                <LabelHeader
                >
               {submittedInvoice.invoiceNumber}
                </LabelHeader>
                </Grid>
              <Grid item xs={4} sm={2}>
                <LabelHeader
                 
                >
                 Invoice Date
                </LabelHeader>

                <LabelHeader
                > {submittedInvoice.invoiceDate}</LabelHeader>
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader
                 
                 >
                 Vat Amount
                 </LabelHeader>
                 <LabelHeader
                 
                 >
                {submittedInvoice.vatAmount}
                 </LabelHeader>
 
 
                 
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader
                 
                 >
                 Invoice Amount
                 </LabelHeader>
 
                 <LabelHeader
                 
                 >
                {submittedInvoice.invoiceAmount}
                 </LabelHeader>
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader   
                 >
                Description
                 </LabelHeader>
                 <LabelHeader   
                 >
                  {submittedInvoice.description}
                 </LabelHeader> 
 
                
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader   
                 >
                Remarks
                 </LabelHeader>
                 <LabelHeader   
                 >
                     {submittedInvoice.totalInvoiceAmt}
                
                 </LabelHeader> 
 
                
              </Grid>
             
            
              </Grid> 



     </TableRow>
       <TableRow key={submittedInvoice.invoiceNumber}>
       <Grid item container xs={12} sm  alignItems="flex-end">
       <Grid item xs={4} sm={2}>
              <LabelHeader   
                 >
                Invoice Total
                 </LabelHeader>
                 <LabelHeader   
                 >
                  {submittedInvoice.invoiceTotalAmount}
                 </LabelHeader> 
 
                
              </Grid>
       {submittedInvoice.fileName && <Grid item xs={4} sm={2}>
      
     
       <Link style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{submittedInvoice.fileName}
      
       </Link> </Grid>}

       {submittedInvoice.invoiceDocs  && submittedInvoice.invoiceDocs.map((invoiceDoc,ind)=>
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
                        
                        }}
                      >
                        {submittedInvoice.status}
                      </Button>
                    </Grid>
      
     </Grid>
     <hr></hr>
       </TableRow>
       </>
     )}
      {invoiceList && invoiceList.map((invoice)=>(
        <>
  
    
      <TableRow key={invoice.serialNumber}>
   
     <Grid item container xs={12} sm spacing={1}>
            <Grid item xs={6} sm={2}>
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
              <Grid item xs={6} sm={2}>
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
              <Grid item xs={6} sm={2}>
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
              <Grid item xs={6} sm={2}>
              <LabelHeader
                 
                 >
                 Invoice Amount
                 </LabelHeader>
 
                 <TextField
                            variant="outlined"
                            size="small"
                             label="Enter Amount"
                             defaultValue={ invoice.invoiceAmount}
                            
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
                             label="Enter Total Amount"
                             defaultValue={ invoice.invoiceTotalAmount}
                             onBlur={(e) => {
                               invoice.invoiceTotalAmount = e.target.value;
                              
                             }}
                           />
              </Grid>
              <Grid item xs={6} sm={2}>
              <LabelHeader   
                 >
                Description
                 </LabelHeader>
 
                 <TextField label="Enter Description" variant="outlined" style ={{width: '100%'}} multiline="true"
                    defaultValue={ invoice.description}
                   onBlur={(e)=>{
                    invoice.description=e.target.value;
                    }}
        ></TextField>
              </Grid>
              {(invoice.staus==='Invoice Rejected' || invoice.staus==='Invoice Approved' ) && <Grid item xs={6} sm={2}>
              <LabelHeader   
                 >
                Remarks
                 </LabelHeader>
 
               <LabelData>{invoice.remarks}</LabelData>
              </Grid>}
              </Grid>
               <Grid item container xs={12} sm >


    {invoice.serialNo===invoiceNumber &&  <Grid item xs={3} sm={2}>
                <LabelHeader   
                 >
               {" "}
                 </LabelHeader>
              <Button
            variant="contained"
            style={{marginTop:'10px',width:'120px',height:'50px'}}
            color="primary"
            onClick={() => addInvoices()}
          >
        ReUpload Invoice
          </Button>


                </Grid>}  
                


 <Grid item xs={4} sm={2}>
<label htmlFor={invoice.serialNo}>
<input
                      type="file"
                      name={invoice.serialNo}
                      id={invoice.serialNo}
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
{invoice.fileName===''? <img src="./uploadMisInvoice.png" style={{height:'80px',marginLeft:'-5px'}} />:<img src="./uploadInvDisabled.png" style={{height:'70px',marginTop:'10px'}} />}

</label>

            </Grid>
           
           <Grid item xs={4} sm={2}>
            <label htmlFor={invoice.serialNo+""+1}>
<input
                      type="file"
                      name={invoice.serialNo+""+1}
                      id={invoice.serialNo+""+1}
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

<img src="./uploadSupDoc.png" style={{height:'70px',marginTop:'7px'}}/>
</label>

            </Grid>
   
         </Grid>         

              </TableRow>
              <TableRow>
              <Grid item container xs={12} sm  alignItems="flex-end">
      
     
       {invoice.fileName && <Grid item xs={4} sm={2}>
       <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.fileName}
       <img 
                      src="./delete.svg"  
                      onClick={() => {deleteInvoice(invoice.serialNo)}}/>
       </InputLabel>
      </Grid>}
    
  
     
      {invoice.invoiceDocs[0]?.fileName &&  <Grid item xs={4} sm={2}>
      <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[0]?.fileName}
      <img 
                      src="./delete.svg"  
                      onClick={() => {deleteInvoiceDocs(invoice.serialNo,invoice.invoiceDocs[0]?.fileName)}}/></InputLabel>
        </Grid>}
   
     
        {invoice.invoiceDocs[1]?.fileName &&  <Grid item xs={4} sm={2}>
        <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[1]?.fileName}
        <img 
                      src="./delete.svg"  
                      onClick={() => {deleteInvoiceDocs(invoice.serialNo,invoice.invoiceDocs[1]?.fileName)}}/>
        </InputLabel>
        
        </Grid>}
        
    
        {invoice.invoiceDocs[2]?.fileName && <Grid item xs={4} sm={2}>
        <InputLabel style={{fontSize:'16px',color:'#000000',fontFamily:'Dubai Regular',fontWeight:'bold'}}>{invoice.invoiceDocs[2]?.fileName}
        <img 
                      src="./delete.svg"  
                      onClick={() => {deleteInvoiceDocs(invoice.serialNo,invoice.invoiceDocs[2]?.fileName)}}/>
        </InputLabel>
        </Grid>}
     
      </Grid>

     
                  
                   
              </TableRow>
              <hr></hr>
 
   </>


 ))} 
</TableBody>
    </Table>
    


    </FormProvider>
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
  );
}
export default MiscellaneousInvoices;
