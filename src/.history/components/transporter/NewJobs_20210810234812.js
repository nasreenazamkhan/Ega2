import React, { useEffect, useState } from "react";

import CustomizedCollapseDataTable from "../../lib/components/table/CustomizedCollapseDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import CustomTabs from "../../lib/components/tabs/CustomTabs";

import Button from "@material-ui/core/Button";
import Toast from "../../lib/components/toast/ErrorToast";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

import { withStyles, createStyles } from "@material-ui/core/styles";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { default as MuiButton } from "@material-ui/core/Button";
import { InputLabel } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import AssignTruckAndDriverService from "../../service/AssignTruckAndDriverService";
import InfoBox from "./../../lib/components/infoBox/InfoBox";
import RequestBoeService from "../../service/RequestBoeService";
import PendingJobs from "./PendingJobs";

const requestDetailsCol = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
    id: 0,
    sort: true,
    sortActive: true,
  },

  {
    name: "Booked On",
    type: COLUMN_TYPE_STRING,
    key: "creationDate",
    id: 1,
    sort: true,
    sortActive: true,
  },
  {
    name: "Containers",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfContainers",
    id: 2,
    sort: true,
    sortActive: true,
  },
  {
    name: "Trucks",
    type: COLUMN_TYPE_STRING,
    key: "noOfTrucks",
    id: 3,
    sort: true,
    sortActive: true,
  },
  {
    name: "Amount",
    type: COLUMN_TYPE_STRING,
    key: "transporterAmount",
    id: 4,
    sort: true,
    sortActive: true,
  },

  {
    name: "Expires In",
    type: COLUMN_TYPE_STRING,
    key: "expiryIn",
    id: 5,
    sort: true,
    sortActive: true,
  },
];

const containerDetailsCol = [
  { name: "Container Number", key: "container_number", id: 1 },
  { name: "Container Type", key: "containerType", id: 1 },
  { name: "PickUp  Terminal", key: "pickupLocation", id: 3 },
  { name: "Drop date and Time", key: "date_time", id: 4 },
  { name: "Drop Details", key: "dropZone", id: 5 },
  { name: "DO Expiry", key: "orderValidity", id: 6 },
];
let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?statusCode=PENTRUCK";

const searchForm = {
  fromDate: "",
  toDate: "",
  consigneeName: "",
};

const StyledButton = withStyles((theme) =>
  createStyles({
    root: {
      color: "#0568AE",
      border: "none",
      boxShadow: "none",
      float: "right",
    },
  })
)(MuiButton);

