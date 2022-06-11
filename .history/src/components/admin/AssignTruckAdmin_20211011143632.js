import React, { useEffect, useState } from "react";

import AssignTruckAndDriverService from "../../service/AssignTruckAndDriverService";
import AssignTruckAdminSubForm from "./AssignTruckAdminSubForm";

import { useLocation } from "react-router-dom";
import { Grid, InputLabel ,TextField,Button, Table,
    TableBody,
    TableCell,
    TableRow,
    OutlinedInput,
    Select,MenuItem,Breadcrumbs,Link
   } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { NO_DIALOG, ALERT_DIALOG, OTHER_POPUP } from "../../lib/common/Constants";
import ConfirmDialog from "../../lib/components/dialog/confirmDialog";
import { useHistory } from "react-router-dom";
import JobConfirmationAdmin from './../admin/JobConfirmationAdmin';
import Typography from "@material-ui/core/InputLabel";
import ApplnAutoCompleteAsync from '../../lib/components/autocomplete/ApplnAutoCompleteAsync';
import * as endpointContants from "../../utils/ptmsEndpoints";

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
  

 function AssignTruckAdmin() {

  const [truckList, setTruckList] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const location = useLocation();
  const [containerData,setContainerData] = useState(location.state.containerData[0]);
  const [containerDataOrigin,setContainerDataOrigin] = useState(location.state.containerData[0]);
  const [containerList, setContainerList] = useState([]);
  const [containersUnassigned, setContainersUnassigned] = useState(
    location.state.containerData.length
  );
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const[disableAssign,setDisableAssign]=useState(true);
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [render, setRender] = useState(0);
  const [transporterOptions, setTransporterOptions] = useState();
  let history = useHistory();
 

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
  
     setContainerList(containerDataOrigin.containerList);
    const loadTransporters = async () => {
      AssignTruckAndDriverService.fetchOnBoardedTransporters()
        .then((response) => {
          setTransporterOptions(response);
         
        })
        .catch(() => {
          console.log("error");
        });
    };

    loadTransporters();
  }, []);

  





 
  const validateContainerData =(containerData)=>
  {
  
      var validationSuccess = true;
      containerData.assgnTransporterError='';

      if(containerData.assignedTransporter===''||containerData.assignedTransporter===undefined )
      {
        containerData.assgnTransporterError = true;
        validationSuccess = false;
      }


      for (let i = 0; i < containerData.containerList.length; i++) {
        var container=containerData.containerList[i];
        container.transporterError = '';
        container.truckError = '';
        container.tokenError = '';
        container.dateError = '';
        container.timeError = '';
        container.etokenError = '';

        if((container.transporterCode===''||container.transporterCode===undefined) &&
           (container.truckNumber===''|| container.truckNumber===undefined) &&
           (container.tokenOut===''|| container.tokenOut===undefined) &&
           (container.tokenOutDate===''|| container.tokenOutDate===undefined) &&
           (container.tokenOutSlotFrom===''|| container.tokenOutSlotFrom===undefined|| container.tokenOutSlotTo==='' || container.tokenOutSlotTo===undefined) &&
           (container.etokenDto === undefined)
           )
           {
            validationSuccess=true;
            continue;
           }
       
      
            if(container.transporterCode===''||container.transporterCode===undefined )
            {
              container.transporterError = true;
              validationSuccess = false;
            }
            if(container.truckNumber===''|| container.truckNumber===undefined)
            {
              container.truckError = true;
              validationSuccess = false;
            }
            if(container.tokenOut===''|| container.tokenOut===undefined)
            {
              container.tokenError = true;
              validationSuccess = false;
            }
            if(container.tokenOutDate===''|| container.tokenOutDate===undefined)
            {
              container.dateError = true;
              validationSuccess = false;
            }
            if(container.tokenOutSlotFrom===''|| container.tokenOutSlotFrom===undefined|| container.tokenOutSlotTo==='' || container.tokenOutSlotTo===undefined)
            {
              container.timeError = true;
              validationSuccess = false;
            }

           if (container.etokenDto === undefined) {
          container.etokenError = true;
          validationSuccess = false;
             }
      }
  
    
      return validationSuccess;
    
  
  
  }




  return (
    <>
{showPopup === ALERT_DIALOG &&  
<JobConfirmationAdmin
                      
                       onClose={(e) => {
                        setShowPopup(NO_DIALOG);
                        history.push("/adminDashBoard")
                    }} 
                    
                   />}
       <Grid item xs={12} style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Breadcrumbs aria-label="breadcrumb" classes={{
          root: classes.breadCrumRoot,
          separator: classes.separator,
        }}>
          <Link onClick={() => history.push("/transporterDashboard")} style={{ color: '#848484' }}>
          Home
          </Link>
          <span style={{ color: '#0E1B3D' }}>
          My Jobs
          </span>
        </Breadcrumbs>
      </Grid>            
    
      <div className="row">
        <div className="col-md-6">
          {containersUnassigned !== 0 && (
            <InputLabel
              style={{ fontSize: "18px",marginTop:"30px" ,color: "#0E1B3D",fontFamily:"Dubai Medium" }}
            >
              <span>Booking {}</span>
          
            </InputLabel>
          )}
         
        </div>
        <div className="col-md-6">
          <Button
            variant="contained"
            color="secondary"
            style={{ float: "right", marginTop: "20px" }}
            //disabled={disableAssign}
            className="float-right"
             onClick={() => {
               console.log(containerData);
               validateContainerData(containerData);
               setRender(render+1);
            //    AssignTruckAndDriverService.assignTruckAndTokenAdmin(containerData)
            //    .then((response) => {
            //   if (response.isAxiosError) throw new Error(response.status);
            //    else
            //    {
                  
                  
            //         setShowPopup(ALERT_DIALOG);

            //   } 
               
               
             
            //  })
            }}
          >
            Assign
          </Button>
        </div>
      </div>

      <hr
        style={{ backgroundColor: "#D3D3D3", border: "0px", height: "1px" }}
      ></hr>
     <Grid container direction="row">
       <Grid item xs={4}>

<InputLabel style={{fontSize:"18px",fontFamily:"Dubai Regular"}} >Select name of transporter to assign this booking</InputLabel>
</Grid>
<Grid item xs={4}>
<Select
style ={{height:"40px",width:"150px"}}
defaultValue= {containerData.assignedTransporter}
input={
<OutlinedInput
name="assignedTransporter"
classes={outlinedInputClasses}
error={containerData.assgnTransporterError?true:false}
/>
}
onChange={(e) => {

containerData.assignedTransporter=e.target.value;
}}
>
{transporterOptions && transporterOptions.map((transporter, i) => {
return (
<MenuItem value={transporter.value} key={transporter.label}>
{transporter.label}
</MenuItem>
);
})}
</Select>
<br></br>
 {containerData.assgnTransporterError && <span style={{color:'#f44336',fontFamily:'Dubai Regular',fontSize:'13px'}}> Transporter Required!</span> }
</Grid>

</Grid>


       <Grid container direction="row">
        <Grid item xs={12}>
          <Table style={{ width: "100%", marginLeft: "12px" }}>
            <TableBody>
              {/* {containerSummary.containerInfo.map((container, ind) => ( */}
              <TableRow>
              <TableCell >
              <Grid
            container
            spacing={1}
            alignItems="flex-end"
            style={{ marginLeft: "12px" }}
          >
            <Grid item xs={6}>
              <TextField
                id="input-with-icon-grid"
                label="Search with container number"
                InputLabelProps={{ style: {fontSize: 18,color:'#848484' }  }}
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
                  console.log("containerDataOrigin",containerDataOrigin);
               
                  var search = searchValue.trim(); 
                  var container_containerData;
                  var indexReplace;
                  if (searchValue === "") 
                  {
                    container_containerData=containerData.containerList[0];
                     indexReplace=containerDataOrigin.containerList.findIndex((e) => e.container_number === container_containerData.container_number);
                    containerDataOrigin.containerList[indexReplace]=container_containerData;
                    console.log(containerDataOrigin);
                  

                   setContainerData(prevState => ({
                       ...prevState,
                      containerList:containerDataOrigin.containerList
                     }));
                    }
                    
                  else
                  {  
                    containerData.containerList.forEach(x=>{
                      container_containerData=x;
                      indexReplace=containerDataOrigin.containerList.findIndex((e) => e.container_number === container_containerData.container_number);
                      containerDataOrigin.containerList[indexReplace]=container_containerData;

                    })
                  
                                         
                   var containerSearch=containerList.filter((e) => e.container_number === search);
                  
                   console.log(containerSearch);
                   setContainerData(prevState => ({
                    ...prevState,
                   containerList:containerSearch
                  }));
                }
              }}
              />
            </Grid>
          </Grid>
              </TableCell>
         
          <TableCell>
          <InputLabel
            style={{ fontSize: "18px", color: "#848484" }}
          >
           Truck and Token details
          </InputLabel>
          </TableCell>
                  </TableRow>
                  </TableBody>
                  </Table>
                  </Grid>
                  </Grid>

               
                    
      <br></br>
     
       { containerData.containerList.map((container, index) => (
          <AssignTruckAdminSubForm
            containerData={container}
            key={container.container_number}
            index={index}
            transporterOptions={transporterList}
            truckNumber={container.truckNumber}
            //onTruckSelect={(e,containerNumber) => updateContainerList(e,containerNumber)}
            //onTokenEntered={(containerData)=>{updateContainerData(containerData)}}
          ></AssignTruckAdminSubForm>
        ))}
   
   
</>
);
}
export default React.memo(AssignTruckAdmin);
