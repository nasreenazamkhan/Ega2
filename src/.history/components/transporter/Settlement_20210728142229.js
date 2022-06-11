import React, { useEffect, useState } from "react";
import { InputLabel } from "@material-ui/core";

import CollapseDataTable from "../../lib/components/table/CollapseDataTable";
import {
  COLUMN_TYPE_NUMBER,
  COLUMN_TYPE_STRING,
} from "../../lib/common/Constants";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";
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
    name: "Amount Paid",
    type: COLUMN_TYPE_NUMBER,
    key: "amountPaid",
    id: 4,
  },

  {
    name: "Invoiced Amount",
    type: COLUMN_TYPE_NUMBER,
    key: "invoicedAmount",
    id: 5,
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
      <div className="row">
          <InputLabel style={{fontSize:'22px',fontColor:'#0E1B3D',fontFamily:'Dubai Medium',marginTop:'10px'}}>Settlement</InputLabel>
      </div>
      <div className="row">
          <InputLabel style={{fontSize:'18px',fontColor:'#000000',fontFamily:'Dubai Regular'}}>*Please click on the booking number to view list of container details.</InputLabel>
      </div>

  
      {/* <div className="row">
        
    
    

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
          history.push('/invoiceUpload',{referenceNumber: row.referenceNumber,status:row.status})
        }}
      
      />
        </div> 
      </div>*}
    </>
  );
}



export default React.memo(Settlement);
