import React, { useState, useEffect } from "react";
import { Card, Button } from "@material-ui/core/";
import {
  makeStyles,
  Table,
  TableBody,
  TableRow,
  TableCell,
  InputLabel,
  Box,
  Grid,
  Link,
  withStyles,
  Typography,
  Paper
} from "@material-ui/core";
import "./VerifyInvoices.css";
import JobService from "../../service/JobService";
import Invoice from "./Invoice";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import ErrorToast from "../../lib/components/toast/ErrorToast";
import ContainerDetails from "./ContainerDetails";
import RequestContainerService from "../../service/RequestContainerService";
import RequestDetailsPopUp from "../request/RequestDetailsPopUp";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  label: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
  },
  labelData: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
  },
  drawerStyle: {
    fontSize: "13px",
    color: "grey",
    borderBottom: "1px solid grey",
    width: "200px",
    height: "15px",
  },
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

const onFileDownload = (job) => {
  JobService.fetchInvoice(job.referenceNumber)
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
};

function VerifyInvoices(props) {
  console.log("props in verify invoices::", props);
  const classes = useStyles();
  const [job, setJob] = useState(props.job);
  const [invoiceList, setInvoiceList] = useState(props.job.invoiceList);
  const [activateBooking, setActivateBooking] = useState("active");
  const [activateMisc, setActivateMisc] = useState("");
  const [activateContainer, setActivateContainer] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [requestPopup, setRequestPopup] = useState(false);
  const [showToaster, setShowToaster] = useState("NO_DIALOG");

  useEffect(() => {
    console.log("props.job.invoiceList", props.job.invoiceList);
    setFilteredList(invoiceList.filter(
      (x) => x?.invoiceType === "BOOKINGINV"
    ));
  }, []);

  const updateFilteredList = (invoice) => {
    var indexToUpdate = filteredList.findIndex(x => x.referenceNumber === invoice.referenceNumber);
    filteredList[indexToUpdate] = invoice;
    var updatedList=filteredList;
    setFilteredList([]);
    setFilteredList(updatedList);
    console.log("filteredList", filteredList);
    if(invoice.status==='Invoice Approved' || invoice.status==='PAID')
    setShowToaster('SUCCESS');
    else
    setShowToaster('ERROR');
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
                        fontFamily: "Dubai Light",
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
                        fontFamily: "Dubai Light",
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
            <TableCell style={{ borderBottom: "1px solid #D3D3D3", padding:0 }}>
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
                      invoiceList.filter((x) => x.invoiceType === "TRANSINV")
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
                        (x) => x.invoiceType === "BOOKINGINV"
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
          <div style={{ padding: 20 }}>
            <Invoice invoice={inv} key={inv.invoiceNumber}
              onUpdateFilteredList={(e) => {
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
        {activateContainer === 'active' && <ContainerDetails job={props.job} />}
      </Card>

      {showToaster === 'SUCCESS' &&
        <SuccessToast
          icon="check_circle"
          title="Invoice verified successfully"
          message="*Item moved to completed status"
          showToast={() => { setShowToaster(false) }}
          position="top-right"
        />}

      {showToaster === 'ERROR' &&
        <ErrorToast
          icon="check_circle"
          title="Invoice rejected!"
          message="*Item sent back to transporter for reupload"
          showToast={() => { setShowToaster(false) }}
          position="top-right"
        />}

`     {requestPopup && (
            <RequestDetailsPopUp
              request={selectedBooking}
              onClose={() => setRequestPopup(false)}
            />
          )}
    </>
  );
}
export default React.memo(VerifyInvoices);
