import React, { useEffect, useState } from "react";
import { Grid, InputLabel, Typography } from "@material-ui/core";

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
    float:"center"
   
  },
  confirmButton: {
    background: "#4CAB5B",
    color: "#fff",
    textTransform: "none",
    float:"center"
    
  },
}));



export default function AssignTrucks() {
  const location = useLocation();
  
  const [searchValue, setSearchValue] = useState("");
  
  const [truckList, setTruckList] = useState([]);

  
  let tempContainers;
  if(location.state.containerData[0]){
    tempContainers= location.state.containerData[0];
  }else{
    tempContainers= location.state.containerData;
  }
  const [containerData, setContainerData] = useState(tempContainers);
  console.log("containerDate&&&&",containerData);
  const [containerList, setContainerList] = useState(tempContainers.containerList);
  
  const [containersUnassigned, setContainersUnassigned] = useState(containerData.containerList.length);
  
 
  const classes = useStyles();
  let history = useHistory();
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [showConfirmation, setShowConfirmation] = useState(NO_DIALOG);

 

  const updateContainerList = (e,containerNumber,transporter) => {
    console.log("containers unassigned ", containersUnassigned);

     var container=containerList.find(x=>{return x.container_number===containerNumber})

    if (container.truckNumber) {
      if (e === "") setContainersUnassigned(containersUnassigned + 1);
    } else {
      if (e) setContainersUnassigned(containersUnassigned - 1);
    }
    var ind=containerList.findIndex(x=>x.container_number===containerNumber)
    containerList[ind].truckNumber = e;
    containerList[ind].transporterCode= transporter.code;
    containerList[ind].transporterName= transporter.name;
  };

  useEffect(() => {
    console.log("containers unassigned ", containerData);
    setContainerList(containerData.containerList);

  }, []);

  

  return (
    <>
   
{showConfirmation === ALERT_DIALOG &&  
<JobConfirmationPopUp
                      
                       onClose={(e) => {
                        setShowConfirmation(NO_DIALOG);
                        history.push("/myJobs",{tabSelected:1})
                    }} 
                    
                   />}

      <div className="row">
        <div className="col-md-6">
        
           {containerData &&  <InputLabel
              style={{ fontSize: "18px", marginTop: "30px", color: "#0E1B3D" ,fontFamily:'Dubai Medium'}}
            >
               Booking # {containerData.referenceNumber} (Expires in  {containerData.expiryIn} )
             
            </InputLabel>}
        
       
        </div>
        <div className="col-md-6">
          {containersUnassigned === 0 &&
          <Button
            variant="contained"
            color="primary"
            style={{float:"right",marginTop: "30px"}}   
           // disabled={containersUnassigned !== 0}
            onClick={() => {
              setShowPopup(ALERT_DIALOG);            
            }}
          >
            Continue
          </Button>
          }
          {containersUnassigned !== 0 &&
          <Button
          variant="contained" 
          style={{float:"right",marginTop: "30px"}}  
          disabled     
          >
            Continue
          </Button>}
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
                InputLabelProps={{ style: { fontSize: 18,color:'#848484' } }}
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
                  console.log("search button clicked");
                  var search = searchValue;
                  if (searchValue === "") setContainerData(containerList);
                  else
                    setContainerData(
                      containerList.filter((e) => e.container_number === search)
                    );
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <InputLabel
            style={{ fontSize: "18px", marginTop: "30px", color: "#848484" }}
          >
            Trucks Available
          </InputLabel>
      
        </Grid>
      </Grid>
  
      {containerData && containerData.containerList.map((container, index) => (
        <AssignTrucksSubForm
          containerData={container}
          key={container.container_number}
          index={index}
          // truckOptions={truckList}
          truckNumber={container.truckNumber}
          onTruckSelect={(e, containerNumber,transporter) => updateContainerList(e, containerNumber,transporter)}
        ></AssignTrucksSubForm>
      ))}

        <CustomDialog
                      open={showPopup === ALERT_DIALOG}
                      title={"Send For Token?"}

                      onClose={() => {
                        setShowPopup(NO_DIALOG);
                      }}
                      onConfirm={(e) =>{
                        
                         AssignTruckAndDriverService.groupAndSendForApproval({containerList: containerList,requestTime:e,referenceNumber:containerData.referenceNumber})
                         .then((response) => {
                        if (response.isAxiosError) throw new Error(response.status);
                         else
                         {
                            
                              setShowConfirmation(ALERT_DIALOG);
                              setShowPopup(NO_DIALOG);

                        } 
           
          })
   
          .catch(() => {
            console.log("error");
          });
                      
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
