import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import { CardHeader, InputLabel, TableHead, Avatar } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import { Collapse } from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import { Checkbox } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import BookingService from "../../service/BookingService";
import ContainerSummary from "./ContainerSummary";
import CommonService from "../../service/CommonService";
import Toast from "../../lib/components/toast/ErrorToast";
import { termsAndConditionUrl } from "../../utils/ptmsEndpoints";
import TrnDetailsPopup from "./TrnDetailsPopup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ContainerToolTip from "react-bootstrap/Tooltip";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
const renderContainerTooltip = props => (
  <ContainerToolTip {...props} >
  
   <div >
     <InputLabel></InputLabel>
     <InputLabel></InputLabel>
     <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Container Number-{props.container_number}</InputLabel>
     <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Consignee Name-{props.consigneeDetails?.split("/")[0]}</InputLabel>
     <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Storage Validity date -{props.storagePaidTill}</InputLabel>
     <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Hold Authority -{props.holdAuthority}</InputLabel>
     <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Declaration Number -{props.boeNumber}</InputLabel>
     <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Container Weight -{props.containerWeight}</InputLabel>
     <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Pickup Location -{props.pickupLocation}</InputLabel>
     <InputLabel></InputLabel>
     <InputLabel></InputLabel>
   </div>
  </ContainerToolTip>
);

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    height: 230,
  },
  root1: {
    width: 500,
    height: 200,
   // marginLeft:"3px",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius:"5px" ,
    border: "1px solid #D3D3D3",
    marginRight: "5px",
    marginLeft: "25px",
   marginTop:"15px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    fontSize: 20,
    color: "#FF0000",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  leftPane: {
    width: "45%",
  },
  rightPane: {
    width: "55%",
  },

  scrollableDiv: {
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "5px",
      height: "10px",
      paddingLeft: "20px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#787878",
      borderRadius: 2,
    },

    height: "800px",
  },

  table: {
    width: "600px",
  },

  table1: {
    borderCollapse: "collapse",
  },

  label: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace:'nowrap'
  },

  labelData: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
    whiteSpace:'nowrap'
  },
  boxOnTable: {
    left: "45px",
    //top: "15px",
    padding: "1.4%",
    paddingTop: "5px",
    width: "50px",
    height: "35px",
    backgroundColor: "#0E1B3D",
    border: "1px solid #E4EBFF",
    color: "#FFFFFF",
    textAlign: "center",
    position: "relative",

    fontWeight: "bold",
    zIndex: 2,
    marginTop: "15px",
  },
  boxOnTable1: {
    
    width: "30px",
    height: "30px",
    backgroundColor: "#0E1B3D",
    border: "1px solid #E4EBFF",
    color: "#FFFFFF",
    fontSize:"2px",
    textAlign: "center",
    position: "relative",
    marginTop:"75px"
   
  },
  headerTitle: {
    fontSize: "18px",
                    color: "#0E1B3D",
                    fontFamily: "Dubai Medium",
    fontWeight: "normal",
                    textAlign:"Left"
  }
});

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    width: 185,
  },
})(MuiTableCell);

const defaultProps = {
  bgcolor: "red",
  m: 1,
  style: { width: "3rem", height: "2rem" },
  borderColor: "red",
  color: "#FFFFFF",
  textAlign: "center",
  fontWeight: "fontWeightBold",
  align: "right",
  marginRight: "-2px",
};

