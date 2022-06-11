import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import StepperComp from "../../lib/components/stepper/StepperComp";
import Typography from "@material-ui/core/Typography";
import SelectLocations from "./SelectLocations";
import { useLocation } from "react-router-dom";
import Payment from "./Payment";
import Confirmation from "./Confirmation";
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";
import { Breadcrumbs, Button, Grid } from "@material-ui/core";
import BookingService from "../../service/BookingService";

const TestConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      borderColor: "#0568AE",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#0568AE",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  icon: {
    color: "#0568AE !important",
  },
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    fontSize: '17px'
  },
}));

function getSteps() {
  return ["Select Location", "Make Payment", "Confirmation"];
}

export default function RequestMain(props) {
  console.log("****props*******", props);
  var referenceNumber;
  var success;
  let active = "";
  let history = useHistory();

  console.log(props.location.search)

  if (props.location.search) {
    const query = new URLSearchParams(props.location.search);
    referenceNumber = query.get('referenceNumber');
    success = query.get('success');
    active = 2;
  }

  const location = useLocation();
  let containerParam = '';
  let url1 = "";

  if (location.state !== undefined) {
    console.log("location state defined", location.state);
    containerParam = location.state.containerData;
    if(location.state.url){
      url1 = location.state.url;
    }
    active = location.state.activeStep;
    console.log("active", active);
    console.log(location.state.containerList)
  }


  const [containerData, setContainerData] = useState(containerParam);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(active ? active : 0);
  const steps = getSteps();
  const [url, setUrl] = React.useState(url1);
  const [multiLocAndTime, SetMultiLocAndTime] = useState(containerParam.multiLocAndTime ? containerParam.multiLocAndTime : false);
  const [multiLocFlag, SetMultiLocFlag] = useState(containerParam.multiLocFlag ? containerParam.multiLocFlag : false);
  const [multiTimeFlag, SetMultiTimeFlag] = useState(containerParam.multiTimeFlag ? containerParam.multiTimeFlag : false);
  const [containers, setContainers] = useState({})


  const handleNext = (newValues) => {
    setContainerData(newValues);
    setActiveStep(activeStep + 1);
  };

  const handleNextForConfirm = (newValues) => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = (newValues) => {
    setContainerData(newValues);
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  useEffect(() => {
    console.log("props.containers in draft", containerData);
    setContainers(containerData);
    // if (containerData.isDraft === 'Y') {
    //   setContainers(containerData);
    // }
    // else
    //   setContainers(containerData);
  }, []);


  const saveAsDraft = (currentStep) => {
    //BookingService.fetchAllDrafts();
    console.log("saveAsDraft")
    const requestDetails = containerData;
    // requestDetails.multiLocAndTime = multiLocAndTime;
    // requestDetails.multiLocFlag = multiLocFlag;
    // requestDetails.multiTimeFlag = multiTimeFlag;
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
        let contain = {
          boeNumber: container.boeNumber,
          checked: container.checked,
          consigneeContactEmail:
            container.consigneeContactEmail,
          consigneeContactName:
            container.consigneeContactName,
          container_number: container.container_number,
          consigneeContactNumber:
            container.consigneeContactNumber,
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
          addressCode: container.addressCode,
          consigneeCode: container.consigneeCode,
          dropZone: container.dropZone,
          pickupLocation: container.pickupLocation,
          phoneNumber: container.phoneNumber,
          addressLine1: container.addressLine1,
          addressNickname: container.addressNickname,
          iso_code: container.iso_code,
          isoCode_code:container.isoCode_code,
          consigneeDetails: container.consigneeDetails,
          date : container.date,
          time : container.time
        };
        containerList.push(contain);
      });
      requestDetails.containerList = containerList;
      // requestDetails.multiLocAndTime = false;
      console.log("Button2 clicked :", requestDetails);
    }
    let containerDetailsDtoList = [];
    requestDetails.containerList.forEach(
      x => {
        let containerDto = { container_number: x.container_number, dpwTransactionId: x.dpwTransactionId };
        containerDetailsDtoList.push(containerDto)
  
      }
    );
    requestDetails.isDraft = "Y";

    let step = '';
    if(currentStep==0){
      step = 'Enter drop location details'
    }else if(currentStep==1){
      step = 'Complete Payment';
    }
    console.log(JSON.stringify(requestDetails)); 
    console.log(JSON.stringify({ requestDetailsDraft: JSON.stringify(requestDetails), containerDetailsDtoList: containerDetailsDtoList }));
    BookingService.saveAsDraft({
      encryptedDraftId: requestDetails.encryptedDraftId, 
      requestDetailsDraft: JSON.stringify(requestDetails), 
      containerDetailsDtoList: requestDetails.containerList,
      currentStep: step
    }).then((res) => {
      history.push("/myRequests")
    })
      .catch()
    {
  
    }
  }

  function getStepContent(activeStep, containerData) {
    switch (activeStep) {
      case 0:
        return (
          <SelectLocations containers={containerData}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            saveAsDraft={saveAsDraft}
          />
        );
      case 1:
        return (
          <Payment
            containers={containerData}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            saveAsDraft={saveAsDraft}
          />
        );
      case 2:
        return (
          <Confirmation
            referenceNumber={referenceNumber}
            success={success}
            activeStep={activeStep}
            myBooking={true}
            handleNextForConfirm={handleNextForConfirm}
          />
        );
      default:
        return "Unknown step";
    }
  }


  return (
    <>
      <Typography style={{ marginLeft: '1px' }}></Typography>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: 0, marginTop:'20px'}}>
          <Breadcrumbs aria-label="breadcrumb" classes={{
            root: classes.breadCrumRoot,
            separator: classes.separator,
          }}>
            <Link href="#" onClick={() => history.push("/myRequests", { url: url })} style={{ color: '#848484' }}>
              My Bookings
            </Link>
            <Link href="/createRequest" onClick={(e) => e.preventDefault()} style={{ color: '#0E1B3D' }}>
              Book Truck
            </Link>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <StepperComp
        activeStep={activeStep}
      >
      </StepperComp>
      <div style={{ paddingLeft: "10px" }}>
        <Typography component={"div"} className={classes.instructions}>
          {getStepContent(activeStep, containerData)}
        </Typography>
      </div>
    </>
  );
}
