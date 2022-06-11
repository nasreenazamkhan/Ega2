import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core/";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Grid,
  TextField,
  Button,
  withStyles
} from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { NO_DIALOG, ALERT_DIALOG, OTHER_POPUP } from "../../lib/common/Constants";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RequestContainerService from "../../service/RequestContainerService";
import RequestBoeService from "../../service/RequestBoeService";
import Link from "@material-ui/core/Link";
import { CONFIRM_DIALOG } from './../../lib_old/common/Constants';
import ContainerPopup from "../request/ContainerPopup";
import RequestDetailsPopUp from "../request/RequestDetailsPopUp";
import DownloadDocumentPopUp from './DownloadDocumentPopup';
import TruckReadOnlyPopUp from '../masters/TruckReadOnlyPopUp'
import SuccessToast from "../../lib/components/toast/SuccessToast";
import ErrorToast from "../../lib/components/toast/ErrorToast";
import './../../lib/components/dialog/dialog.css';
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  clickableIcon: {
    color: "grey",
    "&:hover": {
      color: "red",
    },
  },
  cancelButton: {
    border: "1px solid #0E1B3D",
    color: "#0E1B3D",
    width: '100px',
    height: '35px',
    paddingRight: '15px',
    fontSize: '14px',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    borderRadius: '3px'
  },
  confirmButton: {
    backgroundColor: "#1360D2",
    color: "#fff",
    width: '100px',
    height: '35px',
    fontSize: '14px',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    borderRadius: '3px'
  },
  root:{
    fontWeight:600,
    fontSize:'14px',
    fontFamily:'Dubai Light',
  }
}));

const LabelHeader = withStyles((theme) => ({
  root: {
    fontSize: "16px",
    color: "#757575",
    fontFamily: "Dubai Regular",
    fontWeight: 600,
    marginTop: "1px",
  },
}))(InputLabel);

const LabelData = withStyles((theme) => ({
  root: {
    fontWeight: "bold",
    fontSize: "15px",
    color: "#000000",
    fontFamily: "Dubai Light",
    marginTop: "2px",
  },
}))(InputLabel);

const LabelDataContainers = withStyles((theme) => ({
  root: {
    fontSize: '15px',
    color: '#000000',
    fontFamily: "Dubai Light",
    fontWeight: 600,
    marginTop: '2px'
  },
})
)(InputLabel);

