import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { createStyles, FormControl, FormHelperText, Grid, MenuItem, Select, withStyles } from "@material-ui/core";
import { NO_DIALOG } from "../../lib/common/Constants";
import { postHttp, getHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";
import MapComponent from "../googlemap/Map";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, Form } from "formik";
import TextInput from "../../lib/components/txtinput/textInput";
import SelectBox from "../../lib/components/select/selectBox";
import { Dialog, DialogTitle, DialogContent, Button, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ErrorOutline, ExpandMoreRounded } from "@material-ui/icons";
import { InputLabel } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { default as MuiButton } from '@material-ui/core/Button';
import { yupResolver } from "@hookform/resolvers";
import { FormProvider, useForm } from "react-hook-form";
import ApplnTxtInput from "../../lib/components/txtinput/ApplnTxtInput";

const useStyles = makeStyles(() => ({
  textInput: {
    textAlign: 'left',
    color: '#494949',
    fontWeight: 600,
  },
  labelRoot: {
    fontWeight: 600,
    color: '#9A9A9A',
    fontSize: '0.9rem'
  },
  disabledDropLoc: {
    opacity: 1,
    fontWeight: 600,
    color: '#494949',
  }
}));

const StyledBlueButton = withStyles(() =>
  createStyles({
    root: {
      float: "right",
      fontWeight: "lighter",
      width: '84px',
      height: '30px',
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

const CreateEditAddressPopup = (props) => {
  console.log("props in createEditAdddressPopup::", props);
  const [formvalues, setFormvalues] = useState(props.createEditFormData);
  const [pstate, setPstate] = useState(0);
  const [address, setAddress] = useState();
  const [latLng, setLatLng] = useState();
  const [err, setErr] = useState(false);
  const [mapError, setMapError] = useState("");
  const classes = useStyles();
  const [zoneOpts, setZoneOpts] = useState([]);
  const [zone, setZone] = useState({
    label:'',
    value:''
  });

  const validationSchema = Yup.object({
    consigneeContactName: Yup.string().required("Consignee Name is Required"),
    addressNickname: Yup.string().required("Address nickname is Required"),
    // dropZone: Yup.string().required("Drop Zone is Required"),
    consigneeContactNumber: Yup.string()
      .required("Mobile Number is Required")
      .matches(/^[0-9]\d{11,11}$/, "Format must be 971xxxxxxxxx"),
    phoneNumber: Yup.string()
      .required("Phone Number is Required")
      .matches(/^[0-9]\d{10,10}$/, "Format must be 971xxxxxxxx"),
    dropAddress: Yup.string().required("Drop Address is Required")
  });

  useEffect(() => {
    const remoteUrl = endpointContants.fetchZone;
    let obj1 = { url: remoteUrl };

    getHttp(obj1, true)
      .then((response) => {
        setZoneOpts(response.data.dataItems);
        console.log("-------", response.data.dataItems);
      })
      .catch(() => { });
    setAddress(props.createEditFormData.dropAddress);
    setLatLng(props.createEditFormData.latLng);
    setFormvalues(props.createEditFormData);
    setZone({
      label: props.createEditFormData.selectedDropZoneLabel,
      value: props.createEditFormData.dropZone
    });
  }, []);

  
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: formvalues,
  });

  const onSubmit = () => {
    // methods.trigger();
    console.log("values::::", methods.getValues());
    if (address !== "" && methods.formState.isValid === true) {
      let data = methods.getValues();
      data.dropZone = zone.value;
      data.selectedDropZoneLabel = zone.label;
      data.latLng = latLng;
      data.code = props.createEditFormData.code ? props.createEditFormData.code : Math.floor(1000 + Math.random() * 9000);
      console.log("eeeeeeee", methods.getValues());
      console.log("action :::", props.action);
      let remoteUrl;
      if (props.action === "ADD") remoteUrl = endpointContants.createAddress;
      if (props.action === "EDIT") remoteUrl = endpointContants.updateAddress;
      if (props.action === "ADMIN_EDIT") {
        if (props.createEditFormData.containerUpdate) {
          data.adminUpdate = true;
          remoteUrl = endpointContants.updateRequestContainer;
        } else {
          data = {
            referenceNumber: props.createEditFormData.requestDetailsNumber,
            containerList: [
              {
                consigneeContactName: data?.consigneeContactName,
                consigneeContactNumber: data?.consigneeContactNumber,
                dropAddress: data?.dropAddress,
                phoneNumber: data?.phoneNumber,
                addressLine1: data?.addressLine1,
                latLng: latLng
              }
            ]
          }
          remoteUrl = endpointContants.updateSingleLocationForAdmin;
        }
      }
      let obj = {
        url: remoteUrl,
        body: data,
      };
      postHttp(obj, true)
        .then(() => {
          setPstate(pstate + 1);
          props.action === "ADMIN_EDIT" ? props.onConfirm(address) : props.onConfirm(data);
          //setFormData(response);
        })
        .catch(() => { });
    } 
  };

  const handleClose = (e) => {
    console.log(formvalues)
    props.onClose();
  };


  return (
    <>
      {props.action === "VIEW" &&
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={props.isopen}
        >
          <DialogTitle
            style={{
              backgroundColor: "#FFF",
              color: "black",
              textAlign: "left",
            }}
          >
            <IconButton
              className="icon-button"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {"Add Location"}
          </DialogTitle>
          <DialogContent>
            <div class="row">
              <div style={{ width: "300px" }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <InputLabel style={{ fontSize: '16px', color: 'grey', marginTop: '15px', textAlign: "left" }}>Located from Map</InputLabel>
                    <InputLabel style={{ fontSize: '18px', marginTop: '4px', textAlign: "left" }}>{props.createEditFormData.dropZone}</InputLabel>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel style={{ fontSize: '16px', color: 'grey', marginTop: '15px', textAlign: "left" }}>Drop Address</InputLabel>
                    <InputLabel style={{ fontSize: '18px', marginTop: '4px', textAlign: "left" }}>{props.createEditFormData.dropAddress}</InputLabel>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel style={{ fontSize: '16px', color: 'grey', marginTop: '15px', textAlign: "left" }}>AddressLine </InputLabel>
                    <InputLabel style={{ fontSize: '18px', marginTop: '4px', textAlign: "left" }}>{props.createEditFormData.addressLine1}</InputLabel>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel style={{ fontSize: '16px', color: 'grey', marginTop: '15px', textAlign: "left" }}>Name</InputLabel>
                    <InputLabel style={{ fontSize: '18px', marginTop: '4px', textAlign: "left" }}>{props.createEditFormData.addressNickname}</InputLabel>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel style={{ fontSize: '16px', color: 'grey', marginTop: '15px', textAlign: "left" }}>Contact Person</InputLabel>
                    <InputLabel style={{ fontSize: '18px', marginTop: '4px', textAlign: "left" }}>{props.createEditFormData.consigneeContactName}</InputLabel>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel style={{ fontSize: '16px', color: 'grey', marginTop: '15px', textAlign: "left" }}>Phone Number</InputLabel>
                    <InputLabel style={{ fontSize: '18px', marginTop: '4px', textAlign: "left" }}>{props.createEditFormData.phoneNumber}</InputLabel>
                    <Divider></Divider>

                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel style={{ fontSize: '16px', color: 'grey', marginTop: '15px', textAlign: "left" }}>Mobile Number</InputLabel>
                    <InputLabel style={{ fontSize: '18px', marginTop: '4px', textAlign: "left" }}>{props.createEditFormData.consigneeContactNumber}</InputLabel>
                    <Divider></Divider>
                  </Grid>
                </Grid>
              </div>
              <div className="col">
                <MapComponent
                  handleClick={() => { }}
                  zone={zone}
                  address={address}
                  latLng={latLng}
                  action={props.action}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>}
      return (
      <>
        {zoneOpts.length !== 0 && <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={props.isopen}
        >
          <FormProvider {...methods}>
            <form autoComplete="off" onSubmit={methods.handleSubmit(onSubmit)}>
              <DialogContent style={{ padding: 0 }}>
                {mapError &&
                  <div class="row">
                    <Alert
                      severity="error"
                      icon={<ErrorOutline fontSize="inherit" style={{ fill: '#f44336' }} />}
                      action={<IconButton onClick={() => { setMapError("") }}><CloseIcon style={{ fill: '#f44336', fontSize: '17px' }} /></IconButton>}
                      style={{ marginLeft: '35.5%', width: "62.5%", border: "1px solid #f44336", color: '#f44336', fontWeight: '600' }}>
                      <strong>Error : </strong>
                      {mapError}
                    </Alert>
                  </div>}
                <div class="row" style={{ margin: 0, marginLeft: '15px' }}>
                  <div style={{ width: "306px", paddingTop: '20px' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={10} style={{
                        backgroundColor: "#FFF",
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: '19px',
                        color: '#434343'
                      }} >
                        {props.action === "ADD" ? "Add Location" : "Edit Address"}
                        <hr style={{ borderTop: '3px solid #FF3E3E', width: '52px', margin: 0 }} />
                      </Grid>
                      <Grid item xs={2} style={{ paddingTop: 0 }}>
                        <IconButton
                          aria-label="close"
                          onClick={handleClose}
                          style={{ paddingTop: '8px' }}
                        >
                          <CloseIcon style={{ fill: '#0E1B3D' }} />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth >
                          <Select
                            label={'Zone'}
                            name={"dropZone"}
                            id={"dropZone"}
                            disabled={props.action == "ADMIN_EDIT"}
                            placeholder={''}
                            value={zone.value}
                            IconComponent={ExpandMoreRounded}
                            style={{ textAlign: 'left', color: '#494949', fontWeight: 600, }}
                            onChange={(e) => {
                              setAddress("");
                              setLatLng("");
                              setZone({
                                label:e.currentTarget.outerText,
                                value: e.target.value
                              });
                            }}
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                              },
                              getContentAnchorEl: null,
                            }}
                          >
                            {zoneOpts.map((option, i) => {
                              return (
                                <MenuItem value={option.value} key={i} style={{ fontSize: '0.9rem', fontFamily: 'Dubai Light', fontWeight: 600 }}>
                                  {option.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          placeholder={'Locate from map'}
                          name={"dropAddress"}
                          label="Drop Location"
                          id={"dropAddress"}
                          inputRef={methods.register()}
                          value={address}
                          readOnly
                          error={!address ? methods.errors.dropAddress : false}
                          helperText={!address ? methods.errors.dropAddress?.message : ""}
                          fullWidth
                          onKeyDown={(event) => {
                            event.preventDefault()
                            setMapError("Please click on map or search location from map");
                          }}
                          InputProps={{
                            classes: {
                              root: classes.textInput,
                              disabled: classes.disabledDropLoc
                            }
                          }}
                          InputLabelProps={{
                            classes: {
                              root: classes.labelRoot,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ApplnTxtInput
                          label="Address line 1"
                          name={"addressLine1"}
                          id={"addressLine1"}
                        />
                      </Grid>
                      {props.action !== "ADMIN_EDIT" && <Grid item xs={12}>
                        <ApplnTxtInput
                          label="Nick name"
                          name={"addressNickname"}
                          id={"addressNickname"}
                        />
                      </Grid>}
                      <Grid item xs={12}>
                        <ApplnTxtInput
                          label="Contact Person"
                          name={"consigneeContactName"}
                          id={"consigneeContactName"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ApplnTxtInput
                          label="Phone Number"
                          placeholder="e.g. 971xxxxxxxx"
                          name={"phoneNumber"}
                          id={"phoneNumber"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ApplnTxtInput
                          label="Mobile Number"
                          name={"consigneeContactNumber"}
                          id={"consigneeContactNumber"}
                          placeholder="e.g. 971xxxxxxxxx"
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <StyledBlueButton
                          style={{ float: "right", justifySelf: "right" }}
                          variant="outlined"
                          onClick={() => {
                            handleClose()
                          }}
                        >
                          Cancel
                        </StyledBlueButton>
                      </Grid>
                      <Grid item xs={4}>
                        <StyledBlueButton
                          type="submit"
                          disabled={mapError}
                          style={{ float: "right", justifySelf: "right", color: '#FFFFFF', backgroundColor: '#1360D2', border: 'none' }}
                          variant="contained"
                        >
                          Submit
                        </StyledBlueButton>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="col" style={{ paddingRight: 0 }}>
                    <MapComponent
                      handleClick={(e) => {
                        setLatLng(JSON.stringify(e.loc));
                        setAddress(e.add);
                        setMapError("");
                      }}
                      zone={zone.value}
                      address={address}
                      latLng={props.createEditFormData.latLng ? JSON.parse(props.createEditFormData.latLng) : ""}
                      handleError={(e) => {
                        setMapError(e);
                        setAddress("");
                      }}
                    />
                  </div>
                </div>
              </DialogContent>
            </form>
          </FormProvider>
        </Dialog>}
      </>
    </>
  )
}

export default React.memo(CreateEditAddressPopup)
