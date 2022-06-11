import React, { useState } from "react";
import { Card } from "@material-ui/core/";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { InputLabel,Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MinimizeIcon from "@material-ui/icons/Minimize";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormProvider, useForm } from "react-hook-form";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import Toast from "../../lib/components/toast/ErrorToast";

function EmptyIn(props) {
  const job = props.job;
  const [reRender, setReRender] = useState(0);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const allowedFileTypes = ['pdf', 'doc', 'png', 'docx', 'jpg', 'jpeg'];
  const [showToaster1, setShowToaster1] = useState(false);
  const [showToaster2, setShowToaster2] = useState(false);
  const [updateList, setUpdateList] = useState([]);
  
  const methods = useForm({
    //resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: "",
  });

  const updateJob = (container) => {
    // var container = job.requestContainerList.find((x) => {
    //   return x.container_number === containerNumber;
    // });

    // var containerIndex= job.requestContainerList.findIndex((x) => {
    //   return x.container_number === containerNumber;});
    


    if (
      container.tokenInDate &&
      container.tokenIn &&
      container.tokenInSlotFrom &&
      container.tokenInSlotTo &&
      container.etokenDto
    ) {
      if (!container.valid) {
        container.valid = true;
  
        job.valid = !job.requestContainerList.some((x)=>x.valid!==true);
        if(job.valid)
        props.updateJobList(job);
      }
    
    } else {
     
        container.valid = false;
        if(job.valid===undefined)
        {
        job.valid=false;
        props.updateJobList(job);
        }
     
    }
    
  };

  return (
    <>
     {job &&  <FormProvider {...methods}>
      <Card
        key={job.referenceNumber}
        style={{ background: "#FFFFFF 0% 0% no-repeat padding-box",
              boxShadow: "0px 3px 6px #00000029",
              border: "1px solid #E2E2E2",
              borderRadius: "16px",
          opacity: 1,
           
            marginTop:"10px"}}
      >
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
              border: "2px solid #0E1B3D",
            }}
            >
              {((props.index + 1) + "").padStart(2, '0')}
           
          </Box>
          <div className="col-md">
            <InputLabel style={{whiteSpace:'nowrap',marginTop:"10px",fontSize:"26px",color:"#BABABA"}}>Job Number#{job.referenceNumber}</InputLabel>
          </div>

          <div className="col-md">
            <IconButton
              style={{  marginLeft: "1100px" }}
              onClick={() => {
                job.open = !job.open;
                setReRender(reRender + 1);
                setShowToaster1(false);
                setShowToaster2(false);
              }}
            >
              {" "}
              {job.open ? <MinimizeIcon /> : <AddIcon />}{" "}
            </IconButton>
          </div>
        </div>
        <Grid item container xs={12}  spacing={1}>
          <Grid item xs={2} >
            <InputLabel style={{color: "#848484", marginLeft: "20px",whiteSpace:'nowrap', }}>
              Consignee Name
            </InputLabel>

            <InputLabel
              style={{ color: "black", marginTop: "2px", marginLeft: "20px", }}
            >
              {job.contactDetails}
            </InputLabel>
          </Grid>

          <Grid item xs={1} >
            <InputLabel style={{  color: "#848484" }}>
              Containers
            </InputLabel>

            <InputLabel
              style={{ color: "black", marginTop: "2px" }}
            >
              {job.noOfContainers}
            </InputLabel>
          </Grid>

          <Grid item xs={1} >
            <InputLabel style={{  whiteSpace:'nowrap', color: "#848484" }}>
              FCL OUT Truck
            </InputLabel>

            <InputLabel
              style={{  color: "black", marginTop: "2px" }}
            >
              {job.vehicleRegNo}
            </InputLabel>
          </Grid>

          {/* <Grid item xs={6} sm={2}>
            <InputLabel style={{ fontSize: "13px", color: "black" }}>
              FCL OUT Truck Type
            </InputLabel>

            <InputLabel
              style={{ fontSize: "13px", color: "black", marginTop: "2px" }}
            >
              {job.vehicleType}
            </InputLabel>
          </Grid> */}

            <Grid item xs={2} >
            <Tooltip title={job.dropAddress} arrow>
            <InputLabel style={{  color: "black" }}>
                  <img src="./location-pin-grey.svg" /> {job.dropAddress.substring(0, 40) + "..."}
                </InputLabel>
                </Tooltip>
            </Grid>
            <Grid item xs={4} sm={2}>
                <InputLabel style={{  color: "#848484" }}>
                  Requester Company Name
                </InputLabel>

                <InputLabel style={{ color: "black" }}>
                  {job.requestedBy}
                </InputLabel>
              </Grid>
              <Grid item xs={2} >
                <InputLabel style={{  color: "#848484" ,whiteSpace:'nowrap'}}>
                  Contact Person 
                </InputLabel>

                <InputLabel style={{ color: "black" }}>
                  {job.requesterContactName}
                </InputLabel>
              </Grid>
              <Grid item xs={2} >
                <InputLabel style={{ color: "#848484" ,whiteSpace:'nowrap'}}>
                  Contact Number
                </InputLabel>

                <InputLabel style={{  color: "black" }}>
                  {job.requesterContactNumber}
                </InputLabel>
              </Grid>
        </Grid>
        {job.open && (
          <>
            <hr style={{ backgroundColor: "#D3D3D3" }}></hr>
            <Table >
              <TableBody>
                <TableRow>
                  <TableCell style={{ borderBottom: "none" }}>
                    <InputLabel style={{  color: "grey",whiteSpace:'nowrap' }}>
                      Container Number
                    </InputLabel>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <InputLabel style={{  color: "grey" }}>
                      Declaration#
                    </InputLabel>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <InputLabel style={{  color: "grey" }}>
                      Booking#
                    </InputLabel>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <InputLabel style={{ color: "grey",whiteSpace:'nowrap' }}>
                      MT IN Truck
                    </InputLabel>
                    </TableCell>

                    <TableCell style={{ borderBottom: "none" ,whiteSpace:'nowrap'}}>
                    <InputLabel style={{  color: "grey" }}>
                   Date and Time
                    </InputLabel>
                  </TableCell>

                  <TableCell style={{ borderBottom: "none" }}>
                    <InputLabel style={{ color: "grey" }}>
                      Token Number
                    </InputLabel>
                  </TableCell>

                    <TableCell style={{ borderBottom: "none" }}>
                      {/* <Grid container spacing={2}>
                      <Grid item xs={6} style={{marginTop:"20px"}}> */}
                    <InputLabel style={{  color: "grey" ,whiteSpace:'nowrap'}}>
                          Token Time Slot
                    </InputLabel>
                        {/* </Grid>
                        </Grid> */}
                  </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                    <Grid
                          item
                         
                        >
                    <InputLabel style={{ color: "grey",float:"right"}}>
                          eToken
                    </InputLabel>
                    </Grid>
                  </TableCell>
                </TableRow>

                {job.requestContainerList.map((container) => (
                  <TableRow key={container.container_number}>
                    <TableCell>
                      <InputLabel style={{ color: "black" }}>
                        {container.container_number}
                      </InputLabel>
                    </TableCell>

                    <TableCell>
                      <InputLabel style={{  color: "black" }}>
                        {container.boeNumber}
                      </InputLabel>
                    </TableCell>

                    <TableCell>
                      <InputLabel style={{  color: "black" }}>
                        {container.requestDetailsNumber}
                      </InputLabel>
                    </TableCell>

                    <TableCell>
                      <InputLabel style={{  color: "black" }}>
                        {container.mtTruck}
                      </InputLabel>
                    </TableCell>

                    <TableCell>
                      <InputLabel style={{  color: "black" }}>
                        {container.requestTimeInSlot}
                      </InputLabel>
                    </TableCell>

                    <TableCell>
                      <TextField
                        id="outlined-basic"
                        label="Token#"
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                          container.tokenIn = e.target.value;
                          console.log("blurred", container.tokenIn);
                          updateJob(container);
                        }}
                      />
                    </TableCell>
                    <TableCell colSpan="4">
                      <Grid container spacing={2}>
                        <Grid item xs={6} style={{marginTop:"20px"}}>
                          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              InputAdornmentProps={{ position: "start" }}
                              disableToolbar
                              variant="inline"
                              format="dd/MM/yyyy"
                              margin="normal"
                              value={container.tokenInDate?container.tokenInDate:null}
                              onChange={(date) => {
                                setSelectedDate(date);
                                container.tokenInDate = date;
                                updateJob(container.container_number);
                              }}
                              KeyboardButtonProps={{
                                style: {
                                  fontSize: "12px",
                                  color: "#1FA5FF",
                                  padding: 0,
                                },
                              }}
                            />
                          </MuiPickersUtilsProvider> */}
                           <ApplnDatePicker name={"dateTime"} label="" iconColor="#1FA5FF" disablePastDate={true}   onChange={(e) => {
                            container.tokenInDate = methods.getValues().dateTime;
                            setSelectedDate(methods.getValues().dateTime);
                            updateJob(container);
                                console.log("selected date ::::", e);
                          }}/>
                        </Grid>
                        <Grid item xs={1}>
                          <hr
                            style={{
                              width: "0px",
                              height: "50px",
                              backgroundColor: "#D3D3D3",
                            }}
                          ></hr>
                        </Grid>

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
                            onChange={(event) => {
                              container.tokenInSlotFrom = event.target.value;
                              updateJob(container);
                            }}
                          />
                          <TextField
                            id="fromTime"
                            type="time"
                            size="small"
                            inputProps={{
                              size: "small",
                            }}
                            onChange={(event) => {
                              container.tokenInSlotTo = event.target.value;
                              updateJob(container);
                            }}
                          />
                        </Grid>

                      </Grid>
                    </TableCell>
                    <TableCell>
                      
                    <Grid
                          item
                          style={{
                            position: "relative",
                            marginLeft: "25px",
                            marginTop: "5px",
                          }}
                        >
                          <label htmlFor={container.container_number}>
                            <input
                              type="file"
                              name={container.container_number}
                              id={container.container_number}
                              style={{ display: "none" }}
                              onChange={(e) => {
                                const file = e.target.files[0];
                                e.target.value = '';
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
                                  container.etokenDto = "";
                                  if (allowedFileTypes.some(item => fileType.split("/")[1] === item)) {
                                    if (file.size <= 500000) {
                                      etokenDto.fileContent = contentArr[1];
                                      etokenDto.fileType = fileType;
                                      etokenDto.tokenType = "EMPTY_IN";
                                      etokenDto.fileName = file.name;
                                      container.etokenDto = etokenDto;
                                      console.log("container::", container);
                                      console.log("etoken::", container.etokenDto);
                                      setReRender(reRender + 1);
                                      updateJob(container);
                                      setShowToaster1(false);
                                      setShowToaster2(false);
                                    } else {
                                      setShowToaster1(true);
                                      setReRender(reRender + 1);
                                    }
                                  } else {
                                    setShowToaster2(true);
                                    setReRender(reRender + 1);
                                  }
                                }
                                );
                              }}
                              //  onChange={() => { selectFile(Event, job,props.key) }}
                            />
                            {container.etokenDto && (
                              <img src="./token_success.svg" />
                            )}

                            {!container.etokenDto && (
                              <img src="./token_upload.svg" />
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
                        </Grid>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
        </Card>
        </FormProvider>
}
    </>
  );
}
export default React.memo(EmptyIn);
