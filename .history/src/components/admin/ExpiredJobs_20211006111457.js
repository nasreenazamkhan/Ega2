import React, { useEffect, useState } from "react";


import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import { useHistory } from "react-router-dom";
import {  makeStyles, } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { IconButton, Icon, InputAdornment, OutlinedInput } from "@material-ui/core";

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
    id: 2,
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
    key: "noOfTrucks",
    id: 4,
  },
  {
    name: "Amount",
    type: COLUMN_TYPE_STRING,
    key: "amount",
    id: 5,
  },

  {
    name: "Expires In",
    type: COLUMN_TYPE_STRING,
    key: "expiryIn",
    id: 6,
  }
 
];

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#BDBDBD",
      color: "#686868",
      borderRadius: '3px',
      boxShadow: '0px 0px 5px #00000029',
    },
    '&$focused $notchedOutline': {
      borderColor: "#BDBDBD",
      borderWidth: 1.5,
      boxShadow: '0px 0px 5px #00000029',
    },
    '&:hover $notchedOutline':{
      borderColor: "#BDBDBD !important",
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '14px',
      fontWeight: 600,
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },
  focused: {},
  notchedOutline: {},
}));




const containerDetailsCol = [
  { name: "Container Number", key: "container_number", id: 1 },
  { name: "Container Type", key: "containerType", id: 1 },
  { name: "PickUp  Terminal", key: "pickupLocation", id: 3 },
  { name: "Drop date and Time", key: "date_time", id: 4 },
  { name: "Drop Details", key: "dropZoneLabel", id: 5 },
  { name: "DO Expiry", key: "orderValidity", id: 6 },
];

let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchRequestDetailsSummary?statusCode=EXPIRED";

function ExpiredJobs() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [expiredBooking, setExpiredBooking] = useState(0);
  const [render, setRender] = useState(0);
  const [enableAddToContinueButton,setEnableContinueButton]= useState(false);
  const outlinedInputClasses = useOutlinedInputStyles();


  const actions = [{ item: 0, tip: "view", color: "#C62926", icon: "add" ,icon1:"minimize"}];
  let fmk;

  let history = useHistory();

  const updateCount = (e) => {
    if (e) {
      setExpiredBooking(e.summaryCount);
    }
  };

  const removeContainersSelected = (row) => {
    var i = 0;
    while (i < selectedRows.length) {
      if (
        selectedRows[i].container_number ===
        row.containerList[0].container_number
      ) {
        selectedRows.splice(i, 1);
      } else {
        ++i;
      }
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
          setEnableContinueButton(true);
        } else {
         
            var i = selectedRows.findIndex(
              (e) =>
                e.referenceNumber === row.referenceNumber 
               
            );
            selectedRows.splice(i, 1);
            selectedData = selectedRows;

            setEnableContinueButton(false);
         
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
          setEnableContinueButton(true);
        } else {

          selectedData=[];
          setSelectedRows(selectedData);
          setEnableContinueButton(false);
        
        
        }
        break;

      default:
    }
    console.log("selected Data", selectedData);
  };
  return (
    <>
         <Grid container alignItems="flex-end">
        <Grid item xs={10} sm={8}>
          <OutlinedInput
            style={{ width: '1000px', height: '46px' }}
            placeholder="Search with Booking Number"
            classes={outlinedInputClasses}
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            color="secondary"
           
           
            startAdornment= {
              <InputAdornment position="start">
                <IconButton onClick={handleSearchClick}>
                  <Icon >search</Icon>
                </IconButton>
              </InputAdornment>
            }
            endAdornment= {
              <InputAdornment >
                <IconButton onClick={()=>{
                  setSearchValue("");
                  setRequestDetailsUrl("/ptms/app/api/secure/requestDetails/fetchDocumentCount");
                  setPstate(pstate + 1);}}>
                <Icon >clear</Icon>
                </IconButton>
              </InputAdornment>
                }
              
          />
        </Grid>
        </Grid>
      <div className="row"></div>

      <div className="row">
         <div className="col-md-6"   style={{borderBottom:'3px solid #E1E1E1'}}>
          {/* <InputLabel style={{ color: "#0568AE" }}>
            {" "}
            {expiredBooking} bookings expired
          </InputLabel> */}
        </div> 

        <div className="col-md-6"   style={{borderBottom:'3px solid #E1E1E1'}}>
          <Button
            variant="contained" 
            color="secondary"      
            style={{ float: "right"
            }}
            disabled={selectedRows.length === 0}
            className="float-right"
            onClick={() => {
              console.log("clicked selected Data is ", selectedRows);
              history.push("/assignTruckAdmin", {
                containerData: selectedRows,
              });
            }}
          >
            Continue
          </Button>
        </div>
    
    

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
            countData={(e) => updateCount(e)}
            selectedData={selectedRows}
            groupBy={"summaryRefNo"}
            showLinks={true}
          />
        </div>
      </div>
    </>
  );
}
export default React.memo(ExpiredJobs);