export default function Payment(props) {
  const classes = useStyles();
  console.log("$$$$$$$$ started rendering $$$$$$$$$$$");
  const bull = <span className={classes.bullet}>1.</span>;
  console.log("payment",props)
 

  const schema = yup.object().shape({
    containerSummary: yup.object().shape({
      requesterContact: yup.string()
      .required("Mobile Number is Required")
      .matches(
        /^[0-9]\d{11,11}$/,
        "Format must be 971xxxxxxxxx"
      ),
      requesterName:yup.string()
      .required("Requester Name is Required")
     
    }),
  });

  const methods = useForm({
    defaultValues:{
      containerSummary:{
        requesterName:'',
        requesterContact:''
      }
    },
    resolver: yupResolver(schema),
  });


  const [formData, setFormData] = useState();
  


  const handleNext = props.handleNext;
  const [showToaster, setShowToaster] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState();
  const [trnPopup, setTrnPopup] = useState(false);
  const [validateContainerForm,setValidateContainerForm]=useState(0);
  var termsAndCondition = "unchecked";

  const handleCheckBoxChange = (event) => {
    console.log("&&&&&", event.target.checked);
    if (event.target.checked) {
      termsAndCondition = "checked";
    } else {
      termsAndCondition = "unchecked";
    }
  };

  const showTRNDetailsPopup = (props)=>{
    setTrnPopup(true);
  }

  const onSubmit = (data) =>
  {
    console.log(data);
    makePayment();
  }


  useEffect(() => {
    const loadContainerCount = async () => {
      console.log("reloaded........");
      console.log("props.containers in payment tab", props.containers);
   

      
      BookingService.fetchContainerSummaryAndPayment(props.containers)
        .then((response) => {
          console.log("response::",response);
          setPaymentDetails(response.data.dataItems[0]);
          var tokenDetails=response.data.dataItems[0].paymentDetails.filter(x=>x.getPaymentType==='token');
          props.containers.tokenCharge =
          tokenDetails.containers;
          props.containers.tokenAmount = tokenDetails.totalAmount;
          props.containers.tokenVatPercent =
            tokenDetails.vat;
          props.containers.totalTokenVat =
          tokenDetails.totalVat;
          props.containers.totalTokenAmount =
          tokenDetails.subTotalAmount;
          props.containers.paymentType = "INSTANT";
       
          props.containers.containerList =
            response.data.dataItems[0].containerList;
          props.containers.paymentDetails =
            response.data.dataItems[0].paymentDetails;
          props.containers.totalAmt = response.data.dataItems[0].grossAmount;
          props.containers.totalTariff = response.data.dataItems[0].totalTariff;
          props.containers.totalAmount = response.data.dataItems[0].grossAmount;
         // props.containers.vatProfile = response.data.dataItems[0].vatProfileDto;
          if (response.data.dataItems[0].vatProfileDto.vatNo === "")
            setTrnPopup(true);
          else
          setTrnPopup(false);
        })
        .catch((error) => {
          console.log("error");
        });
      
    };

    loadContainerCount();
  }, [props.containers]);

  const makePayment = () => {
    console.log("****", props.containers);
     if (termsAndCondition === "checked") {
       console.log("****", props.containers);
       proceedPayment();

    
 }
 else
 {
  setShowToaster(true);
     
 }

}

const proceedPayment = () => {
  console.log("proceed payment");
  console.log(props.containers);

   if (props.containers.reInitialise === undefined) {
         BookingService.saveRequest(props.containers)
           .then((res) => {
             console.log("response");
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
             console.log("dataVal", dataVal);
             CommonService.postToExternalSite(
               dataVal,
               res.data.dataItems[0].gatewayUrl
             );
           })
           .catch((error) => {
             console.log("error");
           });
       } else if (props.containers.reInitialise) {
         BookingService.reInitialise(
           props.containers.containerList[0].requestDetailsNumber
       )
           .then((res) => {
             console.log("response");
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
             console.log("dataVal", dataVal);
             CommonService.postToExternalSite(
               dataVal,
               res.data.dataItems[0].gatewayUrl
             );
           })
          .catch((error) => {
            console.log("error");
        });
       }
      else {
      setShowToaster(true);
    }
}

  return (
    <>
      {showToaster && (
        <Toast
          icon="error"
          title="Terms And Condition"
          message="Please indicate that you accept the Terms and Conditions "
          showToast={() => {
            setShowToaster(false);
          }}
          position="top-right"
        />
      )}
     
      {trnPopup && (<TrnDetailsPopup onReinitiateClose={() => { setTrnPopup(false); }} redirectionUrl={paymentDetails}/>)}
      {/* <div className="row">
        <div className="col-md-6"> </div>
        <div className="col-md-6">
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right" ,fontWeight:"lighter"}}
            onClick={() => makePayment()}
          >
            PAY {paymentDetails && paymentDetails.totalAmount} AED
          </Button>
        </div>
      </div> */}
      
     
      <InputLabel
        style={{
          fontSize: "20px",
          color: "#0E1B3D",
          fontFamily: "Dubai Medium",
          fontWeight: "bold",
        }}
      >
        Booking Details
      </InputLabel>
      <hr style={{ backgroundColor: "#D7D7D7" }}></hr>
      <div className={classes.splitScreen}>
        <div className={classes.leftPane}>
          <div className="row">
           
              <Grid container alignItems="left"> 
             
              <Grid item ></Grid>
     <Grid item xs={8}>
                  <Card className={classes.root1}>
                    {/* <CardHeader  title={`VAT Details`}  classes={{
                title: classes.headerTitle
                    }}></CardHeader> */}
                 
                    <CardContent>
                    <InputLabel   style={{
                    fontSize: "18px",
                    color: "#0E1B3D",
                    fontFamily: "Dubai Medium",
                        fontWeight: "normal",
                    textAlign:"left"
                      }}>
                        VAT Details</InputLabel>   
                        <hr style={{ backgroundColor: "#D7D7D7" }}></hr>
              <Grid container spacing={1} alignItems="flex-start"> 
              <Grid item xs={7}>
                          {paymentDetails  &&<Table className={classes.table1} size="small">
                            <TableBody>
                            <TableRow>
                            <TableCell>
                    <InputLabel style={{whiteSpace:'nowrap'}}>
                        VAT Number
                     </InputLabel>
                    </TableCell>
                    <TableCell>
                    <InputLabel style={{fontWeight:"bold"}}>
                        {paymentDetails.vatProfileDto.vatNo}
                     </InputLabel>
                                </TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell>
                    <InputLabel>
                        Address
                     </InputLabel>
                    </TableCell>
                    <TableCell>
                    <InputLabel style={{fontWeight:"bold",whiteSpace:'nowrap'}}>
                        {paymentDetails.vatProfileDto.companyName}
                                  </InputLabel>
                                </TableCell>
                                </TableRow>
                              <TableRow>
                              <TableCell></TableCell>
                                  <TableCell>
                                  <InputLabel style={{fontWeight:"bold",whiteSpace: 'prewrap'}}>
                        {paymentDetails.vatProfileDto.address}
                                  </InputLabel>
                                </TableCell>
                                </TableRow>
                              <TableRow>
                              <TableCell></TableCell>
                                  <TableCell>
                                  <InputLabel style={{fontWeight:"bold",whiteSpace:'nowrap'}}>
                        {paymentDetails.vatProfileDto.country}
                                  </InputLabel>
                                </TableCell>
                                </TableRow>
                              <TableRow>
                              <TableCell></TableCell>
                                  <TableCell>
                                  <InputLabel style={{fontWeight:"bold",whiteSpace:'nowrap'}}>
                        {paymentDetails.vatProfileDto.emirate}
                                  </InputLabel>
                                </TableCell>
                                </TableRow>
                              <TableRow>
                              <TableCell></TableCell>
                                  <TableCell>
                                  <InputLabel style={{fontWeight:"bold",whiteSpace:'nowrap'}}>
                        {paymentDetails.vatProfileDto.mobileNumber}
                     </InputLabel>
                    </TableCell>
                  </TableRow>
                            </TableBody>
                          </Table>}
                          {/* {paymentDetails && paymentDetails.vatProfileDto.vatNo ==="" && <InputLabel >No Details</InputLabel>} */}
            </Grid>
        
          </Grid>
        </CardContent>
      </Card>
      </Grid>
      </Grid>
        
    
                  <ContainerSummary
                    containerSummary={props}               
                  ></ContainerSummary>
      
              <br></br>

          </div>
        </div>
        <div className={classes.rightPane}>
          <hr style={{ border: 0 }}></hr>
          {paymentDetails &&  (
            <Card
              style={{
                width: "650px",
                boxShadow: "0px 3px 6px #00000029",
                borderRadius: "5px",
                border: "1px solid #D3D3D3",
                float: "right",
              }}
            >
              <CardContent>
                <InputLabel
                  style={{
                    fontSize: "18px",
                    color: "#0E1B3D",
                    fontFamily: "Dubai Medium",
                    fontWeight: "normal",
                  }}
                >
                  Payment Breakup{" "}
                </InputLabel>
                <hr style={{ backgroundColor: "#D7D7D7" }}></hr>

                <Table className={classes.table}>
                  <TableHead>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>
                        Containers
                      </InputLabel>
                    </TableCell>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>Amount</InputLabel>
                    </TableCell>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>VAT%</InputLabel>
                    </TableCell>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>VAT Amount</InputLabel>
                    </TableCell>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>Total</InputLabel>
                    </TableCell>
                  </TableHead>
                  <TableBody>
                    {paymentDetails.paymentDetails.filter(x=>x.paymentType!=='tokenIn' && x.paymentType!=='tokenOut').map((paymentInfo, ind) => (
                      <TableRow>
                        <TableCell>
                          <InputLabel className={classes.labelData}>
                            {paymentInfo.chargeDescription}
                          </InputLabel>
                        </TableCell>
                        <TableCell>
                          <InputLabel className={classes.labelData}>
                            {paymentInfo.subTotalAmount} AED
                          </InputLabel>
                        </TableCell>
                        <TableCell>
                          <InputLabel className={classes.labelData}>
                            {paymentInfo.vat}%
                          </InputLabel>
                        </TableCell>
                        <TableCell>
                          <InputLabel className={classes.labelData}>
                            {paymentInfo.totalVat} AED
                          </InputLabel>
                        </TableCell>
                        <TableCell>
                          <InputLabel className={classes.labelData}>
                            {paymentInfo.totalAmount} AED
                          </InputLabel>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <hr></hr>

                <Table className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                     
                      <TableCell >
                        <InputLabel style={{paddingLeft:"200px",fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace:'nowrap'}}>
                          Net Amount
                        </InputLabel>
                      </TableCell>
                      <TableCell>
                        <InputLabel style={{
                          fontSize: "16px",
                          color: "#000000",
                          fontFamily: "Dubai Regular",
                          whiteSpace: 'nowrap',
                          paddingLeft:"28px"
                        }}>
                          {paymentDetails.totalTariff} AED
                        </InputLabel>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
           
                <Table className={classes.table}>
                  <TableHead>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>
                        Token Re-Charges
                      </InputLabel>
                    </TableCell>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>Amount</InputLabel>
                    </TableCell>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>VAT%</InputLabel>
                    </TableCell>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>VAT Amount</InputLabel>
                    </TableCell>
                    <TableCell style={{ width: 30 }}>
                      <InputLabel className={classes.label}>Total</InputLabel>
                    </TableCell>
                  </TableHead>
                  {paymentDetails.paymentDetails.filter(x=>x.paymentType==='tokenIn' || x.paymentType==='tokenOut').map((tokenDetails,ind)=>(
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <InputLabel className={classes.labelData}>
                          {tokenDetails.chargeDescription}
                        </InputLabel>
                      </TableCell>
                      <TableCell>
                        <InputLabel className={classes.labelData}>
                          {tokenDetails.totalAmount} AED
                        </InputLabel>
                      </TableCell>
                      <TableCell>
                        <InputLabel className={classes.labelData}>
                          {tokenDetails.vat}%
                        </InputLabel>
                      </TableCell>
                      <TableCell>
                        <InputLabel className={classes.labelData}>
                          {tokenDetails.totalVat} AED
                        </InputLabel>
                      </TableCell>
                      <TableCell>
                        <InputLabel className={classes.labelData}>
                          {tokenDetails.subTotalAmount} AED
                        </InputLabel>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  ))}
                  
                </Table>
                <hr></hr>
                <Table className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <InputLabel  style={{paddingLeft:"200px",fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace:'nowrap'}}>
                          Net Amount
                        </InputLabel>
                      </TableCell>
                      <TableCell>
                        <InputLabel style={{
                          fontSize: "16px",
                          color: "#000000",
                          fontFamily: "Dubai Regular",
                          whiteSpace: 'nowrap',
                          paddingLeft:"28px"
                        }}>
                          {paymentDetails.totalVat} AED
                        </InputLabel>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <hr></hr>

                <Table className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        {" "}
                        <InputLabel  style={{paddingLeft:"200px",fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace:'nowrap'}}>
                          Gross Amount
                        </InputLabel>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <InputLabel style={{
                          fontSize: "16px",
                          color: "#000000",
                          fontFamily: "Dubai Regular",
                          whiteSpace: 'nowrap',
                          paddingLeft:"28px"
                        }}>
                          {paymentDetails.grossAmount} AED
                        </InputLabel>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md">
                    <div className="row">
                      <div className="col-md-2">
                        <Box className={classes.boxOnTable}> AED</Box>
                        {/* <Box border={1} {...defaultProps} float="right">
                          AED{" "}
                        </Box> */}
                      </div>
                      <div className="col-md">
                        <Card
                          variant="outlined"
                          style={{
                            height: "70px",
                            border: "1px solid #D3D3D3",
                          }}
                        >
                          <CardContent>
                            <Grid container spacing={1} alignItems="flex-start">
                              <Grid item xs={8}>
                                <InputLabel> Amount Payable</InputLabel>
                              </Grid>

                              <Grid item xs={4}>
                                <InputLabel
                                  style={{
                                    position: "relative",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#0568AE",
                                  }}
                                >
                                  {paymentDetails.grossAmount} AED
                                </InputLabel>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <br></br>

      <Table aria-label="simple table" style={{width:'100%'}}>
                 <TableHead  style={{ border: '1px solid #98989C', backgroundColor: '#98989C',borderRadius: 15}}>
                 <TableRow>
                    <TableCell>
                      
                        <InputLabel
                          style={{  color: "white" }}
                        >
                          Container Number
                        </InputLabel>
                        </TableCell>
                        
                        <TableCell>
                         <InputLabel
                          style={{  color: "white" }}
                        >
                           Container Type
                          </InputLabel>
                          </TableCell>
                      
                          <TableCell>
                         
                          <InputLabel
                          style={{  color: "white" }}
                        >
                          Contact Person
                        </InputLabel>
                        </TableCell>
                        <TableCell>
                     
                        <InputLabel
                          style={{  color: "white" }}
                        >
                          Mobile Number
                        </InputLabel>
                         </TableCell>
                     
                         {props.containers.multiLocAndTime &&
                         <>
                        <TableCell>

                    
                      <InputLabel
                          style={{  color: "white" }}
                        >
                            Date 
                          </InputLabel>
                      
                        </TableCell>
                         <TableCell>
                      
                         <InputLabel
                             style={{  color: "white" }}
                           >
                              Time
                             </InputLabel>
                         
                           </TableCell>
                           </>
                         
}
                        <TableCell>
                       <InputLabel
                          style={{  color: "white",paddingBottom:"10px" }}
                        >
                          Location
                        </InputLabel>
                    
                        </TableCell>
                      
                        </TableRow>

                 </TableHead>
                <TableBody>

                  {props.containers.containerList.map((containers, inx) => (
                
                  <TableRow key={containers.container_number}>
                    <TableCell>
                    <div style={{
    display: 'inline-flex',
    boxSizing: 'inherit',
    textAlign: 'center',
    alignItems: 'center',
    gap: '6px'
}}>
                    <Avatar style={{ height: '25px', width: '25px' ,backgroundColor:'#FF7F7B',fontSize:'14px',marginLeft:"10%"}} ></Avatar>
                   
                    <OverlayTrigger placement="top" overlay={renderContainerTooltip(containers)}>
                        <InputLabel
                          style={{  color: "#0568AE",fontWeight:"bold" ,paddingTop:"15px",textDecoration:"underline"}}
                        >
                          {containers.container_number}
                        </InputLabel>
                     </OverlayTrigger>
                     </div>
                    </TableCell>
                   
                      <TableCell>
                       
                  
                     <InputLabel style={{fontFamily:'Dubai Regular',fontSize:'14px',color:'#686868'}}>{containers.containerType}</InputLabel>
                        
                      </TableCell>
                  
                    <TableCell>
                    
                      
                    <InputLabel style={{fontFamily:'Dubai Regular',fontSize:'14px',color:'#686868'}}>{containers.consigneeContactName}</InputLabel>
                     
                    </TableCell>

                    
                    <TableCell>
                    
                      
                    <InputLabel style={{fontFamily:'Dubai Regular',fontSize:'14px',color:'#686868'}}>{containers.consigneeContactNumber}</InputLabel>
                     
                    </TableCell>

                    {props.containers.multiLocAndTime &&
                    <>
                      <TableCell>
                    
                      
                    <InputLabel style={{fontFamily:'Dubai Regular',fontSize:'14px',color:'#686868'}}>{containers.date_time}</InputLabel>
                     
                    </TableCell>

                    <TableCell>
                    
                      
                    <InputLabel style={{fontFamily:'Dubai Regular',fontSize:'14px',color:'#686868'}}>{containers.date_time}</InputLabel>
                     
                    </TableCell>
                    </>}

                    <TableCell>
                    
                    <InputLabel style={{fontFamily:'Dubai Regular',fontSize:'14px',color:'#686868'}}>{containers.dropAddress}</InputLabel>
                     
                    
                    </TableCell>
                
                
              
                     
             
                  </TableRow>
              
             
            
           
          ))} 
             </TableBody>
            </Table>

      <div>
        <Paper
          variant="outline"
          style={{
            backgroundColor: "#F7F7F7",
            height: "68px",
            borderRadius: "0px",
          }}
        >
          <div>
            <FormControlLabel
              style={{ marginLeft: "10px", marginTop: "15px", fontSize: "5px" }}
              control={
                <Checkbox
                  // checked={termsAndCondition}
                  onChange={handleCheckBoxChange}
                  name="termsAndCondition"
                  style={{
                    transform: "scale(0.7)",
                  }}
                />
              }
              label={
                <span
                  style={{ fontSize: "14px" }}
                  onClick={() =>
                    window.open(
                      termsAndConditionUrl,
                      "_blank",
                      "height=550,width=650,top=100,left=300"
                    )
                  }
                >
                  I accept the terms and conditions
                </span>
              }
            />

            <Button
              style={{ float: "right", marginTop: "10px", marginRight: "25px" }}
              type="submit"
              variant="contained"
              color="primary"
              //onClick={() => console.log("makePayment()")}
              onClick={methods.handleSubmit(onSubmit)}
            >
              PAY {paymentDetails && paymentDetails.grossAmount} AED
            </Button>
          </div>
        </Paper>
      </div>
            
     
    </>
  );
}
