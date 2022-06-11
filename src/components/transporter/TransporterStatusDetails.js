import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core/";
import {
  makeStyles,
  Table,
  TableCell,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Grid,
  Button,
  Breadcrumbs
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
// import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import { InputLabel } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import RequestContainerService from "../../service/RequestContainerService";
import ContainerPopup from "../request/ContainerPopup";
import TruckDetailsPopup from "./TruckDetailsPopup";
import { useLocation } from "react-router-dom";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import UploadDocumentPopup from "./UploadDocumentPopup";
import DownloadDocumentPopUp from "../admin/DownloadDocumentPopup";
import { useHistory } from "react-router-dom";
import RequestDetailsPopUp from "../request/RequestDetailsPopUp";
import TrucknTokenDetailsPopup from "./TrucknTokenDetailsPopup";
import BookingService from "../../service/BookingService";
import Track from "../stepper/Track";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { NO_DIALOG, CONFIRM_DIALOG } from "../../lib/common/Constants";
import JobConfirmationPopUp from "./JobConfirmationPopUp";

const useStyles = makeStyles((theme) => ({
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontWeight: 600,
    fontSize: '17px'
  },
}));

function TransporterStatusDetails(props) {
  const classes = useStyles();
  const location = useLocation();
  const [bookingList, setBookingList] = useState("");
  const [containerPopup, setContainerPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [requestTokenOpen, setRequestTokenOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [truckDetailsPopup, setTruckDetailsPopup] = useState(false);
  const [trucknTokenDetailsPopup, setTrucknTokenDetailsPopup] = useState(false);
  const [startJobpopup, setstartJobPopup] = useState(false);
  const [requestPopup, setRequestPopup] = useState(false);
  const [jobStartedResponse, setJobStartedResponse] = useState("");
  const [tabLabels, setTabLabels] = useState([
    "In progress",
    "Delivered",
    "Completed",
  ]);
  const [uploadDocumentPopup, setUploadDocumentPopup] = useState(false);
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [popUpParams, setPopUpParams] = useState("");
  let history = useHistory();
  const [tabSelected, setTabSelected] = useState("In progress");
  const [containerList, setContainerList] = useState("");
  const [pstate, setPstate] = useState(0);
  const [tokenType, setTokenType] = useState("");
  const [track, showTrack] = useState(false);
  const [trackDetails, setTrackDetails] = useState();
  const [showConfirmation, setShowConfirmation] = useState("");

  let url1 = "";
  var list = "";
  var booking = "";

  if (location.state !== undefined) {
    url1 = location.state.url;
    list = location.state.paymentSummary;
    booking = location.state.statusData;
  }
  if (props?.requestDetailsData) {
    booking = props.requestDetailsData;
  }

  const handleClose = (tab) => {
    setShowConfirmation(NO_DIALOG);
    history.push("/newJobs", { tabSelected: tab })
  };

  useEffect(() => {
    var responseBooking = "";
    var responseContainerList = "";
    BookingService.getBookingByNumber(booking.referenceNumber, false).then((response) => {
      responseBooking = response.data.dataItems[0]
      setBookingList(responseBooking);
      if (tabSelected === "In Progress") {
        responseContainerList = responseBooking.containerList.filter((container) =>
          container.refStatus.code === "INPRO" || container.refStatus.code === "PODIMPAPPR" || container.refStatus.code === "PODUPL"
          || container.refStatus.code === "PODREJ"
        );
      } else if (tabSelected === "Delivered") {
        responseContainerList = responseBooking.containerList.filter((container) =>
          container.refStatus.code === "FCL_DEL" || container.refStatus.code === "PMTTOK" || container.refStatus.code === "MTTRK_ASGN"
          || container.refStatus.code === "MTTOKASGN"
        );
      } else if (tabSelected === "Completed") {
        responseContainerList = responseBooking.containerList.filter((container) =>
          container.refStatus.code === "MT_DEL"
        );
      } else {
        setTabSelected("In Progress");
        responseContainerList = responseBooking.containerList.filter((container) =>
          container.refStatus.code === "INPRO" || container.refStatus.code === "PODIMPAPPR" || container.refStatus.code === "PODUPL"
          || container.refStatus.code === "PODREJ"
        );
      }

      setContainerList(responseContainerList);
    })
      .catch(() => {
        console.log("error");
      });

  }, [pstate]);

  const onEtokenDownload = (jobRefNo, containerNumber, tokenType) => {
    RequestContainerService.fetchEtoken(jobRefNo, containerNumber, tokenType)
      .then((response) => {
        if (response.isAxiosError) throw new Error(response.status);
        else {

          const linkSource = `data:${response.data.dataItems[0].filetype};base64,${response.data.dataItems[0].fileContent}`;
          const downloadLink = document.createElement("a");

          downloadLink.href = linkSource;
          downloadLink.download = response.data.dataItems[0].fileName;
          downloadLink.target = "_blank";
          // alert(downloadLink);
          downloadLink.click();
        }
      })

      .catch(() => {
        console.log("error");
      });
  }

  const openContainerPopup = () => {
    setContainerPopup(true);
  };



  const closeContainerPopup = () => {
    setContainerPopup(false);
  };

  const openTrucknTokenDetailsPopup = () => {
    setTrucknTokenDetailsPopup(true);
  };

  const closeTrucknTokenDetailsPopup = () => {
    setTrucknTokenDetailsPopup(false);
  };

  const openTruckDetailsPopup = () => {
    setTruckDetailsPopup(true);
  };

  const closeTruckDetailsPopup = (action) => {
    setTruckDetailsPopup(false);
    if(action==="assign")
    setShowConfirmation("MT_IN_CONFIRMED");

  };

  const openUploadPopup = () => {
    setUploadDocumentPopup(true);
  }

  const closeUploadPopup = () => {
    setUploadDocumentPopup(false);
    setPstate(pstate + 1);
  }

  const handleCloseForToken = () => {
    setRequestTokenOpen(false);
    setShowConfirmation("FCL_OUT_CONFIRMED");

  }

  return (
    <>
      {!props?.isMiscellaneous && <Grid item xs={12} style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Breadcrumbs aria-label="breadcrumb" classes={{
          root: classes.breadCrumRoot,
          separator: classes.separator,
        }}>
          <Link onClick={() => history.push("/transporterDashboard")} style={{ color: '#848484' }}>
            Home
          </Link>
          <Link onClick={() => history.push("/transporterStatus")} style={{ color: '#848484' }}>
            Status
          </Link>
          <span style={{ color: '#0E1B3D' }}>
            {bookingList.referenceNumber}
          </span>
        </Breadcrumbs>
      </Grid>}
      <CustomTabs labelList={tabLabels}
        onSelected={(e) => {
          if (e === 0) {
            setTabSelected("In Progress");
            // setContainerList(containerInProgress);
            setPstate(pstate + 1);
          }
          if (e === 1) {
            setTabSelected("Delivered");
            // setContainerList(containerDelivered);
            setPstate(pstate + 1);
          }
          if (e === 2) {
            setTabSelected("Completed");
            // setContainerList(containerCompleted);
            setPstate(pstate + 1);
          }
        }}></CustomTabs>
      {containerList.length > 0 ? (
        //  location.state.statusData.map((booking, inx) => (
        <Card
          style={{
            width: "1218px",

            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: "4px 4px 7px #0000002B",
            border: "1px solid #DCDCDC",
            borderRadius: "5px",
            opacity: 1,
            marginTop: "40px",
          }}
        >
          <Table>
            <TableRow>
              <TableCell style={{ color: "#757575" }}>
                <InputLabel >
                  Booking #
                </InputLabel>
                <Link
                  style={{ textDecoration: "underline" }}
                  onClick={() => {
                    setSelectedBooking(booking);
                    setRequestPopup(true);
                  }}
                >{bookingList.referenceNumber}</Link>
              </TableCell>
              <TableCell >

                <InputLabel style={{ color: "#757575" }}>
                  Containers
                </InputLabel>
                <InputLabel>{bookingList.noOfContainers}</InputLabel>
              </TableCell>
              <TableCell>
                <InputLabel style={{ color: "#757575" }}>Trucks</InputLabel>
                <InputLabel>{bookingList.truckNumber}</InputLabel>

              </TableCell>
              <TableCell>
                <InputLabel style={{ color: "#757575" }}>
                  Booked on
                </InputLabel>
                <InputLabel>{bookingList.creationDate}</InputLabel>

              </TableCell>
              <TableCell>
                <InputLabel style={{ color: "#757575" }}>Amount</InputLabel>
                <InputLabel>{booking.transporterAmount} AED</InputLabel>
              </TableCell>
              <TableCell colSpan={3}>
                <InputLabel style={{ color: "#757575" }}>
                  Requestor Company
                </InputLabel>
                <InputLabel>{bookingList.requesterCompany}</InputLabel>
              </TableCell>
              {!props?.isMiscellaneous && <TableCell colSpan={3} >
                <Link
                  style={{ textDecoration: "underline", float: 'right' }}
                  onClick={() => {
                    history.push('/invoiceUpload', {
                      referenceNumber: booking.referenceNumber, status: booking.status,
                      tabSelected: 'Miscellaneous', fromPage: 'Status', pageUrl: 'transporterStatus', statusData: location?.state?.statusData, paymentSummary: location?.state?.paymentSummary
                    })
                  }}
                >
                  Miscellaneous Invoices
                </Link>
              </TableCell>}
            </TableRow>
            <TableRow>
              <TableCell>
                <InputLabel style={{ color: "#848484" }}>
                  Container Number
                </InputLabel>
              </TableCell>
              {tabSelected === "In Progress" && <TableCell style={{ width: '5px' }}>
                <InputLabel style={{ color: "#848484" }}>Pickup</InputLabel>
              </TableCell>}
              {tabSelected === "Delivered" && <TableCell>
                <InputLabel style={{ color: "#848484" }}>Delivered on</InputLabel>
              </TableCell>}
              {tabSelected === "Completed" && <TableCell>
                <InputLabel style={{ color: "#848484" }}>Completed on</InputLabel>
              </TableCell>}
              {tabSelected === "In Progress" && <TableCell>
                <InputLabel style={{ color: "#848484" }}>
                  Drop Date & Time
                </InputLabel>
              </TableCell>}
              <TableCell>
                <InputLabel style={{ color: "#848484" }}>
                  Drop Details
                </InputLabel>
              </TableCell>
              <TableCell>
                <InputLabel style={{ color: "#848484" }}>FCL Out</InputLabel>
              </TableCell>
              {tabSelected === "In Progress" && <TableCell>
                <InputLabel style={{ color: "#848484" }}>
                  DO Expiry
                </InputLabel>
              </TableCell>}
              {tabSelected === "In Progress" && <TableCell>
                <InputLabel style={{ color: "#848484" }}>
                  Token
                </InputLabel>
              </TableCell>}
              {tabSelected !== "In Progress" && <TableCell>
                <InputLabel style={{ color: "#848484" }}>
                  POD
                </InputLabel>
              </TableCell>}
              {tabSelected !== "In Progress" && <TableCell colSpan={2}>
                <InputLabel style={{ color: "#848484" }}>
                  MT IN
                </InputLabel>
              </TableCell>}
              {tabSelected === "Delivered" && <TableCell>
                <InputLabel style={{ color: "#848484" }}>
                  Token
                </InputLabel>
              </TableCell>}
              {/* {container.refStatus.code === "CONF" && ( <TableCell>Token</TableCell>)} */}
              {tabSelected === "In Progress" && <TableCell colSpan={2}></TableCell>}
              {<TableCell colSpan={2}>
                <InputLabel style={{ color: "#848484" }}>
                  Track
                </InputLabel>
              </TableCell>}
            </TableRow>
            {containerList.map((container, inx) => (
              <TableRow>
                <TableCell>
                  <Link
                    style={{ textDecoration: "underline" }}
                    onClick={() => {
                      setSelectedContainer(container);
                      openContainerPopup();
                    }}
                  >
                    {container.container_number}  {"-" + container.iso_code}
                  </Link>

                </TableCell>
                {tabSelected === "In Progress" && <TableCell>
                  <InputLabel>{container.pickupLocation}</InputLabel>
                </TableCell>}
                <TableCell>
                  {tabSelected === "In Progress" &&
                    <InputLabel>{container.date_time}</InputLabel>}
                  {tabSelected === "Delivered" &&
                    <InputLabel>{container.fclDeliveredOn}</InputLabel>}
                  {tabSelected === "Completed" &&
                    <InputLabel>{container.mtDeliveredOn}</InputLabel>}
                </TableCell>
                <TableCell>
                  <Link
                    style={{ textDecoration: "underline" }}
                    onClick={() => {
                      setSelectedContainer(container);
                      openContainerPopup();
                    }}
                  >
                    {container.dropZoneLabel}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link style={{ textDecoration: "underline" }} onClick={() => {
                    setSelectedContainer(container);
                    setTokenType("FCL_OUT");
                    openTrucknTokenDetailsPopup();
                  }}>
                    {container.assignedTruck}
                  </Link>
                </TableCell>
                {tabSelected === "In Progress" && <TableCell>
                  <InputLabel>{container.orderValidity}</InputLabel>
                </TableCell>}
                {tabSelected === "In Progress" && <TableCell>
                  <IconButton onClick={() => onEtokenDownload(booking.referenceNumber,
                    container.container_number, "FCL_OUT")}>
                    <img src="./doc_download.svg" alt="Not available" />
                  </IconButton>
                </TableCell>}


                {tabSelected === "In Progress" && (<TableCell colSpan={2}>
                  {!props.isMiscellaneous && (container.refStatus.code === "INPRO" || container.refStatus.code === "PODREJ") && (
                    <Link style={{ textDecoration: 'underline' }} onClick={() => {
                      setPopUpParams({
                        uploadType: "POD",
                        referenceNumber: container.container_number,
                        dpwTransactionId: container.dpwTransactionId,
                        requestNumber: bookingList.referenceNumber,
                        status: container.refStatus.code,
                        createdBy: bookingList.createdBy,
                        rejectedBy: container.rejectedBy,
                        comments: {
                          adminComment: container.adminPodComments,
                          importerComment: container.importerPodComments
                        }

                      });
                      console.log(popUpParams);
                      openUploadPopup();
                    }
                    }>{container.refStatus.code === "INPRO" ? "Delivered?" : container.refStatus.refStatusLocales.name}</Link>)}
                  {!props.isMiscellaneous &&
                    (container.refStatus.code === "PODUPL" || container.refStatus.code === "PODIMPAPPR")
                    && (
                      <Link style={{ textDecoration: 'underline' }} onClick={() => {
                        setDownloadPopup(true);
                        setSelectedContainer(container);
                      }}>
                        {container.refStatus.refStatusLocales.name}</Link>
                    )}</TableCell>)}
                {tabSelected !== "In Progress" && (<TableCell>
                  <img src="./pod_approved.svg" onClick={(e) => {
                    setDownloadPopup(true);
                    setSelectedContainer(container);
                  }} />
                </TableCell>)}
                {tabSelected !== "In Progress" && (<TableCell colSpan={2}>
                  {(container.refStatus.code === "PMTTOK" || container.refStatus.code === "MTTRK_ASGN") && (
                    <Link style={{ textDecoration: "underline" }} onClick={() => {
                      setSelectedContainer(container);
                      openTruckDetailsPopup();
                    }}>
                      {container.mtTruck}
                    </Link>
                  )}

                  {container.refStatus.code === "FCL_DEL" && (
                    <Link style={{ textDecoration: "underline" }} onClick={() => {
                      setSelectedContainer(container);

                      openTruckDetailsPopup();
                    }}>Assign
                    </Link>
                  )}

                  {(container.refStatus.code === "MTTOKASGN" || container.refStatus.code === "MT_DEL") && (
                    <Link style={{ textDecoration: "underline" }} onClick={() => {
                      setSelectedContainer(container);
                      setTokenType("MT_IN");
                      openTrucknTokenDetailsPopup();
                      //openTruckDetailsPopup();
                    }}>
                      {container.mtTruck}
                    </Link>
                  )}
                </TableCell>)}
                {tabSelected === "Delivered" && <TableCell>
                  {(container.refStatus.code === "MTTRK_ASGN") && <Link style={{ textDecoration: "underline" }} onClick={() => {
                    setSelectedContainer(container);
                    setSelectedBooking(booking)
                    setRequestTokenOpen(true);

                  }}>
                    Request Token
                  </Link>}
                  {(container.refStatus.code === "PMTTOK") &&
                    <Box
                      style={{
                        width: "140px",
                        height: "31px",
                        background: "#FFC746 0% 0% no-repeat padding-box",
                        borderRadius: "4px",
                        opacity: 1,
                        paddingLeft: "10px",
                        paddingTop: "5px"
                      }}
                    >
                      Pending for token
                    </Box>
                  }
                  {(container.refStatus.code === "MTTOKASGN" || container.refStatus.code === "MT_DEL") &&
                    <IconButton onClick={() => onEtokenDownload(booking.referenceNumber,
                      container.container_number, "MT_IN")}>
                      <img src="./doc_download.svg" alt="Not available" />
                    </IconButton>}
                </TableCell>}
                {(<TableCell>
                  <IconButton>
                    <img src="./truck_track.svg" alt="Not available" onClick={(e) => {
                      showTrack(true)
                      // setTrackDetails({ ...trackDetails, "containerNo": container?.container_number, "tracks": container?.containerTrackList ?? [] })
                      setTrackDetails({ ...trackDetails, "containerNo": container?.container_number})
                    }} />
                  </IconButton>
                  {track && <Track tab={"Pending"} trackDetails={trackDetails} onClose={() => showTrack(false)} />}
                </TableCell>
                )}
              </TableRow>
            ))}
          </Table>
          <Dialog
            fullWidth={true}
            open={requestTokenOpen}
            onClose={handleCloseForToken}
          >
            <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#0E1B3D' }}>
              Send for Token?
            </DialogTitle>
            <DialogContent>
              Would you like to request a token for {selectedContainer.mtTruck} for {selectedContainer.container_number}?
              {/* <Table><TableBody>
                            <TableRow>
                    <TableCell>
                      <InputLabel>Enter preferred Date </InputLabel>
                    </TableCell>
                    <TableCell>
                      <ApplnDatePicker
                        name={"preferredDate"}
                        id={"preferredDate"}
                        iconColor="#0E1B3D"
                        minDate={todayDate}
                        onChange={(e) => {
                          formvalues.preferredDate = e;
                          setDisable(false);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table> */}
            </DialogContent>
            <DialogActions style={{ alignSelf: "center" }}>
              <Button
                onClick={() => {
                  // var value={
                  //   requestDetailsNumber :selectedBooking.referenceNumber,
                  //   container_number : selectedContainer.container_number
                  // }
                  selectedContainer.requestTime = "NOW"
                  RequestContainerService.requestForToken(selectedContainer)
                    .then((response) => {
                      console.log("response from request token", response);
                      handleCloseForToken();


                    }).catch(() => {
                      console.log("error");
                    });
                }}
                style={{
                  background: "#4CAB5B",
                  color: "#fff",
                  textTransform: "none",
                }}
              >
                Yes
              </Button>
              <Button
                onClick={handleCloseForToken}
                style={{
                  background: "#dc4e4e",
                  color: "#fff",
                  textTransform: "none",

                }}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          {containerPopup && (
            <ContainerPopup
              containers={selectedContainer}
              onClose={closeContainerPopup}
            />
          )}

          {requestPopup && (
            <RequestDetailsPopUp
              request={selectedBooking}
              onClose={() => setRequestPopup(false)}
            />
          )}

          {truckDetailsPopup && (
            <TruckDetailsPopup
              containers={selectedContainer}
              onClose={(e)=>{let action=e;closeTruckDetailsPopup(action)}}
              bookingNumber={booking.referenceNumber}
              booking={booking}
              tabSelected={tabSelected}
            />
          )}
          {trucknTokenDetailsPopup && (
            <TrucknTokenDetailsPopup
              containers={selectedContainer}
              onClose={closeTrucknTokenDetailsPopup}
              bookingNumber={booking.referenceNumber}
              tabSelected={props.tabSelected}
              tokenType={tokenType}
            />
          )}
          {uploadDocumentPopup && <UploadDocumentPopup onClose={closeUploadPopup} popUpParams={popUpParams}
            onSuccess={(e) => {
              setUploadDocumentPopup(false)
              setPstate(pstate + 1);
            }}
          />}
          {downloadPopup && <DownloadDocumentPopUp
            canApprove={false}
            isopen={downloadPopup}
            fileList={selectedContainer.proofOfDelivery}
            container={selectedContainer}
            onClose={() => {
              setDownloadPopup(false);
            }}

          />}
          {showConfirmation === "FCL_OUT_CONFIRMED" &&
            <JobConfirmationPopUp open={true} onClose={() => { setShowConfirmation(NO_DIALOG); setPstate(pstate + 1); }} >
              <img src="./success.svg" />
              <p style={{ color: "#609E2E", fontSize: "25px" }}>Confirmed</p>
              <div style={{ color: "black", fontWeight: "bold" }}>
                <div > Token Request has been successfully sent to DT Admin</div>
                <div> You will be notified once it gets approved</div>
                <br />
              </div>
              <p style={{ color: "grey" }}>View the jobs in
                <Link color="secondary" onClick={() => handleClose(1)}>
                  Pending Jobs
                </Link> </p>
              <p style={{ color: "grey" }}>Check the token status in
                <Link color="secondary" onClick={() => handleClose(2)}>
                  Active Jobs
                </Link>
                page   </p>
            </JobConfirmationPopUp>}

            {showConfirmation === "MT_IN_CONFIRMED" &&
            <JobConfirmationPopUp open={true} onClose={() => { setShowConfirmation(NO_DIALOG); setPstate(pstate + 1); }} >
              <img src="./success.svg" />
              <p style={{ color: "#609E2E", fontSize: "25px" }}>Confirmed</p>
              <div style={{ color: "black", fontWeight: "bold" }}>
                <div > Token Request has been successfully sent to DT Admin</div>
                <div> You will be notified once it gets approved</div>
                <br />
              </div>
           
            </JobConfirmationPopUp>}
        </Card>
        //))
      ) : (
        <Paper
          elevation={5}
          style={{
            borderRadius: 8,
            padding: "30px",
            marginTop: 20,
            minWidth: "760px",
            minHeight: "100px",
            color: "#FF7171",
          }}
        >
          <Grid container direction="row" spacing={5}>
            <Grid item sm={12} xs={12}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <b>{"No records found"}</b>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}

export default React.memo(TransporterStatusDetails);
