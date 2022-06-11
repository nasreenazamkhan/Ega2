
import React, { useEffect, useState } from "react";

import CustomTabs from "../../lib/components/tabs/CustomTabs";


import { useLocation } from "react-router-dom";
import BookingService from "../../service/BookingService";
import MiscellaneousInvoices from "./MiscellaneousInvoices";
import BookingInvoice from "./BookingInvoice";
import { Link, Grid, Breadcrumbs, makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontWeight: 600,
    fontSize: '17px'
  },
}));

function InvoiceUpload() {
  const classes = useStyles();
  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(location.state.referenceNumber);
  const [jobs, setJobs] = useState();
  const [showBooking, setShowBooking] = useState(location.state.status === 'MT_DEL');
  const [tabSelected, setTabSelected] = useState(location.state?.tabSelected ? location.state.tabSelected : "Booking");
  const [pstate, setPstate] = useState(0);
  const [fromPage, setFromPage] = useState(location.state?.fromPage ? location.state.fromPage : 'Settlement');
  const [pageUrl, setPageUrl] = useState(location.state?.pageUrl ? location.state.pageUrl : 'settlements');
  const [tabLabels, setTabLabels] = useState([
    "Booking",
    "Miscellaneous",
  ]);

  let history = useHistory();

  var tabValues = {
    "Booking": 0,
    "Miscellaneous": 1,
  };

  const [defaultTabValue, setDefaultTabValue] = useState(location?.state?.tabSelected ? tabValues[location.state.tabSelected] : 0);

  useEffect(() => {
    BookingService.getBookingByNumber(referenceNumber, false).then((response) => {
      console.log("invoice upload", response);
      setJobs(response.data.dataItems[0]);
    })
      .catch(() => {
        console.log("error");
      });
  }, [referenceNumber]);

  return (
    <>
      <Grid item xs={12} style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Breadcrumbs aria-label="breadcrumb" classes={{
          root: classes.breadCrumRoot,
          separator: classes.separator,
        }}>
          <Link onClick={() => history.push("/transporterDashboard")} style={{ color: '#848484' }}>
          Home
          </Link>
          <Link onClick={() =>  {console.log("back button click"); history.push(`/${pageUrl}`)}} style={{ color: '#848484' }}>
          {fromPage}
          </Link>
          <span style={{ color: '#0E1B3D' }}>
          {referenceNumber}
          </span>
        </Breadcrumbs>
      </Grid>

      {/* <span style={{ fontSize: "22px",color:'#5E5E5E',fontFamily:'Dubai Medium' }}>
                    /Settlement/{referenceNumber}
                      </span>
                      <br></br><br></br> */}

      <div className="row">
        <div className="col-md-12">
          <CustomTabs
            labelList={tabLabels}
            defaultSelected={defaultTabValue}
            onSelected={(e) => {
              console.log("selected", e);
              if (e === 0) {
                setTabSelected("Booking");
                setPstate(pstate + 1);
              }
              if (e === 1) {
                setTabSelected("Miscellaneous");
                setPstate(pstate + 1);
              }
            }}
          ></CustomTabs>
        </div>
      </div>
      {jobs && <div className="row">
        <div className="col-md-12">
          {tabSelected === "Booking" && <BookingInvoice bookingData={jobs} bookingReferenceNumber={jobs.referenceNumber}
            showRecords={showBooking}
          ></BookingInvoice>}
          {tabSelected === "Miscellaneous" && <MiscellaneousInvoices bookingReferenceNumber={jobs.referenceNumber}
            bookingData={jobs} fromPage={fromPage}
          ></MiscellaneousInvoices>}
        </div>
      </div>}
    </>
  )

}
export default React.memo(InvoiceUpload);