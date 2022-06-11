import React, { useEffect, useState } from "react";
import {
  Table,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  InputLabel,
  TextField
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

import InputBase from "@material-ui/core/InputBase";
import {  withStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik, Form } from "formik";
import AppAutoComplete from "../../lib/components/autocomplete/appautocomplete";
import AppAutoCompleteAsyc from "../../lib/components/autocomplete/appAutoCompleteAsyc";
import * as endpointContants from "../../utils/ptmsEndpoints";

let fmk;

const BootstrapInput = withStyles((theme) => ({
   root: {
    
   

   },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    width: 300,
    fontSize: 15,
    padding: "26px 15px 5px  20px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Segoe UI Regular"'].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "grey",
      boxShadow: "0 0 0 0rem ",
    },
    color: "grey",
   
  }

}))(InputBase);

const truckForm = {
truck:""
};



export default function AssignTrucksSubForm(props) {
  const [containerData, setContainerData] = useState(props.containerData);
  const [truckOptions, setTruckOptions] = useState(props.truckOptions);
  const [truckNumber, setTruckNumber] = useState(props.truckNumber);
  const [transporter, setTransporter] = useState();
  const [formvalues] = useState(truckForm);
  const [truckUrl,setTruckUrl] = useState( `${endpointContants.fetchTrucksForTransporter}?transporter=''`);
  console.log("truckOptions in child", truckOptions);

  const truckKVmapping = { label: "label", value: "value" };
 
  const transporterUrl = `${endpointContants.fetchTransporters}`;
  const transporterKVmapping = { label: "label", value: "value" };

 

  const onTruckSelect = (value) => {
    console.log("truck selected", value);
      setTruckNumber(value);
    props.onTruckSelect(value, containerData.container_number,transporter);

  };

  return (
    <Formik initialValues={formvalues} enableReinitialize>
    {(formik) => {
      fmk = formik;
      return (
        <>
           <Form autoComplete="off">
      {/* <Grid container direction="row" spacing={1} alignItems="flex-start">
        <Grid item > */}
          <Table style={{ width: "100%", marginLeft: "12px" }}>
            <TableBody>
              {/* {containerSummary.containerInfo.map((container, ind) => ( */}
              <TableRow>
                <Paper variant="outlined" style={{ marginTop: "5px" }}>
                  <TableCell
                    style={{
                     
                      color: "grey",
                      width: "250px",
                     
                    }}
                  >
                   
                       <InputLabel  style={{ textDecoration:'underline', fontSize:'18px',fontWeight:"bold" , color: "#0568AE" }}> {containerData.container_number}</InputLabel>                   
                       <InputLabel   style={{ fontSize:'16px',color:'#848484',paddingTop:"15px"}}> {containerData.containerType}</InputLabel>        
                  </TableCell>
                  <TableCell 
                   style={{
                    fontSize: "16px",
                    width: "400px",
                    color:"black",
                    fontWeight:"bold"
                   
                  
                   }}
                  >
                   
                   <img src="./location-pin.svg"  />
                   
                  {containerData.pickupLocation}

                   <img src="./toFrom.svg"  />

                   <img src="./location-pin.svg"  />

                   {containerData.dropZoneLabel}
                    
                  </TableCell>
                 
                 
                  <TableCell
                    style={{
                      fontSize: "13px",
                      color: "grey",
                      width: "180px",
                      borderRight: "1px solid #D3D3D3" 
                    }}
                  >
                     <InputLabel  style={{  color: "#848484" }}>
                      Date & Time
                    </InputLabel>
                    <InputLabel style={{color:'black', fontWeight:"bold", fontSize: "16px",paddingTop:"15px"}} >{containerData.deliveryDate}</InputLabel>
                  </TableCell>
                  <TableCell  style={{
                   
                   width: "300px",
                 
                  
                 
                  }}>

<AppAutoCompleteAsyc
                            name={"transporter"}
                            label="Transporter Name"
                        style={{ marginTop: "2px" }}
                        kvMapping={transporterKVmapping}
                        remoteUrl={transporterUrl}
                       
                        colour={'#848484'}
                       
                        options={[]}
                         
                        onSelectMenu={(e,value,label) => {
                           setTransporter({name:label,code:value});
                           setTruckUrl(`${endpointContants.fetchTrucksForTransporter}?transporter=${value}`);
                        
                        }}
                        
                          />
                      </TableCell>
                  <TableCell  style={{
                   
                    width: "300px",
                  
                   
                  
                   }}>
                
                       <AppAutoCompleteAsyc
                        name={"truck"}
                        label="Search by truck number"
                        style={{ marginTop: "2px" }}
                        kvMapping={truckKVmapping}
                        remoteUrl={truckUrl}
                        styling={"italic"}
                        colour={'#848484'}
                       
                        onSelect={(e,value,label) => {
                          console.log("truck selected new",e,"value::",value,"label::",label)
                          onTruckSelect(value);
                        }}
                          options = {truckOptions}
                       
                          />

                  </TableCell>
                </Paper>
              </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        {/* </Grid> */}
        {/* <Grid item>
          <Table style={{ width: "300px" }}>
            <TableBody>
              <TableRow>
                <FormControl style={{ marginTop: "3px" }}>
                  <InputLabel htmlFor="demo-customized-select-label">
                    Searchable Dropdown values
                  </InputLabel>
                  <NativeSelect
                    value={truckNumber}
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
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
                  </NativeSelect>
                </FormControl>
              </TableRow>
            </TableBody>
          </Table>
        </Grid> */}
            {/* </Grid> */}
            </Form>
        </>
      
        );
      }}
    </Formik>
  );
}
