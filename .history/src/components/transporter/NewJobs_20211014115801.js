import React, { useState } from "react";

import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { Breadcrumbs, InputLabel } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import RequestBoeService from "../../service/RequestBoeService";
import PendingJobs from "./PendingJobs";
import { useLocation } from "react-router-dom";
import CollapseDataTable from "../../lib/components/table/CollapseDataTable";

const requestDetailsCol = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
    id: 1,
    sort: true,
    sortActive: true,
  },
  {
    name: "Booked On",
    type: COLUMN_TYPE_STRING,
    key: "creationDate",
    id: 2,
    sort: true,
    sortActive: true,
  },
  {
    name: "Containers",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfContainers",
    id: 3,
    sort: true,
    sortActive: true,
  },
  {
    name: "Trucks",
    type: COLUMN_TYPE_STRING,
    key: "noOfTrucks",
    id: 4,
    sort: true,
    sortActive: true,
  },
  {
    name: "Amount",
    type: COLUMN_TYPE_STRING,
    key: "transporterAmount",
    id: 5,
    sort: true,
    sortActive: true,
  },
  {
    name: "Expires In",
    type: COLUMN_TYPE_STRING,
    key: "expiryIn",
    id: 6,
    sort: true,
    sortActive: true,
  },
];

const containerDetailsCol = [
  { name: "Container Number", key: "container_number", id: 1 },
  { name: "Container Type", key: "containerType", id: 2 },
  { name: "PickUp  Terminal", key: "pickupLocation", id: 3 },
  { name: "Drop Date and Time", key: "date_time", id: 4 },
  { name: "Drop Details", key: "dropZoneLabel", id: 5 },
  { name: "DO Expiry", key: "orderValidity", id: 6 },
];
let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?statusCode=PENTRUCK";

const searchForm = {
  fromDate: "",
  toDate: "",
  consigneeName: "",
};

const useStyles = makeStyles((theme) => ({
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontWeight: 600,
    fontSize: '17px'
  },
}));

const StyledButton = withStyles(() =>
  createStyles({
    root: {
      minWidth: "120px",
      height: "39px",
      backgroundColor: "#1360D2",
      boxShadow: "0px 1px 4px #00000029",
      borderRadius: "3px",
      opacity: 1,
      float: "right",
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      fontSize: '1rem',
      color: '#FFFFFF',
      marginRight:'20px'
    },
    disabled: {
      color: '#FFFFFF !important',
      background: '#AEB2BB',
      fontFamily: 'Dubai Light',
    }
  })
)(Button);


