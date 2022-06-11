import React, { useState,useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogAcions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  TableHead,
  Typography,
  Button,
  TextField,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import * as endpointContants from "../../utils/ptmsEndpoints";
import { postHttp } from "../../lib/common/HttpService";
import Table from "@material-ui/core/Table";
import MapComponent from "../googlemap/Map";
import Grid from "@material-ui/core/Grid";
import AppRadio from "../../lib/components/radio/appRadio";
import Link from "@material-ui/core/Link";
import TransporterService from "../../service/TransporterService";
import appDatePicker from "../../lib/components/datepicker/appDatePicker";
import RequestContainerService from "../../service/RequestContainerService";
import ApplnAutoCompleteAsync from "../../lib/components/autocomplete/ApplnAutoCompleteAsync";
import { FormProvider, useForm, Controller } from "react-hook-form";
import ApplnRadio from "../../lib/components/radio/ApplnRadio";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import parseWithOptions from "date-fns/fp/parseWithOptions";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const requestOptions = [
  { label: "Request Now", value: "NOW" },
  { label: "Request Later", value: "LATER" },
];

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

const useStyles = makeStyles({
  hrStyle: {
    width: "52px",
    background: "#FF5667",
    height: "2px",
    border: "0px",
    marginLeft: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    background: "#FF5667 0% 0% no-repeat padding-box",
  },
  textFieldstyle: {
    paddingBottom: "0px",
    paddingTop: "0px",
  },
});

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: "6.5px",
    paddingBottom:'15px'
  },
})(MuiTableCell);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return <>
   <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon style={{ fill: '#0E1B3D' }}/>
      </IconButton></>;
});

const DialogContent = withStyles(() => ({
  root: {
    textAlign: "center",
    overflowY: "unset",
  },
}))(MuiDialogContent);

const DialogActions = withStyles(() => ({
  root: {
    padding: "8px 44px",
  },
}))(MuiDialogAcions);

