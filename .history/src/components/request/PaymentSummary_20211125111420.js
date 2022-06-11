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
import TableHead from "@material-ui/core/TableHead";
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
import { NO_DIALOG, OTHER_POPUP } from "../../lib/common/Constants";
import DownloadDocumentPopUp from '../admin/DownloadDocumentPopup';
import RequestContainerService from "../../service/RequestContainerService";
import PodApprovedPopup from "./PodApprovedPopup";
import Track from "../stepper/Track";
import { Breadcrumbs, IconButton, TableCell, Tooltip } from "@material-ui/core";
import * as utils from "../../utils/utilis";
import ErrorToast from "../../lib/components/toast/ErrorToast";

const useStyles = makeStyles({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  table: {
    width: "300px",
    marginLeft: "190px",
    marginTop: "20px",
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
    left: "60px",
    width: "55px",
    height: "47px",
    color: "#FFFFFF",
    textAlign: "center",
    position: "relative",
    fontWeight: "bold",
    zIndex: 2,
    marginTop: "25px",
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
  statusbox: {
    width: "124px",
    height: "25px",
    borderRadius: "22px",
    opacity: 1,
    marginLeft: '15px',
    fontSize: '12px',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    color: '#FFFFFF',
    textAlign: "center",
    verticalAlign: "middle",
    paddingTop: '3px'
  },
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontFamily: 'Dubai Regular',
    fontWeight: 600,
    fontSize: '17px'
  },
  text: {
    fontFamily: 'Dubai Light',
    fontWeight: 600,
  }
});

const StyledButton2 = withStyles(() =>
  createStyles({
    root: {
      border: "1px solid #1360D2",
      float: "right",
      minWidth: '139px',
      height: '39px',
      fontSize: "15px",
      borderRadius: '3px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
      color: '#FFFFFF',
      boxShadow: '0px 1px 4px #00000029',
      backgroundColor: '#1360D2',
      '&:hover': {
        color: '#1360D2',
      }
    }
  })
)(MuiButton);

const ContainerTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#E4E4E426",
    },
  },
}))(TableRow);

const StyledTableCell1 = withStyles(() =>
  createStyles({
    head: {
      fontSize: '16px',
      fontFamily: 'Dubai Regular',
      fontWeight: 600,
      color: '#000000',
      padding: 0,
      paddingBottom: '39px',
      borderBottom: 'none',
    },
    body: {
      fontSize: '16px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderBottom: 'none',
      color: '#000000',
      padding: "5px",
      paddingLeft: '13px'
    },
  }),
)(TableCell);

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      fontSize: '16px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      color: '#FFFFFF',
      paddingLeft: '5px',
      paddingRight: '5px'
    },
    body: {
      fontSize: '0.9rem',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderBottom: '0px',
      padding: '8px'
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
    whiteSpace: 'nowrap'
  },
  arrow: {
    "&:before": {
      borderStyle: "none"
    },
    color: "#0E1B3DD3",
  }
})(Tooltip);

