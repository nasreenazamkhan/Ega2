import React, { useEffect, useState } from "react";
import AddressCard from "../address/AddressCard";
import AddressService from "../address/AddressService";
import AddAddressCard from "../address/AddAddressCard";
import DeliverContainer from "./DeliverContainer";
import {Grid,withStyles,createStyles,Tooltip} from "@material-ui/core/";
import { FormProvider, useForm } from "react-hook-form";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { InputLabel } from "@material-ui/core";
import Toast from "../../lib/components/toast/ErrorToast";
import { makeStyles } from "@material-ui/core/styles";
import MuiSelect from "@material-ui/core/Select";
import moment from "moment";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import * as endpointContants from '../../utils/ptmsEndpoints';
import { getHttp } from '../../lib/common/HttpService';
import BookingService from "../../service/BookingService";
import { useHistory } from "react-router-dom";
import { CollectionsOutlined, ExpandMoreRounded } from "@material-ui/icons";
import { default as MuiButton } from '@material-ui/core/Button';
import SuccessToast from "../../lib/components/toast/SuccessToast";

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

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#168FE4BC",
      color: "#686868",
      borderRadius: '4px',
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '14px',
      fontWeight: 600
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '10px',
      paddingRight: '10px'
    },
    "&::placeholder": {
      color: "#686868",
      opacity:1
    }
  },
  focused: {},
  notchedOutline: {}
}));

