import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import InputLabel from "@material-ui/core/InputLabel";
import { default as MuiButton } from "@material-ui/core/Button";
import { withStyles, createStyles } from "@material-ui/core/styles";
import BookingService from "../../service/BookingService";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import TableHead from "@material-ui/core/TableHead";
import MuiTableCell from "@material-ui/core/TableCell";
import Link from "@material-ui/core/Link";
import PaymentBreakupPopup from "./PaymentBreakupPopup";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper"
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import CommonService from "../../service/CommonService";
import Typography from "@material-ui/core/Typography";
import DeleteContainerPopup from "./DeleteContainerPopup";
import ContainerPopup from "./ContainerPopup";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import CancelledContainerPopup from "./CancelledContainerPopup";
import { NO_DIALOG, ALERT_DIALOG, OTHER_POPUP } from "../../lib/common/Constants";
import DownloadDocumentPopUp from '../admin/DownloadDocumentPopup';
import RequestContainerService from "../../service/RequestContainerService";
import PodApprovedPopup from "./PodApprovedPopup";

const useStyles = makeStyles({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  table: {
    width: "300px",
    marginLeft: "220px",
    marginTop: "45px",
  },

  label: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace: "nowrap",
  },

  labelData: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
    whiteSpace: "nowrap",
  },
  boxOnTable: {
    left: "45px",
    //top: "15px",
    padding: "1.4%",
    paddingTop: "5px",
    width: "55px",
    height: "47px",
    backgroundColor: "#0E1B3D",
    border: "1px solid #E4EBFF",
    color: "#FFFFFF",
    textAlign: "center",
    position: "relative",

    fontWeight: "bold",
    zIndex: 2,
    marginTop: "15px",
  },
  pendingCard: {
    width: "1238px",
    maxHeight: "560px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E1DEDE",
    borderRadius: "10px",
    opacity: 1,
  },
  confirmedCard: {
    width: "1238px",
    maxHeight: "560px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E1DEDE",
    borderRadius: "10px",
    opacity: 1,
  },
});

const StyledButton1 = withStyles((theme) =>
  createStyles({
    root: {
      width: "139px",
      height: "39px",
      background: "#168FE4 0% 0% no-repeat padding-box",
      boxShadow: "0px 1px 4px #00000029",
      borderRadius: "8px",
      opacity: 1,
      alignSelf: "right",
    },
  })
)(MuiButton);

const StyledButton2 = withStyles((theme) =>
  createStyles({
    root: {
      width: "166px",
      height: "39px",
      background: "#168FE4 0% 0% no-repeat padding-box",
      boxShadow: "0px 1px 4px #00000029",
      borderRadius: "8px",
      opacity: 1,
      alignSelf: "right",
    },
  })
)(MuiButton);

const ContainerTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#E4E4E426",
    },
  },
}))(TableRow);

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    width: 185,
    padding: "5px",
  },
})(MuiTableCell);

