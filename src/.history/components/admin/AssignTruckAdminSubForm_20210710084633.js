import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Divider,
  TableHead,
  Paper,
  makeStyles,
  InputLabel,
  Card,
  TextField,
  Select,
  FormHelperText 
} from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { withStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import AssignTruckAndDriverService from "../../service/AssignTruckAndDriverService";
import ApplnAutoCompleteAsync from '../../lib/components/autocomplete/ApplnAutoCompleteAsync';
import * as endpointContants from "../../utils/ptmsEndpoints";
import Link from "@material-ui/core/Link";
import ContainerPopup from "../request/ContainerPopup";
import { Formik, Form } from "formik";
import AppAutoCompleteAsyc from "../../lib/components/autocomplete/appAutoCompleteAsyc";


const BootstrapInput = withStyles((theme) => ({
  root: {},
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    width: 120,
    height: 15,
    fontSize: 15,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Segoe UI Regular"'].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "grey",
      boxShadow: "0 0 0 0rem ",
    },
    color: "grey",
  },
}))(InputBase);

const useStyles = makeStyles({});

function AssignTruckAdminSubForm(props) {
  const [containerData, setContainerData] = useState(props.containerData);
  const [transporterOptions, setTransporterOptions] = useState(props.transporterOptions);
  const [truckOptions, setTrucksOptions] = useState([]);
  const [truckNumber, setTruckNumber] = useState("");
  const [transporter, setTransporter] = useState();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [token, setToken] = React.useState("");
  const [fromTime, setFromTime] = React.useState("");
  const [toTime, setToTime] = React.useState("");
  const [selectedFile,setSelectedFile]=React.useState(undefined);

  const truckKVmapping = { label: "label", value: "value" };
  const transporterKVmapping = { label: "label", value: "value" };
  //let transporter = "";
  const truckUrl = `${endpointContants.fetchTrucksForTransporter}?transporter=${transporter}`;
  const transporterUrl = `${endpointContants.fetchTransporters}?transporter=""`;
  console.log("props containerData",props.containerData);
  const [containerPopup, setContainerPopup] = useState(false);
  const [dataForPopup, setDataForPopup] = useState(false);
  

  const defaultFormValues = {
    transporter: '',
    truck:'',
  
  };
  


  const onTruckSelect = (e) => {
    setTruckNumber(e);
    containerData.truckNumber = e.split(',')[0];
   // props.onTokenEntered(containerData);
  };

  const onTransporterSelect = (e) => {
    setTransporter(e);
    containerData.transporterCode = e;
    // AssignTruckAndDriverService.fetchTrucksForTransporter(e)
    // .then((response) => {
    //   setTrucksOptions(response);
    // })
    // .catch(() => {
    //   console.log("error");
    // });

  };



function selectFile(e) {
    const file = e.target.files[0];

    let promiseData= new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsDataURL(file);
    });

    promiseData.then(result=>{
       
        const contentArr = result.split(',');
        const fileType = contentArr[0].replace('data:', '').replace(';base64', '');
        let etokenDto={};
        etokenDto.fileContent = contentArr[1];
        etokenDto.fileType = fileType;
        etokenDto.tokenType = "EMPTY_IN";
        etokenDto.fileName=file.name;
        containerData.etokenDto=etokenDto;
        props.onTokenEntered(containerData);
    });
}
    



  useEffect(()=>{
    if(selectedFile)
    {
         console.log("selected file",selectedFile);

    }
},[selectedFile]);

  return (
    <>
          <Formik initialValues={defaultFormValues} >
            <Form>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Table style={{ width: "100%", marginLeft: "12px" ,borderBottom:'none'}}>
            <TableBody>
              {/* {containerSummary.containerInfo.map((container, ind) => ( */}
              <TableRow>
                <Paper variant="outlined" style={{ marginTop: "5px" ,background: '#FFFFFF 0% 0% no-repeat padding-box',
boxShadow: '4px 4px 13px #0000001C',
border: '1px solid #D3D3D3',
borderRadius: '5px',
opacity: 1}}>

  <TableCell
                    style={{
                    
                      
                      width: "600px",
                      fontFamily:"Dubai Regular",
                      fontSize:"18px",
                      borderRight: "1px solid #D3D3D3" 

            
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                      <Link
                            style={{
                              textDecoration: "underline",
                              whiteSpace: "nowrap",
                            }}
                            onClick={  ()=>{
                                setContainerPopup(true);
                                setDataForPopup(containerData);
                              
                            }
                          }
                          >
                            {containerData.container_number}  
                          </Link>
                          <InputLabel    style={{ color:'#848484'}}>   {containerData.iso_code}   {containerData.containerType}    
        </InputLabel> 
        </Grid>
        <Grid item xs={4}>
     
                   
                   {containerData.pickupLocation}
                       

              
                    <img src="./from_to.svg"  />


                    <Link
                            style={{
                              textDecoration: "underline",
                              whiteSpace: "nowrap",
                              
                            }}
                            onClick={  ()=>{
                                setContainerPopup(true);
                                 setDataForPopup(containerData);
                              
                            }
                          }
                          >
 
                    {containerData.dropZoneLabel}
                    </Link>

          </Grid>
                    
        
                     
                      <Grid item xs={4}>
                      <InputLabel  style={{  color: "#848484" }}>
                      Date & Time
                    </InputLabel>
                    <InputLabel style={{color:'black', fontWeight:"bold", fontSize: "16px"}} >{containerData.date_time}</InputLabel>
                      </Grid>
                      
                      <Grid item xs={12}>
                      <TextField label="Admin Comments(if any)" variant="outlined" style ={{width: '100%'}} multiline="true"
        
          ></TextField>
                        </Grid>
                      
                   
                    </Grid>


  </TableCell>
              
               
                  
                   
                
                
{/* 
                  <TableCell style={{ borderRight: "1px solid #D3D3D3", width:"180px"}}>
                    {/* <FormControl>
                      <InputLabel htmlFor="tranporter-label">
                       Select Transporter 
                      </InputLabel>
                      <Select
                      labelId="tranporter-label"
                        value={transporter}
                        id="tranporter-label-select"
                        input={<BootstrapInput />}
                        onChange={(e) => onTransporterSelect(e)}
                      >
                        {transporterOptions.map((option, i) => {
                          return (
                            <option value={option.value} key={i}>
                              {option.label}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="truck-label">
                       Truck Number
                      </InputLabel>
                      <Select
                      labelId="truck-label"
                        value={truckNumber}
                        id="truck-select"
                        input={<BootstrapInput />}
                        onChange={(e) => onTruckSelect(e)}
                      >
                        {truckOptions.map((option, i) => {
                          return (
                            <option value={option.value} key={i}>
                              {option.label}
                            </option>
                          );
                        })}
                      </Select>
                    </FormControl> */}
                       {/* <ApplnAutoCompleteAsync
                            name={"transporter"}
                        label="Transporter Name"
                      
                        kvMapping={transporterKVmapping}
                        remoteUrl={transporterUrl}
                           
                                options={[]}
                                
                                iconColor=""
                                value=""
                                onSelect={(e) => {
                                    console.log("select for mt truck", e);
                                    onTransporterSelect(e)
                                  }}
                      />
                       <ApplnAutoCompleteAsync
                            name={"truck"}
                        label="Truck number"
                      
                        kvMapping={truckKVmapping}
                        remoteUrl={truckUrl}
                          
                                options={[]}
                                
                                iconColor=""
                                value=""
                                onSelect={(e) => {
                                    console.log("select for mt truck", e);
                                  onTruckSelect(e);
                                  }}
                          />
                  </TableCell> */}
                  <TableCell style={{ width:"180px"}}> 
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                    <AppAutoCompleteAsyc
                            name={"transporter"}
                        label="Transporter Name"
                      
                        kvMapping={transporterKVmapping}
                        remoteUrl={transporterUrl}
                           
                                options={[]}
                                
                                iconColor=""
                                value=""
                                onSelect={(e,value,label) => {
                                    console.log("select for mt truck", label);
                                    onTransporterSelect(value)
                                  }}
                      />
                      </Grid>
                      <Grid item xs={6}>
                      <AppAutoCompleteAsyc
                            name={"truck"}
                        label="Truck number"
                      
                        kvMapping={truckKVmapping}
                        remoteUrl={truckUrl}
                          
                                options={[]}
                                
                                iconColor=""
                                value=""
                                onSelect={(e,value,label) => {
                                    console.log("select for mt truck", label);
                                  onTruckSelect(value);
                                  }}
                          />
                      </Grid>

                    </Grid>
                    <Card style={{ width: "600px", height: "65px" }}>
                      {/* <div className="row">
                            <div className="col-md-4">
                            <InputLabel >Lorin lopsum</InputLabel>   
                            </div>
                            <div className="col-md-1">
                            <hr style={{width:"0px",height:"30px",backgroundColor:"#D3D3D3"}}></hr>
                            </div>
                            <div className="col-md-5">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          
                                <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                              </MuiPickersUtilsProvider>

                        </div></div> */}
                      <Grid container direction="row">
                        <Grid item xs={3}>
                          <TextField
                            id="standard-basic"
                            label="Token#"
                            onBlur={(e) => {
                              containerData.tokenOut = e.target.value;
                              //props.onTokenEntered(containerData);
                              console.log("text value", e.target.value);
                            }}
                          />
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
                        <Grid item xs={3}>
                          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              InputAdornmentProps={{ position: "start" }}
                              disableToolbar
                              variant="inline"
                              format="dd/MM/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                style: {
                                  fontSize: "12px",
                                  color: "#1FA5FF",
                                  padding: 0,
                                },
                              }}
                            />
                          </MuiPickersUtilsProvider>  */}
                           {/* <ApplnDatePicker name={"dateTime"} label="" iconColor="#1FA5FF" disablePastDate={true} onChange={() => {
                                   let date = methods.getValues().dateTime;
                                   setSelectedDate(date);
                                   containerData.tokenOutDate = date;
                                //   props.onTokenEntered(containerData);
                          }}/>  */}
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
                              setToTime(event.target.value);
                              containerData.tokenOutSlotFrom =
                                event.target.value;
                             // props.onTokenEntered(containerData);
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
                            onChange={(event) => {
                              setFromTime(event.target.value);
                              containerData.tokenOutSlotTo = event.target.value;
                             // props.onTokenEntered(containerData);
                              //  setFromDate(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <hr
                            style={{
                              width: "0px",
                              height: "50px",
                              backgroundColor: "#D3D3D3",
                            }}
                          ></hr>
                        </Grid>
                        <Grid
                          item
                          style={{
                            position: "relative",
                            marginLeft: "25px",
                            marginTop: "5px",
                          }}
                        >
                          <label for={containerData.container_number}>
                            <input
                              type="file"
                              name="image"
                              id={containerData.container_number}
                              style={{ display: "none" }}
                              onChange={selectFile}

                              // onChange={selectFile}
                            />
                            {containerData.etokenDto && 
                            <img src="./token_success.svg" />}

                             {!containerData.etokenDto && 
                            <img src="./token_upload.svg" />}
                          </label>
                          <br></br>
                          eToken
                        </Grid>
                      </Grid>
                    </Card>
                  
                  </TableCell>
                </Paper>
              </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      </Form>
      </Formik>

      {containerPopup && dataForPopup &&(
          <ContainerPopup
            containers={dataForPopup}
            onClose={()=>setContainerPopup(false)}
            enableButton={false}
          />
        )}
    </>
  );
}
export default React.memo(AssignTruckAdminSubForm);
