import React, { useEffect, useState } from "react";


import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Grid,
  Card,
  withStyles,
  createStyles,
  Box,
  Tooltip
} from "@material-ui/core";
import RequestBoeService from "../../service/RequestBoeService";
import CommonService from "../../service/CommonService";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import RequestContainerService from "../../service/RequestContainerService";
import { NO_DIALOG, OTHER_POPUP } from "../../lib/common/Constants";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import ContainerPopup from "../request/ContainerPopup";
import DownloadDocumentPopUp from '../admin/DownloadDocumentPopup';
import { default as MuiButton } from "@material-ui/core/Button";
import * as utils from "../../utils/utilis";
import Track from "../stepper/Track";
import BookingService from "../../service/BookingService";
import PodApprovedPopup from "../request/PodApprovedPopup";
import { useLocation } from "react-router-dom";
import PaymentConfirmation from "../request/PaymentConfirmation";
import TransporterInvoicePopup from "../request/TransporterInvoicePopup.tsx"

const useStyles = makeStyles({
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
  card: {
    width: "1238px",
    maxHeight: "560px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E1DEDE",
    borderRadius: "10px",
    opacity: 1,
    marginTop: '39px'
  },
  text: {
    fontSize: "20px",
    color: '#0E1B3D',
    fontWeight: 600,
    fontFamily: 'Dubai Regular',
  }
});

const StyledButton = withStyles(() =>
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
      boxSshadow: '0px 1px 4px #00000029',
      color: '#FFFFFF',
      backgroundColor: '#1360D2',
      '&:hover': {
        color: '#1360D2',
      }
    }
  })
)(MuiButton);