function PaymentSummary() {
  const classes = useStyles();
  const location = useLocation();
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [allContainerList, setAllContainerList] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [pstate, setPstate] = useState(0);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [containerPopup, setContainerPopup] = useState(false);
  const [tabLabels, setTabLabels] = useState(["In Progress", "Delivered", "Completed"]);
  const [tabSelected, setTabSelected] = useState(location.state.statusData.statusCode !== "MT_DEL" ? "In Progress" : "Completed");
  const [selectedContainers, setSelectedContainers] = useState();
  const [fileList, setFileList] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState();
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [podApprovedPopup, setPodApprovedPopup] = useState(false);
  const [canApprove, setCanApprove] = useState(false);
  const [track, showTrack] = useState(false);
  const [trackDetails, setTrackDetails] = useState();
  const [showToaster, setShowToaster] = useState("NOTOASTER");
  const [showColumn, setShowColumn] = useState({
    cncl: false,
    delete: false
  });

  let history = useHistory();

  let url1 = "";
  // var list

  if (location.state !== undefined) {
    url1 = location.state.url;
    // list = location.state.paymentSummary;
  }
  const [url, setUrl] = React.useState(url1);

  useEffect(() => {
    console.log(location.state.paymentSummary);
    // list = location.state.paymentSummary;
    BookingService.fetchPaymentSummary(
      location.state.statusData.bookingNumber
    ).then((response) => {
      let list = response;
      setAllContainerList(response.containerList);
      if (response.containerList.filter((container) => container.isActive === 0).length > 0)
        setShowColumn((prev) => {
          prev.cncl= true
          return prev;
        })

      if (response.containerList.filter((container) => container.isActive === 1).length > 0 && ["SUCC", "EXP"].includes(location.state.statusData.statusCode))
        setShowColumn((prev) => {
          prev.delete= true
          return prev;
        })
      if (["PPAY", "FPAY", "SUCC", "EXP", "MT_DEL"].includes(location.state.statusData.statusCode)) {
        setPaymentSummary(response);
      } else {
        if (tabSelected === "In Progress") {
          list.containerList = response.containerList.filter(
            (container) =>
              ["PEND", "PENTRUCK", "PODUPL", "INPRO", "PTOK", "PODREJ", "EXP", "CNCL", "PODIMPAPPR", "CONF", "TRUCK_ASGN"].includes(container.refStatus.code)
          );
          setPaymentSummary(list);
          console.log(list);
        }
      }
      console.log(paymentSummary);
    });
  }, [pstate]);

  const deleteContainer = (e, selectedContainers) => {
    selectedContainers.cancelRemarks = e;
    BookingService.cancellationRequest(selectedContainers)
      .then((response) => {
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
    refresh();
  };

  const onFileDownload = (refernceNumber, container, approveFlag) => {
    console.log("calling file download ::", refernceNumber);
    RequestContainerService.fetchPod(refernceNumber, container.container_number)
      .then((response) => {
        if (response.isAxiosError) throw new Error(response.status);
        else {
          console.log("calling pod list api ::", response.data.dataItems);
          setSelectedContainer(container);
          setFileList(response.data.dataItems);
          setShowPopup(OTHER_POPUP);
          setCanApprove(approveFlag);
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  const approvePod = () => {
    console.log("approve pod ::", selectedContainer);
    RequestContainerService.approvePod(selectedContainer)
      .then((response) => {
        // props.onApproveReject("APPROVE");
        setShowPopup(NO_DIALOG);
        setSelectedContainer();
        setPodApprovedPopup(true);
        refresh();
      })
      .catch(() => {
        console.log("error");
      });
  }

  const rejectPod = () => {
    console.log("approve pod ::", selectedContainer);
    RequestContainerService.rejectPod(
      selectedContainer
    )
      .then((response) => {
        setShowPopup(NO_DIALOG);
        setSelectedContainer();
        setPodApprovedPopup(false);
        setShowToaster('SUCCESS');
        refresh();
      })
      .catch(() => {
        console.log("error");
      });
  }

  const onClose = () => {
    setPodApprovedPopup(false);
    setShowPopup(NO_DIALOG);
    refresh();
  }

  const renderTitle = (status) => {
    if (status === "PODUPL")
      return "Click here to verify POD";
    else if (["PODIMPAPPR", "FCL_DEL", "MTTRK_ASGN", "PMTTOK", "MTTOKASGN", "MT_DEL"].includes(status))
      return "Click here to view approved POD";
    else
      return "No POD uploaded"
  }

  return (
    <>
      <Grid container style={{ marginTop: '16px', marginBottom: "0 !important" }}>
        {["SUCC", "PPAY", "FPAY"].includes(location.state.statusData.statusCode) && <Grid item xs={8}>
          <Breadcrumbs aria-label="breadcrumb" classes={{
            root: classes.breadCrumRoot,
            separator: classes.separator,
          }}>
            <Link href="#" onClick={() => history.push("/status", { url: url })} style={{ color: '#848484' }}>
              Status
            </Link>
            <span style={{ color: '#0E1B3D' }}>
              {location.state.statusData.bookingNumber}
            </span>
          </Breadcrumbs>
        </Grid>}
        <Grid item xs={2}>
          {["SUCC","EXP","STARTED","CNCL","MT_DEL"].includes(location.state.statusData.statusCode) && (
              <StyledButton2 onClick={() => downloadTaxReceipt()} style={!["SUCC", "PPAY", "FPAY"].includes(location.state.statusData.statusCode) ? { position: 'absolute', top: '-50px', right: '205px' } : {}}>
                <img src="./doc_download.svg" style={{ paddingRight: '10px' }} />Tax Receipt
              </StyledButton2>
            )}
        </Grid>
        <Grid item xs={2} style={{ alignItems: "right" }}>
          {["SUCC","EXP","STARTED","CNCL","MT_DEL"].includes(location.state.statusData.statusCode) && (
              <StyledButton2 onClick={() => downloadBookingReceipt()} style={!["SUCC", "PPAY", "FPAY"].includes(location.state.statusData.statusCode) ? { width: '166px', position: 'absolute', top: '-50px', right: '15px' } : { width: '166px' }}>
                <img src="./doc_download.svg" style={{ paddingRight: '10px' }} /> Booking Receipt
              </StyledButton2>
            )}
          {location.state.statusData.statusCode === "FPAY" && (
            <StyledButton2 style={!["SUCC", "PPAY", "FPAY"].includes(location.state.statusData.statusCode) ? { position: 'absolute', top: '-50px', right: '10px' } : {}}
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
            location.state.statusData.statusCode === "SUCC" ||
              location.state.statusData.statusCode === "EXP"
              ? classes.pendingCard
              : classes.confirmedCard
          }
        >
          <div className={classes.splitScreen}>
            <div style={{ width: "60%" }}>
              <Grid container style={{ marginLeft: "13px" }}>
                <Grid item xs={'auto'} className={classes.text} style={{ fontSize: "20px", color: '#0E1B3D', fontFamily: 'Dubai Regular', paddingTop: '15px', minWidth: '250px', display: "flex" }}>
                  Booking # {location.state.statusData.bookingNumber}
                  {location.state.statusData.statusCode === "SUCC" ||
                    location.state.statusData.statusCode === "EXP" && (
                      <Box className={classes.statusbox} style={{ background: "#FF8E0D 0% 0% no-repeat padding-box", border: "1px solid #FF8E0D" }}>
                        Transporter Pending
                      </Box>
                    )}
                  {(location.state.statusData.statusCode === "TRANSCONF" ||
                    location.state.statusData.statusCode === "STARTED") && (
                      <Box className={classes.statusbox} style={{ background: "#63BB7A 0% 0% no-repeat padding-box", border: "1px solid #63BB7A" }}>
                        Transporter Confirmed
                      </Box>
                    )}

                  {location.state.statusData.statusCode === "FPAY" && (
                    <Box className={classes.statusbox} style={{ background: "#EA2428 0% 0% no-repeat padding-box", border: "1px solid #EA2428" }}>
                      Payment Failed
                    </Box>
                  )}
                  {location.state.statusData.statusCode === "PPAY" && (
                    <Box className={classes.statusbox} style={{ background: "#FF8E0D 0% 0% no-repeat padding-box", border: "1px solid #FF8E0D" }}>
                      Payment Unconfirmed
                    </Box>
                  )}
                  {(location.state.statusData.statusCode === "CNCL") && (
                    <Box className={classes.statusbox} style={{ background: "#EA2428 0% 0% no-repeat padding-box", border: "1px solid #EA2428" }}>
                      Cancelled
                    </Box>
                  )}
                  {(['MT_DEL', 'COMPL'].includes(location.state.statusData.statusCode)) && (
                    <Box className={classes.statusbox} style={{ background: "#63BB7A 0% 0% no-repeat padding-box", border: "1px solid #63BB7A" }}>
                      MT IN Delivered
                    </Box>
                  )}
                </Grid>
              </Grid>
              <Table>
                <TableBody>
                  <TableRow>
                    <StyledTableCell1>
                      Booked on
                    </StyledTableCell1>
                    <StyledTableCell1 style={{ fontFamily: 'Dubai Regular' }}>
                      {location.state.statusData.bookedOn}
                    </StyledTableCell1>
                    <StyledTableCell1>
                      Requestor name
                    </StyledTableCell1>
                    <StyledTableCell1 style={{ fontFamily: 'Dubai Regular' }}>
                      {location.state.statusData.requesterName}
                    </StyledTableCell1>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell1>
                      Containers Booked
                    </StyledTableCell1>
                    <StyledTableCell1 style={{ fontFamily: 'Dubai Regular' }}>
                      {location.state.statusData.noOfContainers}
                    </StyledTableCell1>
                    <StyledTableCell1>
                      Requestor contact
                    </StyledTableCell1>
                    <StyledTableCell1 style={{ fontFamily: 'Dubai Regular' }}>
                      {location.state.statusData.requesterContact}
                    </StyledTableCell1>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell1>
                      Trucks Requested
                    </StyledTableCell1>
                    <StyledTableCell1 style={{ fontFamily: 'Dubai Regular' }}>
                      {location.state.statusData.noOfTrucks}
                    </StyledTableCell1>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell1 style={{ paddingTop: '30px' }}>
                      Importer Comments
                    </StyledTableCell1>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell1 style={{ fontFamily: 'Dubai Regular' }}>
                      {location.state.statusData.importerComments}
                    </StyledTableCell1>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* <div style={{ width: "30%" }}>
              <Grid container>
                <Grid item>
                  <InputLabel></InputLabel>
                </Grid>
              </Grid>
            </div> */}
            <div style={{ width: "40%", marginRight: "21px" }}>
              <InputLabel
                style={{
                  marginTop: "15px",
                  width: "300px",
                  textAlign: "right",
                  marginLeft: "180px",
                  fontWeight: 600,
                }}
              >
                Payment Breakups
              </InputLabel>
              <Table className={classes.table}>
                <TableBody>
                  {paymentSummary?.paymentDetails.map(
                    (paymentInfo, ind) => (
                      <TableRow>
                        <StyledTableCell1 align="right" style={{ padding: 0 }}>
                          {paymentInfo.chargeDescription}
                        </StyledTableCell1>
                        <StyledTableCell1 align="right" style={{ fontFamily: 'Dubai Regular', padding: 0, width: '120px' }}>
                          {paymentInfo.totalAmount} AED
                        </StyledTableCell1>
                      </TableRow>
                    )
                  )}
                  <TableRow>
                    <StyledTableCell1 align="right" style={{ padding: 0, paddingTop: '8px' }}>
                      Gross Amount
                    </StyledTableCell1>
                    <StyledTableCell1 align="right" style={{ fontFamily: 'Dubai Regular', width: '120px', padding: 0, }}>
                      {paymentSummary?.grossAmount} AED
                    </StyledTableCell1>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell1 align="right" colSpan={2}>
                      <Link
                        style={{
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                        }}
                        onClick={openPaymentBreakupPopup}
                      >
                        View Detailed Breakups
                      </Link>
                    </StyledTableCell1>
                  </TableRow>
                  {/* {cancelledContainersList.length !== 0 && <TableRow>
                    <StyledTableCell1 align="right" colSpan={2}>
                      <Link
                        style={{
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                        }}
                        onClick={openCancelledContainerPopup}
                      >
                        View Cancelled Containers
                      </Link>
                    </StyledTableCell1>
                  </TableRow>} */}
                </TableBody>
              </Table>
              {openPopup && (
                <PaymentBreakupPopup
                  paymentDetails={paymentSummary}
                  onClose={closePaymentBreakupPopup}
                />
              )}

              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md">
                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-md-3">
                      <img src="./amount.svg" className={classes.boxOnTable} />
                    </div>
                    <div className="col-md-2" style={{ paddingRight: 0 }}>
                      <Card
                        variant="outlined"
                        style={{
                          height: "102px",
                          width: "236px",
                          border: "1px solid #D3D3D3",
                          borderRadius: 0,
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={1} alignItems="flex-start">
                            <Grid item xs={12} style={{ fontWeight: 600, fontFamily: 'Dubai Regular', textAlign: 'center', fontSize: '18px' }}>
                              {location.state.statusData.statusCode === "PPAY" || location.state.statusData.statusCode === "FPAY" ? 'Amount' : 'Amount Paid'}
                            </Grid>
                            <Grid item xs={12} style={{ color: '#0568AE', fontWeight: 600, fontFamily: 'Dubai Regular', textAlign: 'center', fontSize: '22px' }}>
                              {paymentSummary?.grossAmount} AED
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
          {["TRANSCONF", "STARTED"].includes(location.state.statusData.statusCode) && (
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell1 style={{ paddingLeft: "13px", width: '65px', }}>
                    <img src="./containers_in_yard.svg" />
                  </StyledTableCell1>
                  <StyledTableCell1>
                    <Grid item xs={12}>
                      Containers in Yard
                    </Grid>
                    <Grid item xs={12}>
                      {(location.state.statusData.containersInYard + "").padStart(2, "0")}
                    </Grid>
                  </StyledTableCell1>
                  <StyledTableCell1 style={{ width: '75px' }}>
                    <img src="./containers_to_town.svg" />
                  </StyledTableCell1>
                  <StyledTableCell1>
                    <Grid item xs={12}>
                      Containers to Town
                    </Grid>
                    <Grid item xs={12}>
                      {(location.state.statusData.containersToTown + "").padStart(2, "0")}
                    </Grid>
                  </StyledTableCell1>
                  <StyledTableCell1 style={{ width: '100px' }}>
                    <img src="./containers_delivered.svg" />
                  </StyledTableCell1>
                  <StyledTableCell1>
                    <Grid item xs={12}>
                      Containers Delivered
                    </Grid>
                    <Grid item xs={12}>
                      {(location.state.statusData.containersDelivered + "").padStart(2, "0")}
                    </Grid>
                  </StyledTableCell1>
                  <StyledTableCell1 style={{ width: '105px' }}>
                    <img src="./containers_completed.svg" />
                  </StyledTableCell1>
                  <StyledTableCell1>
                    <Grid item xs={12}>
                      Containers Completed
                    </Grid>
                    <Grid item xs={12}>
                      {(location.state.statusData.containersCompleted + "").padStart(2, "0")}
                    </Grid>
                  </StyledTableCell1>
                </TableRow>
              </TableHead>
            </Table>
          )}
        </Card>
      </Grid>
      {!["SUCC", "EXP", "FPAY", "PPAY", "CNCL", "MT_DEL"].includes(location.state.statusData.statusCode) && (
        <div style={{ paddingTop: '50px' }}>
          <CustomTabs
            labelList={tabLabels}
            onSelected={(e) => {
              if (e === 0) {
                paymentSummary.containerList = allContainerList.filter(
                  (container) =>
                    ["PEND", "PENTRUCK", "PODUPL", "INPRO", "PTOK", "PODREJ", "EXP", "CNCL", "PODIMPAPPR", "CONF", "TRUCK_ASGN"].includes(container.refStatus.code)
                );
                setPaymentSummary(paymentSummary);
                setTabSelected("In Progress");
                // setPstate(pstate + 1);
              }
              if (e === 1) {
                paymentSummary.containerList = allContainerList.filter(
                  (container) => ["FCL_DEL", "PMTTOK", "MTTOKASGN", "MTTRK_ASGN"].includes(container.refStatus.code)
                );
                // console.log(list.containerList);
                setPaymentSummary(paymentSummary);
                setTabSelected("Delivered");
                // setPstate(pstate + 1);
              }
              if (e === 2) {
                paymentSummary.containerList = allContainerList.filter(
                  (container) => ["MT_DEL", "COMPL"].includes(container.refStatus.code)
                );
                setPaymentSummary(paymentSummary);
                setTabSelected("Completed");
                // setPstate(pstate + 1);
              }
            }}
          ></CustomTabs>
        </div>
      )}
      {paymentSummary?.containerList.length > 0 ? (<>
        <Grid item xs={12} className={classes.text} style={{ marginTop: "22px", fontSize: "15px" }}>
          {`Displaying ${(paymentSummary?.containerList.length + "").padStart(2, "0")} containers`}
        </Grid>
        <div style={{ marginTop: "15px" }}>
          <Table>
            <TableHead style={{ backgroundColor: '#696F83', color: '#FFFFFF', paddingBottom: 0 }}>
              <TableRow>
                <StyledTableCell style={{ borderTopLeftRadius: '10px', paddingLeft: '16px' }}>
                  Container Number
                </StyledTableCell>
                <StyledTableCell>
                  Container Type
                </StyledTableCell>
                <StyledTableCell>
                  {(tabSelected === "In Progress" || tabSelected === "Delivered") ? 'Pickup' : 'Delivered On'}
                </StyledTableCell>
                <StyledTableCell>
                  {tabSelected === "In Progress" ? 'Drop Date & Time' : tabSelected === "Delivered" ? 'Delivered On' : 'Completed On'}
                </StyledTableCell>
                <StyledTableCell style={["PPAY", "FPAY"].includes(location.state.statusData.statusCode) ? { borderTopRightRadius: '10px' } : {}}>
                  Drop Details
                </StyledTableCell>
                {["TRANSCONF", "STARTED", "MT_DEL"].includes(location.state.statusData.statusCode) && <>
                  <StyledTableCell>
                    POD
                  </StyledTableCell>
                  <StyledTableCell style={showColumn.cncl || showColumn.delete ? {} : { borderTopRightRadius: '10px' }}>
                    Track
                  </StyledTableCell> </>}
                {(showColumn.cncl || showColumn.delete) && (
                  <StyledTableCell style={{ borderTopRightRadius: '10px' }}>&nbsp;</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentSummary?.containerList.map((containers, inx) => (
                <ContainerTableRow key={containers.container_number} style={containers.isActive == 0 ? { backgroundColor: '#E4E4E4CC' } : {}}>
                  <StyledTableCell style={{ paddingLeft: '16px' }}>
                    <div style={{
                      display: 'inline-flex',
                      boxSizing: 'inherit',
                      textAlign: 'center',
                      alignItems: 'center',
                      gap: '13px',
                      display: 'flex',
                      minWidth: '120px'
                    }}>
                      <Avatar style={{ height: '25px', width: '25px', padding: '14px', marginRight: '8px', fontFamily: 'Dubai Light', backgroundColor: containers.isActive == 0 ? '#949494' : utils.randmonColorConsignee(), fontSize: '14px' }} > {containers.initials}</Avatar>
                      <Link
                        style={{ color: "#0568AE", fontWeight: "bold", textDecoration: "underline" }}
                        onClick={() => {
                          openContainerPopup();
                          setSelectedContainers(containers);
                          console.log("inputLabel clicked ::");
                        }}
                      >
                        {containers.container_number} {"-" + containers.iso_code}
                      </Link>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    {containers.containerType}
                  </StyledTableCell>
                  <StyledTableCell>
                    {!(tabSelected === "In Progress" || tabSelected === "Delivered") && <img src="./calendar.svg" style={{ marginRight: "8px" }} />}
                    {((tabSelected === "In Progress" || tabSelected === "Delivered") ? containers.pickupLocation : containers.fclDeliveredOn) ?? '--'}
                  </StyledTableCell>
                  <StyledTableCell>
                    <img src={containers.isActive == 0 ? "./calendar-grey.svg" : "./calendar.svg"} style={{ marginRight: "8px" }} />
                    {(tabSelected === "In Progress" ? containers.date_time : tabSelected === "Delivered" ? containers.fclDeliveredOn : containers.mtDeliveredOn) ?? '--'}
                  </StyledTableCell>
                  <StyledTableCell>
                    <img src={containers.isActive == 0 ? "./location-grey.svg" : "./location.svg"} />
                    <Link
                      style={{
                        textDecoration: "underline",
                        marginLeft: "8px",
                        color: '#0568AE'
                      }}
                      onClick={() => {
                        openContainerPopup();
                        setSelectedContainers(containers);
                      }}
                    >
                      {containers.dropZoneLabel}
                    </Link>
                  </StyledTableCell>
                  {/* ["TRANSCONF", "STARTED"].includes(location.state.statusData.statusCode) */}
                  {["TRANSCONF", "STARTED", "MT_DEL"].includes(location.state.statusData.statusCode) && <StyledTableCell>
                    <BlueTooltip title={renderTitle(containers.refStatus.code)} placement="top-end" arrow>
                      {["PODUPL", "PODIMPAPPR", "FCL_DEL", "MTTRK_ASGN", "PMTTOK", "MTTOKASGN", "MT_DEL"].includes(containers.refStatus.code) ?
                        <IconButton onClick={(e) => {
                          setSelectedContainers(containers);
                          onFileDownload(
                            location.state.statusData.bookingNumber,
                            containers,
                            containers.refStatus.code === "PODUPL" ? true : false
                          );
                        }}>
                          {containers.refStatus.code === "PODUPL" ? <img src="./pod_pending.svg" /> : <img src="./pod_approved.svg" />}
                        </IconButton> : <Grid item>--</Grid>}
                    </BlueTooltip>
                  </StyledTableCell>}
                  {["TRANSCONF", "STARTED", "MT_DEL"].includes(location.state.statusData.statusCode) && <StyledTableCell>
                    <BlueTooltip placement="top-end" arrow
                      title={["MTTOKASGN", "MTTRK_ASGN", "INPRO", "FCL_DEL", "MT_DEL", "PODUPL", "PODREJ", "PODIMPAPPR"].includes(containers.refStatus.code) ? "" : "In Yard"}>
                      <IconButton onClick={(e) => {
                            setSelectedContainers(containers);
                            showTrack(true)
                            setTrackDetails({ ...trackDetails, "containerNo": containers?.container_number, "tracks": containers?.containerTrackList ?? [] })
                          }}>
                        {["MTTOKASGN", "MTTRK_ASGN", "INPRO", "FCL_DEL", "MT_DEL", "PODUPL", "PODREJ", "PODIMPAPPR"].includes(containers.refStatus.code) ?
                          <img src="./truck_track.svg" height="22px" /> :
                          <img src={containers.isActive == 0 ? "./in_yard_grey.svg" : "./in_yard.svg"} height="22px" />}
                      </IconButton>
                    </BlueTooltip>
                    {track && <Track tab={"Pending"} trackDetails={trackDetails} onClose={() => showTrack(false)} />}
                  </StyledTableCell>}
                  {containers.isActive == 0 && (
                    <StyledTableCell style={{ color: "#EA2428" }}>
                      Cancelled
                    </StyledTableCell>)}
                  {containers.isActive == 1 && ["SUCC","FPAY", "EXP"].includes(location.state.statusData.statusCode) && (
                    <StyledTableCell>
                      <IconButton onClick={() => {
                        setSelectedContainers(containers);
                        openDeleteContainerPopup();
                      }}>
                        <img src="./delete.svg" />
                      </IconButton>
                    </StyledTableCell>
                  )}
                </ContainerTableRow>
              ))}
            </TableBody>
          </Table>
          {containerPopup && (
            <ContainerPopup
              enableButton={location.state.statusData.statusCode !== "MT_DEL" ? true : false}
              containers={selectedContainers}
              onClose={closeContainerPopup}
            />
          )}
          {openDeletePopup && (
            <DeleteContainerPopup
              onConfirm={(e) => deleteContainer(e, selectedContainers)}
              onClose={closeDeleteContainerPopup}
              containers={selectedContainers}
              refresh={() => { }}
            />
          )}
          {selectedContainer && fileList && showPopup === OTHER_POPUP && (
            <DownloadDocumentPopUp
              isopen={showPopup === OTHER_POPUP}
              fileList={fileList}
              container={selectedContainer}
              onClose={(e) => {
                setShowPopup(NO_DIALOG);
              }}
              onApprove={(e) => {
                console.log("in callback approve ::", e);
                approvePod()
              }}
              onReject={(e) => {
                console.log("in callback reject ::", e);
                rejectPod()
              }}
              canApprove={canApprove}
            />
          )}
          {podApprovedPopup &&
            <PodApprovedPopup container={selectedContainers} onClose={onClose} refresh={refresh} />
          }
          {showToaster === 'ERROR' &&
            <ErrorToast
              icon={<img src='./check-success-red.svg' height="32px" />}
              title="POD rejected!"
              message="* Item sent back to transporter to reupload"
              showToast={() => { setShowToaster('NOTOASTER') }}
              position="top-right"
            />}
        </div>
      </>
      ) : (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
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
