import React, { useEffect, useState } from "react";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import { Typography } from "@material-ui/core";
import { getHttp } from '../../lib/common/HttpService';
import StatusDataTable from "../../lib/components/table/StatusDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import { useLocation } from "react-router-dom";
import * as endpointContants from '../../utils/ptmsEndpoints';
import { Formik, Form } from "formik";
import { Grid,Button } from "@material-ui/core";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import moment from 'moment';

const requestDetailsCol = [
  {
    name: "Job Number#",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
    id: 1,
  },
  {
    name: "Drop Date & Time",
    type: COLUMN_TYPE_STRING,
    key: "dateAndTime",
    id: 2,
  },
  {
    name: "Job Start Date",
    type: COLUMN_TYPE_STRING,
    key: "jobStartDate",
    id: 3,
  },
  {
    name: "Containers",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfContainers",
    id: 4,
  },
  {
    name: "Truck Name",
    type: COLUMN_TYPE_STRING,
    key: "vehicleRegNo",
    id: 5,
  },
  {
    name: "Contact Details",
    type: COLUMN_TYPE_STRING,
    key: "contactDetails",
    id: 6,
  },
  {
    name: "Track",
    type: COLUMN_TYPE_STRING,
    key: "track",
    id: 7,
  },
];

const requestDetailsColComp = [
  {
    name: "Job Number#",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
    id: 1,
  },

  {
    name: "Containers",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfContainers",
    id: 2,
  },
 
  {
    name: "FCL OUT Truck",
    type: COLUMN_TYPE_STRING,
    key: "vehicleRegNo",
    id: 4,
  },
  {
    name: "Contact Details",
    type: COLUMN_TYPE_STRING,
    key: "contactDetails",
    id: 5,
  },
  {
    name: "Track",
    type: COLUMN_TYPE_STRING,
    key: "track",
    id: 6,
  },
  {
    name: "Settlement",
    type: COLUMN_TYPE_STRING,
    key: "settlement",
    id: 7,
  },
];


const containerDetailsColInPro = [
  { name: "Container Number", key: "container_number", id: 1 },
  { name: "Pickup Location", key: "pickupLocation", id: 2 },
  { name: "FCL OUT Token", key: "tokenOut", id: 3 },
  { name: "Time Slot", key: "timeOutSlot", id: 4 },
  { name: "Action", key: "actions", id: 5 },
  { name: "eToken", key: "etoken", id: 6 }
];

const containerDetailsColDel = [
  { name: "Container Number", key: "container_number", id: 1 },
  { name: "MT IN Truck", key: "mtTruck", id: 2 },
  { name: "MT IN Token", key: "tokenIn", id: 3 },
  { name: "Requested Time Slot", key: "requestTimeInSlot", id: 4},
  { name: "Time Slot", key: "timeInSlot", id: 5 },
  { name: "PODs", key: "pods", id: 6 },
  { name: "MT IN eToken", key: "mtetoken", id: 7 },
  {name:"MT Delivered",key:"mtDel",id: 8}
];

const containerDetailsColComp = [
  { name: "Container Number", key: "container_number", id: 1 },
  { name: "FCL Token", key: "tokenOut", id: 2 },
  { name: "MT IN Truck", key: "mtTruck", id: 3 },
  { name: "MT IN Token", key: "tokenIn", id: 4 },
  { name: "Yard Location", key: "mtInYardLocation", id: 5 },
  { name: "MT Drop on", key: "timeInSlot", id: 6 },
  { name: "PODs", key: "pods", id: 7 }
  
];



  let requestDetailUrl = `${endpointContants.searchContainerAndJob}?jobStatus=INPRO`;

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

