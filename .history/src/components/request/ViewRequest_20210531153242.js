import React, { useEffect, useState } from "react";

import ViewRequestDataTable from "../../lib/components/table/ViewRequestDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import { Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import { Grid,Button } from "@material-ui/core";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import moment from 'moment';
import * as endpointContants from '../../utils/ptmsEndpoints';
import { useSelector } from "react-redux";

const requestDetailsCol1 = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "bookingNumber",
    id: 1,
  },
  {
    name: "Created On",
    type: COLUMN_TYPE_STRING,
    key: "createdOn",
    id: 2,
  },
  {
    name: "Amount Paid",
    type: COLUMN_TYPE_STRING,
    key: "amountPaid",
    id: 3,
  },
  {
    name: "Containers in Yard",
    type: COLUMN_TYPE_NUMBER,
    key: "containersInYard",
    id: 4,
  },
  {
    name: "Truck Type",
    type: COLUMN_TYPE_STRING,
    key: "truckList",
    id: 5,
  },
  {
    name: "Download Receipt",
    type: COLUMN_TYPE_STRING,
    key: "downloadReciept",
    id: 6,
  },
  
];

const requestDetailsColForConfirmed = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "bookingNumber",
    id: 1,
  },
  {
    name: "Created On",
    type: COLUMN_TYPE_STRING,
    key: "createdOn",
    id: 2,
  },
  {
    name: "Amount Paid",
    type: COLUMN_TYPE_STRING,
    key: "amountPaid",
    id: 3,
  },
  {
    name: "Containers in Yard",
    type: COLUMN_TYPE_NUMBER,
    key: "containersInYard",
    id: 4,
  },
  {
    name: "Containers Confirmed",
    type: COLUMN_TYPE_NUMBER,
    key: "containersConfirmed",
    id: 5,
  },
  {
    name: "Truck Type",
    type: COLUMN_TYPE_STRING,
    key: "truckList",
    id: 6,
  },
  
  {
    name: "Download Receipt",
    type: COLUMN_TYPE_STRING,
    key: "downloadReciept",
    id: 7,
  },
 
];

const requestDetailsColForProgress = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "bookingNumber",
    id: 1,
  },
  {
    name: "Created On",
    type: COLUMN_TYPE_STRING,
    key: "createdOn",
    id: 2,
  },
  {
    name: "Amount Paid",
    type: COLUMN_TYPE_STRING,
    key: "amountPaid",
    id: 3,
  },
  {
    name: "Containers Booked",
    type: COLUMN_TYPE_NUMBER,
    key: "containersBooked",
    id: 4,
  },
  {
    name: "Containers to town",
    type: COLUMN_TYPE_NUMBER,
    key: "containersToTown",
    id: 5,
  },
  {
    name: "Balance In Yard",
    type: COLUMN_TYPE_STRING,
    key: "containersInYard",
    id: 6,
  },
  {
    name: "Truck Type",
    type: COLUMN_TYPE_STRING,
    key: "truckList",
    id: 7,
  },
  {
    name: "Download Receipt",
    type: COLUMN_TYPE_STRING,
    key: "downloadReciept",
    id: 8,
  },
 
];

const requestDetailsColDelivered = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "bookingNumber",
    id: 1,
  },
  {
    name: "Created On",
    type: COLUMN_TYPE_STRING,
    key: "createdOn",
    id: 2,
  },
  {
    name: "Amount Paid",
    type: COLUMN_TYPE_STRING,
    key: "amountPaid",
    id: 3,
  },
  {
    name: "Containers Booked",
    type: COLUMN_TYPE_NUMBER,
    key: "containersBooked",
    id: 4,
  },
  {
    name: "Containers Delivered",
    type: COLUMN_TYPE_NUMBER,
    key: "containersDelivered",
    id: 5,
  },

  {
    name: "Truck Type",
    type: COLUMN_TYPE_STRING,
    key: "truckList",
    id: 6,
  },
  {
    name: "Download Receipt",
    type: COLUMN_TYPE_STRING,
    key: "downloadReciept",
    id: 7,
  },
 
];

const requestDetailsColCompleted = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "bookingNumber",
    id: 1,
  },
  {
    name: "Created On",
    type: COLUMN_TYPE_STRING,
    key: "createdOn",
    id: 2,
  },
  {
    name: "Amount Paid",
    type: COLUMN_TYPE_STRING,
    key: "amountPaid",
    id: 3,
  },
  {
    name: "Containers Booked",
    type: COLUMN_TYPE_NUMBER,
    key: "containersBooked",
    id: 4,
  },
  {
    name: "Empty Containers Delivered",
    type: COLUMN_TYPE_NUMBER,
    key: "emptyContainersDelivered",
    id: 5,
  },

  {
    name: "Truck Type",
    type: COLUMN_TYPE_STRING,
    key: "truckList",
    id: 6,
  },
  {
    name: "Download Receipt",
    type: COLUMN_TYPE_STRING,
    key: "downloadReciept",
    id: 7,
  },
 
];


const containerDetailsCol = [
  { name: "Container Number", key: "container_number", id: 1 },
  { name: "Consignee Details", key: "consigneeDetails", id: 2 },
  { name: "Declaration Number", key:"boeNumber",id: 3},
  { name: "Pickup Location", key: "pickupLocation", id: 4},
  { name: "Drop Location", key: "dropZone", id: 5 },
  { name: "Date and Time", key: "date_time", id: 6 },
  {name: "Truck Type",key:"refVehicleTypeName",id:7},
  { name: "Track", key: "track", id: 8 },
  { name: "Action", key: "action", id: 9 }
 
];
let remoterequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchAllRequestDetails?statusCode=PEND";