const BlueTooltip = withStyles({
  tooltip: {
    color: "#FFFFFF",
    backgroundColor: "#0E1B3DD3",
    fontFamily: "Dubai Light",
    fontWeight: 600,
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  arrow: {
    "&:before": {
      borderStyle: "none"
    },
    color: "#0E1B3DD3",
  }
})(Tooltip);

const CustomMenuItem = withStyles((theme) =>createStyles({
  root:{
    color:'#2B2B2B',
    fontSize: "14px", 
    fontWeight: 600, 
    fontFamily:'Dubai Light', 
    padding:'8px 20px 8px 20px',
        "&$selected": {
            backgroundColor: "#1360D2",
            color:'#FFFFFF'
        }
  },
  selected:{
    
  }
})
)(MenuItem);

const intervalOpts = [
  { label: "No Interval", value: "0 min" },
  { label: "30 min", value: "30 min" },
  { label: "1hr", value: "1hr" },
  { label: "2hr", value: "2hr" },
  { label: "3hr", value: "3hr" },
  { label: "4hr", value: "4hr" },
];

const StyledBlueButton = withStyles(() =>
      createStyles({
        root: {
          float: "right",
          width: '110px',
          height: '34px',
          fontSize: "14px",
          borderRadius: '3px',
          fontWeight: 600,
          fontFamily: 'Dubai Light',
          border: '1px solid #0E1B3D',
          color: '#0E1B3D',
          backgroundColor: '#FAFAFA',
        }
      })
)(MuiButton);

const StyledBlueButton2 = withStyles(() =>
      createStyles({
        root: {
          border: "1px solid #1360D2",
          float: "right",
          width: '110px',
          height: '34px',
          fontSize: "15px",
          borderRadius: '3px',
          fontWeight: 600,
          fontFamily: 'Dubai Light',
          color: '#FFFFFF',
          boxShadow: '0px 1px 4px #00000029',
          backgroundColor: '#1360D2',
          '&:hover': {
            color: '#1360D2',
          }
        }
      })
)(MuiButton);

export default function SelectLocations(props) {
  console.log("SelectLocations")
  console.log("containers props", props);
  const [formvalues, setFormvalues] = useState(null);
  const [key, setKey] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [multiLocAndTime, SetMultiLocAndTime] = useState(props.containers.multiLocAndTime ? props.containers.multiLocAndTime : false);
  const [multiLocFlag, SetMultiLocFlag] = useState(props.containers.multiLocFlag ? props.containers.multiLocFlag : false);
  const [multiTimeFlag, SetMultiTimeFlag] = useState(props.containers.multiTimeFlag ? props.containers.multiTimeFlag : false);
  const [containerDetails, SetContainerDetails] = useState([]);
  const [truckdetailsList, setTruckdetailsList] = useState([]);
  const [render1, setRender1] = useState(0);
  const [containerOpts, setContainerOpts] = useState([]);
  const [data, setData] = useState();
  const [newAdd, setNewAdd] = useState(false);
  const [masterVals, setMasterVals] = useState({
    intervalOpts: [],
    compMouted: false,
  });
  // const [requestDetails, setRequestDetails] = useState(props.containers?.isDraft ? props.containers : {
  //   containerList: props.containers.containerList,
  //   date : props.date ? props.date : '',
  //   time : props.time ? props.time : '',
  //   truckNumber : props.truckNumber ? props.truckNumber : '',
  //   dropInterval : props.dropInterval ? props.dropInterval : ''
  // });


const [requestDetails, setRequestDetails] = useState(props.containers)
console.log(requestDetails)
  const [disableHrs, setDisableHrs] = useState(0);
  const handleNext = props.handleNext;
  const [containers, setContainers] = useState({})
  const [showToaster, setShowToaster] = useState('NOTOASTER');
  
  let history = useHistory();

  console.log("requestDetails");
  console.log(requestDetails)
  const toggleForm = {
    multiLocFlag: false,
    multiTimeFlag: false,
    date: '',
    time: ''
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
      width: "50px"
    },
  }));

  const classes = useStyles();

  const outlinedInputClasses = useOutlinedInputStyles();

  useEffect(() => {
    let remoteUrl = `${endpointContants.fetchContainerTypes}`
    let obj = { url: remoteUrl };
    getHttp(obj, false)
      .then((response) => {
        console.log("received response", response);
        setContainerOpts(response);
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    console.log("props.containers in draft", props);
    setContainers(props.containers);
    if(props.containers.data){
      setData(props.containers.data)
      setNewAdd(true)
    }
    // if (props.containers.isDraft === 'Y') {
    //   setContainers(props.containers);
    //   if(props.containers.data){
    //     setData(props.containers.data)
    //     setNewAdd(true)
    //   }
    // }
    // else{
    //   setContainers(props.containers);
    // }
  }, []);

  useEffect(() => {
    truckdetailsList.splice(0, truckdetailsList.length);
    const loadAddress = async () => {
      AddressService.fetchAddress()
        .then((response) => {
          console.log("response in select Location", response);
          if (newAdd) {
            let test = response.addressDtoList.reduce((prev, current) =>
              (prev.code > current.code) ? prev : current
            )
            let code = data.code ? data.code : test.code
            let i = response.addressDtoList.findIndex((x) => (x.code === code));
            response.addressDtoList[i].selected = true;
          }
          console.log('max', response.addressDtoList)
          setAddressData(response.addressDtoList);
          setDisableHrs(response.disableHrs);
        })
        .catch((error) => {
          console.log("error");
        });
    };
    loadAddress();
    let obj = {};
    obj = {
      multiLocFlag: false,
      multiTimeFlag: false,
    };
    setFormvalues(obj);
    setKey(!key);
    console.log(obj);
    truckdetailsList.push(truckDetails);
  }, [render1,data]);

  return formvalues ? (
    <DataForm intialVals={formvalues} {...props} key={key} />
  ) : (
    <></>
  );

  function DataForm(props) {
    const [showToaster2, setShowToaster2] = useState(false);
    const [showToaster3, setShowToaster3] = useState(false);
    const [showToaster4, setShowToaster4] = useState(false);
    const [showToaster5, setShowToaster5] = useState(false);
    const [showToaster6, setShowToaster6] = useState(false);
    const [truckNumberOpts, setTruckNumberOpts] = useState([
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
    ]);
    const methods = useForm({
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: toggleForm,
    });

    const useStyles = makeStyles({
      root: {
        width: "64px",
        height: "28px",
        padding: "0px",
      },
      switchBase: {
        padding: "1.5px",
        "&$checked": {
          "& + $track": {
            backgroundColor: "#fff",
            border: "1px solid #D2D2D2"
          }
        }
      },
      thumb: {
        color: "#fff",
        width: "23px",
        height: "23px",
        margin: "1px",
        marginLeft: '2px',
        border: "1px solid #D2D2D2"
      },
      thumb2: {
        color: "#027D48",
        width: "23px",
        height: "23px",
        margin: "1px",
        border: "1px solid #D2D2D2"
      },
      track: {
        borderRadius: "20px",
        backgroundColor: "#fff",
        border: "1px solid #D2D2D2",
        opacity: "1 !important",
        "&:after, &:before": {
          color: "#333333",
          fontSize: "14px",
          fontWeight:600,
          position: "absolute",
          top: "6px"
        },
        "&:after": {
          content: "'Yes'",
          left: "6px",
        },
        "&:before": {
          content: "'No'",
          right: "6px",
        }
      },
      checked: {
        color: "#027D48 !important",
        transform: "translateX(36px) !important"
      }
    });

    const classes = useStyles();

    const handleSwitchChange1 = (event) => {
      SetMultiLocAndTime(event.target.checked)
      SetMultiLocFlag(event.target.checked);
      SetMultiTimeFlag(event.target.checked);
    };

    const handleSwitchChange2 = (event) => {
      // if(!multiLocAndTime){
      //   SetMultiLocAndTime(false)
      //   SetMultiLocFlag(false);
      // }
      SetMultiTimeFlag(event.target.checked);
    };

    const deleteContainer = (containerNumber) => {
      console.log(containers);
      if (containers.containerList.length > 1) {
        const deleteContainer = containers.containerList.findIndex(x => x.container_number === containerNumber);
        console.log(deleteContainer);
        containers.splice(deleteContainer, 1);
        console.log(containers);
        setRender1(render1 + 1);
      }
      else {
        setShowToaster6(true);
      }
    }

    const saveAsDraft = () => {
      //BookingService.fetchAllDrafts();
      requestDetails.data = data;
      requestDetails.multiLocAndTime = multiLocAndTime;
      requestDetails.multiLocFlag = multiLocFlag;
      requestDetails.multiTimeFlag = multiTimeFlag;
      // if (multiLocFlag === true || multiTimeFlag === true) {
        if (multiLocAndTime) {
        {
          requestDetails.containerList = containers.containerList;
          requestDetails.multiLocAndTime = true;
        }
        console.log("Button clicked :", requestDetails);
      }
      else if (
        (multiLocFlag === false && multiTimeFlag === true) ||
        (multiLocFlag === false && multiTimeFlag === false)
      ) {
        let containerList = [];
        containers.containerList.map((container, inx) => {
          let date_time = null;
          if(multiTimeFlag == true){
            date_time = moment((container.date + " " + container.time), "DD/MM/YYYY HH:mm").format(
                "DD/MM/YYYY HH:mm")
          }else{
            date_time = container.date_time
          }
          let contain = {
            boeNumber: container.boeNumber,
            checked: container.checked,
            consigneeContactEmail:
              container.consigneeContactEmail,
            consigneeContactName:
              container.consigneeContactName,
            consigneeContactNumber:
            container.consigneeContactNumber,
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
            date_time: date_time,
            addressCode: container.addressCode,
            consigneeCode: container.consigneeCode,
            dropZone: container.dropZone,
            pickupLocation: container.pickupLocation,
            phoneNumber: container.phoneNumber,
            addressLine1: container.addressLine1,
            addressNickname: container.addressNickname,
            isoCode_code: container.isoCode_code,
            consigneeDetails: container.consigneeDetails,
            date : container.date,
            time : container.time
          };
          containerList.push(contain);
        });
        requestDetails.containerList = containerList;
        requestDetails.multiLocAndTime = false;
        requestDetails.data = data;
        console.log("Button2 clicked :", requestDetails);
      }
      let containerDetailsDtoList = [];
      console.log(requestDetails)
      requestDetails.containerList.forEach(
        x => {
          let containerDto = { container_number: x.container_number, dpwTransactionId: x.dpwTransactionId };
          containerDetailsDtoList.push(containerDto)

        }
      );
      requestDetails.isDraft = "Y";
      BookingService.saveAsDraft({
        encryptedDraftId: requestDetails.encryptedDraftId, requestDetailsDraft: JSON.stringify(requestDetails), containerDetailsDtoList: requestDetails.containerList
        , currentStep: "Enter Drop Location Details"
      }).then((res) => {
        history.push("/myRequests")
      })
        .catch()
      {

      }
    }

    const continueClick = () => {
      console.log("continueClick")
      console.log(requestDetails)
      console.log(containers)
      var valid = true;
      requestDetails.data = data;
      requestDetails.multiLocAndTime = multiLocAndTime;
      requestDetails.multiLocFlag = multiLocFlag;
      requestDetails.multiTimeFlag = multiTimeFlag
      if (multiLocFlag === true || multiTimeFlag === true) {
        var invalidContainerCount = 0;
        var invalidTruckCount = 0;
        var invalidDateTimeCount = 0;
        var invalidDropIntrvl = 0;
        if (requestDetails.truckNumber === undefined) {
          invalidTruckCount = invalidTruckCount + 1;
          setShowToaster3(true);
          valid = false;
        }
        containers.containerList.map((container, inx) => {
          if (
            container.consigneeContactName === undefined ||
            container.consigneeContactNumber === undefined ||
            container.dropAddress === undefined ||
            container.dropZone === undefined ||
            container.date === undefined ||
            container.time === undefined ||
            container.containerType === undefined
          ) {
            invalidContainerCount = invalidContainerCount + 1;
          }
          if (container.date !== undefined && container.time !== undefined) {
            container.date_time = moment((container.date + " " + container.time), "DD/MM/YYYY HH:mm").format(
              "DD/MM/YYYY HH:mm");
            console.log(container.date_time);
            if (
              moment(container.date, "DD/MM/YYYY").format(
                "MM/DD/YYYY"
              ) === moment().format("MM/DD/YYYY")
            ) {
              if (
                (container.date_time) <
                moment()
                  .add(disableHrs, "hours")
                  .format("DD/MM/YYYY HH:mm")
              ) {
                invalidDateTimeCount = invalidDateTimeCount + 1;
              }
            }
          }
        })
        console.log("1st test")
        console.log(containers)
        if (invalidContainerCount > 0) {
          setShowToaster2(true);
          valid = false;
        }
        if (invalidDateTimeCount) {
          setShowToaster4(true);
          valid = false;
        }
      }
      else if ((multiLocFlag === false && multiTimeFlag === true) || (multiLocFlag === false && multiTimeFlag === false)) {
        console.log("2nd test")
        var invalidContainerCount = 0;
        var invalidTruckCount = 0;
        var invalidDateTimeCount = 0;
        var invalidDropIntrvl = 0;
        console.log("containers@@@", containers);
        containers.containerList.map((container, inx) => {
          container.consigneeContactName = containers?.consigneeContactName ? containers.consigneeContactName : container.consigneeContactName;
          container.consigneeContactNumber = containers?.consigneeContactNumber ? containers.consigneeContactNumber : container.consigneeContactNumber;
          if (
            container.consigneeContactName === undefined ||
            container.consigneeContactNumber === undefined ||
            container.dropAddress === undefined ||
            container.containerType === undefined
          )
            invalidContainerCount = invalidContainerCount + 1;
        });
        if (invalidContainerCount > 0) {
          setShowToaster2(true);
          valid = false;
        }
        if (requestDetails.date && requestDetails.time && requestDetails.date !== "Invalid Date") {
          requestDetails.date_time = moment((requestDetails.date + " " + requestDetails.time), "DD/MM/YYYY HH:mm").format(
            "DD/MM/YYYY HH:mm");
          console.log(requestDetails.date_time);
          if (
            moment(requestDetails.date, "DD/MM/YYYY").format(
              "MM/DD/YYYY"
            ) === moment().format("MM/DD/YYYY")
          ) {
            if (
              (requestDetails.date_time) <
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
        if (requestDetails.truckNumber === undefined) {

          invalidTruckCount = invalidTruckCount + 1;
          setShowToaster3(true);
          valid = false;
        }
        if (requestDetails.dropInterval === undefined) {
          invalidDropIntrvl = invalidDropIntrvl + 1;
          setShowToaster5(true);
          valid = false;
        }
      }
      if (valid) {
        console.log("inside valid")
        console.log(containers)
        console.log(requestDetails)
        if(multiLocFlag === false && multiTimeFlag === false){
         containers.containerList.forEach(x => x.date_time = requestDetails.date_time);
        }
        if (multiLocFlag === false)
          // containers.containerList.forEach(x => x.date_time = requestDetails.date_time);

        // if (multiLocFlag === true || multiTimeFlag === true) {
          if (multiLocAndTime) {
          {
            console.log("3rd block")
            console.log(requestDetails)
            console.log(containers)
            requestDetails.containerList = containers.containerList;
             requestDetails.data = data;
            requestDetails.multiLocAndTime = true;
          }
          console.log("Button clicked :", requestDetails);
        }
         else if (
          (multiLocFlag === false && multiTimeFlag === true) ||
          (multiLocFlag === false && multiTimeFlag === false)
        ) {
          let containerList = [];
          containers.containerList.map((container, inx) => {
            let date_time = null;
            if(multiTimeFlag == true){
              date_time = moment((container.date + " " + container.time), "DD/MM/YYYY HH:mm").format(
                  "DD/MM/YYYY HH:mm")
            }else if(multiLocFlag === false && multiTimeFlag === false){
              date_time = container.date_time
            }
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
              date_time: date_time,
              consigneeContactNumber:
                container.consigneeContactNumber,
              addressCode: container.addressCode,
              consigneeCode: container.consigneeCode,
              dropZone: container.dropZone,
              pickupLocation: container.pickupLocation,
              phoneNumber: container.phoneNumber,
              addressLine1: container.addressLine1,
              addressNickname: container.addressNickname,
              isoCode_code: container.isoCode_code,
              containerWeight: container.containerWeight,
              latLng: container.latLng,
              consigneeDetails: container.consigneeDetails,
              date : container.date,
              time : container.time
            };
            containerList.push(contain);
          });
          requestDetails.data = data;
          requestDetails.containerList = containerList;
          // requestDetails.multiLocAndTime = false;
          requestDetails.multiLocAndTime = multiLocAndTime;
          requestDetails.multiLocFlag = multiLocFlag;
          requestDetails.multiTimeFlag = multiTimeFlag
          
          console.log("Button2 clicked :", requestDetails);
        }
        handleNext(requestDetails);
      }

      console.log("continue click end")
      console.log(containers)
    }

    return (
      <>
        {/* {masterVals.compMouted && ( */}
        <FormProvider {...methods}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <StyledBlueButton
                style={{ position: 'absolute', top: '20px', right: '145px' }}
                variant="outlined"
                onClick={saveAsDraft}>
                Save As Draft
              </StyledBlueButton>
              <StyledBlueButton2
                style={{ position: 'absolute', top: '100px', right: '145px' }}
                onClick={continueClick}
              >
                Continue
              </StyledBlueButton2>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <FormControlLabel
                control={
                  <Switch
                    classes={{
                      root: classes.root,
                      switchBase: classes.switchBase,
                      // thumb: multiLocFlag ? classes.thumb2 : classes.thumb,
                      thumb: multiLocAndTime ? classes.thumb2 : classes.thumb,
                      track: classes.track,
                      checked: classes.checked
                    }}
                    // checked={multiLocFlag}
                    checked={multiLocAndTime}
                    onChange={handleSwitchChange1}
                    name="multiLocFlag"
                  />
                }
                label={
                  <span style={{ fontSize: "18px", fontWeight: "bold", color: '#000000', paddingRight: '20px' }}>
                    Would You like to select multiple drop locations?
                  </span>
                }
                labelPlacement="start"
                style={{ fontWeight: "bold", color: "#000000" }}
              />
            </Grid>
            {!multiLocFlag &&
              <Grid item xs={12} style={{ marginLeft: "15px" }}>
                <InputLabel style={{ fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '16px', color: '#000000' }}>
                  <span>  Select location from the saved addresses shown below by clicking on </span>
                  <span style={{ color: '#168FE4' }}>"Deliver to this location" </span>
                  <span> link or add a new location details</span>
                </InputLabel>

              </Grid>}
            {!multiLocFlag && (
              <Grid
                item
                xs={12}
                style={{ paddingLeft: "30px", marginTop: "15px" }}
              >
                <StyledGrid container spacing={5}>
                  <Grid item xs={2}>
                    <AddAddressCard
                      render={(e) => {
                        setNewAdd(true);
                        setShowToaster("ADD")
                        setData(e);
                        // setRender1(render1 + 1);
                      }}
                      divider={true}
                    />
                  </Grid>
                  {addressData?.map((address, inx) => (
                    <Grid item xs={2} key={inx}
                    >
                      <AddressCard
                        address={address}
                        addressList={addressData}
                        editFlag="true"
                        deleteFlag="false"
                        saved={(e) => {
                          console.log(e);
                          console.log("rendered....");
                          setNewAdd(true);
                          // setRender1(render1+1)
                          if(!e.deliverCheck) setShowToaster('EDIT')
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
                    // <Switch
                    //   checked={multiTimeFlag}
                    //   onChange={handleSwitchChange2}
                    //   name="multiTimeFlag"
                    // />
                    <Switch
                      classes={{
                        root: classes.root,
                        switchBase: classes.switchBase,
                        thumb: multiTimeFlag ? classes.thumb2 : classes.thumb,
                        track: classes.track,
                        checked: classes.checked
                      }}
                      checked={multiTimeFlag}
                      onChange={handleSwitchChange2}
                      name="multiTimeFlag"
                    />
                  }
                  label={
                    <span style={{ fontSize: "18px", fontWeight: "bold", color: '#000000', paddingRight: '20px' }}>
                      Would You like to drop containers at different Date/time?
                    </span>
                  }
                  labelPlacement="start"
                />
              </Grid>
            )}

            {!multiLocFlag && !multiTimeFlag && (
              <>
                <Grid container >
                  <Grid item xs={2} style={{ marginLeft: '28px' }}>
                    <InputLabel style={{ fontFamily: 'Dubai Light', fontWeight: 600, color: '#626262' }}>Drop date</InputLabel>
                    <ApplnDatePicker
                      name={"date"}
                      width={"180px"}
                      height={"33px"}
                      placeholder={"dd/mm/yyyy"}
                      iconColor="#1FA5FF"
                      disablePastDate={true}
                      value={requestDetails.date}
                      onChange={(e) => {
                        requestDetails.date = e;
                        console.log("date new ", requestDetails.date);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel style={{ fontFamily: 'Dubai Light', fontWeight: 600, color: '#626262' }}>Drop Time</InputLabel>
                    <OutlinedInput
                      style={{ height: "33px", width: "100px" }}
                      classes={outlinedInputClasses}
                      id="toTime"
                      type="time"
                      defaultValue={requestDetails.time}
                      inputProps={{
                        size: "small",
                      }}
                      onChange={(event) => {
                        requestDetails.time = event.target.value;
                        console.log("new time", requestDetails.time);
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel style={{ fontFamily: 'Dubai Light', fontWeight: 600, color: '#626262' }}>Drop Interval</InputLabel>
                    <Select
                      style={ requestDetails.dropInterval ? { height: "33px", width: "116px" } : { color: '#686868' , height: "33px", width: "116px" }}
                      value={requestDetails.dropInterval ? requestDetails.dropInterval : 'none'}
                      input={
                        <OutlinedInput
                          name="dropInterval"
                          classes={outlinedInputClasses}
                        />
                      }
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left"
                        },
                        getContentAnchorEl: null,
                      }}
                      IconComponent={ExpandMoreRounded}
                      onChange={(e) => {
                        setShowToaster('NOTOASTER')
                        setRender1(render1 + 1);
                        requestDetails.dropInterval = e.target.value;
                      }}
                    >
                      <MenuItem value={'none'} disabled style={{ fontSize: "14px", fontWeight: 600, fontFamily: 'Dubai Light' }}>
                        Select Interval
                      </MenuItem>
                      {intervalOpts.map((int, i) => {
                        return (
                          <CustomMenuItem value={int.value} key={i} style={{ fontSize: "14px", fontWeight: '600' }}>
                            {int.label}
                          </CustomMenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
              </>
            )}
            <Grid item xs={12} style={{ marginLeft: '15px', marginTop: '10px' }}>
              <span style={{ fontSize: "18px", fontWeight: "bold", marginRight: '20px', color: '#191919' }}>
                No of trucks required?
              </span>
              <BlueTooltip title="Max limit of 80ft containers in one truck" arrow>
                <img src="./information-button.svg" style={{ marginRight: '20px' }} />
              </BlueTooltip>
              <Select
                style={requestDetails.truckNumber ?{ height: "33px", width: "90px" }:{color: '#686868', height: "33px", width: "90px"}}
                value={requestDetails.truckNumber ? requestDetails.truckNumber : 'none'}
                input={
                  <OutlinedInput
                    name="truckNumber"
                    classes={outlinedInputClasses}
                  />
                }
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null,
                }}
                IconComponent={ExpandMoreRounded}
                onChange={(e) => {
                  setShowToaster('NOTOASTER')
                  setRender1(render1 + 1);
                  requestDetails.truckNumber = e.target.value;
                }}
              >
                 <MenuItem value={'none'} disabled style={{ fontSize: "14px", fontWeight: 600, fontFamily: 'Dubai Light' }}>
                        Select No.
                </MenuItem>
                {truckNumberOpts.map((truckNumber, i) => {
                  return (
                    <CustomMenuItem value={truckNumber.value} key={truckNumber.label} style={{ fontSize: "14px", fontWeight: '600' }}>
                      {truckNumber.value}
                    </CustomMenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} style={{ marginLeft: '15px' }}>
              <span style={{ fontSize: "16px", fontWeight: "bold", marginRight: '20px', color: '#0E1B3D' }}>
                Add drop details for each of the containers selected in below table
              </span>
            </Grid>
            <Grid item xs={12} style={{ marginLeft: '20px', paddingBottom: '0px', marginBottom: '-18px' }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", marginRight: '20px', color: '#0E1B3D', paddingBottom: '0px' }}>
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
              onDeleteClicked={(e) => { deleteContainer(e) }}
              addressData={addressData}
              containerOpts={containerOpts}
              onAddChange={(e)=>{
                setShowToaster(e)
                setRender1(render1 + 1)
              }}
            />
          </div>

          <div style={{ paddingLeft: "20px" }}>
            <div>
              {/* {showToaster1 && (
                    <Toast
                      icon="error"
                      title="Terms And Condition"
                      message="Please indicate that you accept the Terms and Conditions "
                      showToast={() => {
                        setShowToaster1(false);
                      }}
                      position="top-right"
                    />
                  )} */}
              {showToaster2 && (
                <Toast
                  icon="error"
                  title="Data Missing!"
                  message="Please provide the Container data "
                  showToast={() => {setShowToaster2(false)}}
                  position="top-right"
                />
              )}
              {showToaster3 && (
                <Toast
                  icon="error"
                  title="Data Missing!"
                  message="Please provide the Truck data"
                  showToast={() => {setShowToaster3(false)}}
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
                  showToast={() => {setShowToaster4(false)}}
                  position="top-right"
                />
              )}
              {showToaster5 && (
                <Toast
                  icon="error"
                  title="Drop Interval Missing"
                  message={"Please enter drop interval "}
                  showToast={() => {setShowToaster5(false)}}
                  position="top-right"
                />
              )}
              {showToaster6 && (
                <Toast
                  icon="error"
                  title="Container cannot be deleted"
                  message={"Last container cannot be deleted"}
                  showToast={() => {setShowToaster6(false)}}
                  position="top-right"
                />
              )}
              {(showToaster === 'ADD' || showToaster === 'EDIT') && <SuccessToast
                icon={<img src='./check-success-green.svg' height="32px" />}
                title={showToaster === 'ADD' ? "Address added succesfully" : "Address updated succesfully"}
                message=""
                showToast={() => { setShowToaster('NOTOASTER') }}
                position="top-right"
              />}
            </div>
          </div>
        </FormProvider>
        {/* )} */}
      </>
    );
  }
}
