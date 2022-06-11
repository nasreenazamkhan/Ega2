import React, { useEffect, useState } from "react";
import AddressCard from "../address/AddressCard";
import AddressService from "../address/AddressService";
import AddAddressCard from "../address/AddAddressCard";
import DeliverContainer from "./DeliverContainer";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  withStyles,
  createStyles,
  Tooltip
} from "@material-ui/core/";
import ApplnSwitch from "../../lib/components/switch/ApplnSwitch";
import { FormProvider, useForm } from "react-hook-form";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import ApplnSelectBox from "../../lib/components/select/ApplnSelectBox";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TruckType from "./TruckType";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Paper } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import AppButton from "../../lib/components/buttons/appButton";
import { InputLabel } from "@material-ui/core";
import Toast from "../../lib/components/toast/ErrorToast";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MuiSelect from "@material-ui/core/Select";
import moment from "moment";
import { termsAndConditionUrl } from "../../utils/ptmsEndpoints";
import TextField from "@material-ui/core/TextField";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import * as endpointContants from '../../utils/ptmsEndpoints';
import { getHttp } from '../../lib/common/HttpService';
import BookingService from "../../service/BookingService";
// const containers = [
//   {
//     boeNumber: "boe6660",
//     checked: true,
//     container_number: "c66601",
//     deliveryOrderValidity: "29/10/2020",
//     dpwTransactionId: "T-0000000225",
//     iso_code: "2000",
//     refStatus: null,
//   },
//   {
//     boeNumber: "boe6660",
//     checked: true,
//     container_number: "c66603",
//     deliveryOrderValidity: "29/10/2020",
//     dpwTransactionId: "T-0000000225",
//     iso_code: "4000",
//     refStatus: null,
//   },
//   {
//     boeNumber: "boe6660",
//     checked: true,
//     container_number: "c66602",
//     deliveryOrderValidity: "29/10/2020",
//     dpwTransactionId: "T-0000000225",
//     iso_code: "8000",
//     refStatus: null,
//   },
// ];

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  notchedOutline: {
  
    borderColor: "#0568AE"
  },
}));

const StyledGrid = withStyles(() =>
  createStyles({
    root: {
      flexWrap: "nowrap",
      overflowY: "scroll",

      "&::-webkit-scrollbar": {
        width: "1px",
        height: "10px",
        paddingLeft: "20px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 2px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#787878",
        borderRadius: 2,
      },
    },
  })
)(Grid);

const StyledSelectBox = withStyles(() =>
  createStyles({
    root: {
      width: "25px",
      background:
        "transparent linear-gradient(180deg, #FCFCFC 0%, #F2F2F2 100%) 0% 0% no-repeat padding-box",
      boxShadow: "0px 1px 1px #0000001A",
      border: "1px solid #D2D2D2",
      opacity: 1,
      padding: "5px 5px 5px 5px",
    },
  })
)(MuiSelect);

