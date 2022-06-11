import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { InputLabel, TableHead, Avatar, TableCell, Tooltip } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
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
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import * as utils from "../../utils/utilis";
import { default as MuiButton } from '@material-ui/core/Button';
import InfoBox from './../../lib/components/infoBox/InfoBox';

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    height: 230,
  },
  root1: {
    width: 500,
    height: 150,
    // boxShadow: "0px 3px 6px #00000029",
    // borderRadius: "5px",
    // border: "1px solid #D3D3D3",
    marginRight: "5px",
    marginLeft: "12px",
    marginTop: "15px"
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
    float: "right",
    marginLeft:'32px',
    borderLeft:'2px solid #B9B9B9',
    paddingLeft:'30px'
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
    width: "550px",
  },

  table1: {
    borderCollapse: "collapse",
  },

  label: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace: 'nowrap'
  },

  labelData: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
    whiteSpace: 'nowrap'
  },
  boxOnTable: {
    left: "55px",
    top: "50px",
    padding: "1.4%",
    paddingTop: "5px",
    position: "relative",
    zIndex: 2,
  },
  boxOnTable1: {

    width: "30px",
    height: "30px",
    backgroundColor: "#0E1B3D",
    border: "1px solid #E4EBFF",
    color: "#FFFFFF",
    fontSize: "2px",
    textAlign: "center",
    position: "relative",
    marginTop: "75px"

  },
  headerTitle: {
    fontSize: "18px",
    color: "#0E1B3D",
    fontFamily: "Dubai Medium",
    fontWeight: "normal",
    textAlign: "Left"
  }
});

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      fontSize: '16px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      color: '#ffffff',
      minWidth:'140px'
    },
    body: {
      fontSize: '14px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderBottom: '0px',
      minWidth:'140px',
      color:'#686868'
    },
  }),
)(TableCell);

const StyledTableCell2 = withStyles(() =>
  createStyles({
    head: {
      fontSize: '18px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      color: '#000000',
      minWidth:'140px'
    },
    body: {
      fontSize: '16px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderBottom: '0px',
      minWidth:'140px',
      color:'#000000',
      paddingLeft:0
    },
  }),
)(TableCell);

const StyledTableCell3 = withStyles(() =>
  createStyles({
    head: {
      fontSize: '15px',
      fontWeight: 600,
      color: '#000000',
      minWidth:'140px',
      borderBottom:'none',
      padding:'10px'
    },
    body: {
      fontSize: '15px',
      fontFamily:'Dubai Light',
      fontWeight: 600,
      borderBottom:'none',
      minWidth:'140px',
      color: '#000000',
      padding:'10px'
    },
  }),
)(TableCell);

const BlueTooltip = withStyles({
  tooltip: {
    color: "#FFFFFF",
    backgroundColor: "#0E1B3DD3",
    fontFamily: "Dubai Light",
    fontWeight: 600,
    paddingLeft: '15px',
    paddingRight: '15px',
    maxWidth: '500px', 
    maxHeight: '200px',  
    whiteSpace:'nowrap'
  },
  arrow: {
    "&:before": {
      borderStyle: "none"
    },
    color: "#0E1B3DD3",
  }
})(Tooltip);

const StyledBlueButton = withStyles(() =>
createStyles({
  root: {
    border: "1px solid #1360D2",
    float: "right",
    minWidth: '150px',
    height: '40px',
    fontSize: "16px",
    borderRadius: '3px',
    fontWeight: 600,
    fontFamily: 'Dubai Light',
    color: '#FFFFFF', 
    backgroundColor: '#1360D2',
    '&:hover': {
      color: '#1360D2',
    }
  }
})
)(Button);


