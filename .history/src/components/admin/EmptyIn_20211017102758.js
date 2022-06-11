import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core/";
import AssignTokenService from "./AssignTokenService";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Paper,
  Link,
  Grid,
  TextField,
  Button,
  withStyles,
} from "@material-ui/core";

import { InputLabel } from "@material-ui/core";

import * as endpointContants from "../../utils/ptmsEndpoints";
import Toast from "../../lib/components/toast/ErrorToast";
import { FormProvider, useForm } from "react-hook-form";
import ContainerPopup from "../request/ContainerPopup";
import TruckDetailsPopup from "../transporter/TruckDetailsPopup";
import RequestDetailsPopUp from "../request/RequestDetailsPopUp";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import TruckReadOnlyPopUp from './../masters/TruckReadOnlyPopUp';
import ErrorToast from "../../lib/components/toast/ErrorToast";

function JobCard(props) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [fromTime, setFromTime] = React.useState("");
  const [toTime, setToTime] = React.useState("");
  const [render, setRender] = useState(0);
  console.log("props in job card", props);

  const allowedFileTypes = ["pdf", "doc", "png", "docx", "jpg", "jpeg"];
  const [showToaster1, setShowToaster1] = useState(false);
  const [showToaster2, setShowToaster2] = useState(false);
  const [jobs, setJobs] = useState();
  const [selectedBooking, setSelectedBooking] = useState("");
  const [requestPopup, setRequestPopup] = useState(false);
  const [containerPopup, setContainerPopup] = useState(false);
  const [truckDetailsPopup, setTruckDetailsPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState("");
  const [showToaster, setShowToaster] = useState(null);
  const [reload, setReload] = useState(0);
  const [updateDisabled, setUpdateDisabled] = useState(false);

  const methods = useForm({
    //resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: "",
  });

  const LabelHeader = withStyles((theme) => ({
    root: {
      fontSize: "18px",
      color: "#757575",
      fontFamily: "Dubai Medium",
      marginTop: "1px",
    },
  }))(InputLabel);

  const LabelData = withStyles((theme) => ({
    root: {
      fontWeight: "bold",
      fontSize: "16px",
      color: "#000000",
      fontFamily: "Dubai Regular",
      marginTop: "2px",
    },
  }))(InputLabel);

  const LabelDataContainers = withStyles((theme) => ({
    root: {
      fontSize: "16px",
      color: "#000000",
      fontFamily: "Dubai Regular",
      marginTop: "2px",
    },
  }))(InputLabel);

  useEffect(() => {
    if (props.emptyInCount > 0) {
      AssignTokenService.fetchPendingTokenJobs(props.referenceNumber, "PMTTOK")
        .then((response) => {
          if (response.isAxiosError) setJobs();
          else {
            console.log("response in ::", response);       
            setJobs(response.data.dataItems[0]);
          }
        })
        .catch((error) => {
          console.log("error");
          setJobs();
        });
    }
  }, [props.emptyInCount, props.referenceNumber, reload]);

  const validateContainerData =(containerData)=>
  {
  
      var validationSuccess = true;
     

      for (let i = 0; i < containerData.containerList.length; i++) {
        var container=containerData.containerList[i];
        container.updateToken=true;
      
        container.tokenError = '';
        container.timeError = '';
        container.etokenError = '';
        container.empty='';
        container.dateError = '';
       


        if(
           (container.tokenIn===''|| container.tokenIn===undefined) &&
           (container.tokenInSlotFrom===''|| container.tokenInSlotFrom===undefined|| container.tokenInSlotTo==='' || container.tokenInSlotFrom===undefined) &&
           (container.etokenDto === undefined)
           )
           {
            container.updateToken=false;
            container.empty=true;
            continue;
           }
        
      
    
            if(container.tokenIn===''|| container.tokenIn===undefined)
            {
              container.tokenError = true;
              container.updateToken=false
              validationSuccess = false;
            }

            if(container.tokenInDate===''|| container.tokenInDate===undefined)
            {
              container.dateError = true;
              container.updateToken=false
              validationSuccess = false;
            }
         
            if(container.tokenInSlotFrom===''|| container.tokenInSlotFrom===undefined|| container.tokenInSlotTo==='' || container.tokenInSlotTo===undefined)
            {
              container.timeError = true;
              container.updateToken=false
              validationSuccess = false;
            }

           if (container.etokenDto === undefined) {
             container.etokenError = true;
             container.updateToken=false
             validationSuccess = false;
             }
      }
  
    
      return validationSuccess;
    
  
  
  }


  return (
    <>
      <FormProvider {...methods}>
        <Button
          style={{
            textTransform: "none",
            marginLeft: "1120px",
            width: "122px",
            height: "41px",
            background:
              "transparent linear-gradient(180deg, #1E84EA 0%, #2673CE 67%, #364F91 100%) 0% 0% no-repeat padding-box",
            boxShadow: "0px 1px 4px #00000029",
            borderRadius: "8px",
            opacity: 1,
            "&:disable": {
              background:
                "transparent linear-gradient(180deg, #848484 0%, #848484 67%, #848484 100%) 0% 0% no-repeat padding-box",
            },
          }}
          color="primary"
          variant="contained"
          onClick={() => {

            var success=validateContainerData(jobs);
            if(!jobs.containerList.some(x=>x.valid===true))
            {
              setShowToaster('ERROR');
            }
            else if(success)
            {
   
          AssignTokenService.updateTokenInDetails(jobs).then((res) => {
           if(res?.status==='success')
           {
             setShowToaster('SUCCESS');
             setReload(reload+1);               
                      
           }
           else
           {
              setShowToaster('ERROR') ;
           } })
         }

           
          }}
           
        >
          update
        </Button>

        {jobs ? (
          <Card
            style={{
              width: "1200px",
              marginTop: "20px",
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              boxShadow: "0px 3px 6px #00000029",
              border: "1px solid #E2E2E2",
              borderRadius: "16px",
              opacity: "1",
            }}
          >
            <Table style={{ height: "15px" }}>
              <TableBody>
                <TableRow key={jobs.referenceNumber}>
                  <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
                    <LabelHeader>Booking#</LabelHeader>

                    <Link
                      style={{
                        fontSize: "16px",
                        fontFamily: "Dubai Regular",
                        textDecoration: "underline",
                        whiteSpace: "nowrap",
                      }}
                      component="button"
                      variant="body2"
                      onClick={() => {
                        setSelectedBooking(jobs);
                        setRequestPopup(true);
                      }}
                    >
                      {jobs.referenceNumber}
                    </Link>
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
                    <LabelHeader>Requestor Company</LabelHeader>

                    <LabelData>{jobs.companyName}</LabelData>
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
                    <LabelHeader>Booked On</LabelHeader>

                    <LabelData>{jobs.creationDate}</LabelData>
                  </TableCell>
               
                  <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
                    <LabelHeader>Containers</LabelHeader>

                    <LabelData>{jobs.noOfContainers}</LabelData>
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
                    <LabelHeader>Trucks</LabelHeader>
                  
                      <LabelData>{jobs.noOfTrucks}</LabelData>
                    </TableCell>
                    <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
                    <LabelHeader>Amount</LabelHeader>

                    <LabelData>{jobs.amount} AED</LabelData>
                  </TableCell>
                  <TableCell style={{ borderBottom: "1px solid #D3D3D3" }}>
                    <LabelHeader>Expires In</LabelHeader>

                    <LabelData>{jobs.expiryIn}</LabelData>
                  </TableCell>

            
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableBody>
                <TableRow style={{ borderTop: "1px solid #DCDCDC" }}>
                  <TableCell style={{ borderBottom: "none" }}>
                    <LabelHeader>Container Number</LabelHeader>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <LabelHeader>Drop Details</LabelHeader>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <LabelHeader>Drop Date and Time</LabelHeader>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <LabelHeader>Truck Details</LabelHeader>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <LabelHeader>Token Number</LabelHeader>
                  </TableCell>
                  <TableCell style={{ borderBottom: "none" }}>
                    <LabelHeader>Preferred Date</LabelHeader>
                  </TableCell>
                  <TableCell colSpan={2} style={{ borderBottom: "none" }}>
                    <LabelHeader>Time Slot</LabelHeader>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <LabelHeader>eToken</LabelHeader>
                  </TableCell>
                </TableRow>

                {jobs.containerList.map((container, inx) => (
                  <TableRow>
                    <TableCell>
                      <Link
                        style={{
                          fontSize: "18px",
                          fontFamily: "Dubai Regular",
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                          color: "#0568AE",
                        }}
                        onClick={() => {
                          setSelectedContainer(container);
                          setContainerPopup(true);
                        }}
                      >
                        {container.container_number}
                      </Link>

                      <InputLabel style={{color:'#848484',fontFamily:'Dubai Regular',fontSize:'18px'}}
                         
                         >
                           {container.iso_code}
                           </InputLabel>
                    </TableCell>

                    <TableCell>
                      <Link
                        style={{
                          fontSize: "18px",
                          fontFamily: "Dubai Regular",
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                          color: "#0568AE",
                        }}
                        onClick={() => {
                          setSelectedContainer(container);
                          setContainerPopup(true);
                        }}
                      >
                        {container.dropZoneLabel}
                      </Link>
                    </TableCell>

                    <TableCell>
                      <LabelDataContainers>
                        {container.date_time}
                      </LabelDataContainers>
                    </TableCell>

                    <TableCell>
                      <Link
                        style={{
                          fontSize: "18px",
                          fontFamily: "Dubai Regular",
                          textDecoration: "underline",
                          whiteSpace: "nowrap",
                          color: "#0568AE",
                        }}
                        onClick={() => {
                          setSelectedContainer(container);
                          setTruckDetailsPopup(true);
                        }}
                      >
                        {container.assignedTruck}
                      </Link>
                    </TableCell>

                    <TableCell>
                      <TextField
                        id="outlined-basic"
                        label="Token#"
                        variant="outlined"
                        size="small"
                        error={container.tokenError} 
                        helperText={container.tokenError ? 'Token Required' : ''}  
                        onChange={(e) => {
                          container.tokenIn = e.target.value;
                         
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <ApplnDatePicker
                        name={"date"}
                        iconColor="#1FA5FF"
                        disablePastDate={true}
                        value={container.preferredTokenInDate}
                        isError={container.dateError}     helperText={container.dateError ? 'Date Required' : ''} 
                        onChange={(e) => {
                          container.preferredTokenInDate = e;

                          // if(requestDetails.date !=='Invalid')
                          // {

                          //   requestDetails.date_time= requestDetails.date+'T'+requestDetails.time;
                          //   console.log("date new  again",requestDetails.date_time);
                          // }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Grid container>
                        <Grid item xs={2}>
                          <TextField
                            id="toTime"
                            type="time"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              size: "small",
                            }}
                            error={container.timeError}    
                            onChange={(event) => {
                              container.tokenInSlotFrom = event.target.value;
                            
                              //  setFromDate(event.target.value);
                            }}
                          />
                          <TextField
                            id="fromTime"
                            type="time"
                            size="small"
                            inputProps={{
                              size: "small",
                            }}
                            error={container.timeError} 
                            onChange={(event) => {
                              container.tokenInSlotTo = event.target.value;
                            
                              //  setFromDate(event.target.value);
                            }}
                          />
                            {container.timeError && <span style={{color:'#f44336',fontFamily:'Dubai Regular',fontSize:'13px'}}>Time Required</span> }
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <label htmlFor={container.container_number}>
                        <input
                          type="file"
                          name={container.container_number}
                          id={container.container_number}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            e.target.value = "";
                            console.log("???????????", container);

                            let promiseData = new Promise((resolve, reject) => {
                              const reader = new FileReader();

                              reader.onload = (event) => {
                                resolve(event.target.result);
                              };

                              reader.onerror = (err) => {
                                reject(err);
                              };

                              reader.readAsDataURL(file);
                            });

                            promiseData.then((result) => {
                              const contentArr = result.split(",");
                              const fileType = contentArr[0]
                                .replace("data:", "")
                                .replace(";base64", "");
                              let etokenDto = {};
                              console.log("file type::", fileType);
                              console.log("file size::", file.size);
                              if (
                                allowedFileTypes.some(
                                  (item) => fileType.split("/")[1] === item
                                )
                              ) {
                                if (file.size <= 500000) {
                                  etokenDto.fileContent = contentArr[1];
                                  etokenDto.fileType = fileType;
                                  etokenDto.tokenType = "FCL_OUT";
                                  etokenDto.fileName = file.name;
                                  container.etokenDto = etokenDto;
                                  console.log("container::", container);
                                  console.log("etoken::", container.etokenDto);
                                  container.upload = true;
                                 
                                  setRender(render + 1);
                                  setShowToaster1(false);
                                  setShowToaster2(false);
                                } else {
                                  console.log("file size error");
                                  container.upload = false;

                                 
                                  setShowToaster1(true);
                                }
                              } else {
                                console.log("file format error");
                                container.upload = false;

                              
                                setShowToaster2(true);
                              }
                            });
                          }}
                          //  onChange={() => { selectFile(Event, job,props.key) }}
                        />

                        {!container.upload && <img src="./token_upload.svg" />}
                        {container.upload && <img src="./token_success.svg" />}

                        <Grid container>
                                <Grid item>

                              {container.etokenError ? <span style={{color:'#f44336',fontFamily:'Dubai Regular',fontSize:'13px'}}> eToken Required</span> :''}
                              </Grid>
                              </Grid>
                        {showToaster1 && (
                          <Toast
                            icon="error"
                            title="File size error"
                            message="Allowed maximum size is 500 KB"
                            showToast={() => {
                              setShowToaster1(false);
                            }}
                            position="top-right"
                          />
                        )}
                        {showToaster2 && (
                          <Toast
                            icon="error"
                            title="File format not supported"
                            message="*Only files with the following extensions are allowed *.pdf,.doc,.png,.jpg,.jpeg  "
                            showToast={() => {
                              setShowToaster2(false);
                            }}
                            position="top-right"
                          />
                        )}
                      </label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
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
      </FormProvider>

      {containerPopup && (
        <ContainerPopup
          containers={selectedContainer}
          onClose={() => setContainerPopup(false)}
        />
      )}

      {requestPopup && (
        <RequestDetailsPopUp
          request={selectedBooking}
          onClose={() => setRequestPopup(false)}
        />
      )}

      {truckDetailsPopup && (
        <TruckReadOnlyPopUp
          containers={selectedContainer}
          tokenType={"EMPTY_IN"}
          onClose={() => setTruckDetailsPopup(false)}
          bookingNumber={jobs.referenceNumber}
        />
      )}

      {showToaster === "SUCCESS" && (
        <SuccessToast
          icon="check_circle"
          title="Token Assigned Successfully"
          message="*Token Assigned Successfully"
          showToast={() => {
            setShowToaster(false);
          }}
          position="top-right"
        />
      )}

{showToaster==='ERROR' && 
          <ErrorToast
          icon="error"
          title="Update Failed"
          message="Exception occured while update"
          showToast={()=>{setShowToaster("NO TOASTER")}}
          position="top-right"
        />}

{showToaster==='NO_INPUT' && 
          <ErrorToast
          icon="error"
          title="Data Missing"
          message="Please fill in details to update token"
          showToast={()=>{setShowToaster("NO TOASTER")}}
          position="top-right"
        />}
    </>
  );
}

export default React.memo(JobCard);