export default function TruckDetailsPopup(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [formvalues, setFormvalues] = useState({
    transporterCode: props.containers.transporterCode,
    transporterName: props.containers.transporterName,
    truckNumber: props.containers.truckNumber,
    assignedTruck: props.containers.assignedTruck,
    requestTime:"NOW"
  });
  const [truckUrl, setTruckUrl] = useState(
    `${endpointContants.fetchTrucksForTransporter}?transporter=''`
  );
  const transporterUrl = `${endpointContants.fetchTransporters}`;
  const truckKVmapping = { label: "label", value: "value" };
  const transporterKVmapping = { label: "label", value: "value" };
  const [disable, setDisable] = useState("disabled");
  const [defaultTransporter, setDefaultTransporter] = useState("");

  useEffect(() => {
   var transporter='';
   if( props.containers.refStatus.code === "TRUCK_ASGN" ||
    props.containers.refStatus.code === "PTOK")
         {
            transporter={label: props.containers.transporterCode+"-"+props.containers.transporterName,
            value:props.containers.transporterCode.split("-")[1]};
          
         setDefaultTransporter( transporter);
        }
   else if(props.containers.refStatus.code==="FCL_DEL")    
   {
     transporter={label: props.booking.assignedTransporterCode+"-"+props.booking.assignedTransporter,
    value: props.booking.assignedTransporterCode.split("-")[1]}
    setDefaultTransporter(transporter )
      }
     else   
      {
        transporter=  { label:  props.containers.mtTransporterName,
          value: props.containers.mtTransporterCode} 

     setDefaultTransporter(transporter)
         }

         onTransporterSelect(transporter)
   
  }, []);

  const onTransporterSelect=(option)=>
    {
      formvalues.truckNumber = "";
      setTruckUrl(
        `${endpointContants.fetchTrucksForTransporter}?transporter=${option.value}`
      );
      formvalues.transporterCode = option.value;
      formvalues.transporterName = option.label;
    }


    const methods = useForm({
    //resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: formvalues,
  });
  const todayDate = new Date();
  const { control } = methods;


  const handleClose = (e) => {
    props.onClose(e);
    setOpen(false);
  };


  

  return (
    <FormProvider {...methods}>
     
      <Dialog fullWidth={true} open={open}>
        <DialogTitle
          style={{
            backgroundColor: "#FFF",
            color: "black",
            textAlign: "left",
          }}
          onClose={()=>{handleClose("close")}}
        >
        </DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell style={{paddingTop:'15px'}}>
                  <InputLabel
                    style={{
                      color: "#434343",
                      fontSize: "19px",
                    }}
                  >
                    Select Truck
                  </InputLabel>
                  <hr className={classes.hrStyle} />
                </TableCell>
              </TableRow>
              <TableRow>
              {defaultTransporter && <TableCell>
                 <ApplnAutoCompleteAsync
                    name={"transporter"}
                    label="Search By Transporter Code or Name"
                    defaultValue={defaultTransporter
                    
                    }
                    kvMapping={transporterKVmapping}
                    remoteUrl={transporterUrl}
                    isAssignTruck={true}
                    onSelectMenu={(option) => {
                      onTransporterSelect(option);
                    
                    }}
                  />
                </TableCell>}
                <TableCell>
                  {" "}
                  <ApplnAutoCompleteAsync
                    name={"truck"}
                    label="Search by Truck number"
                    style={{ marginTop: "2px" }}
                    defaultValue={ 
                     ( props.containers.refStatus.code === "TRUCK_ASGN" ||
                    props.containers.refStatus.code === "PTOK")?
                       {
                          label: props.containers.assignedTruck,
                          value: props.containers.assignedTruck,
                        }:
                       {
                          label: props.containers.mtTruck,
                          value: props.containers.mtTruck,
                        }
                     
                    }
                    kvMapping={truckKVmapping}
                    remoteUrl={truckUrl}
                    isAssignTruck={true}
                    onSelectMenu={(option) => {
                      formvalues.truckNumber = option.value;
                      formvalues.assignedTruck = option.label;
                      if (
                        props.containers.refStatus.code === "TRUCK_ASGN" ||
                        props.containers.refStatus.code === "PTOK" ||
                        props.containers.refStatus.code === "PMTTOK"
                      )
                        setDisable("");
                    }}
                    //options = {truckOptions}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {(props.containers.refStatus.code === "PTOK" ||
            props.containers.refStatus.code === "PMTTOK") && (
            <p>
              Please Note: The token request is pending with Admin for previous
              truck details, once you amend truck the request will be updated
              with new details.
            </p>
          )}

          {/* {props.containers.refStatus.code === "TRUCK_ASGN" && (
           */}
          {props.tabSelected === "Delivered" &&
            (props.containers.refStatus.code === "MTTRK_ASSGN" ||
              props.containers.refStatus.code === "FCL_DEL") && (
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <p>
                        Would you like to request token for the containers added
                        in this truck now?
                      </p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      {/* <ApplnRadio
                            label={""}
                            name={"requestTime"}
                            helperText="Request Options"
                            options={requestOptions}
                            defaultValue={"NOW"}
                           
                          /> */}
                      <Controller
                        control={control}
                        defaultValue="NOW"
                        name="requestTime"
                        render={({ name, onBlur, onChange, value }) => (
                          <RadioGroup
                            value={value}
                            onBlur={onBlur}
                            onChange={(e) => {
                              onChange(e);
                              console.log(e.target.value);
                              formvalues.requestTime = e.target.value;
                            }}
                          >
                            <Grid container>
                              <Grid item>
                                <FormControlLabel
                                  value="NOW"
                                  control={<Radio />}
                                  label="Request Now"
                                />
                              </Grid>
                              <Grid item>
                                <FormControlLabel
                                  value="LATER"
                                  control={<Radio />}
                                  label="Request Later"
                                />
                              </Grid>
                            </Grid>
                          </RadioGroup>
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <InputLabel>Enter preferred Date </InputLabel>
                    </TableCell>
                    <TableCell>
                      <ApplnDatePicker
                        name={"preferredDate"}
                        id={"preferredDate"}
                        iconColor="#0E1B3D"
                        minDate={todayDate}
                        onChange={(e) => {
                          formvalues.preferredDate = e;
                          setDisable(false);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
        </DialogContent>
        <DialogActions>
          {/* <Link
            onClick={() => {
              props.onClose("cancel");
            }}
          >
            Cancel
          </Link> */}
          {props.tabSelected === "PENDING JOBS" && (
            <Button
              style={{
                width: "131px",
                height: "41px",
              }}
              disabled={disable}
              onClick={() => {
                props.containers.transporterCode = formvalues.transporterCode;
                props.containers.transporterName = formvalues.transporterName;
                props.containers.assignedTruck = formvalues.assignedTruck;
                TransporterService.reAssigntruck(props.containers);
                handleClose("assign");
              }}
            >
              Re-assign
            </Button>
          )}
          {props.tabSelected === "Delivered" && (
            <Button
              style={{
                width: "131px",
                height: "41px",
              }}
              disabled={disable}
              onClick={() => {
                console.log("reassign clicked :;", formvalues.values);
                // console.log("methods get value",methods.getValues());
                props.containers.mtTransporterCode = formvalues.transporterCode;
                props.containers.mtTransporterName = formvalues.transporterName;
                props.containers.mtTruck = formvalues.assignedTruck;
                props.containers.requestTime = formvalues.requestTime;
                props.containers.preferredTokenInDate =
                  formvalues.preferredDate;
                 RequestContainerService.requestForToken(props.containers).then((res) => {
                     handleClose("assign");
                 })
              }}
            >
              {props.containers.refStatus.code === "FCL_DEL"
                ? "Assign"
                : "Re-Assign"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      </FormProvider>
     
  );
}