const StyledTableCell2 = withStyles(() =>
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
      padding: '5px'
    },
  }),
)(TableCell);

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      fontSize: '16px',
      fontFamily: 'Dubai Regular',
      fontWeight: 600,
      color: '#434343',
    },
    body: {
      fontSize: '0.9rem',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderBottom: '0px',
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

function MiscellaneousPayment(props) {
  const classes = useStyles();
  const [request, setRequest] = useState();
  const [tabLabels, setTabLabels] = useState([
    "In Progress",
    "Delivered",
    "Completed",
  ]);
  const location = useLocation();
  const [payment, setPayment] = useState(location.state.payment);
  const [allContainerList, setAllContainerList] = useState([]);
  const [tabSelected, setTabSelected] = useState(props.statusData.statusCode !== "MT_DEL" ? "In Progress" : "Completed");
  const [containerList, setContainerList] = useState([]);
  const [pstate, setPstate] = useState(0);
  const [selectedContainers, setSelectedContainers] = useState();
  const [fileList, setFileList] = useState([]);
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [containerPopup, setContainerPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState();
  const [track, showTrack] = useState(false);
  const [trackDetails, setTrackDetails] = useState();
  const [canApprove, setCanApprove] = useState(false);
  const [podApprovedPopup, setPodApprovedPopup] = useState(false);
  const [statusData, setStatusData] = useState(props.statusData);
  const [invoicePopup, showInvoicePopup] = useState({
    open: false,
    data: {}
  });
  const [showColumn, setShowColumn] = useState({
    cncl: false,
    delete: false
  });

  const openDeleteContainerPopup = () => {
    setOpenDeletePopup(true);
  };

  const openContainerPopup = (props) => {
    setContainerPopup(true);
  };

  const closeContainerPopup = () => {
    setContainerPopup(false);
    refresh();
  };

  const ContainerTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: "#E4E4E426",
      },
    },
  }))(TableRow);

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

  const rejectPod = () => {
    console.log("approve pod ::", selectedContainer);
    RequestContainerService.rejectPod(selectedContainer)
      .then((response) => {
        setShowPopup(NO_DIALOG);
        setSelectedContainer();
        setPodApprovedPopup(false);
      })
      .catch(() => {
        console.log("error");
      });
  }

  const onClose = () => {
    setPodApprovedPopup(false);
    setShowPopup(NO_DIALOG);
  }

  const onInvoiceDownload = (invoice) => {
    const linkSource = `data:${invoice.filetype};base64,${invoice.fileContent}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = invoice.fileName;
    downloadLink.target = "_blank";
    // alert(downloadLink);
    downloadLink.click();
  }

  const refresh = () => {
    console.log("refresh called :::");
    setPstate(pstate + 1);
  };

  useEffect(() => {
    BookingService.fetchPaymentSummary(
      statusData.bookingNumber
    ).then((response) => {
      setAllContainerList(response.containerList);
      setContainerList(response.containerList);
      if (response.containerList.filter((container) => container.isActive == 0))
        setShowColumn({
          ...showColumn,
          cncl: true
        })

      if (response.containerList.filter((container) => container.isActive == 1) && ["SUCC", "EXP"].includes(location.state.statusData.statusCode))
        setShowColumn({
          ...showColumn,
          delete: true
        })
      if (["PPAY", "FPAY", "SUCC", "EXP", "MT_DEL"].includes(statusData.statusCode)) {
        setContainerList(response.containerList);
      } else {
        if (tabSelected === "In Progress") {
          let containerList = response.containerList.filter(
            (container) =>
              ["PEND", "PENTRUCK", "PODUPL", "INPRO", "PTOK", "PODREJ", "EXP", "CNCL", "PODIMPAPPR", "CONF", "TRUCK_ASGN"].includes(container.refStatus.code)
          );
          setContainerList(containerList);
        }
      }
    });
  }, [pstate]);

  useEffect(() => {
    console.log("useEffect MiscellaneousPayment ")
    RequestBoeService.fetchInvoicesForPayment(statusData.bookingNumber).then((response) => {
      if (response.isAxiosError)
        setRequest();
      else {
        console.log(response);
        setRequest(response.data.dataItems[0]);
        setAllContainerList(response.data.dataItems[0].containerList)
      }
    })
      .catch(() => {
        console.log("error");
        setRequest();
      });
  }, [statusData.bookingNumber]);

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
      {request ? (
        <>
          {props.statusSelectedTab === 'MISCELLANEOUS INVOICES' && <Grid item xs={2}>
            <StyledButton
              style={{ position: 'absolute', top: '-50px', right: '20px' }}
              onClick={() => RequestBoeService.makePaymentForInvoices(request).then((res) => {
                if (res.isAxiosError)
                  console.log("error occured during payment");
                else {
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
                  CommonService.postToExternalSite(
                    dataVal,
                    res.data.dataItems[0].gatewayUrl
                  );
                }
              })
                .catch(() => {
                  console.log("error");
                  setRequest();
                })
              }>
              Pay Amount
            </StyledButton>
          </Grid>}
          <Card className={classes.card}>
            <CardContent>
              <Grid container>
                <Grid item xs={10} className={classes.text} style={{ minWidth: '250px', display: "flex" }}>
                  Booking # {statusData.bookingNumber}
                  {statusData.statusCode === "SUCC" ||
                    statusData.statusCode === "EXP" && (
                      <Box className={classes.statusbox} style={{ background: "#FF8E0D 0% 0% no-repeat padding-box", border: "1px solid #FF8E0D" }}>
                        Transporter Pending
                      </Box>
                    )}
                  {(statusData.statusCode === "TRANSCONF" ||
                    statusData.statusCode === "STARTED") && (
                      <Box className={classes.statusbox} style={{ background: "#63BB7A 0% 0% no-repeat padding-box", border: "1px solid #63BB7A" }}>
                        Transporter Confirmed
                      </Box>
                    )}

                  {statusData.statusCode === "FPAY" && (
                    <Box className={classes.statusbox} style={{ background: "#EA2428 0% 0% no-repeat padding-box", border: "1px solid #EA2428" }}>
                      Payment Failed
                    </Box>
                  )}
                  {statusData.statusCode === "PPAY" && (
                    <Box className={classes.statusbox} style={{ background: "#FF8E0D 0% 0% no-repeat padding-box", border: "1px solid #FF8E0D" }}>
                      Payment Unconfirmed
                    </Box>
                  )}
                  {(statusData.statusCode === "CNCL") && (
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
              <br></br>
              <Grid container>
                <Grid item xs={4} className={classes.text}>
                  Invoice Details
                  <hr style={{ borderTop: '4px solid #FF3E3E', width: '12%', margin: 0 }} />
                </Grid>
                <Grid item xs={2} className={classes.text} style={{ color: '#000000', fontSize: '18px' }}>
                  Total Amount Paid
                </Grid>
                <Grid item xs={2} className={classes.text} style={{ color: '#0568AE', fontSize: '18px' }}>
                  {request?.paidAmount}  AED
                </Grid>
                <Grid item xs={2} className={classes.text} style={{ color: '#000000', fontSize: '18px' }}>
                  Amount to be Paid
                </Grid>
                <Grid item xs={2} className={classes.text} style={{ color: '#0568AE', fontSize: '18px' }}>
                  {request?.unpaidAmount} AED
                </Grid>
              </Grid>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      DT Invoice #
                    </StyledTableCell>
                    <StyledTableCell>
                      Invoiced On
                    </StyledTableCell>
                    <StyledTableCell>
                      Transporter Invoice
                    </StyledTableCell>
                    <StyledTableCell>
                      Total Amount
                    </StyledTableCell>
                    <StyledTableCell>
                      Admin Comments
                    </StyledTableCell>
                    <StyledTableCell>
                      Invoice
                    </StyledTableCell>
                    {/* <StyledTableCell>
                      DT Invoice
                    </StyledTableCell> */}
                    <StyledTableCell>
                      Payment Status
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {request?.invoiceList.map((invoice) => (
                    <TableRow>
                      <StyledTableCell>
                        {invoice?.dtInvoiceNumber}
                      </StyledTableCell>
                      <StyledTableCell>
                        {invoice?.approvedOn}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Link style={{ color: "#0568AE", fontWeight: "bold", textDecoration: "underline" }} onClick={() => {
                          let transInv = {
                            invoiceNumber: invoice?.invoiceNumber,
                            invoiceDate: invoice?.invoiceDate,
                            invoiceAmount: invoice?.invoiceAmount,
                            vatAmount: invoice?.vatAmount,
                            description: invoice?.description,
                            fileName: invoice?.fileName,
                            fileType: invoice?.fileType,
                            fileContent: invoice?.fileContent
                          }
                          showInvoicePopup({
                            open:true,
                            data:transInv
                          })
                        }}>
                          {invoice?.invoiceNumber}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>
                        {invoice?.invoiceTotalAmount}
                      </StyledTableCell>
                      <StyledTableCell>
                        {invoice?.remarks}
                      </StyledTableCell>
                      {/* <StyledTableCell>
                        <IconButton onClick={() => onInvoiceDownload(invoice)}>
                          <img src="./Invoice_icon.svg" alt="not available" height="31px" />
                        </IconButton>
                      </StyledTableCell> */}
                      <StyledTableCell>
                        <IconButton onClick={() => onInvoiceDownload({ fileType: invoice?.invoicePdfType, fileContent: invoice?.invoicePdfContent, fileName: invoice?.invoicePdfName })}>
                          <img src="./Invoice_icon.svg" alt="not available" height="31px" />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell>
                        {invoice?.paymentStatus}
                      </StyledTableCell>
                      {invoicePopup.open && <TransporterInvoicePopup invoiceData={invoicePopup.data} onClose={() => {
                        showInvoicePopup({
                          open:false,
                          data:{}
                        })
                      }} />}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card> </>) : (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
            <Grid container direction="row" spacing={5}>
              <Grid item sm={12} xs={12}>
                <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
                  <b>{'No Miscellaneous Invoices added'}</b></Typography>
              </Grid>
            </Grid>
          </Paper>)}
      {!["SUCC", "EXP", "FPAY", "PPAY", "CNCL", "MT_DEL"].includes(statusData.statusCode) &&
        <div style={{ paddingTop: '50px' }}>
          <CustomTabs
            labelList={tabLabels}
            onSelected={(e) => {
              if (e === 0) {
                let list = allContainerList?.filter(
                  (container) =>
                    ["PEND", "PENTRUCK", "EXP", "PODUPL", "INPRO", "PTOK", "PODREJ", "CNCL", "PODIMPAPPR", "CONF", "TRUCK_ASGN"].includes(container.refStatus.code)
                )
                setContainerList(list);
                setTabSelected("In Progress");
                // setPstate(pstate + 1);
              }
              if (e === 1) {
                setContainerList(allContainerList?.filter(
                  (container) => ["FCL_DEL", "PMTTOK", "MTTRK_ASGN", "MTTOKASGN"].includes(container.refStatus.code)
                ));
                setTabSelected("Delivered");
                // setPstate(pstate + 1);
              }
              if (e === 2) {
                setContainerList(allContainerList?.filter(
                  (container) => ["MT_DEL", "COMPL"].includes(container.refStatus.code)
                ));

                setTabSelected("Completed");
                // setPstate(pstate + 1);
              }
            }}
          ></CustomTabs>
        </div>}
      {containerList.length > 0 ? (
        <>
          <Grid item xs={12} className={classes.text} style={{ marginTop: "22px", fontSize: "15px", fontFamily: 'Dubai Light', color: '#000000' }}>
            {`Displaying ${(containerList.length + "").padStart(2, "0")} containers`}
          </Grid>
          <div style={{ marginTop: "15px" }}>
            <Table >
              <TableHead style={{ backgroundColor: '#696F83', color: '#FFFFFF', paddingBottom: 0 }}>
                <TableRow>
                  <StyledTableCell2 style={{ borderTopLeftRadius: '10px', paddingLeft: '16px' }}> Container Number </StyledTableCell2>
                  <StyledTableCell2> Container Type </StyledTableCell2>
                  <StyledTableCell2>
                    {(tabSelected === "In Progress" || tabSelected === "Delivered") ? 'Pickup' : 'Delivered On'}
                  </StyledTableCell2>
                  <StyledTableCell2>
                    {tabSelected === "In Progress" ? 'Drop Date & Time' : tabSelected === "Delivered" ? 'Delivered On' : 'Completed On'}
                  </StyledTableCell2>
                  <StyledTableCell2 style={["PPAY", "FPAY"].includes(statusData.statusCode) ? { borderTopRightRadius: '10px' } : {}}>
                    Drop Details
                  </StyledTableCell2>
                  {["TRANSCONF", "STARTED", "MT_DEL"].includes(statusData.statusCode) && <>
                    <StyledTableCell2>
                      POD
                    </StyledTableCell2>
                    <StyledTableCell2 style={showColumn.cncl || showColumn.delete ? {} : { borderTopRightRadius: '10px' }}>
                      Track
                    </StyledTableCell2>
                  </>}
                  {(showColumn.cncl || showColumn.delete) && (
                    <StyledTableCell2 style={{ borderTopRightRadius: '10px' }}>&nbsp;</StyledTableCell2>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  containerList.map((containers, inx) => (
                    <ContainerTableRow key={containers.container_number} style={containers.isActive == 0 ? { backgroundColor: '#E4E4E4CC' } : {}}>
                      <StyledTableCell2 style={{ paddingLeft: '16px' }}>
                        <div
                          style={{
                            display: "inline-flex",
                            boxSizing: "inherit",
                            textAlign: "center",
                            alignItems: "center",
                            display: 'flex',
                            gap: "6px",
                          }}
                        >
                          <Avatar style={{ height: '25px', width: '25px', padding: '14px', marginRight: '8px', fontFamily: 'Dubai Light', backgroundColor: utils.randmonColorConsignee(), fontSize: '14px' }} >
                            {containers.initials}
                          </Avatar>
                          <Link
                            style={{
                              color: "#0568AE",
                              fontWeight: 600,
                              textDecoration: "underline",
                            }}
                            onClick={() => {
                              openContainerPopup();
                              setSelectedContainers(containers);
                              console.log("inputLabel clicked ::");
                            }}>
                            {containers.container_number}
                          </Link>
                        </div>
                      </StyledTableCell2>
                      <StyledTableCell2>{containers.containerType}</StyledTableCell2>
                      <StyledTableCell2>
                        {!(tabSelected === "In Progress" || tabSelected === "Delivered") && <img src="./calendar.svg" style={{ marginRight: "8px" }} />}
                        {((tabSelected === "In Progress" || tabSelected === "Delivered") ? containers.pickupLocation : containers.fclDeliveredOn) ?? '--'}
                      </StyledTableCell2>
                      <StyledTableCell2>
                        <img src={containers.isActive == 0 ? "./calendar-grey.svg" : "./calendar.svg"} style={{ marginRight: "8px" }} />
                        {(tabSelected === "In Progress" ? containers.date_time : tabSelected === "Delivered" ? containers.fclDeliveredOn : containers.mtDeliveredOn) ?? '--'}
                      </StyledTableCell2>
                      <StyledTableCell2>
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
                      </StyledTableCell2>
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
                      {["TRANSCONF", "STARTED", "MT_DEL"].includes(statusData.statusCode) &&
                        <StyledTableCell2>
                          <BlueTooltip placement="top-end" arrow
                            title={["MTTOKASGN", "MTTRK_ASGN", "INPRO", "FCL_DEL", "MT_DEL", "PODUPL", "PODREJ", "PODIMPAPPR"].includes(containers.refStatus.code) ? "" : "In Yard"}>
                            <IconButton onClick={(e) => {
                              setSelectedContainers(containers);
                              showTrack(true)
                              // setTrackDetails({ ...trackDetails, "containerNo": containers?.container_number, "tracks": containers?.containerTrackList ?? [] })
                              setTrackDetails({ ...trackDetails, "containerNo": containers?.container_number })
                            }} >
                              {["MTTOKASGN", "MTTRK_ASGN", "INPRO", "FCL_DEL", "MT_DEL", "PODUPL", "PODREJ", "PODIMPAPPR"].includes(containers?.refStatus.code) ?
                                (<img src="./truck_track.svg" height="22px" />) :
                                (<img src={containers.isActive == 0 ? "./in_yard_grey.svg" : "./in_yard.svg"} height="22px" />)}
                            </IconButton>
                          </BlueTooltip>
                          {track && <Track tab={"Pending"} trackDetails={trackDetails} onClose={() => showTrack(false)} />}
                        </StyledTableCell2>}
                      {containers.isActive == 0 &&
                        <StyledTableCell2 style={{ color: "#EA2428" }}>
                          Cancelled
                        </StyledTableCell2>}
                      {containers.isActive == 1 && ["SUCC", "EXP"].includes(statusData.statusCode) && (
                        <StyledTableCell2>
                          <IconButton onClick={() => {
                            setSelectedContainers(containers);
                            openDeleteContainerPopup();
                          }}>
                            <img src="./delete.svg" />
                          </IconButton>
                        </StyledTableCell2>)}
                    </ContainerTableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </>) : (<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
          <Grid container direction="row" spacing={5}>
            <Grid item sm={12} xs={12}>
              <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
                <b>{'No records found'}</b></Typography>
            </Grid>
          </Grid>
        </Paper>)
      }
      {containerPopup && (
        <ContainerPopup
          enableButton={statusData.statusCode !== "MT_DEL" ? true : false}
          containers={selectedContainers}
          onClose={closeContainerPopup}
        />
      )}
      {podApprovedPopup && <PodApprovedPopup container={selectedContainers} onClose={onClose} refresh={refresh} />}
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
        />)}

      {payment && <PaymentConfirmation
        bookingNumber={statusData.bookingNumber}
        referenceNumber={location.state.referenceNumber}
        success={location.state.success}
        onClose={() => { setPayment(false) }}
      />}
    </>
  )
}
export default MiscellaneousPayment;