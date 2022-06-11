import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "@material-ui/core/";
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
  withStyles
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { InputLabel } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MinimizeIcon from "@material-ui/icons/Minimize";
import { postHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";
import { NO_DIALOG, ALERT_DIALOG, OTHER_POPUP } from "../../lib/common/Constants";
import ConfirmDialog from "../../lib/components/dialog/confirmDialog";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RequestContainerService from "../../service/RequestContainerService";
import { Formik, Form } from "formik";
import Link from "@material-ui/core/Link";
import { CONFIRM_DIALOG } from './../../lib_old/common/Constants';

import DownloadDocumentPopUp from './DownloadDocumentPopup';

const useStyles = makeStyles((theme) => ({
  clickableIcon: {
    color: "grey",
    "&:hover": {
      color: "red",
    },
  },
  cancelButton: {
    background: "#dc4e4e",
    color: "#fff",
    textTransform: "none",
    float: "center",
  },
  confirmButton: {
    background: "#4CAB5B",
    color: "#fff",
    textTransform: "none",
    float: "center",
  },
}));

const LabelHeader = withStyles((theme) => ({
  root: {
         fontSize:'18px',
         color:'#757575',
         fontFamily: "Dubai Regular",
  

  },
  
 })

)(InputLabel);

const LabelData = withStyles((theme) => ({
  root: {
         fontSize:'18px',
         color:'#000000',
         fontFamily: "Dubai Regular",
         marginTop:'2px'
  

  },

  
  
 })

)(InputLabel);

const LabelDataContainers = withStyles((theme) => ({
  root: {
         fontSize:'16px',
         color:'#000000',
         fontFamily: "Dubai Regular",
         marginTop:'2px'
  

  },

  
  
 })

)(InputLabel);

function VerifyPodCard(props) {
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = useState(true);
  const [job, setJob] = useState(props.job);
  const [render, setRender] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState();
  const classes = useStyles();

const approvePod=(container)=>
{
  RequestContainerService.approvePod(
    container
  )
    .then((response) => {
    
     // props.reRender();
      props.onApproveReject("APPROVE");
      setShowPopup(NO_DIALOG);
      setSelectedContainer();
    })

    .catch(() => {
      console.log("error");
    });
  }

  const rejectPod=(container)=>
  {

  RequestContainerService.rejectPod(
    container
  )
    .then((response) => {
      console.log(
        "response after rejection",
        response
      );

      props.onApproveReject("REJECT");
      setOpen(false);
      setSelectedContainer();
    })

    .catch(() => {
      console.log("error");
    });

  }


 


  const handleClose = () => {
    setShowPopup(NO_DIALOG);
  }
  

  
  const openRecord = (job) => {
    job.open = !job.open;
    setRender(render + 1);
}



  const onFileDownload = (refernceNumber, container) => {
    RequestContainerService.fetchPod(refernceNumber, container.container_number)
      .then((response) => {
        if (response.isAxiosError) throw new Error(response.status);
        else {
          setSelectedContainer(container);        
          setFileList(response.data.dataItems);
          setShowPopup(OTHER_POPUP);
          // const linkSource = `data:${response.data.dataItems[0].filetype};base64,${response.data.dataItems[0].fileContent}`;
          // const downloadLink = document.createElement("a");

          // downloadLink.href = linkSource;
          // downloadLink.download = response.data.dataItems[0].fileName;
          // downloadLink.target = "_blank";
          // // alert(downloadLink);
          // downloadLink.click();
        }
      })

      .catch(() => {
        console.log("error");
      });
  };

 

  return (
    <>
      {props.podCount>0 && job ?
          (<Card style={{ width: "1200px", marginTop: "20px",background: '#FFFFFF 0% 0% no-repeat padding-box',
          boxShadow: '0px 3px 6px #00000029',
          border: '1px solid #E2E2E2',
          borderRadius: '16px',
          opacity: '1' }}>
            <div className="row">
              <Box
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "white",
                  textAlign: "center",
                  marginTop: "5px",
                  backgroundColor: "#0E1B3D",
                  marginLeft: "40px",
                  border: "2px solid #ccc",
                }}
              >
                {1}
              </Box>
              {/* <div className="col-md">
                <InputLabel>Order Number#{job.referenceNumber}</InputLabel>
              </div> */}
              <div className="col-md"></div>

              <div className="col-md">
                <IconButton
                  id="expand"
                  name="expand"
                  style={{ color: "black", marginLeft: "450px" }}
                  onClick={() => {
                   openRecord(job);
                  }}
                >
                  {job.open ? <MinimizeIcon /> : <AddIcon />}
                </IconButton>
              </div>
            </div>
            <Grid item container xs={12} sm spacing={1}>
            <Grid item xs={6} sm={2}>
                <LabelHeader
                >
                 Booking#
                </LabelHeader>

                <Link
                            style={{
                              fontSize:'18px',
                              fontFamily:'Dubai Regular',
                              textDecoration: "underline",
                              whiteSpace: "nowrap",
                            }}
                            onClick={  ()=>{
                                //setContainerPopup(true);
                               //  setDataForPopup(row);
                               
                            }}
                          >
                            {job.referenceNumber}
                          </Link>
                
                </Grid>
              <Grid item xs={6} sm={2}>
                <LabelHeader
                 
                >
                  Consignee Name
                </LabelHeader>

                <LabelData
                
                >
                  {job.containerList[0].consigneeDetails}
                </LabelData>
              </Grid>

              <Grid item xs={6} sm={2}>
                <LabelHeader >
                 Booked On
                </LabelHeader>

                <LabelData >
                  {job.creationDate}
                </LabelData>
              </Grid>

              <Grid item xs={6} sm={2}>
                <LabelHeader >
                  Containers
                </LabelHeader>

                <LabelData >
                  {job.noOfContainers}
                </LabelData>
              </Grid>

              <Grid item xs={6} sm={2}>
              <LabelHeader >
                Trucks
                </LabelHeader >

                <LabelData >
                {job.truckNumber}
                </LabelData>
            </Grid> 
         
            <Grid item xs={6} sm={2}>
            <LabelHeader >
                Amount
                </LabelHeader >

                <LabelData >
                {job.totalAmt}
              </LabelData>
            </Grid> 
            </Grid>
            {job.open && (
              <>
                <Table>
                  <TableBody>
                    <TableRow   style={{ borderTop:"1px solid #DCDCDC"}}>
                      <TableCell  style={{ borderBottom: "none" }}>
                        <LabelHeader >
                          Container Number
                        </LabelHeader>
                      </TableCell>

          

                      <TableCell  style={{ borderBottom: "none" }}>
                        <LabelHeader >
                          Pickup
                        </LabelHeader>
                      </TableCell>

                      <TableCell  style={{ borderBottom: "none" }}>
                        <LabelHeader >
                          Drop Details
                        </LabelHeader>
                      </TableCell>

                      <TableCell  style={{ borderBottom: "none" }}>
                        <LabelHeader >
                          Drop Date and Time
                        </LabelHeader>
                      </TableCell>

                      <TableCell  style={{ borderBottom: "none" }}>
                        <LabelHeader >
                         Truck Details
                        </LabelHeader>
                      </TableCell>


                      <TableCell  style={{ borderBottom: "none" }}>
                        <LabelHeader >
                          POD
                        </LabelHeader>
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}></TableCell>
                    </TableRow>

                    {job.containerList.map((container, inx) => (
                      <TableRow>
                        <TableCell>
                        <Link
                            style={{
                              fontSize:'18px',
                              fontFamily:'Dubai Regular',
                              textDecoration: "underline",
                              whiteSpace: "nowrap",
                            }}
                            onClick={  ()=>{
                                //setContainerPopup(true);
                               //  setDataForPopup(row);
                               
                            }}
                          >
                            {container.container_number}
                          </Link>
                
                          <LabelDataContainers
                         
                          >
                            {container.iso_code}
                          </LabelDataContainers>
                        </TableCell>

                        <TableCell>
                          <LabelDataContainers
                           
                          >
                            {container.pickupLocation}
                          </LabelDataContainers>
                        </TableCell>

                        <TableCell>
                          <LabelDataContainers
                           
                          >
                            {container.dropZoneLabel}
                          </LabelDataContainers>
                        </TableCell>
                        
                        <TableCell>
                          <LabelDataContainers
                           
                          >
                            {container.date_time}
                          </LabelDataContainers>
                        </TableCell>
                         
                        <TableCell>
                          <LabelDataContainers
                           
                          >
                            {container.assignedTruck}
                          </LabelDataContainers>
                        </TableCell>

                      
                        <TableCell>
                          <img
                            src="./document.svg"
                            onClick={(e) => {
                              onFileDownload(
                                job.referenceNumber,
                                container
                              );
                            
                            }}
                            id="download"
                            name="download"
                          />
                        </TableCell>

                        <TableCell >
                          {container.refStatus.code === "PODUPL" && (
                            <div className="row">
                              <Button
                                style={{
                                  textTransform: "none",
                                  backgroundColor: "#63BB7A",
                                  color: "white",
                                  borderRadius: "8px",
                                }}
                                variant="contained"
                                onClick={() => {
                                  setShowPopup(ALERT_DIALOG);
                                }}
                              >
                                Approve
                              </Button>

                              <div className="col">
                                <Button
                                  style={{
                                    textTransform: "none",
                                    backgroundColor: "#FF7275",
                                    color: "white",
                                    borderRadius: "8px",
                                  }}
                                  variant="contained"
                                  onClick={() => {
                                    setShowPopup(CONFIRM_DIALOG);
                                  }}
                                >
                                  Reject
                                </Button>
                              </div>
                            </div>
                          )}
                          {showPopup === ALERT_DIALOG && (
                            <Dialog
                            fullWidth={true}
                            open={showPopup === ALERT_DIALOG}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title"
                          >
                            <DialogTitle id="form-dialog-title">
                              Attention!
                            </DialogTitle>

                            <DialogContent>
                              <DialogContentText style={{color:'#575757'}} >
                                Are You sure to approve this POD?
                              </DialogContentText>
                              <TextField
                                label="Admin Comments (if any)"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                onChange={(e) => {
                                  container.proofOfDelivery.remarks =
                                    e.target.value;
                                }}
                              />
                            </DialogContent>
                            <DialogActions style={{ alignSelf: "center" }}>
                             
                            <Button
                                    style={{
                                      background: "#4CAB5B",
                                      color: "#fff",
                                      textTransform: "none",
                                    }}
                                    onClick={(e) => {
                                      approvePod(container)
                                    }}
                                     
                                 
                                  >
                                    Yes
                                  </Button>
                              
                                <Button
                                  onClick={handleClose}
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
                           
                          )}
                           {showPopup === CONFIRM_DIALOG && (
                            <Dialog
                              fullWidth={true}
                              open={showPopup===CONFIRM_DIALOG}
                              onClose={handleClose}
                              aria-labelledby="form-dialog-title"
                            >
                              <DialogTitle id="form-dialog-title">
                                Attention!
                              </DialogTitle>

                              <DialogContent>
                                <DialogContentText>
                                  Are You sure to Reject this POD?
                                </DialogContentText>
                                <TextField
                                  label="Please Type in the reason for Rejection"
                                  multiline
                                  rows={4}
                                  variant="outlined"
                                  fullWidth
                                  onChange={(e) => {
                                    container.proofOfDelivery.remarks =
                                      e.target.value;
                                   
                                  }}
                                />
                              </DialogContent>
                              <DialogActions style={{ alignSelf: "center" }}>
                         
                                  <Button
                                    style={{
                                      background: "#4CAB5B",
                                      color: "#fff",
                                      textTransform: "none",
                                    }}
                                    onClick={(e) => {
                                       rejectPod(container)
                                      }}
                                 
                                  >
                                    Yes
                                  </Button>
                              
                                <Button
                                  onClick={handleClose}
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
                       )}
                        
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </Card>):(<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
        <Grid container direction="row" spacing={5}>
          <Grid item sm={12} xs={12}>
            <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
              <b>{'No records found'}</b></Typography>
          </Grid>
        </Grid>
      </Paper>)
}

{selectedContainer && fileList &&  showPopup === OTHER_POPUP && (
  <DownloadDocumentPopUp
    isopen={showPopup === OTHER_POPUP}
    fileList={fileList}
    container={selectedContainer}
    onClose={(e) => {
      setShowPopup(NO_DIALOG);
    }}
    onApprove={(e)=>{
      approvePod()
      
    }}
  
  />
)}


        
                                

    </>
      )
 
                                
}

export default React.memo(VerifyPodCard);
