import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "@material-ui/core/";
import AssignTokenService from "./AssignTokenService";



function JobCard(props) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [fromTime, setFromTime] = React.useState("");
  const [toTime, setToTime] = React.useState("");
  const [render, setRender] = useState(0);
  const [disable, setDisable] = useState(false);
  const allowedFileTypes = ['pdf', 'doc', 'png', 'docx', 'jpg', 'jpeg'];
  const [showToaster1, setShowToaster1] = useState(false);
  const [showToaster2, setShowToaster2] = useState(false);
  const methods = useForm({
    //resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: "",
  });

  useEffect(() => {
         if(props.fclCount>0)
         {
              AssignTokenService.fetchPendingTokenJobs()
                .then((response) => {
                  if (response.isAxiosError)
                    setJobs([]);
                  else {
                    console.log("response in ::", response);
                    setJobs(response);          
                   
                  }
              })
              .catch((error) => {
                console.log("error");
                setJobs([]);
              });
          };

        },[])
      
  
    
  



  

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
        {!disable && <Button
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
          disabled={disable}
          onClick={() => {
           let validJobs=props.jobs.filter(x=>x.valid===true);

        
        
            let obj = {
              url: `${endpointContants.updateToken}`,
              body: validJobs,
            };

         
         
              postHttp(obj, true)
                .then((response) => {
                  console.log("received response", response);
                  props.reRender();
                 
                
                })
                .catch((error) => {
                  // const errMsg = error.message;
                  // dispatch(fetchUserFailure(errMsg));
                });
          
          }}
        >
          update
                </Button>}
        
       
      {jobs && jobs.length > 0 ? (
        
    
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
                {((inx + 1) + "").padStart(2, '0')}
              </Box>
           
      
              <div className="col"  style={{ marginLeft: "1100px" }}>
                <IconButton
                 
                  onClick={() => {
                    props.onExpandClicked(job);
                    setShowToaster1(false);
                    setShowToaster2(false);
                  }}
                >
                  {" "}
                  {job.open ? <MinimizeIcon /> : <AddIcon />}{" "}
                </IconButton>
              </div>
            </div>
            <Grid item container xs={12} sm spacing={1}>
              <Grid item xs={4} sm={2}>
                <InputLabel
                  style={{
                   
                    color: "#757575",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                  }}
                >
                 Booking#
                </InputLabel>

                <InputLabel
                   style={{
                   
                    color: "#0568AE",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                    marginTop:"2px"
                  }}
                >
                  {job.referenceNumber}
                </InputLabel>
              </Grid>

             
              <Grid item xs={4} sm={2}>
              <InputLabel
                  style={{
                   
                    color: "#757575",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                  }}>
                Consignee Name
                </InputLabel>

                <InputLabel
                  style={{
                   
                    color: "black",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                    marginTop:"2px"
                  }}>
                 {job.consigneeDetails}
                </InputLabel>
              </Grid>

      
                <Grid item xs={4} sm={2}>
                <InputLabel
                   style={{
                   
                    color: "#757575",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                  }}

                >

                  Booked On
                </InputLabel>
            
            
              <InputLabel
                  style={{
                   
                    color: "black",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                    marginTop:"2px"
                  }}>
                    {job.creationDate}
                </InputLabel>

             
              </Grid>
              <Grid item xs={4} sm={2}>
              <InputLabel
                   style={{
                   
                    color: "#757575",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                  }}

                >
                 Containers
                </InputLabel>

              
                <InputLabel
                  style={{
                   
                    color: "black",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                    marginTop:"2px"
                  }}>
                    {job.noOfContainers}
                </InputLabel>

                 
              </Grid>
              <Grid item xs={4} sm={2}>
              <InputLabel
                   style={{
                   
                    color: "#757575",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                  }}

                >
                 Amount
                </InputLabel>

                <InputLabel
                  style={{
                   
                    color: "black",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                    marginTop:"2px"
                  }}>
                    {job.amount}
                </InputLabel>

              </Grid>
              <Grid item xs={4} sm={2}>
              <InputLabel
                   style={{
                   
                    color: "#757575",
                    fontSize:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                  }}

                >
                 Expires In
                </InputLabel>

                <InputLabel
                  style={{
                   
                    color: "black",
                    size:'18px',
                    fontFamily:'Dubai Regular',
                    marginLeft: "20px",
                    marginTop:"2px"
                  }}>
                    {job.expiresIn}
                </InputLabel>

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

                    {job.containerList.map((container, inx) => (
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
                                validate(container,job);
                               }
                   
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Grid container>
                            <Grid item xs={5} style={{marginTop:"20px"}}>
                              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  InputAdornmentProps={{ position: "start" }}
                                  disableToolbar
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  margin="normal"
                                  id="date-picker-inline"
                                  value={
                                    container.tokenOutDate
                                      ? container.tokenOutDate
                                      : null
                                  }
                                  onChange={(date) => {
                                    let datestr = '';
                                    console.log("selected date::::::::", date);
                                    //console.log("xxxxxxxxxxxxxxxxx::", moment(date).format('dd/MM/yyyy'));
                                   // container.tokenOutDate = moment(date).format('DD/MM/YYYY');
                                   if (date && date !== 'Invalid Date') {
                                    let day = date.getDate();
                                    let month = date.getMonth() + 1;
                                    let year = date.getFullYear();
                                     datestr = day + '/' + (date.getMonth() + 1) + '/' + year;
                                     console.log("selected date::::::::1", datestr);
                                    setSelectedDate(datestr);
        
                                }
                                    container.tokenOutDate = datestr;
                                    validate(job);
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
                              <ApplnDatePicker name={"dateTime"} label="" iconColor="#1FA5FF" disablePastDate={true}  onChange={(e) => {
                                container.tokenOutDate = methods.getValues().dateTime;
                                validate(container,job);
                              
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
                                defaultValue={container.tokenOutSlotFrom}
                                onChange={(event) => {
                                  setToTime(event.target.value);
                                  container.tokenOutSlotFrom =
                                    event.target.value;
                                  validate(container,job);
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
                                  validate(container,job);
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
                                      validate(container,job);
                                      setRender(render + 1);
                                      setShowToaster1(false);
                                      setShowToaster2(false);
                                    } else {
                                      console.log("file size error");
                                      container.upload = false;
                                      
                                      validate(container,job);
                                      setShowToaster1(true);
                                    }
                                  } else {
                                    console.log("file format error");
                                    container.upload = false;
                                    
                                    validate(container,job);
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
    </>
  );
}

export default React.memo(JobCard);
