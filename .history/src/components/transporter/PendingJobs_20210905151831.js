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
import TrucknTokenDetailsPopup from "./TrucknTokenDetailsPopup";
import JobConfirmationPopUp from "./JobConfirmationPopUp";
import { setConstantValue } from "typescript";
import { postHttp } from "../../lib/common/HttpService";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import RequestDetailsPopUp  from "../request/RequestDetailsPopUp";
import { useHistory } from "react-router-dom";
import Booking from "../request/Booking";


function PendingJobs(props) {
  console.log("props in pending jobs ::",props);
  const [bookingList, setBookingList] = useState([]);
  const [containerPopup, setContainerPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [truckDetailsPopup, setTruckDetailsPopup] = useState(false);
  const [trucknTokenDetailsPopup, setTrucknTokenDetailsPopup]= useState(false);
  const [confirmJobpopup,setConfirmJobPopup] = useState(false);
  const [startJobpopup,setstartJobPopup] = useState(false);
  const [jobStartedResponse,setJobStartedResponse] = useState("");
  const [requestTokenOpen, setRequestTokenOpen] = useState(false);
  const [tokenPopup, setTokenPopup] = useState(false);
  const [pState, setPState] = useState([1]);
  const [requestPopup, setRequestPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState("");

  let history = useHistory();

  


  useEffect(() => {
    const remoteUrl = `${endpointContants.fetchPendingJobs}?option=`+props.tabSelected;

  
    let obj1 = { url: remoteUrl };

    getHttp(obj1, true).then((response) => {
      setBookingList(response.data.dataItems);
      console.log("-------", response.data.dataItems);
    });
  }, [pState]);

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

  const openTrucknTokenDetailsPopup = () => {
    setTrucknTokenDetailsPopup(true);
  };

  const closeTrucknTokenDetailsPopup = (response) => {
     setTrucknTokenDetailsPopup(false);
     if(response!==undefined){
      var booking= bookingList.find(x=>x.referenceNumber===response.requestDetailsNumber);
      var ind=booking.containerList.findIndex(y=>y.container_number===response.container_number);
      booking.containerList.splice(ind,1);
       setJobStartedResponse(response);
       openStartJobPopup();
     }
     
  };

  const openConfirmJobPopup = () => {
    setConfirmJobPopup(true);
  }

  const closeConfirmJobPopup = () => {
    setConfirmJobPopup(false);
    setPState(pState+1);
  }

  const openStartJobPopup = () => {
    setstartJobPopup(true);
  }

  const closestartJobPopup = () => {
    setstartJobPopup(false);
  }

  const handleCloseForToken = () => {
    setRequestTokenOpen(false);
  }

  return (
    <>
      {bookingList && bookingList.length > 0 ? (
        bookingList.map((booking, inx) => (
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
              <TableRow key={inx}>
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
                    >
                  {booking.referenceNumber}</Link>
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
                  <InputLabel>{booking.noOfTrucks}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>Amount</InputLabel>
                  <InputLabel>{booking.transporterAmount} AED</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>
                    Requestor Company
                  </InputLabel>
                  <InputLabel>{booking.companyName}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#757575" }}>
                    SLA Expires In
                  </InputLabel>
                  <InputLabel>{booking.expiryIn}</InputLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Container Number
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>Pickup</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Drop Date & Time
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    Drop Details
                  </InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>FCL Out</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel style={{ color: "#848484" }}>
                    DO Expiry
                  </InputLabel>
                </TableCell>
                 {container.refStatus.code === "CONF" && ( <TableCell>Token</TableCell>)} 
                <TableCell></TableCell>
              </TableRow>
              {booking.containerList.map((container, indx) => (
                <TableRow key={container.container_number}>
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
                  <TableCell>
                    <InputLabel>{container.pickupLocation}</InputLabel>
                  </TableCell>
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
                        if(container.refStatus.code === "CONF")
                          openTrucknTokenDetailsPopup();
                        else
                          openTruckDetailsPopup();
                        
                      }}>
                      {container.assignedTruck}
                    </Link>
    
                  </TableCell>
                  <TableCell>
                    <InputLabel>{container.orderValidity}</InputLabel>
                  </TableCell>
                   {container.refStatus.code === "CONF" && 
                   <>
                     <TableCell>
                     <InputLabel>Token</InputLabel>
                   </TableCell> 
                   <TableCell>  <img src="./doc_download.svg"   id={container.container_number} alt="Not available" 
                   onClick={()=>{
                    RequestContainerService.fetchEtoken(container.requestDetailsNumber, container.container_number, "FCL_OUT")
                    .then((response) => {
                        if (response.isAxiosError) throw new Error(response.status);
                        else {
            
                            const linkSource = `data:${response.data.dataItems[0].filetype};base64,${response.data.dataItems[0].fileContent}`;
                            const downloadLink = document.createElement("a");
            
                            downloadLink.href = linkSource;
                            downloadLink.download = response.data.dataItems[0].fileName;
                            downloadLink.target = "_blank";
                            // alert(downloadLink);
                            downloadLink.click();
                        }
                    })
            
                    .catch(() => {
                        console.log("error");
                    });    
                             
                              }
                              }/></TableCell></>} 
                  <TableCell>
                    {container.refStatus.code === "PTOK" && (
                      <Box
                        style={{
                          width: "140px",
                          height: "31px",
                          background: "#FFC746 0% 0% no-repeat padding-box",
                          borderRadius: "4px",
                          opacity: 1,
                          paddingLeft: "10px",
                          paddingTop: "5px"
                        }}
                      >
                        Pending for token
                      </Box>
                    )}

                    {container.refStatus.code === "TRUCK_ASGN" && (
                      <><Link style={{ textDecoration: "underline" }} onClick={() => {
                        setSelectedContainer(container);
                        setSelectedBooking(booking)
                        setRequestTokenOpen(true);
                       
                      } }>
                        Request Token
                      </Link>
                 
                      </>
                    )}


                    {container.refStatus.code === "CONF" && (
                      <Button id={container.container_number} style={{ width: "56px",
                        height: "31px",
                        background: "#63BB7A 0% 0% no-repeat padding-box",
                        borderRadius: "4px",
                        opacity: 1}}
                        onClick={()=>{
                         
                            setSelectedContainer(container);
                          
                             openTrucknTokenDetailsPopup();
                         //  closeTrucknTokenDetailsPopup(container);
                        
                        
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

        <Dialog
                        fullWidth={true}
                        open={requestTokenOpen}
                        onClose={handleCloseForToken}
                      >
                        <DialogTitle id="form-dialog-title" style={{ backgroundColor: '#0E1B3D' }}>
                          Send for Token?
                        </DialogTitle>
                        <DialogContent>
                            Would you like to request a token for {selectedContainer.assignedTruck} for {selectedContainer.container_number}?
                        </DialogContent>
                        <DialogActions style={{ alignSelf: "center" }}>
                            <Button
                                onClick={() => {
                                  var value={
                                    requestDetailsNumber :selectedBooking.referenceNumber,
                                    container_number : selectedContainer.container_number
                                  }
                                  RequestContainerService.requestForToken(value)
                                        .then((response) => {
                                            console.log("response from request token", response);
                                            setRequestTokenOpen(false);
                                            openConfirmJobPopup();
                                        }).catch(() => {
                                            console.log("error");
                                        });
                                }}
                                style={{
                                    background: "#4CAB5B",
                                    color: "#fff",
                                    textTransform: "none",
                               }}
                            >
                                Yes
                            </Button>
                            <Button
                                onClick={handleCloseForToken}
                                style={{
                                    background: "#dc4e4e",
                                    color: "#fff",
                                    textTransform: "none",
                               
                                }}
                            >
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>

            {confirmJobpopup === true && 
                    <JobConfirmationPopUp
                       onClose={(e) => {
                  
                       setConfirmJobPopup(false);
                        props.onTabChange(e);
                     
                       }}></JobConfirmationPopUp>
                      }
                    
                  
            {containerPopup && (
              <ContainerPopup
                containers={selectedContainer}
                onClose={closeContainerPopup}
              />
            )}

          { requestPopup && <RequestDetailsPopUp
                  request={selectedBooking}
                  onClose={()=>setRequestPopup(false)}
                  />}

{truckDetailsPopup && (
              <TruckDetailsPopup
                containers={selectedContainer}
                onClose={closeTruckDetailsPopup}
                bookingNumber={selectedContainer.requestDetailsNumber}
                tabSelected={props.tabSelected}
              />
            )}
            {trucknTokenDetailsPopup && (
              <TrucknTokenDetailsPopup
                containers={selectedContainer}
                onClose={(response)=>{
                  var savedJob=response;    
                  closeTrucknTokenDetailsPopup(savedJob);
                }}
                bookingNumber={selectedContainer.requestDetailsNumber}
                tabSelected={props.tabSelected}
                tokenType={"FCL_OUT"}
              />
            )}            
          </Card>
        ))
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

export default React.memo(PendingJobs);