function JobDetails() {
    const [tabLabels, setTabLabels] = useState([
        "In Progress",
        "Delivered",
        "Completed",
    ]);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(requestDetailUrl);
  const [containerDetailsCol, setContainerDetailsCol] = useState(containerDetailsColInPro);
  const [formvalues] = useState(searchForm);
  const [tabSelected, setTabSelected] = useState("In Progress");
  const [selectedRows, setSelectedRows] = useState([]);
  const [pstate, setPstate] = useState(0);
  const [columnsValues, setColumnsValues] = useState([]);
  const [render, setRender] = useState(0);
  const [requestDetailsColumn, setRequestDetailsColumn] = useState(requestDetailsCol);
  const todayDate=moment(new Date());
  const yesterdayDate=moment(new Date()).subtract(1, 'days');
  const location = useLocation();
  console.log("location",location)
  let tab="";
  
  if(location.state !== undefined)
  {
    tab = location.state.tabSelected;
    
  }

  
  console.log("tabs",tab)

  useEffect(() => {

    const loadTabData = async () => {
      console.log("useEffect called")
      if(tab)
      {
       let jobStatus="";
      if(tab===0)
      {
        jobStatus="INPRO";
        setTabSelected("In Progress");
      }
      else if(tab===1)
      {
        jobStatus="FCL_DEL";
        setTabSelected("Delivered")
        }
        else if(tab===2)
        {
          jobStatus="CMPL";
        setTabSelected("Completed");
        var remoteUrl = `${endpointContants.searchContainerAndJob}?jobStatus=COMPL`;
    remoteUrl = remoteUrl + "&fromDate=" + yesterdayDate + "&toDate=" + todayDate;
    setRequestDetailsUrl(remoteUrl);
    setRequestDetailsColumn(requestDetailsColComp);
    setPstate(pstate + 1);
        }
      
      let urlRemote = `${endpointContants.searchContainerAndJob}?jobStatus=${jobStatus}`;
    
      getHttp({ url: urlRemote }, false)
        .then(response => {
          if (response.isAxiosError) {
            setColumnsValues([]);
          }
          else
          setColumnsValues(response);
         
         
  
        })
        .catch(error => {
   
        })
    
      setSelectedRows([]);
      }
      
    };
  
    loadTabData();
  }, [tab])

  const onSearch = (values) => {
    console.log("values::", values);
   var remoteUrl = `${endpointContants.searchContainerAndJob}?jobStatus=COMPL`;
    remoteUrl = remoteUrl + "&fromDate=" + values.fromDate + "&toDate=" + values.toDate;
    setRequestDetailsUrl(remoteUrl);
    setRequestDetailsColumn(requestDetailsColComp);
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
  };
  
    return (
        <>
            
      <div className="row">
          <div className="col-md-12">
            <Typography variant="h2" style={{ textAlign: "left" }}>Status</Typography>
            <br></br>
          <CustomTabs
            labelList={tabLabels}
            onSelected={(e) => {
              console.log("selected", e);
              if (e === 0) {
                let url = `${endpointContants.searchContainerAndJob}?jobStatus=INPRO`;
                setRequestDetailsUrl(url);
                setTabSelected("In Progress");
                setContainerDetailsCol(containerDetailsColInPro);
                setSelectedRows([]);
                setRequestDetailsColumn(requestDetailsCol);
                setPstate(pstate + 1);
            //     remoteUrl = remoteUrl +"?jobStatus=PTOK&requestType=JOB"
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
            //     setTabSelected("In Progress");
            //     setSelectedRows([]);
            //     setPstate(pstate + 1);
              }
              if (e === 1) {
                let url = `${endpointContants.searchContainerAndJob}?jobStatus=FCL_DEL`;
                setRequestDetailsUrl(url);
                setTabSelected("Delivered");
                setContainerDetailsCol(containerDetailsColDel);
                setSelectedRows([]);
                setRequestDetailsColumn(requestDetailsCol);
                setPstate(pstate + 1);
              }
              if (e === 2) {
                // let url = `${endpointContants.searchContainerAndJob}?jobStatus=COMPL`;
                // setRequestDetailsUrl(url);
                //setRequestDetailsColumn(requestDetailsColComp);
                setContainerDetailsCol(containerDetailsColComp);
                setTabSelected("Completed");
                setSelectedRows([]);
               // setPstate(pstate + 1);
                var remoteUrl = `${endpointContants.searchContainerAndJob}?jobStatus=COMPL`;
                remoteUrl = remoteUrl + "&fromDate=" +  yesterdayDate.format('DD/MM/YYYY') + "&toDate=" +  todayDate.format('DD/MM/YYYY') ;
                setRequestDetailsUrl(remoteUrl);
                setRequestDetailsColumn(requestDetailsColComp);
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
          <div className="row">
        <div className="col-md-12">
          <StatusDataTable
            refresh={pstate}
            tableKeys={requestDetailsColumn}
            remote={true}
            remoteUrl={requestDetailsUrl}
            dataRootKey={"elements"}
            actions={actions}
            collapsableTableKeys={containerDetailsCol}
            collapseTableList="requestContainerList"
            keyTest="container_number"
                  tabSelected={tabSelected}
                  page="status"
          />
        </div>
      </div>
          </div>
        </div>
            
            </>
    )
}

export default JobDetails;