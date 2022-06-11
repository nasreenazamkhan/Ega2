import { Breadcrumbs, Grid, makeStyles } from "@material-ui/core";
import { validate } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import PaymentSummary from '../request/PaymentSummary';
import MiscellaneousPayment from './MiscellaneousPayment';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontFamily: 'Dubai Regular',
    fontWeight: 600,
    fontSize: '17px'
  },
}));


function ImporterPayment() {
  const location = useLocation();
  const [tabSelected, setTabSelected] = useState(location.state?.statusSelectedTab == 'MISCELLANEOUS INVOICES' ? "Miscellaneous" : "Booking");
  const classes = useStyles();
  let history = useHistory();

  const [tabLabels, setTabLabels] = useState([
    "Booking",
    "Miscellaneous",
  ]);
  console.log("location.state", location)

  return (
    <>
      <Grid container style={{ marginTop: '16px' }}>
        <Grid item xs={12} style={{ marginBottom: 0 }}>
          <Breadcrumbs aria-label="breadcrumb" classes={{
            root: classes.breadCrumRoot,
            separator: classes.separator,
          }}>
            <Link href="#" onClick={() => history.push("/status", { url: location.state?.url })} style={{ color: '#848484' }}>
              Status
            </Link>
            {location.state?.statusSelectedTab !== 'ALL' && <Link href="#" onClick={(e) => e.preventDefault()} style={{ color: '#848484' }}>
              {location.state?.statusSelectedTab == 'VERIFY POD' ? 'Verify POD' : 'Miscellaneous'}
            </Link>}
            <span style={{ color: '#0E1B3D' }}>
              {location.state?.statusData.bookingNumber}
            </span>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <div className="row" style={{ marginBottom: '0px'}}>
        <div className="col-md-12">
          <CustomTabs
            labelList={tabLabels}
            defaultSelected={location.state?.statusSelectedTab == 'MISCELLANEOUS INVOICES' ? 1 : 0}
            onSelected={(e) => {
              console.log("selected", e);
              if (e === 0) {
                setTabSelected("Booking");
              }
              if (e === 1) {
                setTabSelected("Miscellaneous");
              }
            }}
          ></CustomTabs>
        </div>
      </div>
      {<div className="row" style={{ marginBottom: '0px' }}>
        <div className="col-md-12">
          {tabSelected === "Booking" &&
            <PaymentSummary statusData={location.state?.statusData} paymentSummary={location.state?.paymentSummary} url={location.state?.url}>
            </PaymentSummary>}
          {tabSelected === "Miscellaneous" &&
            <MiscellaneousPayment  showRecords={location.state?.showRecords} statusData={location.state?.statusData} statusSelectedTab={location.state?.statusSelectedTab} paymentSummary={location.state?.paymentSummary}>
            
            </MiscellaneousPayment>}
        </div>
      </div>}
    </>
  )

}
export default React.memo(ImporterPayment);