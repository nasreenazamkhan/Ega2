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
  Typography
} from "@material-ui/core";


import RequestDetailsPopUp  from "../request/RequestDetailsPopUp";
import Invoice from "./Invoice";



  
 



function PaymentMain(props) {
  console.log("props in verify invoices::", props);

  const [job, setJob] = useState(props.job);
  const [containerPopup, setContainerPopup] = useState(false);
  const [invoiceList, setInvoiceList] = useState(props.job.invoiceList);
  const [activateBooking, setActivateBooking] = useState("active");
  const [activateMisc, setActivateMisc] = useState("");
  const [activateContainer, setActivateContainer] = useState("");
  const [filteredList,setFilteredList]=useState([]);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [truckDetailsPopup, setTruckDetailsPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [requestPopup,setRequestPopup] = useState(false);

  const LabelHeader = withStyles((theme) => ({
    root: {
      fontSize: "18px",
      color: "#757575",
      fontFamily: "Dubai Medium",
      marginTop: "1px",
    },
  }))(InputLabel);
  
  const LabelData = withStyles((theme) => ({
    root: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#000000",
      fontFamily: "Dubai Regular",
      marginTop: "2px",
    },
  }))(InputLabel);

  
  useEffect(() => {
    setFilteredList(invoiceList.filter(
      (x) => x.invoiceType === "BOOKINGINV"
    ));

  


}, []);




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
              <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
            
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={3} sm={2}>
                    <LabelHeader>Booking#</LabelHeader>
                    <Link
                      style={{
                        fontSize: "16px",
                        fontFamily: "Dubai Regular",
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

                    <InputLabel
                      style={{
                        fontSize: "13px",
                        color: "black",
                        marginTop: "2px",
                      }}
                    >
                      <Link
                        style={{
                          fontSize: "16px",
                          fontFamily: "Dubai Regular",
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
                        {job.amount}
                      </Link>
                    </InputLabel>
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
                    <LabelData style={{whiteSpace:'nowrap'}}>{job.assignedTransporter}-{job.assignedTransporterCode}</LabelData>
                  </Grid>
               
                <Grid
                  container
                  xs={12}
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-end"
                >
                  <Box
                    style={{ width: "150px", border: "1px solid black" }}
                    component="span"
                    className={`${activateMisc} miscellaneous`}
                    onClick={() => {
                      setActivateMisc("active");
                      setActivateBooking("");
                      setActivateContainer("");
                      setFilteredList(
                        invoiceList.filter((x) => x.invoiceType === "TRANSINV")
                      );
                      console.log("filtered list....",filteredList);
                    }}
                  >
                    <Typography variant="caption">MISCELLANEOUS</Typography>
                  </Box>
                  <Box
                    style={{ width: "150px", border: "1px solid black" }}
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
                      console.log("filtered list....",filteredList);
                    }}
                  >
                    <Typography variant="caption">BOOKING</Typography>
                  </Box>
                  <Box
                    style={{ width: "150px", border: "1px solid black" }}
                    component="span"
                    className={`${activateContainer} containerList`}
                    onClick={() => {
                      setActivateMisc("");
                      setActivateBooking("");
                      setActivateContainer("active");
                    }}
                  >
                    <Typography variant="caption">CONTAINER LIST</Typography>
                  </Box>
                </Grid>
                </Grid>
               
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br></br>
        {invoiceList.map((inv) => (
          <Invoice invoice={inv} key={inv.invoiceNumber} payment={props.payment}> </Invoice>
        ))}

        </Card>

  


{requestPopup && (
  <RequestDetailsPopUp  
    request={selectedBooking}
    onClose={()=>setRequestPopup(false)}
  />
)}


   </>  
       
       
  
  );
}

export default React.memo(PaymentMain);
