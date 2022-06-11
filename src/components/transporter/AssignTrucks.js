import React, { useEffect, useState } from "react";
import { Grid, InputLabel, Typography, Breadcrumbs } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import AssignTrucksSubForm from "./AssignTrucksSubForm";
import { useLocation } from "react-router-dom";
import AssignTruckAndDriverService from "../../service/AssignTruckAndDriverService";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CustomDialog from "../../lib/components/dialog/customDialog";
import { NO_DIALOG, ALERT_DIALOG } from "../../lib/common/Constants";
import JobConfirmationPopUp from "./JobConfirmationPopUp";
import Link from '@material-ui/core/Link';
import { useSelector } from "react-redux";
import TransporterService from "../../service/TransporterService";

const useStyles = makeStyles((theme) => ({
  clickableIcon: {
    color: "grey",
    "&:hover": {
      color: "red",
    },
  },
  cancelButton: {
    background: "#dc4e4e",
    color: "#fff",
    textTransform: "none",
    float: "center"
  },
  confirmButton: {
    background: "#4CAB5B",
    color: "#fff",
    textTransform: "none",
    float: "center"
  },
  separator: {
    color: '#EA2428'
  },
  breadCrumRoot: {
    fontWeight: 600,
    fontSize: '17px'
  },
}));

