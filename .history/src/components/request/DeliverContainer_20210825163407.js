import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  CircularProgress,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Typography,
  Paper,
  IconButton,
  Icon,
  Grid,
  Avatar
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ApplnDateTimePicker from "../../lib/components/datepicker/ApplnDateTimePicker";
import { FormProvider, useForm } from "react-hook-form";
import FormContainer from "../../lib/components/formContainer/formContainer";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import RefVehicleTypeService from "../../service/RefVehicleTypeService";
import AddressService from "../address/AddressService";
import ApplnSelectBox from "../../lib/components/select/ApplnSelectBox";
import { MenuItem, Select } from "@material-ui/core";
import { InputLabel,Tooltip } from "@material-ui/core";
import TruckType from "./TruckType";
import { BorderBottom } from '@material-ui/icons';
import { ElementInputProps } from './../../lib/common/ElementInputProps';
import debounce from "lodash/debounce";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ContainerToolTip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.css";
import CreateEditAddressPopup from "../address/CreateEditAddressPopup";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";


const DeliverContainers = (props) => {
  console.log("props value",props);
  const [addressOpt, setAddressOpt] = useState([]);
  const [showColumns, SetShowColumns] = useState(false);
  const [vehicleTypeOpt, SetVehicleTypeOpt] = useState([]);
  const [render, setRender] = useState(0);
  const [location, setLocation] = useState('');
  const [truckType, setTruckType] = useState('');
  const [addressPopup, setAddressPopup] = useState({showPopup:false});
  const [containerTypeOpts, setContainerTypeOpts] = useState(props.containerOpts);
  const [loading, setLoading] = useState(false);
   
  
  const [consigneeState, setConsigneeState] = React.useState({
    debouncedNumber: "",
    debouncedName: ""
  });

  const deliverContainerForm = {
    addressOpt: [],
    vehicleTypeOpt: [],
  };

  // const useStyles = makeStyles((theme) => ({

  //   notchedOutline: {
    
  //     borderColor: "#0568AE",
  //     color: "#686868"
  //   },

  
   
  // }));



 
  // const classes = useStyles();

  const debouncedLog = React.useCallback(
    debounce((setConsigneeState, log) => {
      setConsigneeState(prevState => ({
        ...prevState,
        debouncedNumber: log
      }));
    }, 2000),
    []
  );

  const debouncedName = React.useCallback(
    debounce((setConsigneeState, log) => {
      setConsigneeState(prevState => ({
        ...prevState,
        debouncedName: log
      }));
    }, 2000),
    []
  );

  const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
      "& $notchedOutline": {
        borderColor: "#0568AE",
        color:"#686868"
      },
    },
    focused: {},
    notchedOutline: {}
  }));

  const outlinedInputClasses = useOutlinedInputStyles();

  const renderContainerTooltip = props => (
    <ContainerToolTip {...props} >
    
     <div >
       <InputLabel></InputLabel>
       <InputLabel></InputLabel>
       <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Container Number-{props.container_number}</InputLabel>
       <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Consignee Name-{props.consigneeDetails.split("/")[0]}</InputLabel>
       <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Storage Validity date -{props.storagePaidTill}</InputLabel>
       <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Hold Authority -{props.holdAuthority}</InputLabel>
       <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Declaration Number -{props.boeNumber}</InputLabel>
       <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Container Weight -{props.containerWeight}</InputLabel>
       <InputLabel style={{color:"white", textAlign:"left", whiteSpace:"nowrap"}}>Pickup Location -{props.pickupLocation}</InputLabel>
       <InputLabel></InputLabel>
       <InputLabel></InputLabel>
     </div>
    </ContainerToolTip>
  );



  const setConsigneeContactNumber=React.useCallback(({ target: { value: log } }) => {
    debouncedLog(setConsigneeState, log);
  }, []);

  const setConsigneeName=React.useCallback(({ target: { value: log } }) => {
    debouncedName(setConsigneeState, log);
  }, []);

  var container = {
    index: 0,
    container_number: "",
    iso_code: "",
    contact_person: "",
    contact_number: "",
    truck_type: "",
    date_time: "",
    location: "",
  };
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: deliverContainerForm,
  });

  
  useEffect(() => {
    setLoading(true);

    if(consigneeState.debouncedName)
    {
     

    props.data.consigneeContactName=consigneeState.debouncedName;
    props.containers.consigneeContactName=props.data.consigneeContactName;
    }
  
    if(consigneeState.debouncedNumber)
    {
    props.data.consigneeContactNumber=consigneeState.debouncedNumber;
    props.containers.consigneeContactNumber=props.data.consigneeContactNumber;
    }
    setLoading(false);
     
    console.log(" props.data.consigneeContactName", props.data.consigneeContactName)

    console.log(" props.containers.consigneeContactName", props.containers.consigneeContactName)

    console.log("  props.containers.consigneeContactNumber",  props.containers.consigneeContactNumber);


  },[consigneeState])

  useEffect(() => {
   
  
    let opt = {
      label: "",
      value: "",
    };
    
    {props.addressData?props.addressData.map((address, i) => {
      
      let opt = {
        label: address.dropAddress,
        value: address.code,
      };

      addressOpt.push(opt);
    }):addressOpt.push([])}

    console.log("Address options ::", addressOpt);
    if (props.multiLocFlag === false && props.multiTimeFlag === false) {
      SetShowColumns(false);
    } else {
      SetShowColumns(true);
    }
  }, [render]);

  const RenderContactPerson = (props) => {

    if (props.data.length!==0  && (props.multiTimeFlag === true || !showColumns)) {
      
      props.containers.consigneeContactName = props.data.consigneeContactName;
      props.containers.consigneeContactEmail = props.data.consigneeContactEmail;
      props.containers.phoneNumber = props.data.phoneNumber;
      props.containers.addressLine1 = props.data.addressLine1;
      props.containers.addressCode = props.data.code;
      props.containers.addressNickname = props.data.addressNickname;
      if(props.data.selectedDropZone!=undefined)
      props.containers.dropZone = props.data.selectedDropZone;
    }
      
    if (props.multiLocFlag === true) {
      return (
        <>
          
          <TextField size="small" variant="outlined" defaultValue=  {props.containers.consigneeContactName}
          //  InputProps={{
          //   classes: {
          //     root: classes.notchedOutline,
          //     focused: classes.notchedOutline,
          //     notchedOutline: classes.notchedOutline,
             
          //   }
          // }}
          onChange={(e) => {
            props.containers.consigneeContactName = e.target.value;

        }}
          ></TextField>
        </>
      );
    } else if ( props.multiTimeFlag === true || !showColumns) {
     
      return (
        <>
        {props.index===0 &&
        
        
          <TextField size="small" variant="outlined" defaultValue=  { consigneeState.debouncedName?consigneeState.debouncedName:props.containers.consigneeContactName}
          //  InputProps={{
          //   classes: {
          //     root: classes.notchedOutline,
          //     focused: classes.notchedOutline,
          //     notchedOutline: classes.notchedOutline,
             
          //   }
          // }}
          onChange={setConsigneeName}
          ></TextField>}
          {props.index>0 &&
         
            <InputLabel style={{  color: "#686868",paddingTop:"15px",paddingLeft:"10px" }}>
            {consigneeState.debouncedName?consigneeState.debouncedName:props.containers.consigneeContactName}
          </InputLabel>}

        </>
      );
    } 
  };


  const RenderContainerType = (props) => {
    
  
      return (
        <>
          <Select
            style ={{height:"40px",width:"150px"}}
            value={props.containers.containerType}
            input={
              <OutlinedInput
                name="containerType"
                classes={outlinedInputClasses}
              />
            }
             onChange={(e) => {
              setRender(render + 1);
               props.containers.containerType = e.target.value;

          }}
          >
            {containerTypeOpts.map((containerType, i) => {
              return (
                <MenuItem value={containerType.value} key={containerType.label}>
                  {containerType.label}
                </MenuItem>
              );
            })}
          </Select>
        </>
      );
    } 
  


  const RenderLocation = (props) => {
    
    console.log("Render Location:::",props);

    if (props.containers.locationCode)
    {
      let opt = {
        label: props.containers.dropAddress,
        value: props.containers.locationCode,
      };

      addressOpt.push(opt);
    }
    
    if (props.multiLocFlag === true) {
      return (
        <>
          <Select
            name="location"
            variant="outlined"
            style ={{height:"40px",width:"250px",color:'#686868'}}
            value={props.containers.locationCode}
            id={props.containers.locationCode}
         
        
            onChange={(e) => {
              setRender(render + 1);
              setAddressOpt([]);
              setLocation(e.target.value);
            
            
              props.containers.locationCode = e.target.value;
              {
                
                  addressOpt.map((address, i) => {
                    if (address.value === e.target.value)
                      props.containers.dropAddress = address.label;
                  });
                  props.addressData.map((address, i) => {
                   
                    if (props.containers.locationCode === address.code) {
                      props.containers.consigneeContactName = address.consigneeContactName;
                      props.containers.consigneeContactNumber =
                        address.consigneeContactNumber;
                      props.containers.consigneeContactEmail = address.consigneeContactEmail;
                      props.containers.phoneNumber = address.phoneNumber;
                      props.containers.addressLine1 = address.addressLine1;
                      props.containers.addressCode = address.Code;
                      props.containers.addressNickname = address.addressNickname;
                      props.containers.dropZone = address.selectedDropZone;
                      props.containers.latLng = address.latLng;
                      setAddressPopup({data:props.containers,showPopup:true});
                     
                    }
                  });
                
              }
              
              
            }}
          >
            {addressOpt.map((addressOpt, i) => {
              return (
                <MenuItem value={addressOpt.value} key={i}>
                  {addressOpt.label}
                </MenuItem>
              );
            })}
          </Select>
        </>
      );
    } else if ( props.multiTimeFlag === true || !showColumns) {
       if(props.data.length!==0)
       {
      props.containers.locationCode = props.data.code;
      props.containers.dropAddress = props.data.dropAddress;
      props.containers.phoneNumber = props.data.phoneNumber;
      props.containers.addressNickname = props.data.addressNickname;
      props.containers.addressLine1 = props.data.addressLine1;
       }
      return (
        <>
          <Tooltip title={props.containers.dropAddress} arrow>
          <InputLabel style={{  color: "#686868" ,paddingTop:"15px",width:"250px",whiteSpace:'nowrap'}}>
          
        {  props.containers.dropAddress ?  (props.containers.dropAddress.substring(0, 40)+"..."):""}
          </InputLabel>
          </Tooltip>
        </>
      );
    } 
  };

  const RenderContactNumber = (props) => {
    if (props.multiLocFlag === true) {
      return (
        <>
          <TextField size="small" variant="outlined" style={{color:'#686868'}} defaultValue=  {props.containers.consigneeContactNumber}
          // InputProps={{
          //   classes: {
          //     root: classes.notchedOutline,
          //     focused: classes.notchedOutline,  
          //     notchedOutline: classes.notchedOutline,
          //   }
          // }}
          onChange={(e)=>props.containers.consigneeContactNumber=e.target.value}
          ></TextField>
     </>
      )
    
    } else if  (props.multiTimeFlag === true || !showColumns) {
      if(props.data.length!==0)
     props.containers.consigneeContactNumber = props.data.consigneeContactNumber;

        if(props.index==0)
        {
  
      return (
        <>
          <TextField size="small" variant="outlined"   defaultValue= {consigneeState.debouncedNumber?consigneeState.debouncedNumber :props.containers.consigneeContactNumber}
          //  InputProps={{
          //   classes: {
          //     root: classes.notchedOutline,
          //     focused: classes.notchedOutline,  
          //     notchedOutline: classes.notchedOutline,
          //   }
          // }}
          onChange={setConsigneeContactNumber}
         
          >     
          </TextField>
          
        
          
        </>
      );
    }
    else
    {
      return (
      <InputLabel
      style={{  color: "#686868",paddingLeft:"10px"  }}
    >
      {consigneeState.debouncedNumber?consigneeState.debouncedNumber :props.containers.consigneeContactNumber}
      </InputLabel>
      );
    }
  }
  }
  return (
  
    <>
      
      <FormProvider {...methods}>
        <form>
        <div>
       
             {/* <Paper
               style={{ marginTop: "20px", background: "#F9F9F9 0% 0% no-repeat padding-box",border: "1px solid #E8E8E8", borderRadius:"0px",
               boxShadow: "0px 0px 8px #0000001C"}}
               key={inx}
             > */}
              <Table aria-label="simple table" style={{width:'100%'}}>
                 <TableHead  style={{ border: '1px solid #98989C', backgroundColor: '#98989C',borderRadius: 15}}>
                 <TableRow>
                    <TableCell>
                      
                        <InputLabel
                          style={{  color: "white" }}
                        >
                          Container Number
                        </InputLabel>
                        </TableCell>
                        
                        <TableCell>
                         <InputLabel
                          style={{  color: "white" }}
                        >
                           Container Type
                          </InputLabel>
                          </TableCell>
                      
                          <TableCell>
                         
                          <InputLabel
                          style={{  color: "white" }}
                        >
                          Contact Person
                        </InputLabel>
                        </TableCell>
                        <TableCell>
                     
                        <InputLabel
                          style={{  color: "white" }}
                        >
                          Mobile Number
                        </InputLabel>
                         </TableCell>
                         {showColumns && (
                           <>
                        <TableCell>
                      
                      <InputLabel
                          style={{  color: "white" }}
                        >
                            Date 
                          </InputLabel>
                      
                        </TableCell>
                         <TableCell>
                      
                         <InputLabel
                             style={{  color: "white" }}
                           >
                              Time
                             </InputLabel>
                         
                           </TableCell>
                           </>
                         )}
                        <TableCell>
                       <InputLabel
                          style={{  color: "white",paddingBottom:"10px" }}
                        >
                          Location
                        </InputLabel>
                    
                        </TableCell>
                        <TableCell>
                       <InputLabel
                          style={{  color: "white",paddingBottom:"10px" }}
                        >
                        
                        </InputLabel>
                    
                        </TableCell>
                        </TableRow>

                 </TableHead>
                <TableBody>

                 {props.containers.map((containers, inx) => (
                
                  <TableRow key={containers.container_number}>
                    <TableCell>
                    <div style={{
    display: 'inline-flex',
    boxSizing: 'inherit',
    textAlign: 'center',
    alignItems: 'center',
    gap: '6px'
}}>
                    <Avatar style={{ height: '25px', width: '25px' ,backgroundColor:'#FF7F7B',fontSize:'14px',marginLeft:"10%"}} > {containers.consigneeDetails.split("/")[1]}</Avatar>
                   
                    <OverlayTrigger placement="top" overlay={renderContainerTooltip(containers)}>
                        <InputLabel
                          style={{  color: "#0568AE",fontWeight:"bold" ,paddingTop:"15px",textDecoration:"underline"}}
                        >
                          {containers.container_number}
                        </InputLabel>
                    </OverlayTrigger>
                     </div>
                    </TableCell>
                   
                      <TableCell>
                       
                  
                       <RenderContainerType  containers={containers}
                          index={inx}
                          data={props.data}
                          ></RenderContainerType>
                        
                      </TableCell>
                  
                    <TableCell>
                    
                      
                        <RenderContactPerson
                          containers={containers}
                          index={inx}
                          data={props.data}
                          multiTimeFlag={props.multiTimeFlag}
                          multiLocFlag={props.multiLocFlag}
                        />
                     
                    </TableCell>

                    <TableCell>
                    
      
                        <RenderContactNumber
                          containers={containers}
                          index={inx}
                          data={props.data}
                          multiTimeFlag={props.multiTimeFlag}
                          multiLocFlag={props.multiLocFlag}
                        />
                    
                    </TableCell>
                    {/* {showColumns && (
                      <TableCell>
                        <Grid>
                          <InputLabel
                            style={{  color: "#848484" }}
                          >
                            Truck Type
                          </InputLabel>
                        </Grid>
                        <Grid>
                          <Select
                            name="truckType"
                            style={{width:"100px"}}
                            value={containers.refVehicleTypeCode}
                            onChange={(e) => {
                              containers.refVehicleTypeCode = e.target.value;
                              vehicleTypeOpt.map((vehicle, i) => {
                                if (vehicle.value === e.target.value)
                                  containers.refVehicleTypeName = vehicle.label;
                              });
                              setTruckType(e.target.value);
                            }}
                          >
                            {vehicleTypeOpt.map((vehicleTypeOpt, i) => {
                              return (
                                <MenuItem
                                  value={vehicleTypeOpt.value}
                                  label={vehicleTypeOpt.label}
                                  key={i}
                                >
                                  {vehicleTypeOpt.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Grid>
                      </TableCell>
                    )} */}
                    {showColumns && (
                      <>
                      <TableCell>
                       
                        <Grid>
                       
                          {/* <TextField
                            id="datetime-local"
                            type="datetime-local"
                            defaultValue=""
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => {
                              containers.date_time = e.target.value;
                            }}
                          /> */}
                            <ApplnDatePicker name={"date"} iconColor="#1FA5FF" disablePastDate={true}  
                                value={containers.date}
                             onChange={(e) => {
                            containers.date = methods.getValues().date;
                              console.log("date new ", containers.date);
                              // if(requestDetails.date !=='Invalid') 
                              // {
                            
                              //   requestDetails.date_time= requestDetails.date+'T'+requestDetails.time;
                              //   console.log("date new  again",requestDetails.date_time);
                              // }
                              
                                
                            
                            
                              }}
                          
                         />
                        </Grid>
                      </TableCell>
                      <TableCell>

<Grid item  xs={9}>

  <TextField
    id="toTime"
    type="time"
    defaultValue={containers.time}

    inputProps={{
      size: "small",
    }}
    onChange={(event) => {
    containers.time = event.target.value;

      console.log("new time",  containers.time);

     
    }}
  />
  </Grid>
    </TableCell>
    </>
                    )}
                  
                    <TableCell>
                    
                      
                       <RenderLocation
                          containers={containers}
                          data={props.data}
                          multiTimeFlag={props.multiTimeFlag}
                          multiLocFlag={props.multiLocFlag}
                          addressData={props.addressData}
                          render={props.render}
                        />
                    
                      
                   
                   
                        

                    
                    
                    </TableCell>

                    <TableCell>

                    <img 
                      src="./delete.svg"
                      onClick={() => {props.onDeleteClicked(containers.container_number);}}
                    />
                    </TableCell>
                  </TableRow>
              
             
            
           
          ))}
             </TableBody>
            </Table>
          </div>
          </form>
      </FormProvider>

      {addressPopup.showPopup  && (
            <CreateEditAddressPopup
              isopen={addressPopup.showPopup}
              action={"VIEW"}
              createEditFormData={addressPopup.data}
              onClose={(e) => {
                setAddressPopup({showPopup:false});
              }}
             
            />
          )}

{loading && (
                        <CircularProgress className="auto-search-loading-icon" />
                      )}
    </>
  );
};
export default DeliverContainers;
