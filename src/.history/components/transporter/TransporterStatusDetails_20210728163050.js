import React, { useState, useEffect } from "react";
import { Card, CardHeader, TableHead } from "@material-ui/core/";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Icon,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { InputLabel } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MinimizeIcon from "@material-ui/icons/Minimize";
import { getHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";
import StartJobPopup from "./StartJobPopup";
import Link from "@material-ui/core/Link";
import RequestContainerService from "../../service/RequestContainerService";
import Divider from "@material-ui/core/Divider";
import ContainerPopup from "../request/ContainerPopup";
import TruckDetailsPopup from "./TruckDetailsPopup";
import { setConstantValue } from "typescript";
import { postHttp } from "../../lib/common/HttpService";
import { useLocation } from "react-router-dom";
import CustomTabs from "../../lib/components/tabs/CustomTabs";
import UploadDocumentPopup from "./UploadDocumentPopup";
import { useHistory } from "react-router-dom";
import RequestDetailsPopUp  from "../request/RequestDetailsPopUp";

function TransporterStatusDetails(props) {
  console.log("props in TransporterStatusDetails jobs ::",props);
  const location = useLocation();
  const [bookingList, setBookingList] = useState("");
  const [containerPopup, setContainerPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [selectedBooking, setSelectedBooking] = useState("");
  const [truckDetailsPopup, setTruckDetailsPopup] = useState(false);
  const [startJobpopup,setstartJobPopup] = useState(false);
  const [requestPopup,setRequestPopup] = useState(false);
  const [jobStartedResponse,setJobStartedResponse] = useState("");
  const [tabLabels, setTabLabels] = useState([
    "In progress",
    "Delivered",
    "Completed",
  ]);
  const [uploadDocumentPopup,setUploadDocumentPopup] = useState(false);
  const [popUpParams,setPopUpParams] = useState("");
  let history = useHistory();
  const [containersInProgress,setContainersInProgess] = useState("");
  const [containersDelivered,setContainersDelivered] = useState("");
  const [containersCompleted,setContainersCompleted] = useState("");
  const [tabSelected,setTabSelected] = useState("In progress");
  const [containerList,setContainerList] = useState("");
  const [pstate,setPstate] = useState(0);

  let url1 = "";
  var list = "";
  var booking = "";
  var containerInProgress = "";
  var containerDelivered = "";
  var containerCompleted = "";
  

  if (location.state !== undefined) {
    url1 = location.state.url;
    list = location.state.paymentSummary;
    booking = location.state.statusData;
  }
 if(props?.requestDetailsData)
 {
   booking=props.requestDetailsData;
 }

  useEffect(() => {
    
      containerInProgress =booking.containerList.filter( (container) =>
      container.refStatus.code ==="INPRO"
  );
  containerDelivered =  booking.containerList.filter( (container) =>
  container.refStatus.code ==="FCL_DEL"
);
containerCompleted = booking.containerList.filter( (container) =>
container.refStatus.code ==="MT_DEL"
);

  setContainersInProgess(containerInProgress);
  setContainersDelivered(containerDelivered);
  setContainersCompleted(containerCompleted);
      setBookingList(location.state.statusData);
      console.log("useEffect in transporterStatusDetails ::", booking);
    // });
  }, []);

  const openContainerPopup = () => {
    setContainerPopup(true);
  };



  const closeContainerPopup = () => {
    setContainerPopup(false);
  };

  const openTruckDetailsPopup = () => {
    setTruckDetailsPopup(true);
  };

  const closeTruckDetailsPopup = () => {
    setTruckDetailsPopup(false);
  };

  const openStartJobPopup = () => {
    setstartJobPopup(true);
  }

  const closestartJobPopup = () => {
    setstartJobPopup(false);
  }

  const openUploadPopup = () => {
    console.log("Delivered clicked");
    setUploadDocumentPopup(true);
    

};

const closeUploadPopup = () => {
  setUploadDocumentPopup(false);
}

  return (
    <>
    <CustomTabs  labelList={tabLabels}
     onSelected={(e) => {
      console.log("selected", e);
      if (e === 0) {
        setTabSelected("In Progress");
        setContainerList(containersInProgress);
        //setPstate(pstate + 1);
        
      }
      if (e === 1) {
        setTabSelected("Delivered");
        setContainerList(containersDelivered);
       //setPstate(pstate + 1);
      
      }
      if(e===2){
        setTabSelected("Completed");
        setContainerList(containersCompleted);
       // setPstate(pstate + 1);
       
      }}}></CustomTabs>
      {booking ? (
      //  location.state.statusData.map((booking, inx) => (
          <Card
            style={{
              width: "1218px",

              background: "#FFFFFF 0% 0% no-repeat padding-box",
              boxShadow: "4px 4px 7px #0000002B",
              border: "1px solid #DCDCDC",
              borderRadius: "5px",
              opacity: 1,
              marginTop: "40px",
            }}
          >
            <Table>
              <TableRow>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>
                    Booking #
                  </InputLabel>
                  <Link
                      style={{ textDecoration: "underline" }}
                      onClick={() => {
                        setSelectedBooking(booking);
                        setRequestPopup(true);
                      }}
                    >{booking.referenceNumber}</Link>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>
                    Booked on
                  </InputLabel>
                  <InputLabel>{booking.creationDate}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>
                    Containers
                  </InputLabel>
                  <InputLabel>{booking.noOfContainers}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>Trucks</InputLabel>
                  <InputLabel>{booking.truckNumber}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>Amount</InputLabel>
                  <InputLabel>{booking.amount}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>
                    Requestor Company
                  </InputLabel>
                  <InputLabel>{booking.noOfTrucks}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>
                    Expires In
                  </InputLabel>
                  <InputLabel>{booking.expiryIn}</InputLabel>
                </TableCell>
               {!props?.isMiscellaneous &&  <TableCell>
                <Link
                      style={{ textDecoration: "underline" }}
                      onClick={() => {
                          history.push("/miscellaneousInvoices",{bookingReferenceNumber:booking.referenceNumber,bookingData:booking})
                      }}
                    >
                     Miscellaneous Invoices
                    </Link>
                </TableCell>}
              </TableRow>
              <Divider />
              <TableRow>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Container Number
                  </InputLabel>
                </TableCell>
               {tabSelected=== "In Progress" && <TableCell>
                  <InputLabel style={{ color: "#848484" }}>Pickup</InputLabel>
                </TableCell>}
                {tabSelected === "Delivered" && <TableCell>
                  <InputLabel style={{ color: "#848484" }}>Delivered on</InputLabel>
                </TableCell>}
                {tabSelected === "Completed" && <TableCell>
                  <InputLabel style={{ color: "#848484" }}>Completed on</InputLabel>
                </TableCell>}
                {tabSelected=== "In Progress" &&  <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Drop Date & Time
                  </InputLabel>
                </TableCell>}
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Drop Details
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>FCL Out</InputLabel>
                </TableCell>
                {tabSelected=== "In Progress" &&   <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    DO Expiry
                  </InputLabel>
                </TableCell>}
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Token
                  </InputLabel>
                </TableCell>
                {tabSelected !== "In Progress" &&   <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    POD
                  </InputLabel>
                </TableCell>}
                {tabSelected !== "In Progress" &&   <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    MT IN
                  </InputLabel>
                </TableCell>}
                {/* {container.refStatus.code === "CONF" && ( <TableCell>Token</TableCell>)} */}
                <TableCell></TableCell>
              </TableRow>
              {booking.containerList.map((container, inx) => (
                <TableRow>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "underline" }}
                      onClick={() => {
                        setSelectedContainer(container);
                        openContainerPopup();
                      }}
                    >
                      {container.container_number}
                    </Link>
                  </TableCell>
                  {tabSelected=== "In Progress" && <TableCell>
                    <InputLabel>{container.pickupLocation}</InputLabel>
                  </TableCell>}
                  <TableCell>
                    <InputLabel>{container.date_time}</InputLabel>
                  </TableCell>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "underline" }}
                      onClick={() => {
                        setSelectedContainer(container);
                        openContainerPopup();
                      }}
                    >
                      {container.dropZoneLabel}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link style={{ textDecoration: "underline" }}  onClick={() => {
                        setSelectedContainer(container);
                        openTruckDetailsPopup();
                      }}>
                      {container.assignedTruck}
                    </Link>
                  </TableCell>
                  {tabSelected=== "In Progress" &&     <TableCell>
                    <InputLabel>{container.orderValidity}</InputLabel>
                  </TableCell>}
                  <TableCell>
                    <img src="doc_download.svg"/>
                  </TableCell>
                   {!props.isMiscellaneous && container.refStatus.code === "INPRO" && ( <TableCell><Link style={{textDecoration:'underline'}} onClick={()=>{
                    
                      
                     setPopUpParams({uploadType: "POD", referenceNumber: container.container_number,  dpwTransactionId: container.dpwTransactionId, boeNumber: container.boeNumber});
                     openUploadPopup();
                   }
                   }>Delivered?</Link></TableCell>)} 
                  <TableCell>
                    {container.refStatus.code === "PTOK" && (
                      <Box
                        style={{
                          width: "140px",
                          height: "31px",
                          background: "#FFC746 0% 0% no-repeat padding-box",
                          borderRadius: "4px",
                          opacity: 1,
                        }}
                      >
                        Pending for token
                      </Box>
                    )}

                    {container.refStatus.code === "TRUCK_ASGN" && (
                      <Link style={{ textDecoration: "underline" }} onClick={() => {
                        setSelectedContainer(container);
                        openTruckDetailsPopup();
                      }}>
                        Request Token
                      </Link>
                    )}

{container.refStatus.code === "CONF" && (
                      <Button style={{ width: "56px",
                        height: "31px",
                        background: "#63BB7A 0% 0% no-repeat padding-box",
                        borderRadius: "4px",
                        opacity: 1}}
                        onClick={()=>{
                          console.log("start clicked ::",booking);
                          var value={
                            requestDetailsNumber : booking.referenceNumber,
                            container_number : container.container_number
                          }
                         const remoteUrl = endpointContants.startJob;

        let obj = {
            url: remoteUrl,
            body: value
        };

        return postHttp(obj, true).then((response) => {
          setJobStartedResponse(response);
          openStartJobPopup();
        }).catch(error => {

            return error;
        });
                        
                        }}>
                        Start
                      </Button>
                      
                    )}
                    {
                      startJobpopup && <StartJobPopup time={jobStartedResponse.jobStartTime} jobNumber={jobStartedResponse.requestDetailsNumber} onClose={closestartJobPopup}/>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </Table>
            {containerPopup && (
              <ContainerPopup
                containers={selectedContainer}
                onClose={closeContainerPopup}
              />
            )}

{requestPopup && (
              <RequestDetailsPopUp
                request={selectedBooking}
                onClose={()=>setRequestPopup(false)}
              />
            )}


{truckDetailsPopup && (
              <TruckDetailsPopup
                containers={selectedContainer}
                onClose={closeTruckDetailsPopup}
                bookingNumber={booking.referenceNumber}
              />
            )}
             {uploadDocumentPopup && <UploadDocumentPopup onClose={closeUploadPopup}  popUpParams={popUpParams} />}
          </Card>
        //))
      ) : (
        <Paper
          elevation={5}
          style={{
            borderRadius: 8,
            padding: "30px",
            marginTop: 20,
            minWidth: "760px",
            minHeight: "100px",
            color: "#FF7171",
          }}
        >
          <Grid container direction="row" spacing={5}>
            <Grid item sm={12} xs={12}>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "16px", textAlign: "center" }}
              >
                <b>{"No records found"}</b>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}

export default React.memo(TransporterStatusDetails);
