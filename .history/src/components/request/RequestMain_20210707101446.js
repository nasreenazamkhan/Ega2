import React, { useState, Fragment } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import StepConnector from "@material-ui/core/StepConnector";
import StepperComp from "../../lib/components/stepper/StepperComp";
import Typography from "@material-ui/core/Typography";
import SelectLocations from "./SelectLocations";
import { useLocation } from "react-router-dom";
import Payment from "./Payment";
import Confirmation from "./Confirmation";
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";



const TestConnector = withStyles({
  alternativeLabel: {
    top: 22,
   // left: 30
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
}));

function getSteps() {
  return ["Select Location", "Make Payment", "Confirmation"];
}

export default function RequestMain(props) {
  console.log("****props*******",props);
  var referenceNumber;
  var success;
  let active = "";

  let history = useHistory();

  if(props.location.search)
  {
  const query = new URLSearchParams(props.location.search);
  referenceNumber =query.get('referenceNumber') ;
  success = query.get('success');
   
      active = 2;
 
  }


  const location = useLocation();
  let containerParam = "";
  let url1="";
  
  
  if(location.state !== undefined)
  {
    console.log("location state defined");
    containerParam = location.state.containerData;
    url1=location.state.url;
    active = location.state.activeStep;
    console.log("active",active);
  }

  const [containerData, setContainerData] = useState(containerParam );
  
      


  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(active?active:0);
  const steps = getSteps();
  const [url,setUrl]=React.useState(url1);

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

  function getStepContent(activeStep, containerData) {

    switch (activeStep) {
      case 0:
        return (
         
           <SelectLocations containers={containerData}
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
           
            />
         
        );
      case 1:
        return (
          <Payment
            containers={containerData}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <Confirmation
            referenceNumber={referenceNumber}
            success={success}
            activeStep={activeStep}
            handleNextForConfirm={handleNextForConfirm}  
          />
        );
      default:
        return "Unknown step";
    }
  }

  return (
    // <div className={classes.root}>
    <>
     <Typography style={{marginLeft:'1px'}}></Typography>
     <Link href="#" onClick={()=>{console.log("back button click",url);history.push("/myRequests",{url:url})}}>
     <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                     My Bookings
                      </span>
      </Link> 
      <span style={{ fontSize: "20px", fontWeight: "bold",color:'#626262' }}>
                    /Booking
                      </span>
      <StepperComp
       // alternativeLabel
        activeStep={activeStep}
        
      >
        {/* {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  active: classes.icon,
                  completed: classes.icon,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))} */}
      </StepperComp>

      <div style={{ paddingLeft: "10px" }}>
        <Typography component={"div"} className={classes.instructions}>
          {getStepContent(activeStep, containerData)}
        </Typography>
      </div>
      </>
    // </div>
  );
}
