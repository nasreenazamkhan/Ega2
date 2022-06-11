import React, { useEffect, useState } from "react";
import { InputLabel } from "@material-ui/core";

import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import { useHistory } from "react-router-dom";

import { Link, Grid } from "@material-ui/core";
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";
import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
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
    name: "Verify POD",
    type: COLUMN_TYPE_NUMBER,
    key: "podCount",
    id: 5,
  },

  {
    name: "Verify Invoices",
    type: COLUMN_TYPE_NUMBER,
    key: "invoiceCount",
    id: 6,
  },
  {
    name: "Settled Payments",
    type: COLUMN_TYPE_NUMBER,
    key: "paymentCount",
    id: 7,
  }


];

let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchDocumentCount";



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
  

function VerifyDocumentsAll() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [expiredBooking, setExpiredBooking] = useState(0);
  const [render, setRender] = useState(0);
  const [enableAddToContinueButton, setEnableContinueButton] = useState(false);
  const outlinedInputClasses = useOutlinedInputStyles();
  const [searchValue, setSearchValue] = useState("");

  const actions = [{ item: 0, tip: "view", color: "#C62926", icon: "add", icon1: "minimize" }];
  let fmk;

  let history = useHistory();

  const updateCount = (e) => {
    if (e) {
      setExpiredBooking(e.summaryCount);
    }
  };


  const handleSearchClick = async () => {

    let finalURL =
    "/ptms/app/api/secure/requestDetails/fetchDocumentCount"+
      
      "&bookingNumber=" +
      searchValue;
    console.log("url", finalURL);
    setRequestDetailsUrl(finalURL);
    setPstate(pstate + 1);
  }


  return (
    <>
     <Grid container alignItems="flex-end">
        <Grid item xs={10} sm={8}>
          <OutlinedInput
            style={{ width: '1000px', height: '46px' }}
            placeholder="Search with  declaration Number"
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

      <div className="row">
        <div className="col-md-12">
          <Grid container>
            <Grid item>
              <Link href="#" onClick={() => { history.push("/adminDashBoard") }}>
                <span style={{ fontSize: "22px", color: '#5E5E5E', fontFamily: 'Dubai Medium' }}>
                  Home
                </span>
              </Link>
            </Grid>
            <Grid item>
              <span style={{ fontSize: "22px", color: '#0E1B3D', fontFamily: 'Dubai Medium' }}>
                /Verify Documents
              </span>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <CustomizedDataTable
            refresh={pstate}
            tableKeys={requestDetailsCol}
            remote={true}
            remoteUrl={requestDetailsUrl}
            dataRootKey={"elements"}
            actions={actions}
            countData={(e) => { }}
            handleClick={(row, index, action, element) => {
              history.push('/verifyDocument', { referenceNumber: row.referenceNumber, podCount: row.podCount, invoiceCount: row.invoiceCount })
            }}
          />
        </div>
      </div>
    </>
  );
}
export default React.memo(VerifyDocumentsAll);