export default function AssignTrucks() {
  const location = useLocation();
  console.log("location value",location.state);

  const [searchValue, setSearchValue] = useState("");


  let tempContainers;
  if (location.state.containerData[0]) {
    tempContainers = location.state.containerData[0];
    console.log("tempContainers", tempContainers);
  } else {
    tempContainers = location.state.containerData;
    console.log("tempContainers", tempContainers);
  }
  const [containerData, setContainerData] = useState(tempContainers);
  console.log("containerDate&&&&", containerData);
  const [containerList, setContainerList] = useState(tempContainers.containerList);
  const classes = useStyles();
  let history = useHistory();
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [showConfirmation, setShowConfirmation] = useState(NO_DIALOG);
 

  useEffect(() => {
    console.log("containers unassigned ", containerData);
    setContainerList(containerData.containerList);


  }, []);

  const handleClose = (tab) => {
    setShowConfirmation(NO_DIALOG);
    history.push("/newJobs", { tabSelected: tab })
  };

  const validateContainerData =(containerData)=>
  {
  
      var validationSuccess = true;

      for (let i = 0; i < containerData.containerList.length; i++) {
        var container=containerData.containerList[i];
        container.valid=true;
        container.transporterError = '';
        container.truckError = '';
      

      
            if(container.transporterCode===''||container.transporterCode===undefined )
            {
              container.transporterError = true;
              container.valid=false
              validationSuccess = false;
            }
            if(container.assignedTruck===''|| container.assignedTruck===undefined)
            {
              container.truckError = true;
              container.valid=false
              validationSuccess = false;
            }
        
      }
  
   
      return validationSuccess;

  }



  return (
    <>

      {showConfirmation === 'NOW' &&
        <JobConfirmationPopUp open={true}
          onClose={() => {
            setShowConfirmation(NO_DIALOG);
            history.push("/searchRequests")
          }}

        >
          <img src="./success.svg" />
          <p style={{ color: "#609E2E", fontSize: "25px" }}>Confirmed</p>

          <div style={{ color: "black", fontWeight: "bold" }}>
            <div > Token Request has been successfully sent to DT Admin</div>
            <div> You will be notified once it gets approved</div>
            <br />

          </div>


          <p style={{ color: "grey" }}>The token requested booking can be viewed under <Link color="secondary" onClick={() =>
            handleClose(1)


          }
          > Pending Jobs </Link> </p>
          <p style={{ color: "grey" }}>Check the token status in  <Link color="secondary" onClick={
            () => handleClose(2)
          }
          > Start Jobs </Link>  page  and start ! </p>



        </JobConfirmationPopUp>}

      {showConfirmation === 'LATER' &&
        <JobConfirmationPopUp open={true} onClose={() => {
          setShowConfirmation(NO_DIALOG);
          history.push("/searchRequests")
        }}

        >
          <img src="./success.svg" />
          <p style={{ color: "#609E2E", fontSize: "25px" }}>Request Later!</p>

          <div style={{ color: "#0E1B3D", fontWeight: "bold", fontFamily: "Dubai Regular" }}>
            <div >Truck details assigned for each container has been </div>
            <div > saved successfully</div>
            <div>You can request token for container with admin, </div>
            <div> later from <Link color="secondary" onClick={() =>

              handleClose(1)
            }  > Pending Jobs  </Link> page</div>
            <br />

          </div>
        </JobConfirmationPopUp>}

      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <Breadcrumbs aria-label="breadcrumb" classes={{
          root: classes.breadCrumRoot,
          separator: classes.separator,
        }}>
          <Link onClick={() => history.push("/transporterDashboard")} style={{ color: '#848484' }}>
            Home
          </Link>
          <Link onClick={() => history.push("/newJobs")} style={{ color: '#848484' }}>
            My Jobs
          </Link>
          <span style={{ color: '#0E1B3D' }}>
            Available Jobs
          </span>
        </Breadcrumbs>
      </Grid>

      <div className="row">
        <div className="col-md-6">

          {containerData && <InputLabel
            style={{ fontSize: "18px", marginTop: "30px", color: "#0E1B3D", fontFamily: 'Dubai Medium' }}
          >
            Booking # {containerData.referenceNumber} (Expires in  {containerData.expiryIn} )

          </InputLabel>}


        </div>
        <div className="col-md-6">
        
            <Button
              style={{ float: "right", marginTop: "30px" }}
              // disabled={containersUnassigned !== 0}
              onClick={() => {
                setShowPopup(ALERT_DIALOG);
              }}
            >
              Continue
            </Button>
                   
        </div>
      </div>

      <hr
        style={{ backgroundColor: "#D3D3D3", border: "0px", height: "1px" }}
      ></hr>
      <Grid container direction="row" spacing={5} alignItems="flex-start">
        <Grid item xs={10} sm={8}>
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            style={{ marginLeft: "12px" }}
          >
            <Grid item xs={4}>
              <TextField
                id="input-with-icon-grid"
                label="Search with container number"
                InputLabelProps={{ style: { fontSize: 18, color: '#848484' } }}
                fullWidth={true}
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <SearchIcon
                className={classes.clickableIcon}
                onClick={() => {
                  console.log("search button clicked", tempContainers.containerList);

                  var search = searchValue.trim();
                  if (searchValue === "") setContainerData(prevState => ({
                    ...prevState,
                    containerList: tempContainers.containerList
                  }));

                  else {
                    var containerSearch = containerList.filter((e) => e.container_number === search);
                    console.log("container Search");
                    console.log(containerSearch);
                    setContainerData(prevState => ({
                      ...prevState,
                      containerList: containerSearch
                    }));

                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <InputLabel
            style={{ fontSize: "18px", marginTop: "30px", color: "#848484" }}
          >
            Truck Details
          </InputLabel>

        </Grid>
      </Grid>

      {containerData && containerData.containerList.map((container, index) => (
        <AssignTrucksSubForm
          containerData={container}
          key={container.container_number}
          defaultTransporter={location.state.defaultTransporter}

          index={index}
          // truckOptions={truckList}
          truckNumber={container.truckNumber}
          
        ></AssignTrucksSubForm>
      ))}

      <CustomDialog
        open={showPopup === ALERT_DIALOG}
        title={"Send For Token?"}
        onClose={(e) => setShowPopup(NO_DIALOG)}
        onConfirm={(e) => {
          var time = e;
          var success=validateContainerData(containerData);       
          if(success)
          {

          AssignTruckAndDriverService.groupAndSendForApproval({ containerList: containerList, requestTime: e, referenceNumber: containerData.referenceNumber })
            .then((response) => {
              if (response.isAxiosError) throw new Error(response.status);
              else {

                setShowConfirmation(time);
                setShowPopup(NO_DIALOG);
              }

            })

            .catch(() => {
              console.log("error");
            });

          }
          else
          {
            setShowPopup(NO_DIALOG);
          }
        }}

      >
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          {" "}
          Would you like to save the selection of trucks done on <br></br>
          each container and send it for token request?
        </p>
      </CustomDialog>
    </>
  );
}