export default function NewJobs() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [formvalues] = useState(searchForm);
  const [responseMessage, setResponseMessage] = useState(
    "Booking " +
      " has been saved successfully to your pool. Please click on assign trucks button to continue with the booking or click on my jobs to view the accepted booking"
  );
  const [showToaster, setShowToaster] = useState(true);
  const [enableAddToJobsButton, setEnableAddToJobsButton] = useState(false);
  const [
    enableSupportingFilesButton,
    setEnableSupportingFilesButton,
  ] = useState(false);
  const [referenceNumbers, setReferenceNumbers] = useState();
  const [tabLabels, setTabLabels] = useState([
    "NEW JOBS",
    "PENDING JOBS",
    "START JOBS",
  ]);
  const [tabSelected, setTabSelected] = useState("NEW JOBS");

  const actions = [
    { item: 0, tip: "view", color: "#0568AE", icon: "add", icon1: "minimize" },
  ];
  let fmk;

  let history = useHistory();

  const onSearch = (values) => {
    //let finalURL=boeDetailsUrl;
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

          //onSubmit={save}
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
                    {/* <Grid item xs={3}>
                        <TextField
                          id="consigneeName"
                          label="Consignee name"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          size="small"
                          onChange={(event) => {
                            formik.values.consigneeName = event.target.value;
                            setMessage(event.target.value)
                           // setConsigneeName(event.target.value);
                          }}
                          value={message}
                        
                         
                        />
                      </Grid> */}
                    <Grid item xs={3}>
                      {/* <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#FF0000",
                            color: "#FFFFFF",
                          }}
                          //color="secondary"
                          type="submit"
                        >
                          Search
                        </Button> */}
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
      case "collapseRowChecked":
        if (row.checked) {
          // selectedData.push(row);
          setSelectedRows(selectedData);
        } else {
          // var i = selectedRows.findIndex(
          //   (e) =>
          //     e.container_number === row.container_number

          // );
          // selectedRows.splice(i, 1);
          // selectedData = selectedRows;
          selectedData = "";
          setSelectedRows("");
        }

        break;

      case "collapseRowHeaderChecked":
        if (row.checked) {
          selectedData = row;
          //  selectedData.push(row);

          setSelectedRows(selectedData);
          setEnableAddToJobsButton(true);
        } else {
          // var i = selectedRows.findIndex(
          //   (e) =>
          //     e.referenceNumber === row.referenceNumber

          // );
          // selectedRows.splice(i, 1);
          // selectedData = selectedRows;

          setEnableAddToJobsButton(false);
          selectedData = "";
          setSelectedRows("");
        }

        break;

      case "collapseHeaderChecked":
        if (element) {
          console.log(element);
          selectedData = [];
          row.forEach(function (item) {
            selectedData.push(item);
          });
          setSelectedRows(selectedData);
          setEnableAddToJobsButton(true);
        } else {
          selectedData = [];
          setSelectedRows(selectedData);
          setEnableAddToJobsButton(false);
        }
        break;

      default:
    }
    console.log("selected Data", selectedData);
    if (selectedData === "") {
      setEnableSupportingFilesButton(false);
    } else setEnableSupportingFilesButton(true);
  };

  return (
    <>
      {/* {responseMessage!=="" && 
  
//     <InfoBox
//     icon="info"
//     message={responseMessage}

//   >
    
//     </InfoBox>
    
    } */}

      <Link
        href="#"
        onClick={() => {
          console.log("back button click");
          history.push("/transporterDashboard");
        }}
      >
        <span
          style={{
            fontSize: "22px",
            color: "#0E1B3D",
            fontFamily: "Dubai Medium",
          }}
        >
          Home
        </span>
      </Link>
      <span
        style={{
          fontSize: "22px",
          color: "#5E5E5E",
          fontFamily: "Dubai Medium",
        }}
      >
        /My Jobs
      </span>
      <br></br>
      <br></br>

      {tabSelected === "NEW JOBS" && (
        <>
          {" "}
          <Button
            style={{
              width: "177px",
              height: "39px",
              background: "#168FE4 0% 0% no-repeat padding-box",
              boxShadow: "0px 1px 4px #00000029",
              borderRadius: "3px",
              opacity: 1,
              float: "right",
              marginLeft: "10px",
            }}
            disabled={!enableSupportingFilesButton}
            onClick={() => {
              console.log("Supporting file button clicked ::", selectedRows);
              RequestBoeService.fetchSupportingFiles(
                selectedRows.referenceNumber
              );
            }}
          >
            Supporting Files
          </Button>
          <Button
            style={{
              width: "154px",
              height: "41px",
              background: "#0568AE 0% 0% no-repeat padding-box",
              boxShadow: "0px 1px 4px #00000029",
              borderRadius: "3px",
              opacity: 1,
              float: "right",
            }}
            disabled={!enableAddToJobsButton}
            onClick={() => {
              console.log("Assign Truck ::", selectedRows);
              history.push("/assignTrucks", { containerData: selectedRows });
            }}
          >
            Assign Truck
          </Button>
        </>
      )}

      <CustomTabs
        labelList={tabLabels}
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
      {tabSelected === "NEW JOBS" && (
        <>
          <InputLabel
            style={{
              fontSize: "18px",
              color: "#0E1B3D",
              fontFamily: "Dubai Medium",
              marginTop: "20px",
            }}
          >
            {" "}
            *Please click on the booking number to view list of containers
            details or select a check box of booking number and click on the
            "Assign Trucks" button to proceed{" "}
          </InputLabel>

          <br></br>
          <br></br>
          <InputLabel
            style={{
              fontSize: "18px",
              color: "#0E1B3D",
              fontFamily: "Dubai Medium",
            }}
          >
            {" "}
            Displaying bookings{" "}
          </InputLabel>
          <br></br>
          <RenderSmartSearch />
          <div className="row"></div>

          <div className="row">
            <div className="col">
              <CustomizedCollapseDataTable
                refresh={pstate}
                tableKeys={requestDetailsCol}
                remote={true}
                remoteUrl={requestDetailsUrl}
                dataRootKey={"elements"}
                chkbox={true}
                actions={actions}
                collapsableTableKeys={containerDetailsCol}
                collapseTableList="containerList"
                keyTest="container_number"
                handleClick={(row, index, action, element) => {
                  console.log("inside parent handleclick");
                  addOrRemoveSelectedData(row, action, element);
                }}
                countData={(e) => console.log()}
                selectedData={selectedRows}
                groupBy={"summaryRefNo"}
              />
            </div>
          </div>
        </>
      )}
      {tabSelected === "PENDING JOBS" && (
        <PendingJobs tabSelected={tabSelected} />
      )}
      {tabSelected === "START JOBS" && (
        <PendingJobs tabSelected={tabSelected} />
      )}
    </>
  );
}