export default function NewJobs() {
  const classes = useStyles();
  const location = useLocation();
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(remoteRequestDetailsUrl);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [formvalues] = useState(searchForm);
  const [responseMessage, setResponseMessage] = useState(
    "Booking " +
    " has been saved successfully to your pool. Please click on assign trucks button to continue with the booking or click on my jobs to view the accepted booking"
  );
  const [showToaster, setShowToaster] = useState(true);
  const [enableAddToJobsButton, setEnableAddToJobsButton] = useState(false);
  const [enableSupportingFilesButton, setEnableSupportingFilesButton] = useState(false);
  const [referenceNumbers, setReferenceNumbers] = useState();
  const [transporterCode, setTransporterCode] = useState();
  const [transporterName, setTransporterName] = useState();

  const [tabLabels, setTabLabels] = useState([
    "NEW JOBS",
    "PENDING JOBS",
    "START JOBS",
  ]);
  var tabValues = {
    "NEW JOBS": 0,
    "PENDING JOBS": 1,
    "START JOBS": 2

  };
  const getKey = (val) => {
    return Object.keys(tabValues).find(key => tabValues[key] === val);
  }
  if (location?.state?.tabSelected)
    console.log("tab seeeeeelected", getKey(location.state.tabSelected));

  const [tabSelected, setTabSelected] = useState(location?.state?.tabSelected ? getKey(location.state.tabSelected) : "NEW JOBS");
  const [defaultTabValue, setDefaultTabValue] = useState(location?.state?.tabSelected ? location.state.tabSelected : 0);
  const [totalCount, setTotalCount] = useState(0);
  console.log("tab selected&&&&&&&&&&&&", tabSelected);

  const actions = [{ item: 0, tip: "view", color: "#1360D2", icon: "add", icon1: "close" },];
  let fmk;
  let history = useHistory();

  const onSearch = (values) => {
    let finalURL =
      "/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?toDate=" +
      values.toDate +
      "&fromDate=" +
      values.fromDate;
    setRequestDetailsUrl(finalURL);
    setPstate(pstate + 1);
  };

  const RenderSmartSearch = () => {
    if (showSmartSearch) {
      return (
        <Formik
          initialValues={formvalues}
          enableReinitialize
        >
          {(formik) => {
            fmk = formik;
            return (
              <>
                <Form autoComplete="off">
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={2}>
                      <AppDatePicker
                        name={"fromDate"}
                        id={"fromDate"}
                        label={"From Date"}
                        iconColor="#0568AE"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <AppDatePicker
                        name={"toDate"}
                        id={"toDate"}
                        label={"To Date"}
                        iconColor="#0568AE"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => onSearch(formik.values)}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </>
            );
          }}
        </Formik>
      );
    } else {
      return <></>;
    }
  };

  const addOrRemoveSelectedData = (row, action, element) => {
    var selectedData = row;
    switch (action) {
      case "collapseRowHeaderChecked":
        selectedData = [];
        selectedData = row;
        setSelectedRows(selectedData);
        setTransporterCode(row.assignedTransporterCode)
        setTransporterName(row.assignedTransporter);
        setEnableAddToJobsButton(true);
        break;
      default:
    }
    console.log("selected Data", selectedData);
    if (selectedData.hasSupportingDoc === false || selectedData === "") {
      setEnableSupportingFilesButton(false);
    }
    if (selectedData.hasSupportingDoc === true) {
      setEnableSupportingFilesButton(true);
    }
  };

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
          <span style={{ color: '#0E1B3D' }}>
          My Jobs
          </span>
        </Breadcrumbs>
      </Grid>

      {tabSelected === "NEW JOBS" && (
        <>
          <StyledButton
            variant="contained"
            disabled={!enableAddToJobsButton}
            onClick={() => {
              console.log("Assign Truck ::", selectedRows);
              history.push("/assignTrucks", { containerData: selectedRows ,defaultTransporter:{value:transporterCode,label:transporterCode+"-"+transporterName}});
            }}
          >
            Assign Truck
          </StyledButton>
          <StyledButton
          variant="contained"
            disabled={!enableSupportingFilesButton}
            onClick={() => {
              console.log("Supporting file button clicked ::", selectedRows);
              RequestBoeService.fetchSupportingFiles(
                selectedRows.referenceNumber
              ).then((response) => {
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
            }}
          >
            <img src="./doc_download.svg" />
            <span style={{ paddingLeft: '5px' }}>Supporting Files</span>
          </StyledButton>
        </>
      )}

      <CustomTabs
        labelList={tabLabels}
        defaultSelected={defaultTabValue}
        onSelected={(e) => {
          console.log("selected", e);
          if (e === 0) {
            let url = `/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?statusCode=PENTRUCK`;
            setRequestDetailsUrl(url);
            setTabSelected("NEW JOBS");
            setSelectedRows([]);
            setPstate(pstate + 1);
          }

          if (e === 1) {
            setTabSelected("PENDING JOBS");
            setPstate(pstate + 1);
          }

          if (e === 2) {
            setTabSelected("START JOBS");
            setPstate(pstate + 1);
          }
        }}
      ></CustomTabs>
      {tabSelected && tabSelected === "NEW JOBS" && (
        <>
          <InputLabel
            style={{
              fontSize: "16px",
              color: "#000000",
              fontWeight:600,
              fontFamily: "Dubai Regular",
              marginTop: "30px",
              marginBottom:'30px'
            }}
          >
            *Please click on the booking number to view list of containers
            details or select a check box of booking number and click on the
            "Assign Trucks" button to proceed
          </InputLabel>
          <InputLabel
            style={{
              fontSize: "16px",
              color: "#0E1B3D",
              fontWeight:600,
              fontFamily: "Dubai Regular",
              marginBottom:0
            }}
          >
            Displaying  {totalCount} bookings
          </InputLabel>
          <RenderSmartSearch />
          <div className="row"></div>
          <div className="row">
            <div className="col">
              <CollapseDataTable
                refresh={pstate}
                tableKeys={requestDetailsCol}
                remote={true}
                remoteUrl={requestDetailsUrl}
                dataRootKey={"elements"}
                chkbox={true}
                actions={actions}
                showLinks={true}
                collapsableTableKeys={containerDetailsCol}
                collapseTableList="containerList"
                keyTest="container_number"
                handleClick={(row, index, action, element) => {
                  console.log("inside parent handleclick");
                  addOrRemoveSelectedData(row, action, element);
                }}
                countData={(e) => setTotalCount(e.summaryCount)}
                selectedData={selectedRows}
                groupBy={"summaryRefNo"}
                screen={"newJob"}
              />
            </div>
          </div>
        </>
      )}
      {tabSelected && tabSelected === "PENDING JOBS" && (
        <PendingJobs tabSelected={tabSelected} onTabChange={(e) => {
          setTabSelected(e);
          setDefaultTabValue(tabValues[e]);
        }} />
      )}
      {tabSelected && tabSelected === "START JOBS" && (
        <PendingJobs tabSelected={tabSelected} onTabChange={(e) => {
          setTabSelected(e);
          setDefaultTabValue(tabValues[e]);
        }} />
      )}
    </>
  );
}
