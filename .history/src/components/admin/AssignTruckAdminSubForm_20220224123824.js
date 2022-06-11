import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Grid,
 
  Paper,
  makeStyles,
  InputLabel,
  Card,
  TextField,

} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import InputBase from "@material-ui/core/InputBase";
import AppDatePicker from "../../lib/components/datepicker/appDatePicker";
import { FormProvider, useForm } from "react-hook-form";

import ApplnAutoCompleteAsync from '../../lib/components/autocomplete/ApplnAutoCompleteAsync';
import * as endpointContants from "../../utils/ptmsEndpoints";
import Link from "@material-ui/core/Link";
import ContainerPopup from "../request/ContainerPopup";
import AppAutoCompleteAsyc from "../../lib/components/autocomplete/appAutoCompleteAsyc";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";

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
 
  const [truckNumber, setTruckNumber] = useState("");
   
  const [transporter, setTransporter] = useState("");
  const transporterSelected={value:containerData.transporterCode,label:containerData.transporterlabel};
  const transporterOptions=[{value:containerData.transporterCode,label:containerData.transporterlabel}];
  const [reload, setReload] = useState(0);
  const [lengthMsg, setMaxLengthMsg] = useState("");
 

  const [selectedFile,setSelectedFile]=React.useState(undefined);

  const truckKVmapping = { label: "label", value: "value" };
  const transporterKVmapping = { label: "label", value: "value" };
  //let transporter = "";
  const truckUrl = `${endpointContants.fetchTrucksForTransporter}?transporter=${transporter}`;
  const transporterUrl = `${endpointContants.fetchTransporters}?transporter=""`;
  console.log("props containerData",props.containerData);
  const [containerPopup, setContainerPopup] = useState(false);
  const [dataForPopup, setDataForPopup] = useState(false);




  
  const methods = useForm();



  const onTruckSelect = (e) => {

    containerData.trucklabel = e.label;
    containerData.truckCode = e.value;

    containerData.assignedTruck =  containerData.truckCode;
    setTruckNumber(e.value);
 
   // props.onTokenEntered(containerData);
  };

  const onTransporterSelect = (e) => {
    setTransporter(e.value);
    containerData.transporterName=e.label;
    containerData.transporterlabel = e.label;
    containerData.transporterCode = e.value;
    
 
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
        setReload(reload+1);
       
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
         <FormProvider {...methods}>
            <form >
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
                            onClick={()=>{
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
                         defaultValue={containerData.adminComments}    inputProps={{ maxLength: 250 }}
                          onChange={(e) => {
                            containerData.adminComments = e.target.value;
                            if (e.target.value.length >240)
                              setMaxLengthMsg(
                                250 -
                                  e.target.value.length +
                                  " characters left."
                              );
                            else setMaxLengthMsg("");
                          }}
          ></TextField>
           <span
                              style={{
                                textAlign: "left",
                                fontFamily: "Dubai Light",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                color: "#ff0101",
                                paddingLeft: "5px",
                              }}
                            >
                              {" "}
                              {lengthMsg}
                            </span>
                        </Grid>
                      
                   
                    </Grid>


  </TableCell>
              

                  <TableCell style={{ width:"200px"}}> 
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                    <ApplnAutoCompleteAsync
                            name={"transporter"}
                        label="Transporter Name"
                        defaultValue={
                         {
                          value:props.containerData.transporterCode,label:props.containerData.transporterlabel
                          }
                          
                        }
                      
                        kvMapping={transporterKVmapping}
                        remoteUrl={transporterUrl}
                        helperText={containerData.transporterError ? 'Transporter Required' : ''}  
                           
                                options={[]}
                                isError={containerData.transporterError}  
                                
                                iconColor=""
                                value=""
                                onSelect={(e) => {
                                    console.log("select for mt truck", );
                                    onTransporterSelect(e);
                                  }}
                      />
                      </Grid>
                      <Grid item xs={6}>
                      <ApplnAutoCompleteAsync
                            name={"truck"}
                        label="Truck number"
                        isError={containerData.truckError}                   
                        kvMapping={truckKVmapping}
                        remoteUrl={truckUrl}
                        helperText={containerData.truckError ? 'Truck Required' : ''}  
                        defaultValue={
                          {
                           value:props.containerData.truckCode,label:props.containerData.trucklabel
                               }
                           
                         }
                          
                                options={[]}
                                
                                iconColor=""
                                value=""
                                onSelect={(e) => {
                                    console.log("select for mt truck", e);
                                  onTruckSelect(e);
                                  }}
                          />
                           {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
                      </Grid>

                    </Grid>
                    <Card style={{ width: "600px", height: "100px" }}>
                     
                      <Grid container direction="row">
                        <Grid item xs={3}>
                          <TextField
                            id="standard-basic"
                            label="Token#"
                            defaultValue={containerData.tokenOut}
                            error={containerData.tokenError}  
                            onBlur={(e) => {
                              containerData.tokenOut = e.target.value;
                              //props.onTokenEntered(containerData);
                              console.log("text value", e.target.value);
                            }}
                            helperText={containerData.tokenError ? 'Token Required' : ''}  
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
                    
                         <ApplnDatePicker name={"dateTime"} iconColor="#1FA5FF" disablePastDate={false}
                        height="40px" width="170px" value={containerData.tokenOutDate} 
                        isError={containerData.dateError}     helperText={containerData.dateError ? 'Date Required' : ''}  
                        onChange={(e) => {
                         console.log(e);
                                 
                        containerData.tokenOutDate = e;
                                
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

                        <Grid item xs={2}>
                          <TextField
                            id="toTime"
                            type="time"
                            defaultValue={containerData.tokenOutSlotFrom}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={containerData.timeError}    
                        
                            inputProps={{
                                size: "small",
                               
                              }}
                            onChange={(event) => {
                              
                              containerData.tokenOutSlotFrom =
                                event.target.value;
                            
                            }}
                          />
                          <TextField
                            id="fromTime"
                            type="time"
                            size="small"
                            inputProps={{
                              size: "small",
                            }}
                            error={containerData.timeError}  
                            defaultValue={containerData.tokenOutSlotTo}  
                            onChange={(event) => {
                           
                              containerData.tokenOutSlotTo = event.target.value;
                          
                            }}
                          />
                         {containerData.timeError && <span style={{color:'#f44336',fontFamily:'Dubai Regular',fontSize:'13px'}}>Time Required</span> }
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

                            
                            />
                            {containerData.etokenDto && 
                            <img src="./token_success.svg" />}

                             {!containerData.etokenDto && 
                            <img src="./token_upload.svg" />}
                          </label>
                          <br></br>
                         
                          {containerData.etokenError ? <span style={{color:'#f44336',fontFamily:'Dubai Regular',fontSize:'13px'}}> eToken</span> :<span>eToken</span>}

                  
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
      </form>
          </FormProvider>

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
export default AssignTruckAdminSubForm;