const SaveAsDraftButton = withStyles(() =>
      createStyles({
        root: {
          float: "right",
          fontWeight: "lighter",
          width: '110px',
          height: '34px',
          fontSize: "14px",
          borderRadius: '3px',
          fontWeight: 600,
          fontFamily: 'Dubai Light',
          border: '1px solid #0E1B3D',
          color: '#0E1B3D',
          backgroundColor: '#FAFAFA',
        }
      })
)(Button);

  const BackButton = withStyles(() =>
      createStyles({
        root: {
          float: "right",
          fontWeight: "lighter",
          width: '110px',
          height: '34px',
          fontSize: "14px",
          borderRadius: '3px',
          fontWeight: 600,
          fontFamily: 'Dubai Light',
          border: '1px solid #0E1B3D',
          color: '#0E1B3D',
          backgroundColor: '#FAFAFA',
        }
      })
)(MuiButton);

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

function Payment(props) {
  const classes = useStyles();
  console.log("$$$$$$$$ started rendering $$$$$$$$$$$");
  const bull = <span className={classes.bullet}>1.</span>;
  console.log("payment", props)
  const handleNext = props.handleNext;
  const [showToaster, setShowToaster] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState();
  const [trnPopup, setTrnPopup] = useState(false);
  const [validateContainerForm, setValidateContainerForm] = useState(0);
  const [termsAndCondition, setTermsAndCondition] = useState(false);

  const renderContainerTooltip = props => (
    <div style={{ padding: '20px', fontSize: '14px' }}>
        <div className="row" style={{ marginBottom: '8px' }}>Container Number - {props.container_number}</div>
        <div className="row" style={{ marginBottom: '8px' }}>Consignee Name - {props.consigneeDetails?.split("/")[0]}</div>
        <div className="row" style={{ marginBottom: '8px' }}>Storage Validity date - {props.storagePaidTill}</div>
        <div className="row" style={{ marginBottom: '8px' }}>Hold Authority - {props.holdAuthority}</div>
        <div className="row" style={{ marginBottom: '8px' }}>Declaration Number - {props.boeNumber}</div>
        <div className="row" style={{ marginBottom: '8px' }}>Container Weight - {props.containerWeight}</div>
        <div className="row" style={{ marginBottom: '8px' }}>Pickup Location - {props.pickupLocation}</div>
      </div>
  );

  const schema = yup.object().shape({
    containerSummary: yup.object().shape({
      requesterContact: yup.string()
        .required("Mobile Number is Required")
        .matches(
          /^[0-9]\d{11,11}$/,
          "Format must be 971xxxxxxxxx"
        ),
      requesterName: yup.string()
        .required("Requester Name is Required")

    }),
  });

  const methods = useForm({
    reValidateMode: "onSubmit"
    // defaultValues:{
    //   containerSummary:{
    //     requesterName:'',
    //     requesterContact:''
    //   }
    // },
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("data is", data);
    makePayment();
  }

  const handleCheckBoxChange = (event) => {
    console.log("&&&&&", event.target.checked);
    if (event.target.checked) {
      setTermsAndCondition(true);
    } else {
      setTermsAndCondition(false);
    }
  };

  const showTRNDetailsPopup = (props) => {
    setTrnPopup(true);
  }

  useEffect(() => {
    const loadContainerCount = async () => {
      console.log("reloaded........");
      console.log("props.containers in payment tab", props.containers);
      BookingService.fetchContainerSummaryAndPayment(props.containers)
        .then((response) => {
          console.log("response::", response);
          props.containers.sealedPaymentObject=response.data.dataItems[0].sealedPaymentObject;
          console.log("sealed::", props.containers.sealedPaymentObject);

          setPaymentDetails(response.data.dataItems[0]);
          var tokenDetails = response.data.dataItems[0].paymentDetails.filter(x => x.getPaymentType === 'token');
          props.containers.tokenCharge = tokenDetails.containers;
          props.containers.tokenAmount = tokenDetails.totalAmount;
          props.containers.tokenVatPercent = tokenDetails.vat;
          props.containers.totalTokenVat = tokenDetails.totalVat;
          props.containers.totalTokenAmount = tokenDetails.subTotalAmount;
          props.containers.paymentType = "INSTANT";
          props.containers.containerList = response.data.dataItems[0].containerList;

          props.containers.paymentDetails = response.data.dataItems[0].paymentDetails;
          props.containers.totalAmt = response.data.dataItems[0].grossAmount;
          props.containers.totalTariff = response.data.dataItems[0].totalTariff;
          props.containers.totalAmount = response.data.dataItems[0].grossAmount;
          // props.containers.vatProfile = response.data.dataItems[0].vatProfileDto;

          if (response.data.dataItems[0].vatProfileDto.vatNo)
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
    if (termsAndCondition) {
      console.log("****", props.containers);
      console.log("payment proceed success");
      //setValidateContainerForm(validateContainerForm+1);
      proceedPayment();
    }
    else {
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

  const RenderContainerSummary = () => {
    const containerSummary = props.containers;
    containerSummary.showColumn = (props.containers.multiLocFlag || props.containers.multiTimeFlag);
    return (
      <>
      <InputLabel
        style={{
          fontSize: "20px",
          color: "#0E1B3D",
          fontFamily: 'Dubai Regular',
          marginTop:'23px',
          fontWeight:600,
          marginLeft: "12px",
          marginBottom:'23px'
        }}
      >
        Booking Details
      </InputLabel>
      <ContainerSummary containerSummary={containerSummary} register={methods.register}></ContainerSummary>
      </>
    )
  }

  const RenderCompanyDetails = () => {
    let simpleArray = [
      paymentDetails.vatProfileDto.companyName, 
      paymentDetails.vatProfileDto.address, 
      paymentDetails.vatProfileDto.country, 
      paymentDetails.vatProfileDto.emirate, 
      paymentDetails.vatProfileDto.mobileNumber
    ]
     var temp=[];

    for(let i of simpleArray)
    i && temp.push(i); 

    simpleArray = temp;
    return simpleArray.join(", ").toLowerCase();
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
      {trnPopup && (<TrnDetailsPopup onReinitiateClose={() => { setTrnPopup(false); }} redirectionUrl={paymentDetails} />)}
      <FormProvider {...methods}>
      <Grid container spacing={2}>
            <Grid item xs={6}>
              <SaveAsDraftButton
                style={{position: 'absolute', top: '20px', right: '145px'  }}
                variant="outlined"
                onClick={()=>props.saveAsDraft(1)}
                >
                Save As Draft
              </SaveAsDraftButton>
              </Grid>
              <Grid item xs={6}>
              <BackButton
                style={{ color: '#FFFFFF', backgroundColor: '#1360D2', border: 'none', position: 'absolute', top: '100px', right: '145px' }}
                variant="contained"
                onClick={()=>{
                  console.log(props.containers)
                  props.handleBack(props.containers)
                }}
              >
                Back
              </BackButton>
              </Grid>
        </Grid>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={classes.splitScreen}>
            <div className={classes.leftPane}>
              <div className="row">
                <Grid container alignItems="left" className={classes.root1}>
                  <Grid item xs={12}>
                    {/* <Card className={classes.root1}>
                      <CardContent> */}
                        <InputLabel style={{
                          fontSize: "18px",
                          color:'#0E1B3D',
                          fontFamily: "Dubai Regular",
                          textAlign: "left",
                          fontWeight:600,
                          paddingBottom:'20px'
                        }}>
                          VAT Details</InputLabel>
                        {/* <hr style={{ backgroundColor: "#D7D7D7" }}></hr> */}
                        <Grid container spacing={1} alignItems="flex-start">
                          <Grid item xs={12}>
                            {paymentDetails && <Table className={classes.table1} size="small">
                              <TableBody>
                                <TableRow>
                                  <StyledTableCell2 style={{fontFamily: "Dubai Regular"}}>
                                      VAT Number
                                  </StyledTableCell2>
                                  <StyledTableCell2>
                                      {paymentDetails.vatProfileDto.vatNo}
                                  </StyledTableCell2>
                                </TableRow>
                                <TableRow>
                                  <StyledTableCell2 style={{fontFamily: "Dubai Regular"}}>
                                      Address
                                  </StyledTableCell2>
                                  <StyledTableCell2 style={{textTransform:'capitalize'}}>
                                      {RenderCompanyDetails()} 
                                  </StyledTableCell2>
                                </TableRow>
                              </TableBody>
                            </Table>}
                            {/* {paymentDetails && paymentDetails.vatProfileDto.vatNo ==="" && <InputLabel >No Details</InputLabel>} */}
                          </Grid>
                        </Grid>
                      {/* </CardContent>
                    </Card> */}
                  </Grid>
                </Grid>
                <RenderContainerSummary></RenderContainerSummary>
                <br></br>
              </div>
            </div>
            <div className={classes.rightPane}>
              <hr style={{ border: 0 }}></hr>
              {paymentDetails && (
                <>
                    <Table className={classes.table}>
                      <TableHead>
                      <TableRow>
                      <StyledTableCell3 colspan={3}>
                      <InputLabel
                      style={{
                        fontSize: "18px",
                        color: "#0E1B3D",
                        fontFamily: "Dubai Regular",
                        fontWeight:600,
                      }}
                    >
                      Payment Breakup{" "}
                    </InputLabel>
                    </StyledTableCell3>
                    <StyledTableCell3 style={{ fontWeight:600, fontSize: "18px"}}>
                      Amount Payable
                    </StyledTableCell3>
                    <StyledTableCell3 style={{color:'#0568AE', fontWeight:600, fontSize: "18px"}}>
                      {paymentDetails.grossAmount} AED
                    </StyledTableCell3>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell3>
                          Containers
                        </StyledTableCell3>
                        <StyledTableCell3>
                          Amount
                        </StyledTableCell3>
                        <StyledTableCell3>
                          VAT%
                        </StyledTableCell3>
                        <StyledTableCell3>
                          VAT Amount
                        </StyledTableCell3>
                        <StyledTableCell3>
                          Total
                        </StyledTableCell3>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paymentDetails.paymentDetails.filter(x => x.paymentType !== 'tokenIn' && x.paymentType !== 'tokenOut').map((paymentInfo, ind) => (
                          <TableRow>
                            <StyledTableCell3>
                                {paymentInfo.chargeDescription}
                            </StyledTableCell3>
                            <StyledTableCell3>
                                {paymentInfo.subTotalAmount} AED
                            </StyledTableCell3>
                            <StyledTableCell3>
                                {paymentInfo.vat}%
                            </StyledTableCell3>
                            <StyledTableCell3>
                                {paymentInfo.totalVat} AED
                            </StyledTableCell3>
                            <StyledTableCell3>
                                {paymentInfo.totalAmount} AED
                            </StyledTableCell3>
                          </TableRow>
                        ))}
                      {/* </TableBody> */}
                    {/* </Table>
                    <Table className={classes.table} >
                      <TableBody> */}
                        <TableRow>
                        <StyledTableCell3 colspan={3} style={{borderTop:'1px solid #D6D6D6'}}></StyledTableCell3>
                          <StyledTableCell3 style={{borderTop:'1px solid #D6D6D6', fontFamily:'Dubai Regular'}}>
                              Net Amount
                          </StyledTableCell3>
                          <StyledTableCell3 style={{borderTop:'1px solid #D6D6D6', fontFamily:'Dubai Regular'}}>
                              {paymentDetails.totalContainerTariff} AED
                          </StyledTableCell3>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Table className={classes.table} style={{paddingTop:'150px'}}>
                      <TableHead>
                        <StyledTableCell3>
                            Token Re-Charges
                        </StyledTableCell3>
                        <StyledTableCell3>
                          Amount
                        </StyledTableCell3>
                        <StyledTableCell3>
                          VAT%
                        </StyledTableCell3>
                        <StyledTableCell3>
                          VAT Amount
                        </StyledTableCell3>
                        <StyledTableCell3>
                          Total
                        </StyledTableCell3>
                      </TableHead>
                      <TableBody>
                      {paymentDetails.paymentDetails.filter(x => x.paymentType === 'tokenIn' || x.paymentType === 'tokenOut').map((tokenDetails, ind) => (
                          <TableRow>
                            <StyledTableCell3>
                                {tokenDetails.chargeDescription}
                            </StyledTableCell3>
                            <StyledTableCell3>
                                {tokenDetails.totalAmount} AED
                            </StyledTableCell3>
                            <StyledTableCell3>
                                {tokenDetails.vat}%
                            </StyledTableCell3>
                            <StyledTableCell3>
                                {tokenDetails.totalVat} AED
                            </StyledTableCell3>
                            <StyledTableCell3>
                                {tokenDetails.subTotalAmount} AED
                            </StyledTableCell3>
                          </TableRow>
                      ))}
                      {/* </TableBody>
                    </Table>
                    <Table className={classes.table}>
                      <TableBody> */}
                        <TableRow>
                        <StyledTableCell3 colspan={3} style={{borderTop:'1px solid #D6D6D6'}}></StyledTableCell3>
                          <StyledTableCell3  style={{borderTop:'1px solid #D6D6D6', fontFamily:'Dubai Regular'}}>
                              Net Amount
                          </StyledTableCell3>
                          <StyledTableCell3 style={{borderTop:'1px solid #D6D6D6', fontFamily:'Dubai Regular'}}>
                              {paymentDetails.totalTokenTariff} AED
                          </StyledTableCell3>
                        </TableRow>
                      {/* </TableBody>
                    </Table>
                    <Table className={classes.table}>
                      <TableBody> */}
                        <TableRow>
                        <StyledTableCell3 colspan={3}></StyledTableCell3>
                          <StyledTableCell3 style={{fontFamily:'Dubai Regular'}}>
                              Gross Amount
                          </StyledTableCell3>
                          <StyledTableCell3  style={{fontFamily:'Dubai Regular'}}>
                              {paymentDetails.grossAmount} AED
                          </StyledTableCell3>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <div className="row">
                      <div className="col-md-6"></div>
                      <div className="col-md">
                        <div className="row">
                          <div className="col-md-3">
                            <img src="./amount.svg" className={classes.boxOnTable}/>
                          </div>
                          <div className="col-md" style={{paddingRight:0}}>
                            <Card
                              variant="outlined"
                              style={{
                                height: "102px",
                                border: "1px solid #D3D3D3",
                                width:'236px',
                                borderRadius:0,
                                marginTop:'27px'
                              }}
                            >
                              <CardContent>
                                <Grid container spacing={1} alignItems="flex-start">
                                  <Grid item xs={12} style={{fontWeight:600}}>
                                    Amount Payable
                                  </Grid>
                                  <Grid item xs={12} style={{color:'#0568AE', fontWeight:600}}>
                                      {paymentDetails.grossAmount} AED
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div className="row">
                    <InfoBox
                      message={<><p>Waiting charges is applicable per container, after free time of 04 hours once it arrives at cargo owner premises.</p>
                      <p>(Please refer <a href="https://www.dubaitrade.ae/en/lm-terms-conditions" target="_blank">terms & conditions</a> for applicable charges)</p></>}
                      buttonNames={[]}
                      onSelect={(e) => {}}
                    />
                  </div>
                  </>
              )}
            </div>
          </div>
          <br></br>
          <Grid container>
            <Grid item xs={12} style={{ marginBottom: '-18px' }}>
                <span style={{ fontSize: "14px", fontWeight: "bold", marginRight: '20px', color: '#0E1B3D',}}>
                  Displaying {props.containers && props.containers.containerList && props.containers.containerList.length} containers
                </span>
            </Grid>
          </Grid>
          <div style={{ borderRadius: '10px 10px 0px 0px', border: '1px solid #fff' }}>
            <Table aria-label="simple table" style={{ width: '100%' }}>
              <TableHead style={{ backgroundColor: '#696F83', color: '#FFFFFF' }}>
                <TableRow>
                  <StyledTableCell style={{ borderTopLeftRadius: '10px' }}>
                    Container Number
                  </StyledTableCell>
                  <StyledTableCell>
                    Container Type
                  </StyledTableCell>
                  <StyledTableCell>
                    Contact Person
                  </StyledTableCell>
                  <StyledTableCell>
                    Mobile Number
                  </StyledTableCell>
                  {(props.containers.multiLocFlag || props.containers.multiTimeFlag) &&
                    <>
                      <StyledTableCell>
                        Date
                      </StyledTableCell>
                      <StyledTableCell>
                        Time
                      </StyledTableCell>
                    </>
                  }
                  <StyledTableCell style={{ borderTopRightRadius: '10px' }}>
                    Location
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.containers.containerList.map((containers, inx) => (
                  <TableRow key={containers.container_number}>
                    <StyledTableCell>
                      <BlueTooltip arrow title={renderContainerTooltip(containers)}>
                        <div style={{
                          display: 'inline-flex',
                          boxSizing: 'inherit',
                          textAlign: 'center',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <Avatar style={{ height: '25px', width: '25px', padding: '14px', marginRight: '8px', fontFamily: 'Dubai Light', backgroundColor: utils.randmonColorConsignee(), fontSize: '14px' }} >
                            {containers.consigneeDetails?.split("/")[1]}
                          </Avatar>
                          <InputLabel
                             style={{ color: "#0568AE", fontWeight: "bold", textDecoration: "underline", fontFamily: 'Dubai Light', paddingTop: '5px' }}
                          >
                            {containers.container_number + " - " + containers.iso_code}
                          </InputLabel>
                        </div>
                      </BlueTooltip>
                    </StyledTableCell>
                    <StyledTableCell>
                      {containers.containerType}
                    </StyledTableCell>
                    <StyledTableCell>
                      {containers.consigneeContactName}
                    </StyledTableCell>
                    <StyledTableCell>
                      {containers.consigneeContactNumber}
                    </StyledTableCell>
                    {/* {props.containers.multiLocAndTime && */}
                    {(props.containers.multiLocFlag || props.containers.multiTimeFlag) &&
                      <>
                        <StyledTableCell>
                          {containers.date}
                        </StyledTableCell>
                        <StyledTableCell>
                          {containers.time}
                        </StyledTableCell>
                      </>}
                    <StyledTableCell>
                    <BlueTooltip title={containers.dropAddress} arrow>
                        <div>
                          <img src="./location.svg" height="16px" />
                          <span style={{paddingTop: "15px", maxWidth: "250px", minWidth: '120px', whiteSpace: 'nowrap', paddingLeft: '5px' }}>
                            {(containers.dropAddress.substring(0, 40) + "...")}
                          </span>
                        </div>
                      </BlueTooltip>
                     
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
                    icon={<img src="./checkbox.svg" height="25px"/>}
                    checkedIcon={<img src="blue-checkbox.svg" height="25px"/>}
                      onChange={handleCheckBoxChange}
                      name="termsAndCondition"
                      style={{
                        transform: "scale(0.7)",
                      }}
                    />
                  }
                  label={
                    <span
                      style={{ fontSize: "14px", fontFamily:'Dubai Light', fontWeight:600 }}
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
                <StyledBlueButton
                  style={{ float: "right", marginTop: "10px", marginRight: "25px" }}
                  type="submit"
                  onClick={() => methods.handleSubmit(onSubmit)}
                >
                  Pay {paymentDetails && paymentDetails.grossAmount} AED
                </StyledBlueButton>
              </div>
            </Paper>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
export default React.memo(Payment);