const actions = [{ item: 0, tip: "view", color: "#0568AE", icon: "add", icon1: "minimize" }];

const todayDate=moment(new Date());
const yesterdayDate = moment(new Date()).subtract(1, 'days');

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

function ViewRequest(props) {
  const [tabLabels, setTabLabels] = useState([
    "Pending",
    "Confirmed",
    "In Progress",
    "Delivered",
    "Completed",
  ]);
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoterequestDetailsUrl
  );
  const [formvalues] = useState(searchForm);
  const [tabSelected, setTabSelected] = useState("Pending");
  const [selectedRows, setSelectedRows] = useState([]);
  const [requestDetailsCol, setRequestDetailsCol] = useState(requestDetailsCol1);
  
  const user = useSelector(state => state.loginUser.user);
  console.log("userType:::::::::::::::in viewRequest", user.user_type);
  const [userType, setUserType] = useState(user.user_type);

  const onSearch = (values) => {
    console.log("values::", values);
   var remoteUrl = `${endpointContants.searchContainer}?statusCode=MT_DEL`;
    remoteUrl = remoteUrl + "&fromDate=" + values.fromDate + "&toDate=" + values.toDate;
    setRequestDetailsUrl(remoteUrl);
    setRequestDetailsCol(requestDetailsColCompleted)
    setPstate(pstate + 1);
            //     getHttp({ url: remoteUrl }, false)
            //       .then(response => {
            //         if (response.isAxiosError) {
            //           setColumnsValues([]);
            //         } else {
            //           setColumnsValues(response);
            //           console.log("response for in progress jobs", response);
            //         }
            // })
            // .catch(error => {
               
            // })
            searchForm.fromDate=values.fromDate;
            searchForm.toDate=values.toDate;
    
  };

  return (
    <>
     <div className="row">
        <div className="col">
          <Typography variant="h1" style={{ textAlign: "left" }}>STATUS</Typography>
          <br></br>
          <CustomTabs
            labelList={tabLabels}
            onSelected={(e) => {
              console.log("selected", e);
              if (e === 0) {
                let url = `/ptms/app/api/secure/requestDetails/fetchAllRequestDetails?statusCode=PEND`;
                setRequestDetailsUrl(url);
                setTabSelected("Pending");
                setSelectedRows([]);
                setRequestDetailsCol(requestDetailsCol1);
                setPstate(pstate + 1);
              }
              if (e === 1) {
                let url = `/ptms/app/api/secure/requestDetails/fetchAllRequestDetails?statusCode=CONF`;
               
                setRequestDetailsUrl(url);
                setTabSelected("Confirmed");
                setSelectedRows([]);
                setRequestDetailsCol(requestDetailsColForConfirmed);
                setPstate(pstate + 1);
              }
              if (e === 2) {
                let url = `/ptms/app/api/secure/requestDetails/fetchAllRequestDetails?statusCode=INPRO`;
                setRequestDetailsUrl(url);
                setTabSelected("In Progress");
                setSelectedRows([]);
                setRequestDetailsCol(requestDetailsColForProgress);
                setPstate(pstate + 1);
              }
              if (e === 3) {
                let url = `/ptms/app/api/secure/requestDetails/fetchAllRequestDetails?statusCode=FCL_DEL`;
                setRequestDetailsUrl(url);
                setTabSelected("Delivered");
                setSelectedRows([]);
                setRequestDetailsCol(requestDetailsColDelivered);
                setPstate(pstate + 1);
              }
              if (e === 4) {
                let url = `${endpointContants.searchContainer}?statusCode=MT_DEL` + "&fromDate=" + yesterdayDate.format('DD/MM/YYYY') + "&toDate=" + todayDate.format('DD/MM/YYYY');
                setRequestDetailsUrl(url);
                setTabSelected("Completed");
                setRequestDetailsCol(requestDetailsColCompleted)
                setSelectedRows([]);
                setPstate(pstate + 1);
              }
            }}
          ></CustomTabs>
        </div>
      </div> 
      {tabSelected==="Completed"  && <div>
          <Formik initialValues={formvalues} enableReinitialize>
            {(formik) => {
            
              return (
                <>
                  <Form autoComplete="off">
                    <ThemeProvider theme={Theme}>
                      <Grid container spacing={1}>
                        <Grid item xs={2}>
                          <AppDatePicker
                            name={"fromDate"}
                            id={"fromDate"}
                            label={"From Date"}
                            iconColor="#0E1B3D"
                            defaultDate={yesterdayDate}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <AppDatePicker
                            name={"toDate"}
                            id={"toDate"}
                            label={"To Date"}
                            iconColor="#0E1B3D"
                        defaultDate={todayDate}
                          />
                        </Grid>
                     

                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#0E1B3D",
                              color: "#FFFFFF",
                              marginTop: "7px",
                            }}
                           onClick={() => onSearch(formik.values)}
                          >
                            Search
                        </Button>
                        </Grid>
                      </Grid>
                    </ThemeProvider>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>}
      <div className="row">
        <div className="col-md-12">
          <ViewRequestDataTable
           
            refresh={pstate}
            tableKeys={requestDetailsCol}
            remote={true}
            remoteUrl={requestDetailsUrl}
            dataRootKey={"elements"}
            actions={actions}
            collapsableTableKeys={containerDetailsCol}
            collapseTableList="containerList"
            keyTest="container_number"
            tabSelected={tabSelected}
            page="viewRequest"
          userType={userType}
          />
        </div>
      </div>
    </>
  );
}

export default ViewRequest;
