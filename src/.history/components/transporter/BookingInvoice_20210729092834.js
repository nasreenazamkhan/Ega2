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

    const[invoiceList,setInvoiceList]=useState([{
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
    }])
      


    return(
        <>
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
                            defaultValue={ invoice?.invoiceNumber}
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
                height="40px" width="170px" value={ invoice?.invoiceDate }
                             
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
                             defaultValue={ invoice?.vatAmount}
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
                             defaultValue={ invoice?.invoiceAmount}
                            
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
                             defaultValue={ invoice?.invoiceTotalAmount}
                             onBlur={(e) => {
                               invoice.invoiceTotalAmount = e.target.value;
                              
                             }}
                           />
              </Grid>
              <Grid item xs={6} sm={2}>
              <LabelHeader   
                 >
                Transporter Remarks
                 </LabelHeader>
 
                 <TextField label="Enter Description" variant="outlined" style ={{width: '100%'}} multiline="true"
                    defaultValue={ invoice?.transporterRemarks}
                   onBlur={(e)=>{
                    invoice.description=e.target.value;
                    }}
        ></TextField>
              </Grid>
              {(invoice.status==='Invoice Rejected' || invoice.status==='Invoice Approved' ) && <Grid item xs={6} sm={2}>
              <LabelHeader   
                 >
                Remarks
                 </LabelHeader>
 
               <LabelHeader>{invoice.remarks}</LabelHeader>
              </Grid>}
              </Grid>
               <Grid item container xs={12} sm >


 
                


 <Grid item xs={4} sm={2}>
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
 {invoice.fileName===''? <img src="./uploadMisInvoice.png" style={{height:'80px',marginLeft:'-5px'}} />:<img src="./uploadInvDisabled.png" style={{height:'70px',marginTop:'10px'}} />} 
{/* {invoice?.status==='Invoice Rejected'? renderReupload(): renderUpload(invoice)} */}

</label>

            </Grid>
           
           {/* <Grid item xs={4} sm={2}>
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
    */}
         </Grid>         

            
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
        </>



    )
   
}
export default React.memo(BookingInvoice);
  