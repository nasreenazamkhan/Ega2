// import React, { useEffect, useState } from "react";
// import AssignTokenService from "./AssignTokenService";
// import * as endpointContants from '../../utils/ptmsEndpoints';


// import {
//   COLUMN_TYPE_NUMBER,
//   COLUMN_TYPE_STRING,
// } from "../../lib/common/Constants";
// import CustomTabs from "../../lib/components/tabs/CustomTabs";
// import { FormProvider} from "react-hook-form";

// const requestDetailsCol1 = [
//     {
//       name: "Consignee Name",
//       type: COLUMN_TYPE_STRING,
//       key: "consigneeName",
//       id: 1,
//     },
//     {
//       name: "Date & Time",
//       type: COLUMN_TYPE_STRING,
//       key: "dateAndTime",
//       id: 2,
//     },
//     {
//       name: "Truck Number",
//       type: COLUMN_TYPE_STRING,
//       key: "vehicleRegNo",
//       id: 3,
//     },
//     {
//       name: "Truck Type",
//       type: COLUMN_TYPE_NUMBER,
//       key: "vehicleType",
//       id: 4,
//     },
//     {
//       name: "Location",
//       type: COLUMN_TYPE_STRING,
//       key: "contactDetails",
//       id: 5,
//     },
  
// ];
  
// const containerDetailsCol = [
//     { name: "Container Number", key: "container_number", id: 1 },
//     { name: "Declaration#", key: "boeNumber", id: 2 },
//     { name: "Booking#", key: "requestDetailsNumber", id: 3 },
//     { name: "Pickup", key: "pickupLocation", id: 4 },
//     { name: "Token Number", key: "token", id: 5 },
//     { name: "Token slot", key: "timeSlot", id: 6 },
    
//   ];
// let remoterequestDetailsUrl =
//     endpointContants.fetchPendingTokenJobs;
  
// const actions = [{ item: 0, tip: "view", color: "red", icon: "add" }];
  
// export default function AssignTokentoJob() {

//     const [tabLabels, setTabLabels] = useState([
//         "FCL OUT",
//         "EMPTY IN",
        
//       ]);
//       const [pstate, setPstate] = useState(0);
//       const [requestDetailsUrl, setRequestDetailsUrl] = useState(
//         remoterequestDetailsUrl
//       );
    
//       const [tabSelected, setTabSelected] = useState("Pending");
//       const [selectedRows, setSelectedRows] = useState([]);
//       const [requestDetailsCol, setRequestDetailsCol] = useState(requestDetailsCol1);

//     useEffect(() => {
       
//         const loadPendingTokenJobs = async () => {
//             AssignTokenService.fetchPendingTokenJobs()
//             .then((response) => {
//                 console.log("response for pending jobs", response);
//             })
//             .catch(() => {
//               console.log("error");
//             });
//         };
    
//         loadPendingTokenJobs();
//     }, []);
    
//     return (
//         <>
//         <div className="row">
//           <div className="col-md-12">
//             <CustomTabs
//               labelList={tabLabels}
//               onSelected={(e) => {
//                 console.log("selected", e);
//                 if (e === 0) {
                 
//                   setRequestDetailsUrl(remoterequestDetailsUrl);
//                   setTabSelected("FCL OUT");
//                   setSelectedRows([]);
//                   setRequestDetailsCol(requestDetailsCol);
//                   setPstate(pstate + 1);
//                 }
//                 if (e === 1) {
//                   let url = `/ptms/app/api/secure/requestDetails/fetchAllRequestDetails?statusCode=CONF`;
                 
//                   setRequestDetailsUrl(url);
//                   setTabSelected("Confirmed");
//                   setSelectedRows([]);
//                   setRequestDetailsCol(requestDetailsCol);
//                   setPstate(pstate + 1);
//                 }
//             }}
//             ></CustomTabs>
//           </div>
//             </div>
//             <div className="row">
//         <div className="col-md-12">
//           <AssignToken
//             refresh={pstate}
//             tableKeys={requestDetailsCol}
//             remote={true}
//             remoteUrl={requestDetailsUrl}
//             dataRootKey={"elements"}
//             actions={actions}
//             collapsableTableKeys={containerDetailsCol}
//             collapseTableList="requestContainerList"
//             keyTest="container_number"
//             tabSelected={tabSelected}
           
//           />
//         </div>
//       </div>
//         </>);
// }