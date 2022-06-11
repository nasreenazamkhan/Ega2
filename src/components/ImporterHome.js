import React from "react";
import { Link } from "react-router-dom";
import CustomTabs from '../lib/components/tabs/CustomTabs'





function ImporterHome() {

  const labels=['Test1','Test2','Test3'];
    return (
        <div>
          <CustomTabs labelList={labels}/>

          <li>Shipper / Clearing Agent</li>
        <ul>
          <Link to="/myRequests"> <li> Search BOE Requests</li></Link>
         <Link to="/addAddress">
          <li>Add Address </li>
          </Link>
          <Link to="/saveRequest">
          <li>Save Request</li>
          </Link>
          <Link to="/stepper">
          <li>Test</li>
          </Link>
          {/* <Link to="/deliverContainer">
          <li>Deliver Container</li>
          </Link> */}
           <Link to="/requestMain">
          <li>Stepper</li>
          </Link>
        </ul>
        </div>
    );


}

export default ImporterHome;