import React, { useEffect, useState } from "react";


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
import TransporterStatusDetails from './TransporterStatusDetails';
import RequestBoeService from "../../service/RequestBoeService";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import ErrorToast from "../../lib/components/toast/ErrorToast";
import Link from "@material-ui/core/Link";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useHistory } from "react-router-dom";


function MiscellaneousInvoices(props) {
  const location = useLocation();
  const [bookingReferenceNumber, setBookingReferenceNumber] = useState(location.state.bookingReferenceNumber ? location.state.bookingReferenceNumber : props.bookingReferenceNumber);
  const [requestDetailsData, setRequestDetailsData] = useState(location.state.bookingData ? location.state.bookingData : props.bookingData);
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [submittedInvoices, setSubmittedInvoices] = useState([]);
  const [showToaster, setShowToaster] = useState("NO TOASTER");
  const [fetchList, setFetchList] = useState(0);
  const [invoiceList, setInvoiceList] = useState([]);
  const todayDate = new Date();
  let history = useHistory();

  
  // const digitsOnly = (value) => /^\d+(\.\d{2})?$/.test(value) 

  // // const schema = Yup.object().shape({
  // //   vatAmount: Yup.string().test('testInput', 'The field should have digits only', digitsOnly)

  // // });

  const useStyles = makeStyles((theme) => ({
    textField: {
      '& p': {
        color: 'red'
      }
    }
  }));

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
  const [render, setRender] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    RequestBoeService.fetchAllInvoices(bookingReferenceNumber, "TRANSINV").then((response) => {
      console.log(response);
      setSubmittedInvoices(response?.data?.dataItems);
      var rejectedItems = response !== undefined ? response.data.dataItems.filter(x => x.status === 'Invoice Rejected') : [];
      rejectedItems.forEach((x, ind) => { x.serialNo = (ind + 1); x.invoiceDocSize = 0 });
      var invoiceNo = rejectedItems.length + 1;
      rejectedItems.push({
        serialNo: invoiceNo,
        invoiceDocCount: 0,
        bookingReferenceNumber: bookingReferenceNumber,
        invoiceNumber: '',
        invoiceDate: '',
        description: '',
        invoiceDocs: [],
        fileName: '',
        invoiceDocSize: 0,
        invoiceType: 'TRANSINV'
      })
      setInvoiceNumber(invoiceNo);
      setInvoiceList(rejectedItems);
    })
      .catch((error) => {
        console.log("error");
      });
  }, [bookingReferenceNumber, fetchList])


  const formValues = {
    invoiceDate: '',
    vatAmount: 0,
    invoiceAmount: 0,
    invoiceTotalAmount: 0
  };

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: formValues,
  });


  const LabelHeader = withStyles((theme) => ({
    root: {
      fontSize: '16px',
      color: '#434343',
      fontFamily: "Dubai Regular",
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
    },
  })
  )(InputLabel);


  const addInvoices = () => {
    let invoice = {
      serialNo: invoiceNumber + 1,
      invoiceDocCount: 0,
      bookingReferenceNumber: bookingReferenceNumber,
      invoiceNumber: '',
      invoiceDate: '',
      description: '',
      invoiceDocs: [],
      fileName: '',
      invoiceDocSize: 0,
      invoiceType: 'TRANSINV'

    }
    setInvoiceNumber(invoice.serialNo)
    invoiceList.push(invoice);
  }

  const deleteInvoice = (serialNo) => {
    invoiceList[serialNo - 1].fileName = '';
    console.log(invoiceList);
    setRender(render + 1);
  }

  const deleteInvoiceDocs = (serialNo, fileName) => {
    console.log(invoiceList);
    const docIndex = invoiceList[serialNo - 1].invoiceDocs.findIndex(x => x.fileName === fileName);
    invoiceList[serialNo - 1].invoiceDocs.splice(docIndex, 1);
    setRender(render + 1);
  }

  const uploadInvoices = (invoicelist) => {
    if (validateInvoices(invoiceList)) {
      console.log("done",invoiceList)
      // TransporterService.uploadInvoices(invoiceList).then((res) => {
      //   console.log("res", res);
      //   if (res.status === 'success') {
      //     setShowToaster("SUCCESS");
      //     setFetchList(fetchList + 1);
      //     setInvoiceList([]);
      //     // setInvoiceList([{
      //     //   serialNo:1,
      //     //   invoiceDocCount:0,
      //     //   bookingReferenceNumber:bookingReferenceNumber, 
      //     //   invoiceNumber:'',
      //     //   invoiceDate:'',
      //     //   vatAmount:'',
      //     //   invoiceAmount:'',
      //     //   description:'',
      //     //   invoiceDocs:[],
      //     //   fileName:'',
      //     //   invoiceDocSize:0,


      //     //}]);
      //   }
      // })
      //   .catch((error) => {
      //     console.log("error");
      //   });
    }
    setRender(render + 1);
  }

  const validateInvoices = (invoiceList) => {
    var validationSuccess = true;
    for (let i = 0; i < invoiceList.length; i++) {
      var inv=invoiceList[i];
      inv.vatAmountError = '';
      inv.invoiceAmountError = '';
      inv.totalInvoiceAmtError = '';
      inv.missingInvoiceError = '';
      inv.invoiceNumberError = '';
      inv.invoiceDateError = '';
      
      if(inv.invoiceNumber==='' && inv.invoiceDate===''  &&  inv.description===''
       && (inv.vatAmount===undefined  ||inv.vatAmount==='') && (inv.invoiceAmount===undefined || inv.invoiceAmount==='')
        && (inv.invoiceTotalAmount===undefined || inv.invoiceTotalAmount==='' ) )
        {
          continue; 
        }
        else
        {
          if(inv.invoiceNumber==='')
          {
            inv.invoiceNumberError = true;
            validationSuccess = false;
          }
          if(inv.invoiceDate==='')
          {
            inv.invoiceDateError = true;
            validationSuccess = false;
          }

      var regexp = /^[0-9.]*$/;
      if (inv.vatAmount==='' && !regexp.test(inv.vatAmount)) {
        inv.vatAmountError = true;
        validationSuccess = false;
      }
      if (inv.vatAmount==='' && !regexp.test(inv.invoiceAmount)) {
        inv.invoiceAmountError = true;
        validationSuccess = false;
      }
      if (inv.totalInvoiceAmtError==='' && !regexp.test(inv.invoiceTotalAmount)) {
        inv.totalInvoiceAmtError = true;
        validationSuccess = false;
      }
      if (inv.fileName === undefined ||inv.fileName === '') {
        inv.missingInvoiceError = true;
        validationSuccess = false;
      }
    }
  }
  
    return validationSuccess;
  
}


  const renderReupload = () => {
    return (
      <img src="./reUploadInv.png" style={{ height: '50px', marginTop: '15px' }} />
    )
  }

  const renderUpload = (invoice) => {
    if (invoice.fileName === '')
      return (
        <img src="./uploadMisInvoice.png" style={{ height: '80px', marginLeft: '-5px' }} />
      )
    else
      return (
        <img src="./uploadInvDisabled.png" style={{ height: '70px', marginTop: '10px' }} />
      )
  }

  const RenderInvoiceStatus = (inv) => {

    if (inv.submittedInvoice.status === 'Invoice Settled' || inv.submittedInvoice.status === 'Invoice Approved') {
      return (
        <>
          <Grid container>
            <Grid item>
              <FiberManualRecordIcon style={{ fill: '#63BB7A', marginRight: '3px' }}></FiberManualRecordIcon>
            </Grid>
            <Grid item>
              <InputLabel style={{ color: '#63BB7A', marginTop: '5px' }}> {inv.submittedInvoice.status === 'Invoice Settled' ? 'Payment Settled' : inv.submittedInvoice.status}</InputLabel>
            </Grid>
          </Grid>
        </>
      )
    }

    if (inv.submittedInvoice.status === 'PAID' || inv.submittedInvoice.status === 'Invoice Submitted') {
      return (
        <>
          <Grid container>
            <Grid item >
              <FiberManualRecordIcon style={{ fill: '#FF8E0D', marginRight: '3px' }}></FiberManualRecordIcon>
            </Grid>
            <Grid item>
              <InputLabel style={{ color: '#FF8E0D', marginTop: '5px' }}> Invoice  Submitted</InputLabel>
            </Grid>
          </Grid>
        </>
      )
    }
    else {
      return <></>;
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-md-9"></div>
        <div className="col-md-3">
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                style={{ float: 'right' }}
                color="primary"
                onClick={() => {
                  if (location.state.fromPage === 'Status')
                    history.push('/transporterStatusDetails', { statusData: location.state?.statusData, paymentSummary: location.state?.paymentSummary })
                  else
                    history.push('/settlements')
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{ float: 'right' }}
                color="primary"
                onClick={() => uploadInvoices(invoiceList)}
              >
                Send For Approval
              </Button>
            </Grid>
          </Grid>
          {/* <Button
            variant="contained"
            style={{float:'right'}}
            color="primary"
            onClick={() => history.push('/transporterStatusDetails', { statusData: location.state?.statusData, paymentSummary: location.state?.paymentSummary})}
          >
           Back
          </Button>
          </div>
          <div className="col-md-3">
    <Button
            variant="contained"
            style={{float:'right'}}
            color="primary"
            onClick={() => uploadInvoices(invoiceList)}
          >
          Send For Approval
          </Button> */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <InputLabel style={{ fontSize: '21px', color: '#0E1B3D', fontFamily: 'Dubai Medium', }}>Invoice Details</InputLabel>
        </div>
      </div>
      <br></br>
      <FormProvider {...methods}>
        <Table>
          <TableBody>
            {submittedInvoices && submittedInvoices.filter(x => 'Invoice Rejected' !== x.status).map((submittedInvoice) =>
              <>
                <TableRow key={submittedInvoice.referenceNumber}>
                  <Grid item container xs={12} sm spacing={1}>
                    <Grid item xs={4} sm={2}>
                      <LabelHeader>
                        Invoice Number
                      </LabelHeader>
                      <LabelHeader>
                        {submittedInvoice.invoiceNumber}
                      </LabelHeader>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <LabelHeader>
                        Invoice Date
                      </LabelHeader>
                      <LabelHeader> {submittedInvoice.invoiceDate}</LabelHeader>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <LabelHeader>
                        Invoice Amount
                      </LabelHeader>
                      <LabelHeader>
                        {submittedInvoice.invoiceAmount} AED
                      </LabelHeader>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <LabelHeader>
                        Vat Amount
                      </LabelHeader>
                      <LabelHeader>
                        {submittedInvoice.vatAmount} AED
                      </LabelHeader>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <LabelHeader>
                        Invoice Total
                      </LabelHeader>
                      <LabelHeader>
                        {submittedInvoice.invoiceTotalAmount} AED
                      </LabelHeader>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <LabelHeader>
                        Description
                      </LabelHeader>
                      <LabelHeader>
                        {submittedInvoice.description}
                      </LabelHeader>
                    </Grid>
                  </Grid>
                </TableRow>
                <TableRow key={submittedInvoice.invoiceNumber}>
                  <Grid item container xs={12} sm alignItems="flex-end">
                    <Grid item xs={4} sm={2}>
                      <LabelHeader>
                        Admin  Remarks
                      </LabelHeader>
                      <LabelHeader>
                        {submittedInvoice.remarks}
                      </LabelHeader>
                    </Grid>
                    {submittedInvoice.fileName && <Grid item xs={4} sm={2}>
                      <Link style={{ fontSize: '16px', color: '#000000', fontFamily: 'Dubai Regular', fontWeight: 'bold' }}>{submittedInvoice.fileName}
                      </Link> </Grid>}
                    {submittedInvoice.invoiceDocs && submittedInvoice.invoiceDocs.map((invoiceDoc) =>
                    (
                      <Grid item xs={4} sm={2}>
                        <Link style={{ fontSize: '16px', color: '#000000', fontFamily: 'Dubai Regular', fontWeight: 'bold' }}>{invoiceDoc.fileName}
                        </Link>
                      </Grid>
                    ))}
                    <Grid item xs={4} sm={2}>
                      <RenderInvoiceStatus submittedInvoice={submittedInvoice} />
                    </Grid>
                  </Grid>
                  <hr></hr>
                </TableRow>
              </>
            )}
            {invoiceList && invoiceList.map((invoice) => (
              <>
                <TableRow key={invoice.serialNo}>
                  <Grid item container xs={12} sm spacing={1}>
                    <Grid item xs={6} sm={2}>
                      <LabelHeader>
                        Invoice Number
                      </LabelHeader>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Enter Number"
                        defaultValue={invoice.invoiceNumber}
                        helperText={invoice.invoiceNumberError ? 'Please enter valid amount' : ''}
                        onBlur={(e) => {
                          invoice.invoiceNumber = e.target.value;
                        }}
                        inputProps={{ maxLength: 250 }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <LabelHeader>
                        Invoice Date
                      </LabelHeader>
                      <ApplnDatePicker name={"invoiceDate"} iconColor="#1FA5FF" disablePastDate={false}
                        height="40px" width="170px" value={invoice.invoiceDate} maxDate={todayDate} helperText={invoice.invoiceDateError ? 'Please enter valid Date' : ''}
                       
                        onChange={(e) => {
                          invoice.invoiceDate = e;
                        }}
                      />
                      <span></span>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <LabelHeader>
                        Invoice Amount
                      </LabelHeader>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Enter Amount"
                        defaultValue={invoice.invoiceAmount}
                        helperText={invoice.invoiceAmountError ? 'Please enter valid amount' : ''}                      
                        onBlur={(e) => {
                          invoice.invoiceAmount = e.target.value;
                        }}
                        classes={{ root: classes.textField }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <LabelHeader>
                        Vat Amount
                      </LabelHeader>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Enter Amount"
                        defaultValue={invoice.vatAmount}
                        helperText={invoice.vatAmountError ? 'Please enter valid amount' : ''}
                        onBlur={(e) => {
                          invoice.vatAmount = e.target.value;
                        }}
                        classes={{ root: classes.textField }}
                        
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <LabelHeader>
                        Invoice Total Amount
                      </LabelHeader>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Enter Total Amount"
                        defaultValue={invoice.invoiceTotalAmount}
                        helperText={invoice.totalInvoiceAmtError ? 'Please enter valid amount' : ''}
                        onBlur={(e) => {
                          invoice.invoiceTotalAmount = e.target.value;
                        }}
                       
                        classes={{ root: classes.textField }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <LabelHeader>
                        Description
                      </LabelHeader>
                      <TextField label="Enter Description" variant="outlined" style={{ width: '100%' }} multiline="true"
                        defaultValue={invoice.description}
                        inputProps={{ maxLength: 250 }}
                  
                        onBlur={(e) => {
                          invoice.description = e.target.value;
                        }}
                   
                      ></TextField>
                     
                    </Grid>
                    {(invoice.status === 'Invoice Rejected' || invoice.status === 'Invoice Approved') && <Grid item xs={6} sm={2}>
                      <LabelHeader>
                        Admin Remarks
                      </LabelHeader>
                      <LabelHeader>{invoice.remarks}</LabelHeader>
                    </Grid>}
                  </Grid>
                  <Grid item container xs={12} sm >
                    {invoice.serialNo === invoiceNumber && <Grid item xs={3} sm={2}>
                      <LabelHeader
                      >
                        {" "}
                      </LabelHeader>
                      <Button
                        variant="contained"
                        style={{ marginTop: '10px', width: '120px', height: '50px' }}
                        color="primary"
                        onClick={() => addInvoices()}
                      >
                        Add more
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
                            console.log("???????????",);
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
                                setShowToaster("FILE_SIZE");
                              }
                              //  onChange={() => { selectFile(Event, job,props.key) }}
                            })
                          }}
                        />
                        {/* {invoice.fileName===''? <img src="./uploadMisInvoice.png" style={{height:'80px',marginLeft:'-5px'}} />:<img src="./uploadInvDisabled.png" style={{height:'70px',marginTop:'10px'}} />} */}
                        {invoice.status === 'Invoice Rejected' ? renderReupload() : renderUpload(invoice)}
                      </label>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                      <label htmlFor={invoice.serialNo + "" + 1}>
                        <input
                          type="file"
                          name={invoice.serialNo + "" + 1}
                          id={invoice.serialNo + "" + 1}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            e.target.value = '';
                            console.log("???????????",);
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
                              let misc = {};
                              if (invoice.invoiceDocSize === 0) {
                                invoice.invoiceDocs = [];
                              }
                              if (invoice.invoiceDocs.length === 3) {
                                setShowToaster("INVOICE_DOC_COUNT");
                              }
                              else if (invoice.invoiceDocSize <= 1500000) {
                                misc.fileContent = contentArr[1];
                                misc.fileType = fileType;
                                invoice.invoiceDocSize = invoice.invoiceDocSize + file.size;
                                misc.fileName = file.name;
                                invoice.invoiceDocs.push(misc);
                                setRender(render + 1);
                              } else {
                                console.log("file size error");
                                setShowToaster("DOC_FILE_SIZE");
                              }
                            })
                          }}
                        />
                        {invoice.status === 'Invoice Rejected' ? <img src="./reUploadDocs.png" style={{ height: '50px', marginTop: '15px' }}></img> : <img src="./uploadSupDoc.png" style={{ height: '70px', marginTop: '7px' }}></img>}
                      </label>
                    </Grid>
                  </Grid>
                </TableRow>
                <TableRow>
                  <Grid item container xs={12} sm alignItems="flex-end">
                    {invoice.fileName && <Grid item xs={4} sm={2}>
                      <InputLabel style={{ fontSize: '16px', color: '#000000', fontFamily: 'Dubai Regular', fontWeight: 'bold' }}>{invoice.fileName}
                        <img style={{ marginLeft: '3px' }}
                          src="./delete.svg"
                          onClick={() => { deleteInvoice(invoice.serialNo) }} />
                      </InputLabel>
                    </Grid>}
                    {invoice.invoiceDocs[0]?.fileName && <Grid item xs={4} sm={2}>
                      <InputLabel style={{ fontSize: '16px', color: '#000000', fontFamily: 'Dubai Regular', fontWeight: 'bold' }}>{invoice.invoiceDocs[0]?.fileName}
                        <img style={{ marginLeft: '3px' }}
                          src="./delete.svg"
                          onClick={() => { deleteInvoiceDocs(invoice.serialNo, invoice.invoiceDocs[0]?.fileName) }} /></InputLabel>
                    </Grid>}
                    {invoice.invoiceDocs[1]?.fileName && <Grid item xs={4} sm={2}>
                      <InputLabel style={{ fontSize: '16px', color: '#000000', fontFamily: 'Dubai Regular', fontWeight: 'bold' }}>{invoice.invoiceDocs[1]?.fileName}
                        <img style={{ marginLeft: '3px' }}
                          src="./delete.svg"
                          onClick={() => { deleteInvoiceDocs(invoice.serialNo, invoice.invoiceDocs[1]?.fileName) }} />
                      </InputLabel>

                    </Grid>}
                    {invoice.invoiceDocs[2]?.fileName && <Grid item xs={4} sm={2}>
                      <InputLabel style={{ fontSize: '16px', color: '#000000', fontFamily: 'Dubai Regular', fontWeight: 'bold' }}>{invoice.invoiceDocs[2]?.fileName}
                        <img style={{ marginLeft: '3px' }}
                          src="./delete.svg"
                          onClick={() => { deleteInvoiceDocs(invoice.serialNo, invoice.invoiceDocs[2]?.fileName) }} />
                      </InputLabel>
                    </Grid>}
                    {invoice.missingInvoiceError && <InputLabel style={{ fontSize: '16px', color: 'red', fontFamily: 'Dubai Regular' }}>Please upload invoice</InputLabel>}
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
      {showToaster === 'SUCCESS' &&
        <SuccessToast
          icon="check_circle"
          title="Invoice Submitted Successfully"
          message="*Invoice Submitted Successfully"
          showToast={() => { setShowToaster("NO TOASTER") }}
          position="top-right"
        />}
      {showToaster === 'FILE_SIZE' &&
        <ErrorToast
          icon="check_circle"
          title="File Size error"
          message="Invoice file size should be not be greater than 0.5 MB"
          showToast={() => { setShowToaster("NO TOASTER") }}
          position="top-right"
        />}
      {showToaster === 'DOC_FILE_SIZE' &&
        <ErrorToast
          icon="check_circle"
          title="File Size error"
          message="Total Invoice document file size should be not be greater than 1.5 MB"
          showToast={() => { setShowToaster("NO TOASTER") }}
          position="top-right"
        />}
      {showToaster === 'INVOICE_DOC_COUNT' &&
        <ErrorToast
          icon="check_circle"
          title="File Size error"
          message="Not more than 3 supporting documents can be uploaded"
          showToast={() => { setShowToaster("NO TOASTER") }}
          position="top-right"
        />}
    </>
  );
}
export default MiscellaneousInvoices;
