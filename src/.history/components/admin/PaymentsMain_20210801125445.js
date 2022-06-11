import React, { useState, useEffect } from "react";


import { Card, Button } from "@material-ui/core/";
import {

  Table,
  TableBody,
  TableRow,
  TableCell,

  InputLabel,
  Box,
  Grid,
  Link,
  Button,

  withStyles,
  Typography,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import moment from 'moment';

const todayDate=moment(new Date());
const yesterdayDate=moment(new Date()).subtract(1, 'days');


const searchForm = {
  fromDate: yesterdayDate.format('DD/MM/YYYY'),
  toDate: todayDate.format('DD/MM/YYYY'),
 
};

  const Theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          // position: "relative",
          // "& $notchedOutline": {
          //   borderColor: "#2EFF22"
          // },
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: "#0E1B3D",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              borderColor: "#0E1B3D",
            },
          },
          "&$focused $notchedOutline": {
            borderColor: "#0E1B3D",
            borderWidth: 1.5,
          },
        },
      },
    },
  });

  
 



function PaymentMain() {
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
