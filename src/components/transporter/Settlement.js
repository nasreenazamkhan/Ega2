import React, { useState } from "react";
import { InputLabel, Grid, Link, IconButton, InputAdornment, makeStyles, Breadcrumbs, OutlinedInput } from "@material-ui/core";
import { COLUMN_TYPE_NUMBER, COLUMN_TYPE_STRING, } from "../../lib/common/Constants";
import { useHistory } from "react-router-dom";
//import Button from "@material-ui/core/Button";
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";
import { Clear } from "@material-ui/icons";

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
    key: "truckNumber",
    id: 3,
    sort: true,
    sortActive: true,
  },
  {
    name: "Settled Amount",
    type: COLUMN_TYPE_STRING,
    key: "settledAmount",
    id: 4,
    sort: true,
    sortActive: true,
  },
  {
    name: "Invoiced Amount",
    type: COLUMN_TYPE_STRING,
    key: "invoicedAmount",
    id: 5,
    sort: true,
    sortActive: true,
  },
];

let remoteRequestDetailsUrl = "/ptms/app/api/secure/transporter/fetchSettlementDetails";

const useOutlinedInputStyles = makeStyles(theme => ({
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

function Settlement() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );
  const [summaryCount, setSummaryCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const shrink = searchValue.length > 0;
  const actions = [{ item: 0, tip: "view", color: "#C62926", icon: "add", icon1: "minimize" }];
  let history = useHistory();
  const outlinedInputClasses = useOutlinedInputStyles();

  const useStyles = makeStyles((theme) => ({
    separator: {
      color: '#EA2428'
    },
    breadCrumRoot: {
      fontWeight: 600,
      fontSize: '17px'
    },
  }));
  const classes = useStyles();

  const handleSearchClick = async () => {
    let finalURL =
      "/ptms/app/api/secure/transporter/fetchSettlementDetails?bookingNumber="
      + searchValue;
    console.log("url", finalURL);
    setRequestDetailsUrl(finalURL);
    setPstate(pstate + 1);
  }

  return (
    <>
      <Grid container alignItems="flex-end">
        <Grid item xs={10} sm={8}>
          <OutlinedInput
                type="text"
                style={{ width: '1000px', height: '46px', marginTop:'20px' }}
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
                endAdornment= { searchValue && (
                  <IconButton
                    onClick={() => {
                      setSearchValue("");
                      setRequestDetailsUrl(remoteRequestDetailsUrl);
                      setPstate(pstate+1)
                    }}
                  ><Clear style={{fill:'#0E1B3D', fontSize:'20px'}}/>
                  </IconButton>)
                }
              />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <Breadcrumbs aria-label="breadcrumb" classes={{
          root: classes.breadCrumRoot,
          separator: classes.separator,
        }}>
          <Link onClick={() => history.push("/transporterDashboard")} style={{ color: '#848484' }}>
            Home
          </Link>
          <span style={{ color: '#0E1B3D' }}>
            Settlement
          </span>
        </Breadcrumbs>
      </Grid>
      <InputLabel style={{
              fontSize: "16px",
              color: "#000000",
              fontWeight:600,
              fontFamily: "Dubai Regular",
              marginTop: "30px",
            }}> *Please click on the booking number to view list of containers details
      </InputLabel>
      <InputLabel  style={{
              fontSize: "16px",
              color: "#0E1B3D",
              fontWeight:600,
              fontFamily: "Dubai Regular",
              marginTop: "30px",
              marginBottom:8
            }}> Displaying {summaryCount} bookings  </InputLabel>
      <div className="row">
        <div className="col">
          <CustomizedDataTable
            refresh={pstate}
            tableKeys={requestDetailsCol}
            remote={true}
            remoteUrl={requestDetailsUrl}
            dataRootKey={"elements"}
            actions={actions}
            countData={(e) => { setSummaryCount(e) }}
            handleClick={(row, index, action, element) => {
              if (row.status === 'STARTED')
                history.push('/invoiceUpload', { referenceNumber: row.referenceNumber, status: row.status, tabSelected: 'Miscellaneous' })
              else
                history.push('/invoiceUpload', { referenceNumber: row.referenceNumber, status: row.status })
            }}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(Settlement);
