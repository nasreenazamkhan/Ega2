import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import clsx from "clsx";


const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  stepperBorder: {
    borderStyle: "soild",
    height:"3px"
  },
  activeStep: {
    borderBottomStyle: "solid",
    borderBottomColor: "#0E1B3D",
  },
  activeStepLabel: {
    color: "#0E1B3D"
  },
  nonActiveStep: {
    color: "#ac7f84",
    borderBottomStyle: "solid",
    borderBottomColor: "#E9E9E9",
    width: '1267px',
  }
}));

function getSteps() {
  return ["Select Location", "Payment", "Confirmation"];
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    color: "#ac7f84",
    borderStyle: "soild",
    borderWidth: "thin",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  active: {
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    borderColor: "#42aeff",
    borderStyle: "solid",
    borderWidth: "thin",
    backgroundColor:"#1360D2"
  },
  completed: {
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      borderColor: "#1360D2",
      borderStyle: "solid",
      borderWidth: "thin",
      backgroundColor: "#1360D2"
  },
  iconActive: {
    color: "#ffff"
  },
  iconCompleted: {
    color: "#ffff"
  }
});

function ColorlibStepIcon(props) {
  console.log("hhhhhh",props)
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      <div
        className={clsx(classes.iconDefault, {
          [classes.iconActive]: active,
           [classes.iconCompleted]: completed
        })}
      >
        {props.icon}
      </div>
    </div>
  );
}

function StepperComp(props) {
  console.log("props in stepper",props)
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(props.activeStep);
  const steps = getSteps();
  console.log("active step", props.activeStep);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <div >
      <div style={{display:'inline-block',width:'50%'}}>
      <Stepper alternativeLabel activeStep={props.activeStep} connector={<></>} style={{paddingRight:0, paddingTop:0, paddingLeft:0}} >
        {steps.map((label, index) => {
          let activeClass = "activeStep";
          console.log(index, " =  ", activeStep);
          if (index === props.activeStep) {
            activeClass = "activeStep";

          }
          else if (index < props.activeStep) {
            activeClass = "nonActiveStep";
          }
          else activeClass = "nonActiveStep";

          return (
            <Step key={index} className={eval(`classes.${activeClass}`)} >
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <div className={eval(`classes.${activeClass}Label`)} style={{ fontFamily: 'Dubai Light', fontWeight: 600 }}>
                  {label}
                </div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </div>
      <div style={{display:'inline-block',width:'50%',verticalAlign: 'bottom',paddingBottom: '8px'}}>
        <hr style={{height:'2px',backgroundColor:'#E9E9E9', border:'0px', marginRight:'-50px'}}/>
      </div>
    </div>
  );
}

export default StepperComp;