function VerifyPodCard(props) {
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = useState(true);
  const [job, setJob] = useState();
  const [render, setRender] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState();
  const classes = useStyles();
  const [requestPopup, setRequestPopup] = useState(false);
  const [containerPopup, setContainerPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [truckDetailsPopup, setTruckDetailsPopup] = useState(false);
  const [reRender, setReRender] = useState(0);
  const [showToaster, setShowToaster] = useState(null);
  const [lengthMsg, setMaxLengthMsg] = useState('');

  const approvePod = (container) => {
    RequestContainerService.approvePod(
      container
    )
      .then((response) => {
        setShowPopup(NO_DIALOG);
        setSelectedContainer();
        setShowToaster('SUCCESS');
        setReRender(reRender + 1);
      })
      .catch(() => {
        console.log("error");
      });
  }

  const rejectPod = (container) => {
    RequestContainerService.rejectPod(
      container
    )
      .then((response) => {
        console.log(
          "response after rejection",
          response
        );
        setShowPopup(NO_DIALOG);
        setSelectedContainer();
        setShowToaster('ERROR');
        setReRender(reRender + 1);
      })
      .catch(() => {
        console.log("error");
      });

  }

  const handleClose = () => {
    setShowPopup(NO_DIALOG);
  }

  const openRecord = (job) => {
    job.open = !job.open;
    setRender(render + 1);
  }

  useEffect(() => {
    if (props.podCount > 0) {
      RequestBoeService.fetchRequestDetailsWithDocuments(props.job.referenceNumber).then((response) => {
        setJob(response.data.dataItems[0]);
        console.log(response);
      })
        .catch(() => {
          console.log("error");
        });
    }
  }, [props.job.referenceNumber, reRender]);

  // const onFileDownload = (refernceNumber, container) => {
  //   RequestContainerService.fetchPod(refernceNumber, container.container_number)
  //     .then((response) => {
  //       if (response.isAxiosError) throw new Error(response.status);
  //       else {
  //         setSelectedContainer(container);        
  //         setFileList(response.data.dataItems);
  //         setShowPopup(OTHER_POPUP);
  //         // const linkSource = `data:${response.data.dataItems[0].filetype};base64,${response.data.dataItems[0].fileContent}`;
  //         // const downloadLink = document.createElement("a");

  //         // downloadLink.href = linkSource;
  //         // downloadLink.download = response.data.dataItems[0].fileName;
  //         // downloadLink.target = "_blank";
  //         // // alert(downloadLink);
  //         // downloadLink.click();
  //       }
  //     })

  //     .catch(() => {
  //       console.log("error");
  //     });
  // };



  return (
    <>
      {props.podCount > 0 && job ?
        <Card
          style={{
            width: "1200px",
            marginTop: "20px",
            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: "0px 3px 6px #00000029",
            border: "1px solid #E2E2E2",
            borderRadius: "16px",
            opacity: "1",
          }}
        >
          <Table style={{ height: "15px" }}>
            <TableBody>
              <TableRow key={job.referenceNumber}>
                <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={2}>
                      <LabelHeader>
                        Booking#
                      </LabelHeader>
                      <Link
                        style={{
                          fontSize: '15px',
                          fontFamily: 'Dubai Regular',
                          fontWeight: 600,
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => {
                          setSelectedBooking(job);
                          setRequestPopup(true);
                        }}
                      >
                        {job.referenceNumber}
                      </Link>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Booked On</LabelHeader>
                      <LabelData>{job.creationDate}</LabelData>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Containers</LabelHeader>
                      <LabelData>{"  " + job.noOfContainers}</LabelData>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Trucks</LabelHeader>
                      <LabelData>{" " + job.noOfTrucks}</LabelData>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Amount</LabelHeader>
                        <Link
                          style={{
                            fontSize: "15px",
                            fontFamily: 'Dubai Regular',
                            fontWeight: 600,
                            textDecoration: "underline",
                            whiteSpace: "nowrap",
                          }}
                          component="button"
                          variant="body2"
                          onClick={() => {
                            setSelectedBooking(job);
                            setRequestPopup(true);
                          }}
                        >
                          {job.amount} AED
                        </Link>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Requestor Company</LabelHeader>
                      <LabelData>{job.companyName}</LabelData>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Requestor Name</LabelHeader>
                      <LabelData>{job.requesterName}</LabelData>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <LabelHeader>Transporter</LabelHeader>
                      <LabelData style={{ whiteSpace: 'nowrap' }}>{job.assignedTransporter}-{job.assignedTransporterCode}</LabelData>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              <TableRow style={{ borderTop: "1px solid #DCDCDC" }}>
                <TableCell style={{ borderBottom: "none" }}>
                  <LabelHeader >
                    Container Number
                  </LabelHeader>
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  <LabelHeader >
                    Pickup
                  </LabelHeader>
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  <LabelHeader >
                    Drop Details
                  </LabelHeader>
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  <LabelHeader >
                    Drop Date and Time
                  </LabelHeader>
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  <LabelHeader >
                    Truck Details
                  </LabelHeader>
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}>
                  <LabelHeader >
                    POD
                  </LabelHeader>
                </TableCell>
                <TableCell style={{ borderBottom: "none" }}></TableCell>
              </TableRow>

              {job.containerList.filter(x => x.refStatus.code === 'PODIMPAPPR').map((container, inx) => (
                <TableRow>
                  <TableCell>
                    <Link
                      style={{
                        fontSize: '15px',
                        fontFamily: 'Dubai Regular',
                        fontWeight: 600,
                        textDecoration: "underline",
                        whiteSpace: "nowrap",
                        color: '#0568AE'
                      }}
                      onClick={() => {
                        setSelectedContainer(container);
                        setContainerPopup(true);

                      }}
                    >
                      {container.container_number}
                    </Link>
                    <span style={{ color: '#848484', }}>
                      {" -"} {container.iso_code}
                    </span>
                  </TableCell>
                  <TableCell>
                    <LabelDataContainers>
                      {container.pickupLocation}
                    </LabelDataContainers>
                  </TableCell>
                  <TableCell>
                    <Link
                      style={{
                        fontSize: '15px',
                        fontFamily: 'Dubai Regular',
                        fontWeight: 600,
                        textDecoration: "underline",
                        whiteSpace: "nowrap",
                        color: '#0568AE'
                      }}
                      onClick={() => {
                        setSelectedContainer(container);
                        setContainerPopup(true);

                      }}
                    >
                      {container.dropZoneLabel}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <LabelDataContainers>
                      {container.date_time}
                    </LabelDataContainers>
                  </TableCell>
                  <TableCell>
                    <Link
                      style={{
                        fontSize: '15px',
                        fontFamily: 'Dubai Regular',
                        fontWeight: 600,
                        textDecoration: "underline",
                        whiteSpace: "nowrap",
                        color: '#0568AE'
                      }}
                      onClick={() => {
                        setSelectedContainer(container);
                        setTruckDetailsPopup(true);
                      }}
                    >
                      {container.assignedTruck}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton  style={{padding:'8px 10px 8px 10px'}} onClick={(e) => {
                        setShowPopup(OTHER_POPUP);
                        setSelectedContainer(container);
                        setFileList(container.proofOfDelivery);
                      }}>
                    <img
                      src="./document.svg"
                      alt="Not available"
                      id="download"
                      name="download"
                      height="28px"
                    />
                    </IconButton>
                  </TableCell>
                  <TableCell >
                    {container.refStatus.code === "PODIMPAPPR" && (
                      <div className="row" style={{marginBottom:0}}>
                        <Button
                          classes={{ root: classes.confirmButton }}
                          onClick={() => {
                            setSelectedContainer(container);
                            setShowPopup(ALERT_DIALOG);
                          }}
                        >
                          Approve
                        </Button>
                        <div className="col">
                          <Button
                            classes={{ root: classes.cancelButton }}
                            variant="outlined"
                            onClick={() => {
                              setSelectedContainer(container);
                              setShowPopup(CONFIRM_DIALOG);
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}
                    {showPopup === ALERT_DIALOG && (
                      <Dialog
                        fullWidth={true}
                        open={showPopup === ALERT_DIALOG}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle disableTypography className="dialog-title">
                          Attention!
                          <IconButton className="icon-button" aria-label="close" onClick={handleClose} style={{top:'0px'}}>
                            <Close style={{ fill: '#fff' }}/>
                          </IconButton>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText style={{ fontFamily:'Dubai Regular', fontWeight:600, padding:'20px'}} >
                            Are You sure to approve this POD?
                          </DialogContentText>
                          <TextField
                            placeholder="Admin Comments (if any)"
                            multiline
                            rows={4}
                            InputProps={{
                              disableUnderline: true,
                              classes:{input:classes.root}
                            }}
                            size="small"
                            style={{
                              fontFamily:'Dubai Light',
                              boxShadow: '0px 0px 5px #00000029',
                              border: '1.5px solid #168FE4BC',
                              borderRadius: '4px',
                              fontWeight: 600,
                              padding: '2px',
                          }}
                            fullWidth
                            inputProps={{
                              maxLength: 250,
                            }}
                            onChange={(e) => {
                              selectedContainer.remarks =
                                e.target.value;
                              if (e.target.value.length >= 230)
                                setMaxLengthMsg(250 - e.target.value.length + ' characters left.')
                              else
                                setMaxLengthMsg('')
                            }}
                          />
                          <span style={{ textAlign: 'left', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#ff0101', paddingLeft: '5px' }}> {lengthMsg}</span>
                        </DialogContent>
                        <DialogActions style={{ alignSelf: "center" }}>
                          <Button
                            classes={{ root: classes.confirmButton }}
                            variant="contained"
                            onClick={(e) => {
                              approvePod(selectedContainer);
                            }}
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={handleClose}
                            classes={{ root: classes.cancelButton }}
                            variant="outlined"
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                    )}
                    {showPopup === CONFIRM_DIALOG && (
                      <Dialog
                        fullWidth={true}
                        open={showPopup === CONFIRM_DIALOG}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle disableTypography className="dialog-title">
                          Attention!
                          <IconButton className="icon-button" aria-label="close" onClick={handleClose} style={{top:'0px'}}>
                            <Close style={{ fill: '#fff' }}/>
                          </IconButton>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText style={{fontFamily:'Dubai Regular', fontWeight:600, padding:'20px'}}>
                            Are You sure to Reject this POD?
                          </DialogContentText>
                          <TextField
                            placeholder="Please Type in the reason for Rejection"
                            multiline
                            rows={4}
                            InputProps={{
                              disableUnderline: true,
                              classes:{input:classes.root}
                            }}
                            size="small"
                            style={{
                              fontFamily:'Dubai Light',
                              boxShadow: '0px 0px 5px #00000029',
                              border: '1.5px solid #168FE4BC',
                              borderRadius: '4px',
                              fontWeight: 600,
                              padding: '2px',
                          }}
                            fullWidth
                            inputProps={{
                              maxLength: 250,
                            }}
                            onChange={(e) => {
                              container.remarks =
                                e.target.value;
                              if (e.target.value.length >= 230)
                                setMaxLengthMsg(250 - e.target.value.length + ' characters left.')
                              else
                                setMaxLengthMsg('')
                            }}
                          />
                          <span style={{ textAlign: 'left', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#ff0101', paddingLeft: '5px' }}> {lengthMsg}</span>
                        </DialogContent>
                        <DialogActions style={{ alignSelf: "center" }}>
                          <Button
                            onClick={(e) => {
                              rejectPod(selectedContainer)
                            }}
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={handleClose}
                            variant="outlined"
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card> : (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
          <Grid container direction="row" spacing={5}>
            <Grid item sm={12} xs={12}>
              <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
                <b>{'No records found'}</b></Typography>
            </Grid>
          </Grid>
        </Paper>)
      }

      {selectedContainer && fileList && showPopup === OTHER_POPUP && (
        <DownloadDocumentPopUp
          isopen={showPopup === OTHER_POPUP}
          fileList={fileList}
          container={selectedContainer}
          onClose={(e) => {
            setShowPopup(NO_DIALOG);
          }}
          onApprove={(e) => {
            approvePod()
          }}
        />
      )}
      {containerPopup && (
        <ContainerPopup
          containers={selectedContainer}
          onClose={() => setContainerPopup(false)}
        />
      )}
      {requestPopup && (
        <RequestDetailsPopUp
          request={selectedBooking}
          onClose={() => setRequestPopup(false)}
        />
      )}
      {truckDetailsPopup && (
        <TruckReadOnlyPopUp
          containers={selectedContainer}
          tokenType={"FCL_OUT"}
          onClose={() => setTruckDetailsPopup(false)}
          bookingNumber={job.referenceNumber}
        />
      )}
      {showToaster === 'SUCCESS' &&
        <SuccessToast
          icon="check_circle"
          title="POD verified successfully"
          message="*Item moved to delivered status with transporter"
          showToast={() => { setShowToaster(false) }}
          position="top-right"
        />}
      {showToaster === 'ERROR' &&
        <ErrorToast
          icon="check_circle"
          title="POD rejected!"
          message="*Item sent back to transporter for reupload"
          showToast={() => { setShowToaster(false) }}
          position="top-right"
        />}
    </>
  )
}

export default React.memo(VerifyPodCard);
