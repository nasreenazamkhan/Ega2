import React, { useState } from "react";
import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { withStyles, createStyles, makeStyles } from "@material-ui/core/styles";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { default as MuiButton } from '@material-ui/core/Button';
import { Breadcrumbs, InputLabel, OutlinedInput } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import AssignTruckAndDriverService from "../../service/AssignTruckAndDriverService";
import InfoBox from './../../lib/components/infoBox/InfoBox';
import { IconButton, Icon, InputAdornment } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

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
  }

];

const containerDetailsCol = [
  { name: "Container Number", key: "container_number", id: 1, },
  { name: "Container Type", key: "containerType", id: 2 },
  { name: "PickUp  Terminal", key: "pickupLocation", id: 3 },
  { name: "Drop date and Time", key: "date_time", id: 4 },
  { name: "Drop Details", key: "dropZoneLabel", id: 5 },
  { name: "DO Expiry", key: "orderValidity", id: 6 },
];
let remoteRequestDetailsUrl = "/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?statusCode=PEND";

const searchForm = {
  fromDate: "",
  toDate: "",
  consigneeName: "",
};

const useOutlinedInputStyles = makeStyles(() => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#BDBDBD",
      color: "#686868",
      borderRadius: '3px',
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '14px',
      fontWeight: 600,
      borderColor: "#BDBDBD",
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '10px',
      paddingRight: '10px',
      borderColor: "#BDBDBD",
    },
    '&$focused $notchedOutline': {
      borderColor: "#BDBDBD",
      borderWidth: 1.5,
      boxShadow: '0px 0px 5px #00000029',
    },
    '&:hover $notchedOutline': {
      borderColor: "#BDBDBD !important",
      boxShadow: '0px 0px 5px #00000029',
    },
  },
  focused: {},
  notchedOutline: {},
}));

const StyleButton = withStyles(() =>
  createStyles({
    root: {
      border: "1px solid #1360D2",
      boxShadow: '0px 1px 4px #00000029',
      fontSize: "16px",
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      color: '#FFFFFF',
      padding: '4px 35px 4px 35px',
      backgroundColor: '#1360D2',
      borderRadius:'3px',
      height: '41px',
      '&:hover': {
        color: '#1360D2',
      },
    },
    disabled:{
      color: '#FFFFFF !important',
      background: '#AEB2BB',
      border: "none",
    }
  })
)(MuiButton);

