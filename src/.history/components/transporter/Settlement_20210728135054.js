import React, { useEffect, useState } from "react";
import JobService from "../../service/JobService";
import SettlementSubForm from "./SettlementSubForm";
import { InputLabel ,Paper,Grid,Typography,Button} from "@material-ui/core";
import moment from 'moment';
import { Formik, Form } from "formik";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
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
    type: COLUMN_TYPE_STRING,
    key: "amountPaid",
    id: 4,
  },

  {
    name: "Invoiced Amount",
    type: COLUMN_TYPE_STRING,
    key: "invoicedAmount",
    id: 5,
  },
 
 
 
];

let remoteRequestDetailsUrl =
  "/ptms/app/api/secure/requestDetails/fetchSettlementDetails";

function Settlement() {
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
          <InputLabel style={{fontSize:'22px',fontColor:'#0E1B3D',fontFamily:'Dubai Medium',marginTop:'10px'}}>Settlement</InputLabel>
      </div>
      <div className="row">
          <InputLabel style={{fontSize:'18px',fontColor:'#000000',fontFamily:'Dubai Regular'}}>*Please click on the booking number to view list of container details.</InputLabel>
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
          history.push('/verifyDocument',{referenceNumber: row.referenceNumber,podCount:row.podCount,invoiceCount:row.invoiceCount })
        }}
      
      />
        </div>
      </div>
    </>
  );
}
export default React.memo(VerifyDocumentsAll);


export default React.memo(Settlement);
