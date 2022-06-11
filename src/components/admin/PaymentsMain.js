import React, { useState, useEffect } from "react";
import {
  withStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  InputLabel,
  Box,
  Grid,
  Link,
  Button,
  Card,
  Typography,
  Paper
} from "@material-ui/core";
import RequestDetailsPopUp from "../request/RequestDetailsPopUp";
import Invoice from "./Invoice";
import ContainerDetails from "./ContainerDetails";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import ErrorToast from "../../lib/components/toast/ErrorToast";

function PaymentMain(props) {
  console.log("props in verify invoices::", props);
  const [job, setJob] = useState(props.job);
  const [containerPopup, setContainerPopup] = useState(false);
  const [invoiceList, setInvoiceList] = useState(props.job.invoiceList);
  const [activateBooking, setActivateBooking] = useState("active");
  const [activateMisc, setActivateMisc] = useState("");
  const [activateContainer, setActivateContainer] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [requestPopup, setRequestPopup] = useState(false);
  const [showToaster, setShowToaster] = useState(null);
  const [tokenType, setTokenType] = useState("");

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

  useEffect(() => {
    console.log("props.job.invoiceList", props.job.invoiceList);
    setFilteredList(invoiceList.filter(
      (x) => x?.invoiceType === "BOOKINGINV"
    ));
  }, []);

  const updateFilteredList = (invoice) => {
    var indexToUpdate = filteredList.findIndex(x => x.referenceNumber === invoice.referenceNumber);
    filteredList[indexToUpdate] = invoice;
    console.log("filteredList", filteredList);
   
    setShowToaster('SUCCESS');
  }

  return (
    <>
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
              <TableCell style={{ borderBottom: "none", paddingBottom:0 }}>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={3} sm={2}>
                    <LabelHeader>Booking#</LabelHeader>
                    <Link
                      style={{
                        fontSize: "15px",
                        fontFamily: "Dubai Regular",
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
                        fontFamily: "Dubai Regular",
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
                    <LabelHeader>Requester Company</LabelHeader>
                    <LabelData>{job.companyName}</LabelData>
                  </Grid>
                  <Grid item xs={3} sm={2}>
                    <LabelHeader>Requester Name</LabelHeader>
                    <LabelData>{job.requesterName}</LabelData>
                  </Grid>
                  <Grid item xs={3} sm={2}>
                    <LabelHeader>Transporter</LabelHeader>
                    <LabelData style={{ whiteSpace: 'nowrap' }}>{job.assignedTransporter}-{job.assignedTransporterCode}</LabelData>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell  style={{ borderBottom: "1px solid #D3D3D3", padding:0 }}>
                <Grid
                  container
                  justify="flex-end"
                  alignItems="flex-end"
                >
                  <Box
                    style={{ width: "150px", border: "2px solid #0E1B3D", borderRight: 'none' }}
                    component="span"
                    className={`${activateMisc} miscellaneous`}
                    onClick={() => {
                      setActivateMisc("active");
                      setActivateBooking("");
                      setActivateContainer("");
                      setFilteredList(
                        invoiceList.filter((x) => x?.invoiceType === "TRANSINV" && x?.status !== 'Invoice Submitted' && x?.status !== 'Invoice Rejected')
                      );
                      console.log("filtered list....", filteredList);
                    }}
                  >
                    <Typography variant="caption" style={{ fontWeight: 600, paddingTop: '5px' }}>MISCELLANEOUS</Typography>
                  </Box>
                  <Box
                    style={{ width: "150px", border: "2px solid #0E1B3D", borderRight: 'none' }}
                    component="span"
                    className={`${activateBooking} booking`}
                    onClick={() => {
                      setActivateMisc("");
                      setActivateBooking("active");
                      setActivateContainer("");
                      setFilteredList(
                        invoiceList.filter(
                          (x) => x?.invoiceType === "BOOKINGINV"
                        )
                      );
                      console.log("filtered list....", filteredList);
                    }}
                  >
                    <Typography variant="caption" style={{ fontWeight: 600 }}>BOOKING</Typography>
                  </Box>
                  <Box
                    style={{ width: "150px", border: "2px solid #0E1B3D" }}
                    component="span"
                    className={`${activateContainer} containerList`}
                    onClick={() => {
                      setActivateMisc("");
                      setActivateBooking("");
                      setActivateContainer("active");
                    }}
                  >
                    <Typography variant="caption" style={{ fontWeight: 600 }}>CONTAINER LIST</Typography>
                  </Box>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br></br>
        {(activateBooking === 'active' || activateMisc === 'active') && filteredList && filteredList.length > 0 && (filteredList.map((inv) => (
          <div style={{ padding: 20, paddingBottom: 0 }}>
            <Invoice invoice={inv} key={inv.invoiceNumber} payment={props.payment} onUpdateFilteredList={(e) => {
              var invoice = e;
              updateFilteredList(invoice)
            }} />
            <hr />
          </div>
        )))}

        {(activateBooking === 'active' || activateMisc === 'active') && filteredList && filteredList.length === 0 &&
          <Paper elevation={5} style={{ borderRadius: 8, padding: '30px', margin: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
            <Grid container direction="row" spacing={5}>
              <Grid item sm={12} xs={12}>
                <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
                  <b>{'Invoice not raised yet'}</b></Typography>
              </Grid>
            </Grid>
          </Paper>
        }
        {activateContainer === 'active' && <ContainerDetails job={props.job}></ContainerDetails>}
      </Card>
      {requestPopup && (
        <RequestDetailsPopUp
          request={selectedBooking}
          onClose={() => setRequestPopup(false)}
        />
      )}
      {showToaster === 'SUCCESS' &&
        <SuccessToast
          icon="check_circle"
          title="Invoice updated successfully"
          message="*Item moved to settled Status"
          showToast={() => { setShowToaster(false) }}
          position="top-right"
        />}
    </>
  );
}

export default React.memo(PaymentMain);