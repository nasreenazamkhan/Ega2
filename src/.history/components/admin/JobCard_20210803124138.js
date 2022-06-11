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
  withStyles
} from "@material-ui/core";

import { InputLabel} from "@material-ui/core";


import * as endpointContants from "../../utils/ptmsEndpoints";
import Toast from "../../lib/components/toast/ErrorToast";
import { FormProvider, useForm } from "react-hook-form";
import ContainerPopup from "../request/ContainerPopup";
import TruckDetailsPopup from "../transporter/TruckDetailsPopup";
import RequestDetailsPopUp  from "../request/RequestDetailsPopUp";





function JobCard(props) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [fromTime, setFromTime] = React.useState("");
  const [toTime, setToTime] = React.useState("");
  const [render, setRender] = useState(0);
  console.log("props in job card",props);

  const allowedFileTypes = ['pdf', 'doc', 'png', 'docx', 'jpg', 'jpeg'];
  const [showToaster1, setShowToaster1] = useState(false);
  const [showToaster2, setShowToaster2] = useState(false);
  const [jobs, setJobs] = useState();
  const [selectedBooking, setSelectedBooking] = useState("");
  const [requestPopup,setRequestPopup] = useState(false);
  const [containerPopup, setContainerPopup] = useState(false);
  const [truckDetailsPopup, setTruckDetailsPopup] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState("");



  
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

  useEffect(() => {
         if(props.fclCount>0)
         {
          
              AssignTokenService.fetchPendingTokenJobs(props.referenceNumber,"PTOK")
                .then((response) => {
                  if (response.isAxiosError)
                    setJobs();
                  else {
                    console.log("response in ::", response);
                    setJobs(response.data.dataItems[0]);         
                   
                  }
              })
              .catch((error) => {
                console.log("error");
                setJobs();
              });
          };

        },[props.fclCount,props.referenceNumber])
      
  
    
  const validate = (container,job) => {
  
    console.log("validate job:: ", container);

      if (
        container.tokenOut &&
        container.tokenOutSlotFrom !== undefined &&
        container.tokenOutSlotTo !== undefined &&
        container.tokenOutDate &&
        container.etokenDto
      ) {
        if (container.valid !== true) {
          container.valid = true;
          job.valid=true;
        }
      } else {
        if (container.valid === true) {
          container.valid = false;
          job.valid=false

        } else{ container.valid = false;  job.valid=false }
      }

    
    }

  return (
    <>
       <FormProvider {...methods}>
      <Button
          style={{
            textTransform: "none", marginLeft: "1120px", width: "122px",
            height: "41px",
            background: "transparent linear-gradient(180deg, #1E84EA 0%, #2673CE 67%, #364F91 100%) 0% 0% no-repeat padding-box",
            boxShadow: "0px 1px 4px #00000029",
            borderRadius: "8px",
            opacity: 1,
            '&:disable': {
              background: "transparent linear-gradient(180deg, #848484 0%, #848484 67%, #848484 100%) 0% 0% no-repeat padding-box",
            },
          }}
          color="primary"
          variant="contained"
        
          onClick={() => {
           let validJobs=props.jobs.filter(x=>x.valid===true);

        
        
            let obj = {
              url: `${endpointContants.updateToken}`,
              body: validJobs,
            };

         
         
              // postHttp(obj, true)
              //   .then((response) => {
              //     console.log("received response", response);
              //     props.reRender();
                 
                
              //   })
              //   .catch((error) => {
              //     // const errMsg = error.message;
              //     // dispatch(fetchUserFailure(errMsg));
              //   });
          
          }}
        >
          update
                </Button>
        
       
      {jobs  ? (
        
    
          <Card
            key={jobs.referenceNumber}
            style={{ background: "#FFFFFF 0% 0% no-repeat padding-box",
              boxShadow: "0px 3px 6px #00000029",
              border: "1px solid #E2E2E2",
              borderRadius: "16px",
              opacity: 1,
            marginTop:"10px"}}
          >
        
            <Grid item container xs={12} sm spacing={1}>
          
              <Grid item xs={4} sm={2}>
              <LabelHeader >
                
                 Booking#
                 </LabelHeader>

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
              </Grid>

             
              <Grid item xs={4} sm={2}>
              <LabelHeader>
                Consignee Name
                </LabelHeader>

                <LabelData>
                 {jobs.consigneeDetails}
                 </LabelData>
              </Grid>

      
                <Grid item xs={4} sm={2}>
                <LabelHeader>
                  Booked On
                  </LabelHeader>
            
            
                  <LabelData>
                    {jobs.creationDate}
                    </LabelData>

             
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader>
                 Containers
                </LabelHeader>

              
                <LabelData>
                    {jobs.noOfContainers}
                </LabelData>

                 
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader>
                 Trucks
                 </LabelHeader>

              
                 <LabelData>
                    {jobs.noOftrucks}
                </LabelData>

                 
              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader>
                 Amount
                </LabelHeader>

                <LabelData>
                
                    {jobs.amount}
                    </LabelData>

              </Grid>
              <Grid item xs={4} sm={2}>
              <LabelHeader>

              
                 Expires In
                </LabelHeader>

                <LabelData>
                    {jobs.expiresIn}
                </LabelData>

              </Grid>
            </Grid>
            
      
              
        
              <>
                <Table>
                  <TableBody>
                    <TableRow style={{ borderTop: "1px solid grey" }}>
                      <TableCell style={{ borderBottom: "none" }}>
                        <InputLabel style={{  fontFamily:'Dubai Medium',color: "#848484",fontSize:'18px',whiteSpace:'nowrap' }}>
                          Container Number
                        </InputLabel>
                      </TableCell>

                      <TableCell style={{ borderBottom: "none" }}>
                      <InputLabel style={{  fontFamily:'Dubai Medium',color: "#848484",fontSize:'18px',whiteSpace:'nowrap' }}>
                         Drop Details
                        </InputLabel>
                      </TableCell>

                      <TableCell style={{ borderBottom: "none" }}>
                      <InputLabel style={{  fontFamily:'Dubai Medium',color: "#848484",fontSize:'18px',whiteSpace:'nowrap' }}>
                        Drop Date and time
                        </InputLabel>
                      </TableCell>

                      <TableCell style={{ borderBottom: "none" }}>
                      <InputLabel style={{  fontFamily:'Dubai Medium',color: "#848484",fontSize:'18px',whiteSpace:'nowrap' }}>
                         Truck Details
                        </InputLabel>
                      </TableCell>

                
                      <TableCell style={{ borderBottom: "none" }}>
                      <InputLabel style={{  fontFamily:'Dubai Medium',color: "#848484",fontSize:'18px',whiteSpace:'nowrap' }}>
                          Token Number
                        </InputLabel>
                      </TableCell>

                      <TableCell style={{ borderBottom: "none" }}>
                      <InputLabel style={{  fontFamily:'Dubai Medium',color: "#848484",fontSize:'18px',whiteSpace:'nowrap' }}>
                          Time Slot
                        </InputLabel>
                      </TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                      <InputLabel style={{  fontFamily:'Dubai Medium',color: "#848484",fontSize:'18px',whiteSpace:'nowrap' }}>
                          eToken
                        </InputLabel>
                      </TableCell>
                    </TableRow>

                    {jobs.containerList.map((container, inx) => (
                      <TableRow key={container.container_number}>
                        <TableCell>
                        <InputLabel style={{  fontFamily:'Dubai Regular',color: "#0568AE",fontSize:'18px',whiteSpace:'nowrap' }}>
                            {container.container_number}
                          </InputLabel>
                        </TableCell>

                        <TableCell>
                        <InputLabel style={{  fontFamily:'Dubai Regular',color: "#0568AE",fontSize:'16px',whiteSpace:'nowrap' }}>
                            {container.dropZone}
                          </InputLabel>
                        </TableCell>

                        <TableCell>
                        <InputLabel style={{  fontFamily:'Dubai Regular',color: "#848484",fontSize:'16px',whiteSpace:'nowrap' }}>
                            {container.date_time}
                          </InputLabel>
                        </TableCell>

                        <TableCell>
                        
                        <InputLabel style={{  fontFamily:'Dubai Regular',color: "#848484",fontSize:'16px',whiteSpace:'nowrap' }}>
                            {container.truckNumber}
                          </InputLabel>
                           
                        </TableCell>

                    

                        <TableCell>
                          <TextField
                            id="outlined-basic"
                            label="Token#"
                            variant="outlined"
                            size="small"
                            defaultValue={container.tokenOut}
                            onChange={(e) => {
                          
                                container.tokenOut = e.target.value; 
                                validate(container,jobs);
                               }
                   
                            }
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
                                defaultValue={container.tokenOutSlotFrom}
                                onChange={(event) => {
                                  setToTime(event.target.value);
                                  container.tokenOutSlotFrom =
                                    event.target.value;
                                  validate(container,jobs);
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
                                defaultValue={container.tokenOutSlotTo}
                                onChange={(event) => {
                                  setFromTime(event.target.value);
                                  container.tokenOutSlotTo = event.target.value;
                                  validate(container,jobs);
                                  //  setFromDate(event.target.value);
                                }}
                              />
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
                                e.target.value = '';
                                console.log("???????????", container);
                               
                                let promiseData = new Promise(
                                  (resolve, reject) => {
                                    const reader = new FileReader();

                                    reader.onload = (event) => {
                                      resolve(event.target.result);
                                    };

                                    reader.onerror = (err) => {
                                      reject(err);
                                    };

                                    reader.readAsDataURL(file);
                                  }
                                );

                                promiseData.then((result) => {
                                  const contentArr = result.split(",");
                                  const fileType = contentArr[0]
                                    .replace("data:", "")
                                    .replace(";base64", "");
                                  let etokenDto = {};
                                  console.log("file type::", fileType);
                                  console.log("file size::", file.size);
                                  if (allowedFileTypes.some(item => fileType.split("/")[1] === item)) {
                                    if (file.size <= 500000) {
                                      etokenDto.fileContent = contentArr[1];
                                      etokenDto.fileType = fileType;
                                      etokenDto.tokenType = "FCL_OUT";
                                      etokenDto.fileName = file.name;
                                      container.etokenDto = etokenDto;
                                      console.log("container::", container);
                                      console.log("etoken::", container.etokenDto);
                                      container.upload = true;
                                      validate(container,jobs);
                                      setRender(render + 1);
                                      setShowToaster1(false);
                                      setShowToaster2(false);
                                    } else {
                                      console.log("file size error");
                                      container.upload = false;
                                      
                                      validate(container,jobs);
                                      setShowToaster1(true);
                                    }
                                  } else {
                                    console.log("file format error");
                                    container.upload = false;
                                    
                                    validate(container,jobs);
                                    setShowToaster2(true);
                                  }
                                }
                                );
                              }}
                              //  onChange={() => { selectFile(Event, job,props.key) }}
                            />

                            {!container.upload && (
                              <img src="./token_upload.svg" />
                            )}
                            {container.upload && (
                              <img src="./token_success.svg" />
                            )}
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
              </>
           
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
                onClose={()=>setContainerPopup(false)}
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
                onClose={()=>setTruckDetailsPopup(false)}
                bookingNumber={jobs.referenceNumber}
              />
            )}
    </>
  );
}

export default React.memo(JobCard);