function PaymentSummary() {
  const classes = useStyles();
  const location = useLocation();
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [allContainerList, setAllContainerList] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [pstate, setPstate] = useState(0);
  const [remoteUrl, setRemoteURl] = useState("");
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [containerPopup, setContainerPopup] = useState(false);
  const [tabLabels, setTabLabels] = useState([
    "In Progress",
    "Delivered",
    "Completed",
  ]);
  const [tabSelected, setTabSelected] = useState("In Progress");
  const [selectedContainers, setSelectedContainers] = useState();
  const [cancelledContainerPopup,setCancelledContainerPopup] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState();
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [podApprovedPopup,setPodApprovedPopup] = useState(false);

  let history = useHistory();

  let url1 = "";
  var list = "";
  var cancelledContainersList = "";

  if (location.state !== undefined) {
    url1 = location.state.url;
    list = location.state.paymentSummary;
  }
  const [url, setUrl] = React.useState(url1);

  useEffect(() => {
    console.log(location.state.paymentSummary);
    list = location.state.paymentSummary;
    BookingService.fetchPaymentSummary(
      location.state.statusData.bookingNumber
    ).then((response) => {
          setAllContainerList(response.containerList);
      if (location.state.statusData.statusCode == "SUCC" || 
          location.state.statusData.statusCode == "EXP"){
        setPaymentSummary(response);
      }else {
        if (tabSelected === "In Progress") {
          list.containerList = response.containerList.filter(
            (container) =>
              container.refStatus.code === "PEND" ||
              container.refStatus.code === "PENTRUCK"||
              container.refStatus.code ==="PODUPL" ||
              container.refStatus.code ==="INPRO"||
              container.refStatus.code ==="CNCL"||
              container.refStatus.code ==="PODIMPAPPR"
          );
          setPaymentSummary(response);
          console.log(list);
        }
      }
      console.log(paymentSummary);
    });
    cancelledContainersList = location.state.paymentSummary.containerList.filter((container)=>container.refStatus.code==='CNCL');
  }, [pstate]);

  const deleteContainer = (e, selectedContainers) => {
    selectedContainers.cancelRemarks = e;
    BookingService.cancellationRequest(
      selectedContainers
    ).then((response) => {
      setOpenDeletePopup(false);
      refresh();
    });
  };

  const openPaymentBreakupPopup = () => {
    setOpenPopup(true);
  };

  const closePaymentBreakupPopup = () => {
    setOpenPopup(false);
  };

  const openCancelledContainerPopup = () =>{
    setCancelledContainerPopup(true);
  }

  const closeCancelledContainerPoup = () => {
    setCancelledContainerPopup(false);
  }

  const downloadTaxReceipt = () => {
    CommonService.downloadInvoice(location.state.statusData.bookingNumber);
  };

  const downloadBookingReceipt = () => {
    CommonService.downloadReceipt(location.state.statusData.bookingNumber);
  };

  const openDeleteContainerPopup = () => {
    setOpenDeletePopup(true);
  };

  const closeDeleteContainerPopup = () => {
    setOpenDeletePopup(false);
  };

  const refresh = () => {
    console.log("refresh called :::");
    setPstate(pstate + 1);
  };

  const openContainerPopup = (props) => {
    setContainerPopup(true);
  };

  const closeContainerPopup = () => {
    setContainerPopup(false);
  };

  const onFileDownload = (refernceNumber, container) => {
    console.log("calling file download ::",refernceNumber);
    RequestContainerService.fetchPod(refernceNumber, container.container_number)
      .then((response) => {
        if (response.isAxiosError) throw new Error(response.status);
        else {
          console.log("calling pod list api ::",response.data.dataItems);
          setSelectedContainer(container);        
          setFileList(response.data.dataItems);
          setShowPopup(OTHER_POPUP);
         
        }
      })

      .catch(() => {
        console.log("error");
      });
  };

  const approvePod=(container)=>
{
  console.log("approve pod ::",selectedContainer);
  RequestContainerService.approvePod(
    selectedContainer
  )
    .then((response) => {
    
     // props.reRender();
     // props.onApproveReject("APPROVE");
      setShowPopup(NO_DIALOG);
      setSelectedContainer();
      setPodApprovedPopup(true);
    })

    .catch(() => {
      console.log("error");
    });
  }

  const onClose = () =>{
    setPodApprovedPopup(false);
  }
  
  return (
    <>
      <Grid container style={{ marginTop: "18px" }}>
        <Grid item xs={8}>
          {/* <Typography style={{marginLeft:'1px'}}></Typography> */}
          <Link
            style={{ color: "#848484", fontSize: "20px" }}
            onClick={() => {
              console.log("back button click", url);
              history.push("/status", { url: url });
            }}
          >
            Status
            <span style={{ fontSize: "20px", color: "#EA2428" }}>/</span>
          </Link>
          <span
            style={{ fontSize: "20px", fontWeight: "bold", color: "#0E1B3D" }}
          >
            {location.state.statusData.bookingNumber}
          </span>
        </Grid>
        <Grid item xs={2}>
          {(location.state.statusData.statusCode === "SUCC" || 
            location.state.statusData.statusCode === "EXP" ||
            location.state.statusData.statusCode === "TRANSCONF" ||
            location.state.statusData.statusCode === "STARTED"||
            location.state.statusData.statusCode === "CNCL") && (
            <StyledButton1 onClick={() => downloadTaxReceipt()}>
              <img src="./doc_download.svg" /> Tax Receipt
            </StyledButton1>
          )}
        </Grid>
        <Grid item xs={2} style={{ alignItems: "right" }}>
          {(location.state.statusData.statusCode === "SUCC" ||
            location.state.statusData.statusCode === "EXP" ||
            location.state.statusData.statusCode === "TRANSCONF" ||
            location.state.statusData.statusCode === "STARTED"||
            location.state.statusData.statusCode === "CNCL") && (
            <StyledButton2 onClick={() => downloadBookingReceipt()}>
              <img src="./doc_download.svg" /> Booking Receipt
            </StyledButton2>
          )}
          {location.state.statusData.statusCode === "FPAY" && (
            <StyledButton2
              onClick={() => {
                BookingService.reInitialise(
                  location.state.statusData.bookingNumber
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
                      serviceDescription:
                        res.data.dataItems[0].serviceDescription,
                      responseURL: res.data.dataItems[0].responseURL,
                      serviceCost: res.data.dataItems[0].serviceCost,
                      soTransactionID: res.data.dataItems[0].soTransactionID,
                      documentationCharges:
                        res.data.dataItems[0].documentationCharges,
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
              }}
            >
              Retry Payment
            </StyledButton2>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card
          className={
            location.state.statusData.statusCode === "SUCC"||
            location.state.statusData.statusCode === "EXP"
              ? classes.pendingCard
              : classes.confirmedCard
          }
        >
          <div className={classes.splitScreen}>
            <div style={{ width: "30%" }}>
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
                    Booking # {location.state.statusData.bookingNumber}
                  </InputLabel>
                </Grid>
                <Grid item xs={4}>
                  {location.state.statusData.statusCode === "SUCC" || 
                   location.state.statusData.statusCode === "EXP" && (
                    <Box
                      style={{
                        width: "200px",
                        height: "25px",
                        background: "#FF8E0D 0% 0% no-repeat padding-box",
                        border: "1px solid #FF8E0D",
                        borderRadius: "22px",
                        opacity: 1,
                        marginTop: "13px",
                        textAlign: "center",
                      }}
                    >
                      Transporter Pending
                    </Box>
                  )}

                  {(location.state.statusData.statusCode === "TRANSCONF"  ||
                    location.state.statusData.statusCode === "STARTED") && (
                    <Box
                      style={{
                        width: "200px",
                        height: "25px",
                        background: "#63BB7A 0% 0% no-repeat padding-box",
                        border: "1px solid #63BB7A",
                        borderRadius: "22px",
                        opacity: 1,
                        marginTop: "13px",
                        textAlign: "center",
                      }}
                    >
                      Transporter Confirmed
                    </Box>
                  )}

                  {location.state.statusData.statusCode === "FPAY"  && (
                    <Box
                      style={{
                        width: "200px",
                        height: "25px",
                        background: "#EA2428 0% 0% no-repeat padding-box",
                        border: "1px solid #EA2428",
                        borderRadius: "22px",
                        opacity: 1,
                        marginTop: "13px",
                        textAlign: "center",
                      }}
                    >
                      Payment Failed
                    </Box>
                  )}

                  {(location.state.statusData.statusCode === "CNCL")
                  && (
                    <Box
                      style={{
                        width: "200px",
                        height: "25px",
                        background: "#EA2428 0% 0% no-repeat padding-box",
                        border: "1px solid #EA2428",
                        borderRadius: "22px",
                        opacity: 1,
                        marginTop: "13px",
                        textAlign: "center",
                      }}
                    >
                      Cancelled
                    </Box>
                  )}
                </Grid>
              
              </Grid>
              <Table>
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Booked on
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {location.state.statusData.bookedOn}
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Requestor name
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {location.state.statusData.requesterName}
                    </InputLabel>
                  </TableCell>
                  {/* <TableCell>
               
                </TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Containers Booked
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {location.state.statusData.noOfContainers}
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Requestor contact
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {location.state.statusData.requesterContact}
                    </InputLabel>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Trucks Requested
                    </InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{
                        marginTop: "13px",
                        marginLeft: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {location.state.statusData.noOfTrucks}
                    </InputLabel>
                  </TableCell>
                </TableRow>
              </Table>
            </div>

            <div style={{ width: "30%" }}>
              <Grid container>
                <Grid item>
                  <InputLabel></InputLabel>
                </Grid>
              </Grid>
            </div>
            <div style={{ width: "40%", marginRight: "21px" }}>
              <InputLabel
                style={{
                  marginTop: "13px",
                  width: "300px",
                  textAlign: "right",
                  marginLeft: "160px",
                }}
              >
                Payment Breakups
              </InputLabel>

              <Table className={classes.table}>
                <TableBody style={{ marginTop: "13px" }}>
                  {location.state.paymentSummary.paymentDetails.map(
                    (paymentInfo, ind) => (
                      <TableRow>
                        <TableCell>
                          <InputLabel className={classes.labelData}>
                            {paymentInfo.chargeDescription}
                          </InputLabel>
                        </TableCell>

                        <TableCell>
                          <InputLabel className={classes.labelData}>
                            {paymentInfo.totalAmount} AED
                          </InputLabel>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                  <Divider />
                  <TableRow>
                    <TableCell>
                      <InputLabel className={classes.labelData}>
                        Gross Amount
                      </InputLabel>
                    </TableCell>

                    <TableCell>
                      <InputLabel className={classes.labelData}>
                        {location.state.paymentSummary.grossAmount} AED
                      </InputLabel>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <Link
                        style={{
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                        }}
                        onClick={openPaymentBreakupPopup}
                      >
                        View Detailed Breakups
                      </Link>
                    </TableCell>
                  </TableRow>
                { cancelledContainersList.length!==0 && <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <Link
                        style={{
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                        }}
                        onClick={openCancelledContainerPopup}
                      >
                        View Cancelled Containers
                      </Link>
                    </TableCell>
                  </TableRow>}
                </TableBody>
              </Table>
              {openPopup && (
                <PaymentBreakupPopup
                  paymentDetails={location.state.paymentSummary}
                  onClose={closePaymentBreakupPopup}
                />
              )}

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
                          height: "113px",
                          width: "249px",
                          border: "1px solid #D3D3D3",
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={1} alignItems="flex-start">
                            <Grid item xs={12}>
                              <InputLabel
                                style={{
                                  marginLeft: "50px",
                                  marginTop: "14px",
                                }}
                              >
                                {" "}
                                Amount Paid
                              </InputLabel>
                            </Grid>

                            <Grid item xs={12}>
                              <InputLabel
                                style={{
                                  position: "relative",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "#0568AE",
                                  marginTop: "14px",
                                  marginLeft: "50px",
                                }}
                              >
                                {location.state.paymentSummary.grossAmount} AED
                              </InputLabel>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(location.state.statusData.statusCode === "TRANSCONF"  ||
            location.state.statusData.statusCode === "STARTED") && (
            <Table>
              <TableRow style={{ marginLeft: "13px" }}>
                <TableCell>
                  <Grid container>
                    <Grid item xs={2}>
                      <img src="./containers_in_yard.svg" />
                    </Grid>
                    <Grid item xs={10}>
                      <InputLabel>Containers in Yard</InputLabel>
                      <InputLabel>
                        {" "}
                        {(
                          location.state.statusData.containersInYard + ""
                        ).padStart(2, "0")}{" "}
                      </InputLabel>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item xs={3}>
                      <img src="./containers_to_town.svg" />
                    </Grid>
                    <Grid item xs={9}>
                      <InputLabel>Containers to Town</InputLabel>
                      <InputLabel>
                        {" "}
                        {(
                          location.state.statusData.containersToTown + ""
                        ).padStart(2, "0")}{" "}
                      </InputLabel>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item xs={4}>
                      <img src="./containers_delivered.svg" />
                    </Grid>
                    <Grid item xs={8}>
                      <InputLabel>Containers Delivered</InputLabel>
                      <InputLabel>
                        {" "}
                        {(
                          location.state.statusData.containersDelivered + ""
                        ).padStart(2, "0")}{" "}
                      </InputLabel>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item xs={4}>
                      <img src="./containers_completed.svg" />
                    </Grid>
                    <Grid item xs={8}>
                      <InputLabel>Containers Completed</InputLabel>
                      <InputLabel>
                        {" "}
                        {(
                          location.state.statusData.containersCompleted + ""
                        ).padStart(2, "0")}{" "}
                      </InputLabel>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </Table>
          )}
        </Card>
      </Grid>
      {location.state.statusData.statusCode !== "SUCC" &&
       location.state.statusData.statusCode !== "EXP" &&
        location.state.statusData.statusCode !== "FPAY" &&
        location.state.statusData.statusCode !== "PPAY" &&
        location.state.statusData.statusCode !== "CNCL" &&
         (
          <CustomTabs
            labelList={tabLabels}
            onSelected={(e) => {
              if (e === 0) {
                list.containerList = allContainerList.filter(
                  (container) =>
                    container.refStatus.code === "PEND" ||
                    container.refStatus.code === "PENTRUCK" ||
                    container.refStatus.code ==="PODUPL" ||
              container.refStatus.code ==="INPRO"
                );
                setPaymentSummary(list);
                setTabSelected("In Progress");
                setPstate(pstate + 1);
              }
              if (e === 1) {
                list.containerList = allContainerList.filter(
                  (container) =>
                    container.refStatus.code === "FCL_DEL" ||
                    container.refStatus.code === "PMTTOK" ||
                    container.refStatus.code === "MTTOKASGN"
                );
                console.log(list.containerList);
                setPaymentSummary(list);
                setTabSelected("Delivered");
                setPstate(pstate + 1);
              }
              if (e === 2) {
                list.containerList = allContainerList.filter(
                  (container) =>
                    container.refStatus.code === "MT_DEL" ||
                    container.refStatus.code === "COMPL"
                );
                setPaymentSummary(list);
                setTabSelected("Completed");
                setPstate(pstate + 1);
              }
            }}
          ></CustomTabs>
        )}
      {location.state.paymentSummary.containerList.length >0 ? (<>
        <Grid item xs={12} style={{ marginLeft: "15px", marginTop: "34px" }}>
        <span
          style={{ fontSize: "18px", fontWeight: "bold", marginRight: "20px" }}
        >
          Displaying{" "}
          {(location.state.paymentSummary.containerList.length + "").padStart(
            2,
            "0"
          )}{" "}
          containers
        </span>
      </Grid>
      <div style={{ marginTop: "23px" }}>
        <Table >
          <TableHead
            style={{
              width: "1246px",
              height: "60px",
              background: "#696F83 0% 0% no-repeat padding-box",
              border: "1px solid #DCDCDC",
              borderRadius: "10px 10px 0px 0px",
              opacity: 1,
            }}
          >
            <TableRow>
              <TableCell>
                <InputLabel style={{ color: "white" }}>
                  Container Number
                </InputLabel>
              </TableCell>

              <TableCell>
                <InputLabel style={{ color: "white" }}>
                  Container Type
                </InputLabel>
              </TableCell>

              <TableCell>
              {(tabSelected === "In Progress" || tabSelected === "Delivered")
                 && (
                <InputLabel style={{ color: "white" }}>Pickup</InputLabel>
                 )}
                {tabSelected === "Completed"
                 && (
                <InputLabel style={{ color: "white" }}>Delivered On</InputLabel>
                 )}
              </TableCell>

              <TableCell>
              {tabSelected === "In Progress"
                 && (
                <InputLabel style={{ color: "white" }}>Drop Date & Time</InputLabel>
                 )}
                 {tabSelected === "Delivered"
                 && (
                <InputLabel style={{ color: "white" }}>Delivered On</InputLabel>
                 )}
                {tabSelected === "Completed"
                 && (
                <InputLabel style={{ color: "white" }}>Completed On</InputLabel>
                 )}
              </TableCell>

              <TableCell>
                <InputLabel style={{ color: "white" }}>Drop Details</InputLabel>
              </TableCell>
             {(location.state.statusData.statusCode === "TRANSCONF"  ||
            location.state.statusData.statusCode === "STARTED") && <TableCell>
                <InputLabel style={{ color: "white" }}>POD</InputLabel>
              </TableCell>}
              {(location.state.statusData.statusCode === "TRANSCONF"  ||
            location.state.statusData.statusCode === "STARTED") && <TableCell>
                <InputLabel style={{ color: "white" }}>Track</InputLabel>
              </TableCell>}
              {(location.state.statusData.statusCode === "SUCC"  ||
            location.state.statusData.statusCode === "EXP") && (
                <TableCell>&nbsp;</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentSummary !== null &&
              paymentSummary.containerList.map((containers, inx) => (
                <ContainerTableRow key={containers.container_number}>
                  <TableCell>
                    <div
                      style={{
                        display: "inline-flex",
                        boxSizing: "inherit",
                        textAlign: "center",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Avatar
                        style={{
                          height: "25px",
                          width: "25px",
                          backgroundColor: "#FF7F7B",
                          fontSize: "14px",
                          marginLeft: "10%",
                        }}
                      >
                        {" "}
                        {containers.initials}
                      </Avatar>

                      <InputLabel
                        style={{
                          color: "#0568AE",
                          fontWeight: "bold",
                          paddingTop: "15px",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          openContainerPopup();
                          setSelectedContainers(containers);
                          console.log("inputLabel clicked ::");
                        }}
                      >
                        {containers.container_number}
                      </InputLabel>
                    </div>
                  </TableCell>

                  <TableCell>
                    <InputLabel
                      style={{
                        color: "#686868",
                        fontWeight: "bold",
                        paddingTop: "15px",
                      }}
                    >
                      {containers.containerType}
                    </InputLabel>
                  </TableCell>

                  <TableCell>
                  {(tabSelected === "In Progress" || tabSelected === "Delivered")
                 && (
                  <InputLabel
                  style={{
                    color: "#686868",
                    fontWeight: "bold",
                    paddingTop: "15px",
                  }}
                >
                  {containers.pickupLocation}
                  

                </InputLabel>
                 )}
                {tabSelected === "Completed"
                 && (
                  <InputLabel
                  style={{
                    color: "#686868",
                    fontWeight: "bold",
                    paddingTop: "15px",
                  }}
                >
                  {containers.fclDeliveredOn}
                  

                </InputLabel>
                 )}
                    
                  </TableCell>

                  <TableCell>
                    {tabSelected === "In Progress"
                 && (
                  <InputLabel style={{color: "#686868", fontWeight: "bold", paddingTop: "15px",}}>
                  {containers.date_time}
                </InputLabel>
                 )}
                 {tabSelected === "Delivered"
                 && (
                  <InputLabel style={{color: "#686868", fontWeight: "bold", paddingTop: "15px",}}>
                  {containers.fclDeliveredOn}
                </InputLabel>
                 )}
                {tabSelected === "Completed"
                 && (
                  <InputLabel style={{color: "#686868", fontWeight: "bold", paddingTop: "15px",}}>
                  {containers.mtDeliveredOn}
                </InputLabel>
                 )}
                  </TableCell>

                  <TableCell>
                    <img src="./location.svg" />

                    <Link
                      style={{
                        textDecoration: "underline",
                        marginLeft: "8px",
                      }}
                      onClick={() => {
                        openContainerPopup();
                        setSelectedContainers(containers);
                      }}
                    >
                      {containers.dropZoneLabel}
                    </Link>

                  </TableCell>
                  {((location.state.statusData.statusCode === "TRANSCONF" ||
                   location.state.statusData.statusCode === "STARTED" ) &&<TableCell>{containers.refStatus.code === "PODUPL" && 
                <img src="./pod_pending.svg"  onClick={(e) => {
                  setSelectedContainers(containers);
                              onFileDownload(
                                location.state.statusData.bookingNumber,
                                containers
                              );
                            
                            }}/>}
                            {(containers.refStatus.code === "PODIMPAPPR" || containers.refStatus.code === "FCL_DEL")&& 
                <img src="./pod_approved.svg"  onClick={(e) => {
                  setSelectedContainers(containers);
                              onFileDownload(
                                location.state.statusData.bookingNumber,
                                containers
                              );
                            
                            }}/>}
              </TableCell>)}
              {((location.state.statusData.statusCode === "TRANSCONF" ||
                   location.state.statusData.statusCode === "STARTED" ) &&<TableCell>
                   {(containers.refStatus.code === "INPRO" ||
                     containers.refStatus.code === "PODUPL" ||
                     containers.refStatus.code === "PODREJ" ||
                     containers.refStatus.code === "PODIMPAPPR") && 
                     <img src="./truck_track.svg"  onClick={(e) => {
                       setSelectedContainers(containers);
                                   onFileDownload(
                                     location.state.statusData.bookingNumber,
                                     containers
                                   );
                                 
                                 }}/>}
                   {(containers.refStatus.code === "PEND" ||
                     containers.refStatus.code === "PTOK" ||
                     containers.refStatus.code === "PENTRUCK" ||
                     containers.refStatus.code === "TRUCK_ASGN")&& 
                     <img src="./in_yard.svg"  onClick={(e) => {
                       setSelectedContainers(containers);
                                   onFileDownload(
                                     location.state.statusData.bookingNumber,
                                     containers
                                   );
                                 
                                 }}/>}
                   </TableCell>
                   )}
                  
                    {containers.isActive == 0 && (
                      <TableCell><InputLabel style={{ color: "#EA2428" }}>
                        Cancelled
                      </InputLabel></TableCell>)}
                    
                  
                  {containers.isActive == 1 &&
                    (location.state.statusData.statusCode === "SUCC"||
                    location.state.statusData.statusCode === "EXP" )&& (
                      <TableCell> <img
                        src="./delete.svg"
                        onClick={() => {
                          setSelectedContainers(containers);
                          openDeleteContainerPopup();
                        }}
                      /></TableCell>
                   )}
                </ContainerTableRow>
              ))}
          </TableBody>
        </Table>
        {containerPopup && (
          <ContainerPopup
            enableButton={true}
            containers={selectedContainers}
            onClose={closeContainerPopup}
          />
        )}
        {openDeletePopup && (
          <DeleteContainerPopup
            onConfirm={(e) => deleteContainer(e, selectedContainers)}
            onClose={closeDeleteContainerPopup}
            containers={selectedContainers}
            refresh={refresh}
          />
        )}
        {cancelledContainerPopup && (<CancelledContainerPopup containers={cancelledContainersList} onClose={closeCancelledContainerPoup}/>)}
        {selectedContainer && fileList &&  showPopup === OTHER_POPUP && (
  <DownloadDocumentPopUp
    isopen={showPopup === OTHER_POPUP}
    fileList={fileList}
    container={selectedContainer}
    onClose={(e) => {
      setShowPopup(NO_DIALOG);
    }}
    onApprove={(e)=>{
      console.log("in callback approve ::",e);
      approvePod()
      
    }}
  
  />
)}
{podApprovedPopup && <PodApprovedPopup container={selectedContainers} onClose={onClose} refresh={refresh} />}
      </div>
      </>
      ):(<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
              <Grid container direction="row" spacing={5}>
                <Grid item sm={12} xs={12}>
                  <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
                    <b>{'No records found'}</b></Typography>
                </Grid>
              </Grid>
           </Paper>)
      }
    </>
  );
}

export default PaymentSummary;