export default function SelectLocations(props) {
  console.log("containers props",props);
  const [formvalues, setFormvalues] = useState(null);
  const [key, setKey] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [truckList, setTruckList] = React.useState([0]);
  const [multiLocFlag, SetMultiLocFlag] = useState(props.containers.multiLocAndTime?props.containers.multiLocAndTime:false);
  const [multiTimeFlag, SetMultiTimeFlag] = useState(props.containers.multiLocAndTime?props.containers.multiLocAndTime:false);
  const [containerDetails, SetContainerDetails] = useState([]);
  const [truckdetailsList, setTruckdetailsList] = useState([]);
  const [truck, setTruck] = React.useState(1);
  const [render, setRender] = useState(1);
  const [render1, setRender1] = useState(0);
  const [dateValue, setDateValue] = useState();
  const [timeValue, setTimeValue] = useState();
  const [containerOpts, setContainerOpts] = useState([]);
  // const [data, setData] = useState([]);
  const [masterVals, setMasterVals] = useState({
    intervalOpts: [],
    compMouted: false,
  });
  const [requestDetails, setRequestDetails] = useState(props.containers?.isDraft? props.containers:{

    containerList: [],
  });
  const [disableHrs, setDisableHrs] = useState(0);

  const handleNext = props.handleNext;
  const [containers,setContainers] = useState({})
  // const containerstemp = containers;

  

  console.log("requestDetails from booking page", containers);
  const toggleForm = {
    multiLocFlag: false,
    multiTimeFlag: false,
    date:'',
    time:''
  };

  const truckDetails = {
    index: 0,
    truckType: "",
    date_time: "",
    interval: "",
  };

  const useStyles = makeStyles((theme) => ({

    notchedOutline: {
    
      borderColor: "#0568AE",
      color: "#686868",
      width:"50px"
    },

  
   
  }));

  const classes = useStyles();

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


  useEffect(() => {
 
    
    let remoteUrl=`${endpointContants.fetchContainerTypes}`
    let obj = { url: remoteUrl };


    getHttp(obj, false)
    .then((response) => {
      console.log("received response", response);
      setContainerOpts(response);
     
    
    })
    .catch((error) => {
     
    });

        
 },[]);
 useEffect(() => {
   console.log("props.containers in draft" ,props.containers.containerList);

  if(props.containers.isDraft==='Y')
  {
    setContainers(props.containers.containerList);
  }
  else
  setContainers(props.containers);


 },[]);



  useEffect(() => {
    truckdetailsList.splice(0, truckdetailsList.length);
    const loadAddress = async () => {
      AddressService.fetchAddress()
        .then((response) => {
          console.log("response in select Location", response);
          setAddressData(response.addressDtoList);
          setDisableHrs(response.disableHrs);
        })
        .catch((error) => {
          console.log("error");
        });
    };

    loadAddress();

    setMasterVals((prevstate) => ({
      intervalOpts: [
        { label: "30 min", value: "30 min" },
        { label: "1hr", value: "1hr" },
        { label: "2hr", value: "2hr" },
        { label: "3hr", value: "3hr" },
        { label: "4hr", value: "4hr" },
      ],
      compMouted: true,
    }));

    let obj = {};
    obj = {
      multiLocFlag: false,
      multiTimeFlag: false,
     
    };
    setFormvalues(obj);
    setKey(!key);
    console.log(obj);
    truckdetailsList.push(truckDetails);
    //setTruckdetailsList(truckDetails);
  }, [render1]);

  return formvalues ? (
    <DataForm intialVals={formvalues} {...props} key={key} />
  ) : (
    <></>
  );

  function DataForm(props) {
    const [termsAndCondition, setTermsAndCondition] = useState(false);
    const [showToaster1, setShowToaster1] = useState(false);
    const [showToaster2, setShowToaster2] = useState(false);
    const [showToaster3, setShowToaster3] = useState(false);
    const [showToaster4, setShowToaster4] = useState(false);
    const [showToaster5, setShowToaster5] = useState(false);
    const [data, setData] = useState([]);
    const [truckNumberOpts, setTruckNumberOpts] = useState([
      {label:'1', value:'1'},
      {label:'2', value:'2'},
      {label:'3', value:'3'},
      {label:'4', value:'4'},
      {label:'5', value:'5'},
    ]);

 
    // const [data, setData] = useState([]);
    const methods = useForm({
      // resolver: yupResolver(schema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: toggleForm,
    });

    const classes = useStyles();

  
    const handleSwitchChange1 = (event) => {
      SetMultiLocFlag(event.target.checked);
      SetMultiTimeFlag(false);
    };

    const handleSwitchChange2 = (event) => {
      SetMultiTimeFlag(event.target.checked);
    };

    const handleCheckBoxChange = (event) => {
      setTermsAndCondition(event.target.checked);
    };
    const deleteContainer=(containerNumber)=>
    {
       console.log(containers);
       const deleteContainer=containers.findIndex(x=>x.container_number===containerNumber);
       console.log(deleteContainer);
       containers.splice(deleteContainer,1);
       console.log(containers);
        setRender1(render1 + 1);

    }

    

    const saveAsDraft=()=>
    {
      //BookingService.fetchAllDrafts();
      console.log(requestDetails);


        if (multiLocFlag === true || multiTimeFlag === true) {
          {
            requestDetails.containerList = containers;
            requestDetails.multiLocAndTime = true;
          }
          console.log("Button clicked :", requestDetails);
        } else if (
          (multiLocFlag === false && multiTimeFlag === true) ||
          (multiLocFlag === false && multiTimeFlag === false)
        ) {
          
       
            let containerList = [];
            containers.map((container, inx) => {
              let contain = {
                boeNumber: container.boeNumber,
                checked: container.checked,
                consigneeContactEmail:
                  container.consigneeContactEmail,
                consigneeContactName:
                  container.consigneeContactName,
                container_number: container.container_number,
              orderValidity:
                  container.orderValidity,
                dpwTransactionId: container.dpwTransactionId,
                dropAddress: container.dropAddress,
                holdAuthority: container.holdAuthority,
                containerType: container.containerType,
                locationCode: container.locationCode,
                refStatus: container.refStatus,
                storagePaidTill: container.storagePaidTill,
                date_time: container.date_time,
                consigneeContactNumber:
                  container.consigneeContactNumber,
                addressCode: container.addressCode,
                consigneeCode: container.consigneeCode,
                dropZone: container.dropZone,
                pickupLocation: container.pickupLocation,
                phoneNumber: container.phoneNumber,
                addressLine1: container.addressLine1,
                addressNickname: container.addressNickname,
                isoCode_code:container.isoCode_code,
                consigneeDetails:container.consigneeDetails
              };
              containerList.push(contain);
            });
            requestDetails.containerList = containerList;
            requestDetails.multiLocAndTime = false;

            console.log("Button2 clicked :", requestDetails);
          
        } 
        let containerDetailsDtoList=[];

        requestDetails.containerList.forEach(
          x=>{
            let containerDto={container_number:x.container_number,dpwTransactionId:x.dpwTransactionId};
            containerDetailsDtoList.push(containerDto)

          }
        );
        requestDetails.isDraft="Y";

        console.log(JSON.stringify(requestDetails));
        console.log(JSON.stringify({requestDetailsDraft:JSON.stringify(requestDetails),containerDetailsDtoList:containerDetailsDtoList}));
        BookingService.saveAsDraft({encryptedDraftId:requestDetails.encryptedDraftId,requestDetailsDraft:JSON.stringify(requestDetails),containerDetailsDtoList:requestDetails.containerList
        ,currentStep:"Enter drop location details"}).then((res) => {
             
       })
       .catch()
  
    

  

    return (
      <>
        {masterVals.compMouted && (
          <FormProvider {...methods}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {" "}
                <FormControlLabel
                  control={
                    <Switch
                      checked={multiLocFlag}
                      onChange={handleSwitchChange1}
                      name="multiLocFlag"
                    />
                  }
                  label={
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      Would You like to select multiple drop locations?
                    </span>
                  }
                  labelPlacement="start"
                  style={{ fontWeight: "bold", color: "#000000" }}
                />
              </Grid>
              {!multiLocFlag &&
              <Grid item xs={12} style={{marginLeft:"15px"}}>
              <InputLabel>
                    <span>  Select location from the saved addresses shown below by clicking on </span> 
                    <span style={{color:'#168FE4'}}>"Deliver to this location" </span>
                    <span> link or add a new location details</span>
              </InputLabel>

              </Grid> }
        

              {!multiLocFlag && (
                <Grid
                  item
                  xs={12}
                  style={{ paddingLeft: "30px", marginTop: "25px" }}
                >
                  <StyledGrid container spacing={5}>
                    <Grid item xs={2} sm={4} md={3}>
                      <AddAddressCard
                        render={() => {
                          setRender1(render1 + 1);
                        }}
                      />
                    </Grid>
                    {addressData?.map((address, inx) => (
                      <Grid
                        item
                        xs={2}
                        sm={4}
                        md={3}
                        key={addressData.indexOf(address)}
                      >
                        <AddressCard
                          address={address}
                          addressList={addressData}
                          editFlag="false"
                          deleteFlag="false"
                          saved={(e) => {
                            console.log("rendered....");
                            setData(e);
                          }}
                          divider="Deliver to this Location"
                        />
                      </Grid>
                    ))}
                  </StyledGrid>
                </Grid>
              )}

{!multiLocFlag && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={multiTimeFlag}
                        onChange={handleSwitchChange2}
                        name="multiTimeFlag"
                      />
                    }
                    label={
                      <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                        Would You like to drop containers at different
                        Date/time?
                      </span>
                    }
                    labelPlacement="start"
                  />
                </Grid>
              )}

              {!multiLocFlag && !multiTimeFlag && (
                <>
                <Grid container >
                         <Grid  item xs={3} style={{marginLeft:'15px'}}>
                           <InputLabel>Drop date</InputLabel>
                           <ApplnDatePicker name={"date"} iconColor="#1FA5FF" disablePastDate={true}  
                               value={requestDetails.date}
                            onChange={(e) => {
                              requestDetails.date = methods.getValues().date;
                              console.log("date new ", requestDetails.date);
                              // if(requestDetails.date !=='Invalid') 
                              // {
                            
                              //   requestDetails.date_time= requestDetails.date+'T'+requestDetails.time;
                              //   console.log("date new  again",requestDetails.date_time);
                              // }
                              
                          
                              }}
                          
                         />
                        </Grid>
                   

                        <Grid item  xs={2}>
                        <InputLabel>Drop Time</InputLabel>
                          <TextField
                            id="toTime"
                            type="time"
                            defaultValue={requestDetails.time}
                          
                            inputProps={{
                              size: "small",
                            }}
                            onChange={(event) => {
                              requestDetails.time = event.target.value;

                              console.log("new time",  requestDetails.time);
                            //   if(requestDetails.date  && requestDetails.time)
                            //   {
                            //     if(isNaN(requestDetails.date))
                            //     {
                            //       requestDetails.date_time='INVALID';
                            //       console.log("date new  again invalid",requestDetails.date_time);
                            //     }
                          
                            //   else
                            //   {
                            //   requestDetails.date_time=requestDetails.date+"T"+requestDetails.time
                            //   console.log("date new  again",requestDetails.date_time);
                            //   }
                            
                            //  }
                        
                             
                            }}
                          />
                        
                            {/* <TextField
                           label="Drop Date And Time"
                            id="datetime-local"
                            type="datetime-local"
                            defaultValue=""
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                             
                              
                            }}
                            InputProps={{
                              classes: {
                                root: classes.notchedOutline,
                                focused: classes.notchedOutline,
                                notchedOutline: classes.notchedOutline,
                              },
                            }}
                          
                            onChange={(e) => {
                              containers.date_time = e.target.value;
                              console.log("date time >>>>",containers.date_time);
                            }}
                          />  */}
                         
                             
                         </Grid>
                         <Grid item  xs={2}>
                         <InputLabel>Drop Interval</InputLabel>
                         <Select
            style ={{height:"40px",width:"100px"}}
            value={requestDetails.dropInterval}
            input={
              <OutlinedInput
                name="dropInterval"
                classes={outlinedInputClasses}
              />
            }
             onChange={(e) => {
              setRender1(render1 + 1);
              requestDetails.dropInterval = e.target.value;

          }}
          >
           {masterVals.intervalOpts.map((intervalOpts, i) => {
                                return (
                                  <MenuItem value={intervalOpts.value} key={i}>
                                    {intervalOpts.label}
                                  </MenuItem>
                                );
                              })}
          </Select>
          </Grid>
          </Grid>
                </>
              )}
                 <Grid item xs={12} style={{marginLeft:'15px',marginTop:'10px'}}>      
                    <span style={{ fontSize: "18px", fontWeight: "bold",marginRight:'20px' }}>
                     No of trucks required? 
                    </span>
                    <Tooltip  title="max limit of 80ft containers in one truck" arrow>
                    <img src="./information-button.svg" style={{marginRight:'20px'}} />                                     
                  </Tooltip>

                


                  <Select
            style ={{height:"40px",width:"50px"}}
            value={requestDetails.truckNumber}
            input={
              <OutlinedInput
                name="truckNumber"
                classes={outlinedInputClasses}
              />
            }
             onChange={(e) => {
              setRender1(render1 + 1);
              requestDetails.truckNumber = e.target.value;

          }}
          >
             {truckNumberOpts.map((truckNumber, i) => {
              return (
                <MenuItem value={truckNumber.value} key={truckNumber.label}>
                  {truckNumber.value}
                </MenuItem>
              );
            })}
      
          </Select>

                
           
     
          </Grid> 

          <Grid item xs={12} style={{marginLeft:'15px'}}>
          <span style={{ fontSize: "18px", fontWeight: "bold",marginRight:'20px' }}>
            Add drop details for each of the containers selected in below table
            </span>
          </Grid>
          

          <Grid item xs={12} style={{marginLeft:'15px'}}>
          <span style={{ fontSize: "18px", fontWeight: "bold",marginRight:'20px' }}>
            Displaying {containers.length} containers
            </span>
          </Grid>
          
            </Grid>
            <div style={{ paddingLeft: "20px" }}>
        

              <DeliverContainer
                containers={containers}
                multiLocFlag={multiLocFlag}
                multiTimeFlag={multiTimeFlag}
                containerDetails={containerDetails}
                data={data}
                onDeleteClicked={(e)=>{deleteContainer(e)}}
                addressData={addressData}
                containerOpts={containerOpts}
              />
            </div>

            <div style={{ paddingLeft: "20px" }}>
              <Paper
                style={{
                  backgroundColor: "#F7F7F7",
                  marginBottom: "10px",
                  marginTop: "20px",
                  height: "68px",
                  border: "1px solid #EDEDED",
                  boxShadow: "0 0 0 0rem",
                }}
              >
                <div>
                  <FormControlLabel
                    style={{
                      marginLeft: "10px",
                      marginTop: "12px",
                      fontSize: "5px",
                    }}
                    control={
                      // <Checkbox

                      //   checked={termsAndCondition}
                      //   onChange={handleCheckBoxChange}
                      //   name="termsAndCondition"
                      // />
                      <Checkbox
                        checked={termsAndCondition}
                        onChange={handleCheckBoxChange}
                        name="termsAndCondition"
                        style={{
                          transform: "scale(0.7)",
                        }}
                      />
                    }
                    label={
                      <span
                        onClick={() =>
                          window.open(
                            termsAndConditionUrl,
                            "_blank",
                            "height=550,width=650,top=100,left=300"
                          )
                        }
                        style={{
                          fontSize: "14px",
                          color: "#9A9A9A",
                          width: "171px",
                          height: "16px",
                        }}
                      >
                        I accept the terms and conditions
                      </span>
                    }
                    //label="I accept the terms and conditions"
                  />

 <Button
                    style={{
                      float: "right",
                      fontWeight: "lighter",
                      marginTop: "15px",
                      marginRight: "25px",
                    
                      height: "41px",
                      fontSize: "17px",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                     saveAsDraft();
                    }}>
                      Save As Draft
                    </Button> 

                  <Button
                    style={{
                      float: "right",
                      fontWeight: "lighter",
                      marginTop: "15px",
                      marginRight: "25px",
                      width: "122px",
                      height: "41px",
                      fontSize: "17px",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      var valid=true;
                   
                   
        
                      if (multiLocFlag === true || multiTimeFlag === true) {
                        var invalidContainerCount = 0;
                        var invalidTruckCount = 0;
                        var invalidDateTimeCount = 0;
                        var invalidDropIntrvl=0;
                    
                       
                        
                        if (requestDetails.truckNumber===undefined) {
                      
                          invalidTruckCount=invalidTruckCount+1;
                          setShowToaster3(true);
                          valid = false;
                        } 
                        containers.map((container, inx) => {
                          if (
                            container.consigneeContactName === undefined ||
                            container.consigneeContactNumber === undefined ||
                            container.dropAddress === undefined ||
                            container.date === undefined ||
                            container.time === undefined  ||
                            container.containerType === undefined 
                        
                          )
                          {
                            invalidContainerCount = invalidContainerCount + 1;
                            
                          }
                      
                        
                          if (
                            container.date !== undefined &&
                            container.time !== undefined
                          ) {


                            container.date_time=  moment((container.date+" "+container.time), "DD/MM/YYYY HH:mm").format(
                              "DD/MM/YYYY HH:mm");
                              console.log( container.date_time);

                           
                            if (
                              moment(container.date, "DD/MM/YYYY").format(
                                "MM/DD/YYYY"
                              ) === moment().format("MM/DD/YYYY")
                            ) {
                              if (
                               (container.date_time)<
                                moment()
                                  .add(disableHrs, "hours")
                                  .format("DD/MM/YYYY HH:mm")
                              ) {
                                invalidDateTimeCount = invalidDateTimeCount + 1;
                            
                              }
                            }
                          }
                        })
                          
                          
                   
                    
                    if (invalidContainerCount > 0) {
                      setShowToaster2(true);
                      valid = false;
                    } 
                    if(invalidDateTimeCount)
                    {
                      setShowToaster4(true);
                      valid = false;
                    }
              
                
                }
                  else if (
                        (multiLocFlag === false && multiTimeFlag === true) ||
                        (multiLocFlag === false && multiTimeFlag === false)
                      ) {
                        var invalidContainerCount = 0;
                        var invalidTruckCount = 0;
                        var invalidDateTimeCount = 0;
                        var invalidDropIntrvl=0;
                        console.log("containers@@@",containers);
                        containers.map((container, inx) => {
                          if (
                            container.consigneeContactName === undefined ||
                            container.consigneeContactNumber === undefined  ||
                            container.dropAddress === undefined ||
                            container.containerType === undefined 
                          )
                            invalidContainerCount = invalidContainerCount + 1;
                        });
                        if (invalidContainerCount > 0) {
                          setShowToaster2(true);

                          valid = false;
                        } 
                          if (
                            requestDetails.date && requestDetails.time && requestDetails.date!=="Invalid Date"
                          ) {
                          
                            requestDetails.date_time=  moment((requestDetails.date+" "+requestDetails.time), "DD/MM/YYYY HH:mm").format(
                              "DD/MM/YYYY HH:mm");
                              console.log( requestDetails.date_time);

                           
                            if (
                              moment(requestDetails.date, "DD/MM/YYYY").format(
                                "MM/DD/YYYY"
                              ) === moment().format("MM/DD/YYYY")
                            ) {
                              if (
                               (requestDetails.date_time)<
                                moment()
                                  .add(disableHrs, "hours")
                                  .format("DD/MM/YYYY HH:mm")
                              ) {
                                invalidDateTimeCount = invalidDateTimeCount + 1;
                              }
                            }
                          }
                          else
                          invalidDateTimeCount = invalidDateTimeCount + 1;
                    
                        if (invalidDateTimeCount > 0) {
                          setShowToaster4(true);
                          valid = false;
                        } 
                        if (requestDetails.truckNumber===undefined) {
                      
                          invalidTruckCount=invalidTruckCount+1;
                          setShowToaster3(true);
                          valid = false;
                        } 
                      
                      if(requestDetails.dropInterval===undefined)
                      {
                        invalidDropIntrvl=invalidDropIntrvl+1;
                        setShowToaster5(true);
                        valid = false;
                      }

                    }

                      if (
                        termsAndCondition &&
                        valid
                      ) {
                        if (multiLocFlag === false) 
                        containers.forEach(x=>x.date_time=requestDetails.date_time);

                        if (multiLocFlag === true || multiTimeFlag === true) {
                          {
                            requestDetails.containerList = containers;
                            requestDetails.multiLocAndTime = true;
                          }
                          console.log("Button clicked :", requestDetails);
                        } else if (
                          (multiLocFlag === false && multiTimeFlag === true) ||
                          (multiLocFlag === false && multiTimeFlag === false)
                        ) {
                          
                       
                            let containerList = [];
                            containers.map((container, inx) => {
                              let contain = {
                                boeNumber: container.boeNumber,
                                checked: container.checked,
                                consigneeContactEmail:
                                  container.consigneeContactEmail,
                                consigneeContactName:
                                  container.consigneeContactName,
                                container_number: container.container_number,
                              orderValidity:
                                  container.orderValidity,
                                dpwTransactionId: container.dpwTransactionId,
                                dropAddress: container.dropAddress,
                                holdAuthority: container.holdAuthority,
                                containerType: container.containerType,
                                locationCode: container.locationCode,
                                refStatus: container.refStatus,
                                storagePaidTill: container.storagePaidTill,
                                date_time: container.date_time,
                                consigneeContactNumber:
                                  container.consigneeContactNumber,
                                addressCode: container.addressCode,
                                consigneeCode: container.consigneeCode,
                                dropZone: container.dropZone,
                                pickupLocation: container.pickupLocation,
                                phoneNumber: container.phoneNumber,
                                addressLine1: container.addressLine1,
                                addressNickname: container.addressNickname,
                                isoCode_code:container.isoCode_code
                              };
                              containerList.push(contain);
                            });
                            requestDetails.containerList = containerList;
                            requestDetails.multiLocAndTime = false;

                            console.log("Button2 clicked :", requestDetails);
                          
                        } 
                        handleNext(requestDetails);
                      } else if (
                        !termsAndCondition &&
                        valid
                      ) {
                        setShowToaster1(true);
                      }
                    }}
                  >
                    Continue
                  </Button>
                  {showToaster1 && (
                    <Toast
                      icon="error"
                      title="Terms And Condition"
                      message="Please indicate that you accept the Terms and Conditions "
                      showToast={() => {
                        setShowToaster1(false);
                      }}
                      position="top-right"
                    />
                  )}
                  {showToaster2 && (
                    <Toast
                      icon="error"
                      title="Data Missing!"
                      message="Please provide the Container data "
                      showToast={() => {
                        setShowToaster2(false);
                      }}
                      position="top-right"
                    />
                  )}
                  {showToaster3 && (
                    <Toast
                      icon="error"
                      title="Data Missing!"
                      message="Please provide the Truck data"
                      showToast={() => {
                        setShowToaster3(false);
                      }}
                      position="top-right"
                    />
                  )}
                  {showToaster4 && (
                    <Toast
                      icon="error"
                      title="Insufficient time to plan delivery"
                      message={
                        "Please provide a delivery time after " +
                        disableHrs +
                        " hours."
                      }
                      showToast={() => {
                        setShowToaster4(false);
                      }}
                      position="top-right"
                    />
                  )}
                   {showToaster5 && (
                    <Toast
                      icon="error"
                      title="Drop Interval Missing"
                      message={
                        "Please enter drop interval "     
                      }
                      showToast={() => {
                        setShowToaster5(false);
                      }}
                      position="top-right"
                    />
                  )}
                </div>
              </Paper>
            </div>
          </FormProvider>
        )}
      </>
    );
  }
  }
}


