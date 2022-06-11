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
    props.onTokenEntered(containerData);
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
                  <TableCell> 
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
                                onSelect={(e) => {
                                    console.log("select for mt truck", e);
                                    onTransporterSelect(e)
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
                                onSelect={(e) => {
                                    console.log("select for mt truck", e);
                                  onTruckSelect(e);
                                  }}
                          />
                      </Grid>

                    </Grid>
                  
                  </TableCell>
                </Paper>
              </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
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
