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
} from "@material-ui/core";

import "./VerifyInvoices.css";

import JobService from "../../service/JobService";


import Invoice from "./Invoice";
import ContainerPopup from "../request/ContainerPopup";
import TruckDetailsPopup from "../transporter/TruckDetailsPopup";
import RequestDetailsPopUp  from "../request/RequestDetailsPopUp";


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
  

  const openContainerPopup = () => {
    setContainerPopup(true);
  };



  const closeContainerPopup = () => {
    setContainerPopup(false);
  };

  const openTruckDetailsPopup = () => {
    setTruckDetailsPopup(true);
  };

  const closeTruckDetailsPopup = () => {
    setTruckDetailsPopup(false);
  };


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
                <Grid container item xs={8} spacing={1}>
                  <Grid item>
                    <Box
                      style={{
                        width: "2rem",
                        height: "2rem",
                        color: "white",
                        textAlign: "center",
                        marginTop: "-5px",
                        backgroundColor: "#0E1B3D",
                        marginLeft: "40px",
                        border: "2px solid #ccc",
                      }}
                    >
                      {props.index + 1}
                    </Box>
                  </Grid>
                </Grid>
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
                    <LabelData>{" " + job.truckNumber}</LabelData>
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
                    <LabelData>{job.assignedTransporter}</LabelData>
                  </Grid>
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br></br>

        {(activateBooking==='active' || activateMisc==='active') && filteredList && filteredList.map((inv) => (
          <Invoice invoice={inv} key={inv.invoiceNumber}></Invoice>
        ))}
        {activateContainer==='active' &&  <Table>
          <TableBody>

<TableRow>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Container Number
                  </InputLabel>
                </TableCell>
             
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>Completed on</InputLabel>
                </TableCell>
          
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Drop Details
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>FCL Out</InputLabel>
                </TableCell>
            
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Token
                  </InputLabel>
                </TableCell>
               <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    POD
                  </InputLabel>
                </TableCell>
             <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    MT IN
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                  Token
                  </InputLabel>
                </TableCell>
               
              
              </TableRow>
              {props.job.containerList.map((container, inx) => (
                <TableRow>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "underline" }}
                      onClick={() => {
                        setSelectedContainer(container);
                        openContainerPopup();
                      }}
                    >
                      {container.container_number}
                    </Link>
                  </TableCell>
            
                 <TableCell>
                  <InputLabel style={{ color: "#848484" }}>{container.mtDeliveredOn}</InputLabel>
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
                    <Link style={{ textDecoration: "underline" }}  onClick={() => {
                        setSelectedContainer(container);
                        openTruckDetailsPopup();
                      }}>
                      {container.assignedTruck}
                    </Link>
                  </TableCell>
               
                  <TableCell>
                    <img src="doc_download.svg"/>
                  </TableCell>
             
                  <TableCell>
                    </TableCell>
                


                </TableRow>))}
                </TableBody>
                </Table>}
      </Card>

  
            {containerPopup && (
              <ContainerPopup
                containers={selectedContainer}
                onClose={closeContainerPopup}
              />
            )}

{requestPopup && (
              <RequestDetailsPopUp
                request={selectedBooking}
                onClose={()=>setRequestPopup(false)}
              />
            )}

{truckDetailsPopup && (
              <TruckDetailsPopup
                containers={selectedContainer}
                onClose={closeTruckDetailsPopup}
                bookingNumber={job.referenceNumber}
              />
            )}
    </>
  );
}
export default React.memo(VerifyInvoices);
