import { validate } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import AssignTokenService from "./AssignTokenService";
import VerifyPodCard from "./VerifyPodCard";
import VerifyInvoicesMain from "./VerifyInvoicesMain";
import PaymentsMain from "./PaymentsMain";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import ErrorToast from "../../lib/components/toast/ErrorToast";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import { Breadcrumbs, makeStyles, Typography } from "@material-ui/core";
import { Link, Grid } from "@material-ui/core";
import RequestBoeService from "../../service/RequestBoeService"
import { useLocation } from "react-router-dom";
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

function VerifyDocument() {
  const classes = useStyles();
  const location = useLocation();
  const [referenceNumber, setReferenceNumber] = useState(location.state.referenceNumber);
  const [jobs, setJobs] = useState();
  const [render, setRender] = useState(0);
  const [tabSelected, setTabSelected] = useState("VERIFY POD");
  const [selectedRows, setSelectedRows] = useState([]);
  const [pstate, setPstate] = useState(0);
  const [rerender, setRerender] = useState(0);
  const [showToaster, setShowToaster] = useState(null);

  const [tabLabels, setTabLabels] = useState([
    "VERIFY POD",
    "VERIFY INVOICES",
    "PAYMENTS"

  ]);
  let history = useHistory();

  useEffect(() => {
    RequestBoeService.fetchRequestDetailsWithDocuments(referenceNumber).then((response) => {
      setJobs(response.data.dataItems[0]);
    })
      .catch(() => {
        console.log("error");
      });
  }, [referenceNumber]);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Grid item xs={12} style={{ marginBottom: '20px', marginTop: '20px' }}>
            <Breadcrumbs aria-label="breadcrumb" classes={{
              root: classes.breadCrumRoot,
              separator: classes.separator,
            }}>
              <Link onClick={() => history.push("/adminDashBoard")} style={{ color: '#848484' }}>
                Home
              </Link>
              <Link onClick={() => history.push("/verifyDocumentsAll")} style={{ color: '#848484' }}>
              Verify Documents
              </Link>
              <span style={{ color: '#0E1B3D' }}>
              {referenceNumber}
              </span>
            </Breadcrumbs>
          </Grid>
          <CustomTabs
            labelList={tabLabels}
            onSelected={(e) => {
              console.log("selected", e);
              if (e === 0) {

                setTabSelected("VERIFY POD");
                setSelectedRows([]);
                setPstate(pstate + 1);
              }
              if (e === 1) {
                setTabSelected("VERIFY INVOICES");
                setSelectedRows([]);
                setPstate(pstate + 1);
              }
              if (e === 2) {
                setTabSelected("PAYMENTS");
                setSelectedRows([]);
                setPstate(pstate + 1);
              }
            }}
          ></CustomTabs>
        </div>
      </div>
      {jobs && <div className="row">
        <div className="col-md-12">
          {tabSelected === "VERIFY POD" && <VerifyPodCard job={jobs} podCount={location.state.podCount}
          ></VerifyPodCard>}
          {tabSelected === "VERIFY INVOICES" && <VerifyInvoicesMain job={jobs}
            invoiceCount={location.state.invoiceCount}
          ></VerifyInvoicesMain>}
          {tabSelected === "PAYMENTS" && <PaymentsMain job={jobs}
            payment={true}
          ></PaymentsMain>}
        </div>
      </div>}
    </>
  )
}
export default React.memo(VerifyDocument);