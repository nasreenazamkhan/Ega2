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
    name: "Verify POD",
    type: COLUMN_TYPE_NUMBER,
    key: "podCount",
    id: 4,
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
    id: 6,
  }
 
 
];

let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchDocumentCount";

function VerifyDocumentsAll() {
  const [pstate, setPstate] = useState(0);
  const [requestDetailsUrl, setRequestDetailsUrl] = useState(
    remoteRequestDetailsUrl
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [expiredBooking, setExpiredBooking] = useState(0);
  const [render, setRender] = useState(0);
  const [enableAddToContinueButton,setEnableContinueButton]= useState(false);

  const actions = [{ item: 0, tip: "view", color: "#C62926", icon: "add" ,icon1:"minimize"}];
  let fmk;

  let history = useHistory();

  const updateCount = (e) => {
    if (e) {
      setExpiredBooking(e.summaryCount);
    }
  };

  
  return (
    <>
      <div className="row">
          <InputLabel style={{fontSize:'22px',fontColor:'#0E1B3D',fontFamily:'Dubai Medium',marginTop:'10px'}}>Verify Documents</InputLabel>
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
        countData={(e)=>{}}
        handleClick={(row,index,action,element) => {
          history.push('/verifyDocument',{referenceNumber: row.referenceNumber })
        }}
      
      />
        </div>
      </div>
    </>
  );
}
export default React.memo(VerifyDocumentsAll);
