import React, { useEffect, useState } from "react";
import { InputLabel,Grid,Link } from "@material-ui/core";

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
    key: "truckNumber",
    id: 4,
  },
  {
    name: "Settled Amount",
    type: COLUMN_TYPE_STRING,
    key: "settledAmount",
    id: 5,
  },

  {
    name: "Invoiced Amount",
    type: COLUMN_TYPE_STRING,
    key: "invoicedAmount",
    id: 6,
  },
 
 
 
];

let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/transporter/fetchSettlementDetails";

function Settlement() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );


  const actions = [{ item: 0, tip: "view", color: "#C62926", icon: "add" ,icon1:"minimize"}];
  let fmk;

  let history = useHistory();



  
  return (
    <>
    
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
                  /Status
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
        countData={(e)=>{}}
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