export default function SearchRequests() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(remoteRequestDetailsUrl);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [formvalues] = useState(searchForm);
  const [responseMessage, setResponseMessage] = useState();
  const [showToaster, setShowToaster] = useState(true);
  const [enableAddToJobsButton, setEnableAddToJobsButton] = useState(false);
  const [referenceNumbers, setReferenceNumbers] = useState();
  const [summaryCount, setSummaryCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const shrink = searchValue.length > 0;
  const outlinedInputClasses = useOutlinedInputStyles();

  const useStyles = makeStyles(() => ({
    separator: {
      color: '#EA2428'
    },
    breadCrumRoot: {
      fontWeight: 600,
      fontSize: '17px'
    },
  }));

  const classes = useStyles();

  const actions = [{ item: 0, tip: "view", color: "#0568AE", icon: "add", icon1: "minimize" }];
  let fmk;
  let history = useHistory();

  const handleSearchClick = async () => {
    let finalURL =
      "/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?statusCode=PEND&bookingNumber=" + searchValue
    setRequestDetailsUrl(finalURL);
    setPstate(pstate + 1);
  }

  const onSearch = (values) => {
    //let finalURL=boeDetailsUrl;
    let finalURL =
      "/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?statusCode=PEND&toDate=" +
      values.toDate +
      "&fromDate=" +
      values.fromDate
    setRequestDetailsUrl(finalURL);
    formvalues.fromDate = values.fromDate;
    formvalues.toDate = values.toDate;
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
                        label={"From Booked On "}
                        iconColor="#0568AE"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <AppDatePicker
                        name={"toDate"}
                        id={"toDate"}
                        label={"To Booked On"}
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
                    <Grid item xs={1}>
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
                    <Grid item xs={1}>
                      <Link
                        style={{ textDecoration: "underline", fontSize: "16px", fontWeight: 600 }}
                        href="#"
                        onClick={() => {
                          formvalues.fromDate = "";
                          formvalues.toDate = "";
                          let finalURL =
                            "/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?statusCode=PEND"
                          setRequestDetailsUrl(finalURL);
                          setPstate(pstate + 1);
                        }}
                      >
                        Clear All
                      </Link>
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
    var selectedData = [];
    switch (action) {
      case "collapseRowChecked":
        if (row.checked) {
          selectedData = selectedRows;
          selectedData.push(row);
          setSelectedRows(selectedData);
        } else {
          var i = selectedRows.findIndex(
            (e) =>
              e.container_number === row.container_number
          );
          selectedRows.splice(i, 1);
          selectedData = selectedRows;
        }
        break;

      case "collapseRowHeaderChecked":
        if (row.checked) {
          selectedData = selectedRows;
          selectedData.push(row);
          setSelectedRows(selectedData);
          setEnableAddToJobsButton(true);
        } else {
          var i = selectedRows.findIndex(
            (e) =>
              e.referenceNumber === row.referenceNumber
          );
          selectedRows.splice(i, 1);
          selectedData = selectedRows;
          if (selectedRows.length === 0)
            setEnableAddToJobsButton(false);
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
  };

  return (
    <>
      {responseMessage &&
        <InfoBox
          icon="info"
          message={responseMessage}
          buttonNames={["My Jobs", "Assign Trucks"]}
          onSelect={(e) => {
            if (e === 'Assign Trucks') {
              history.push("/assignTrucks", { containerData: selectedRows });
            }
            if (e === 'My Jobs') {
              history.push("/newJobs", { tabSelected: 0 });
            }
          }}
        >
        </InfoBox>
      }
      <br></br>
      <Grid container alignItems="flex-end">
        <Grid item xs={10} sm={8}>
          <OutlinedInput
            type="text"
            style={{ width: '1000px', height: '46px' }}
            classes={outlinedInputClasses}
            placeholder="Search with booking number. E.g 123456789, 12456389"
            size="small"
            value={searchValue}
            variant="outlined"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            startAdornment={
              <InputAdornment position='start'>
                <IconButton onClick={handleSearchClick}>
                  <img src="./search.svg" height="20px" />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={searchValue && (
              <IconButton
                onClick={() => {
                  setSearchValue("");
                  setRequestDetailsUrl(remoteRequestDetailsUrl);
                  setPstate(pstate + 1)
                }}
              ><Clear style={{ fill: '#0E1B3D', fontSize: '20px' }} />
              </IconButton>)
            }
          />
        </Grid>
        <Grid item xs={4} >
          <Link style={{ fontFamily: 'Dubai Regular', float: 'right' }} onClick={() => {
            setShowSmartSearch(!showSmartSearch);
          }}>Smart Search</Link>

          {/* <StyledButton
                style={{paddingLeft:'20px', paddingRight:'20px',
                boxShadow: '0px 1px 5px #00000029',
                border: '1px solid #0568AE'}}
                onClick={() => {
                  setShowSmartSearch(!showSmartSearch);
                }}
              ><img src="./add_filters.svg" />
              <Typography
                style={{
                  color: "#0E1B3D",
                  fontSize: "16px",
                  fontFamily: "Dubai Regular",
                  fontWeight:600,
                  paddingLeft:'5px'
                  // marginLeft: "5%",
                }}
              >
                Add Filters
              </Typography>
              </StyledButton> */}
        </Grid>
      </Grid>
      <RenderSmartSearch />
      <Grid item xs={12} style={{marginTop: '20px' }}>
        <Breadcrumbs aria-label="breadcrumb" classes={{
          root: classes.breadCrumRoot,
          separator: classes.separator,
        }}>
          <Link onClick={() => history.push("/transporterDashboard")} style={{ color: '#848484' }}>
            Home
          </Link>
          <span style={{ color: '#0E1B3D' }}>
            Available Jobs
          </span>
        </Breadcrumbs>
      </Grid>
      <InputLabel
        style={{
          fontSize: "16px",
          color: "#000000",
          fontWeight: 600,
          fontFamily: "Dubai Regular",
          marginTop: "30px",
          marginBottom: '30px'
        }}> *Please click on the booking number to view list of containers details
        or select a check box of booking number and click on the "Add to My Jobs" button to proceed </InputLabel>
      
      <div className="row" style={{marginBottom:0}}>
        <div className="col-md-4" >
        <InputLabel
        style={{
          fontSize: "16px",
          color: "#0E1B3D",
          fontWeight: 600,
          fontFamily: "Dubai Regular",
          marginBottom: 0,
          alignmentBaseline:'baseline'
        }}> Displaying {summaryCount} bookings  </InputLabel>
        </div>
        <div className="col-md-8" >
          <StyleButton
            style={{ float: "right" }}
            disabled={!enableAddToJobsButton}
            className="float-right"
            onClick={() => {
              console.log("clicked selected Data is ", selectedRows);
              AssignTruckAndDriverService.addToMyJobs(selectedRows)
                .then((response) => {
                  console.log("response::");
                  if (response.data.dataItems.length === 1) {
                    setReferenceNumbers(response.data.dataItems.toString());
                    setResponseMessage("Booking " + response.data.dataItems.toString() + " has been saved successfully to your pool. Please click on assign trucks button to continue with the booking or click on my jobs to view the accepted booking")
                    setPstate(pstate + 1);
                  }
                  if (response.data.dataItems.length > 1) {
                    setReferenceNumbers(response.data.dataItems.toString());
                    setResponseMessage("Booking " + response.data.dataItems.toString() + " has been saved successfully to your pool. Please  click on my jobs to view the accepted booking")
                    setPstate(pstate + 1);
                  }
                })
                .catch(() => {
                  console.log("error");
                });;

            }}
          >
            Add to My Jobs
          </StyleButton>
        </div>
      </div>
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
            collapsableTableKeys={containerDetailsCol}
            collapseTableList="containerList"
            keyTest="container_number"
            handleClick={(row, index, action, element) => {
              console.log("inside parent handleclick");
              addOrRemoveSelectedData(row, action, element);
            }}
            countData={(e) => setSummaryCount(e.summaryCount)}
            selectedData={selectedRows}
            groupBy={"summaryRefNo"}
            showLinks={true}
          />
        </div>
      </div>
    </>
  );
}
