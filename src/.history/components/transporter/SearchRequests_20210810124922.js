import React, { useEffect, useState } from "react";

import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
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

import { withStyles,createStyles } from "@material-ui/core/styles";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { default as MuiButton } from '@material-ui/core/Button';
import {  InputLabel } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import AssignTruckAndDriverService from "../../service/AssignTruckAndDriverService";
import InfoBox from './../../lib/components/infoBox/InfoBox';


const requestDetailsCol = [
  {
    name: "Booking Number",
    type: COLUMN_TYPE_STRING,
    key: "referenceNumber",
    id: 1,
  },

  {
    name: "Booked On",
    type: COLUMN_TYPE_STRING,
    key: "creationDate",
    id: 3,
  },
  {
    name: "Containers",
    type: COLUMN_TYPE_NUMBER,
    key: "noOfContainers",
    id: 3,
  },
  {
    name: "Trucks",
    type: COLUMN_TYPE_STRING,
    key: "truckNumber",
    id: 4,
  },
  {
    name: "Amount",
    type: COLUMN_TYPE_STRING,
    key: "transporterAmount",
    id: 4,
  },

  {
    name: "Expires In",
    type: COLUMN_TYPE_STRING,
    key: "expiryIn",
    id: 6,
  }
 
];

const containerDetailsCol = [
  { name: "Container Number", key: "container_number", id: 1 },
  { name: "Container Type", key: "containerType", id: 1 },
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

const StyledButton= withStyles((theme) =>
createStyles({
    root: {
       color:'#0568AE' ,
       border:"none",
       boxShadow: "none",
       float:"right"
    }
}

)
)(MuiButton);


export default function SearchRequests() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(remoteRequestDetailsUrl);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [formvalues] = useState(searchForm);
  const [responseMessage,setResponseMessage] = useState();
  const [showToaster, setShowToaster] = useState(true);
  const [enableAddToJobsButton,setEnableAddToJobsButton]= useState(false);
  const [referenceNumbers,setReferenceNumbers]=useState();
  const [summaryCount,setSummaryCount]=useState(0);



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
      values.fromDate 
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
                    
                          onClick={()=>onSearch(formik.values)} 
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

            setEnableAddToJobsButton(false);
         
        }

        break;

      case "collapseHeaderChecked":
        if (element) {
          console.log(element);
          selectedData=[];
           row.forEach(function (item) {
              
               selectedData.push(item);
           
           });
          setSelectedRows(selectedData);
          setEnableAddToJobsButton(true);
        } else {

          selectedData=[];
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
    buttonNames={["My Jobs","Assign Trucks"]}
    onSelect={(e)=>{
      if(e==='Assign Trucks')
      {
        history.push("/assignTrucks", { containerData: selectedRows });
      }
    }}

  >
    
    </InfoBox>
    
    }

      <Link href="#" onClick={()=>{console.log("back button click");history.push("/transporterDashboard",)}}>
     <span style={{ fontSize: "22px",color:'#0E1B3D' ,fontFamily:'Dubai Medium' }}>
                    Home
                      </span>
      </Link> 
      <span style={{ fontSize: "22px",color:'#5E5E5E',fontFamily:'Dubai Medium' }}>
                    /Available Jobs
                      </span>
                      <br></br><br></br>


    <InputLabel style={{ fontSize: "18px",color:'#0E1B3D',fontFamily:'Dubai Medium'  }}> *Please click on the booking number to view list of containers details
    or select a check box of booking number and click on the "Add to My Jobs" button to proceed </InputLabel>

    <br></br><br></br>
    <InputLabel style={{ fontSize: "18px",color:'#0E1B3D',fontFamily:'Dubai Medium' }}> Displaying {summaryCount} bookings  </InputLabel>    
      <br></br>
      <RenderSmartSearch />
      <div className="row">
     

        <div className="col-md-12"  style={{borderBottom:'3px solid #E1E1E1'}}>
          <Button
            variant="contained"
            color="secondary"         
            style={{ float: "right"}}
            disabled={!enableAddToJobsButton}
            className="float-right"
            onClick={() => {
              console.log("clicked selected Data is ", selectedRows);
              AssignTruckAndDriverService.addToMyJobs(selectedRows)
              .then((response) => {
                console.log("response::");
                if(response.data.dataItems.length===1)
                {
                setReferenceNumbers(response.data.dataItems.toString());
                setResponseMessage("Booking " + response.data.dataItems.toString() +" has been saved successfully to your pool.Please click on assign trucks button to continue with the booking or click on my jobs to view the accepted booking")
                }
                if(response.data.dataItems.length>1)
                {
                setReferenceNumbers(response.data.dataItems.toString());
                setResponseMessage("Booking " + response.data.dataItems.toString() +" has been saved successfully to your pool.Please  click on my jobs to view the accepted booking")
                }
             
              })
      
              .catch((error) => {
                console.log("error");
              });;
            
            }}
          >
            Add to My Jobs
          </Button>
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
            countData={(e)=>setSummaryCount(e.summaryCount)}
            selectedData={selectedRows}
            groupBy={"summaryRefNo"}
          />
        </div>
      </div>
    </>
  );
}
