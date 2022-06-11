import React, { useEffect, useState } from "react";
import { InputLabel,Grid,Link,IconButton ,Icon,InputAdornment,TextField ,makeStyles} from "@material-ui/core";

import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import { useHistory } from "react-router-dom";

//import Button from "@material-ui/core/Button";
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";
import { EndOfLineState } from "typescript";

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

let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/transporter/fetchSettlementDetails";

function Settlement() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );
  const [summaryCount, setSummaryCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const shrink = searchValue.length > 0;


  const actions = [{ item: 0, tip: "view", color: "#C62926", icon: "add" ,icon1:"minimize"}];
  let fmk;

  let history = useHistory();

  const useStyles = makeStyles((theme) => ({

    notchedOutline: {
      borderWidth: '1px',
      borderColor: '#BDBDBD !important'
    },
    inputLabelNoShrink: {
      transform: "translate(55px, 24px) scale(1)"
    },
    cssLabel:
    {
      color : '#848484',
      fontFamily:'Dubai Regular'
  
    }
  }));
  const classes = useStyles();

  const handleSearchClick = async () => {
   
    let finalURL =
      "/ptms/app/api/secure/transporter/fetchSettlementDetails?bookingNumber="
      +searchValue;
    console.log("url", finalURL);
    setRequestDetailsUrl(finalURL);
    setPstate(pstate + 1);
  }




  
  return (
    <>
      <Grid container alignItems="flex-end">
          <Grid item xs={10} sm={8}>
       
            <TextField
        label="Search with Booking Number"
        variant="outlined"
        fullWidth 
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
         color="secondary"
         InputLabelProps={{
          shrink: shrink,
          className: shrink ? undefined : classes.inputLabelNoShrink,

          classes: {
            root: classes.cssLabel,
         
          },
        }}
        InputProps={{
          classes: {
           
            notchedOutline: classes.notchedOutline,
          },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearchClick}>
                <Icon >search</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment >
              <IconButton onClick={()=>{
                setSearchValue("");
                setRequestDetailsUrl("/ptms/app/api/secure/transporter/fetchSettlementDetails");
                setPstate(pstate + 1);}}>
              <Icon >clear</Icon>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
            </Grid>
            </Grid>
    
      <Grid container>
          <Grid item>
          <Link href="#" onClick={()=>{history.push("/transporterDashboard")}}>
     <span style={{ fontSize: "22px",color:'#0E1B3D' ,fontFamily:'Dubai Medium' }}>
                    Home
                      </span>
      </Link> 

          </Grid>
          <Grid item>
          <span style={{ fontSize: "22px",color:'#5E5E5E',fontFamily:'Dubai Medium' }}>
                  /Settlement
                      </span>


            </Grid>
            </Grid>
      <br></br>
      <InputLabel style={{ fontSize: "18px",color:'#0E1B3D',fontFamily:'Dubai Medium'  }}> *Please click on the booking number to view list of containers details
  </InputLabel>

  <br></br>

  <InputLabel style={{ fontSize: "18px",color:'#0E1B3D',fontFamily:'Dubai Medium' }}> Displaying {summaryCount} bookings  </InputLabel> 

       <div className="row">
        
    
    

        <div className="col">
              <CustomizedDataTable
        refresh={pstate}
        tableKeys={requestDetailsCol}
        remote={true}
        remoteUrl={requestDetailsUrl}
        dataRootKey={"elements"}
        actions={actions}
        countData={(e)=>{setSummaryCount(e)}}
        handleClick={(row,index,action,element) => {
          if(row.status==='STARTED')
          history.push('/invoiceUpload',{referenceNumber: row.referenceNumber,status:row.status,tabSelected:'Miscellaneous'})
          else
          history.push('/invoiceUpload',{referenceNumber: row.referenceNumber,status:row.status})
        }}
      
      />
        </div>
      </div> 
    </>
  );
}



export default React.memo(Settlement);
