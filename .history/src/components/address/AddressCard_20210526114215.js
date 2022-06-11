import React, { Fragment, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Card, CardActions, CardContent, CardHeader } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CreateEditAddressPopup from "./CreateEditAddressPopup";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";

import * as endpointContants from "../../utils/ptmsEndpoints";
import AddressService from "./AddressService";
import Link from "@material-ui/core/Link";
import { InputLabel ,Tooltip} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { ALERT_DIALOG } from "../../lib/common/Constants";
import ConfirmDialog from "../../lib/components/dialog/confirmDialog";
import SuccessToast from "../../lib/components/toast/SuccessToast";
import { postHttp, getHttp } from "../../lib/common/HttpService";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    height: "230px ",
    width: "182px ",
    fontSize: "12px",
    border: " 1px solid #d8d8d8",
    borderBottom:"none"
  },
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
    float: "center",
    width: "56px",
    height:"30px"
  },
  confirmButton: {
    background: "#4CAB5B",
    color: "#fff",
    textTransform: "none",
    float: "center",
    width: "56px",
    height:"30px"
  },
  selected:{
    border: "1px solid #0568AE",
  },
  notSelected: {
    border: "1px solid red",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Dubai Regular",
    paddingLeft: "0px",
    color:"#686868"
  }
}));



let createEditFormData = {
  consigneeContactName: "",
  consigneeContactNumber: "",
  addressNickname:"",
  dropAddress: "",
  code: "",
  phoneNumber: "",
  addressLine1: "",
  dropZone:""
};
let action;

export default function AddressCard(props) {
  const classes = useStyles();
  console.log("Props in addressCard ::", props);
  const [showPopup1, setShowPopup1] = useState(NO_DIALOG);
  const [pstate, setPstate] = useState(0);
  const [action, setAction] = useState(" ");
  const [formData, setFormData] = useState("");
  const [addressData, setAddressData] = useState(props.addressList);
  const [showPopup2, setShowPopup2] = useState(NO_DIALOG);
  const [showToaster, setShowToaster] = useState(null);
  const [zoneOpts, setZoneOpts] = useState([]);
  const [addressSelected, setAddressSelected] = useState([classes.root]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressnotSelected, setAddressnotSelected] = useState([classes.root]);
  const openPopup = () => {
    console.log("props... in address card on click of edit::", props);
    // let formData = {
    //   consigneeContactName: props.address.consigneeContactName,
    //   consigneeContactNumber: props.address.consigneeContactNumber,
    //   //consigneeContactEmail: props.address.consigneeContactEmail,
    //   dropAddress: props.address.dropAddress,
    //   code: props.address.code,
    //   dropZone: props.address.selectedDropZone,
     
    //   //isActive: props.address.isActive === "YES" ? true : false,
    //   addressNickname: props.address.addressNickname,
    //   addressLine1: props.address.addressLine1,
    //   phoneNumber: props.address.phoneNumber
    // };
    createEditFormData = props.address;
    createEditFormData.dropZone = props.address.selectedDropZone;
    // createEditFormData.isActive =
    //   props.address.isActive === "YES" ? true : false;
    console.log("createEditFormData in popup::", createEditFormData);
    setAction("VIEW");
    setPstate(pstate + 1);
    setShowPopup1(OTHER_POPUP);
  };

  useEffect(() => {

  }, [pstate])
    
  const save = () => {
    console.log("props... in address card on click of link", props);
 
    setSelectedAddress(props.address);
    setAddressSelected([classes.root, classes.selected]);
    props.address.selected = true;
   
    addressData.map((address, i) => {
      console.log("address in loop", address);
      if (address.code !== props.address.code) {
      //  setAddressnotSelected([classes.root, classes.notSelected]);
      address.selected = false;
      }
    
    });
   
   // setPstate(pstate + 1);
    props.saved(props.address);
  };

  const RenderEditIcon = () => {
    console.log("renderEditIcon addressCard ::", props);

    if (props.editFlag === "true" && props.deleteFlag === "true") {
      return (
        <>
          <IconButton onClick={openPopup}
            address={props.address}
            render={props.render}
          >
            <img src='./pencil.svg' />
          </IconButton>
          <IconButton onClick={() => {
            setShowPopup2(ALERT_DIALOG);
          }} address={props.address}>
            <img src='./trash.svg' />
             
              
             
           
          </IconButton>
        </>
      );
    } else if (props.deleteFlag === "true" && props.editFlag === "false") {
      return (
        <>
          <IconButton>
            <DeleteIcon onClick={() => {
              setShowPopup2(ALERT_DIALOG);
            }} address={props.address} />
          </IconButton>
        </>
      );
    } else if (props.deleteFlag === "false" && props.editFlag === "true") {
      return (
        <>
          <IconButton>
            <EditIcon onClick={openPopup} address={props.address} />
          </IconButton>
        </>
      );
    } else {
      return <></>;
    }
  };

  const RenderDivider = () => {
    if (props.divider !== "") {
      return (
        <>
          <hr style={{ color: "#D8D8D8", border: "solid", borderWidth: "1px", marginTop: "0px" }}></hr>
          <Link style={{ textDecoration: "underline", color: "#0568AE", marginTop: "5px", fontSize: "16px", alignItems: "center", marginLeft: "15px", cursor: "pointer" }} onClick={save}>
            {props.divider}
          </Link>
        </>
      );
    } else {
      return <></>;
    }
  };

  const RenderCard = () => {
    console.log("77777777777", props);
    console.log("8888888", selectedAddress);

    //setAddressnotSelected([classes.root, classes.notSelected])
    // if (selectedAddress.code === props.address.code) {
      return (
        <>
          <Card className={props.address.selected ? addressSelected: addressnotSelected} >
            <CardHeader style={{ padding: "0 0 0 0px" }}
              action={<RenderEditIcon address={props.address} />}
              title={`${props.address.addressNickname}`}
              classes={{
                title: classes.headerTitle
              }}  // titleTypographyProps={{ variant: "h6" }}
  
            />
            <Divider />
            <CardContent style={{ paddingLeft: "3px" }}>
              <InputLabel
                style={{ fontSize: "16px", color: "#686868", textAlign: "left", height: "19px", width: "150px" }}
              >
                {props.address.consigneeContactName}
              </InputLabel>
              <InputLabel
                style={{ fontSize: "16px", color: "#686868", textAlign: "left", height: "19px", width: "150px" }}
              >
                {props.address.selectedDropZoneLabel}
              </InputLabel>

              <Tooltip title={props.address.dropAddress} arrow>
                <InputLabel
                  style={{ fontSize: "16px", color: "#686868", textAlign: "left", height: "19px", marginTop: "5px", width: "150px" ,overflow: 'ellipsis',whiteSpace:'nowrap'}}
                >
     
        
                  {`${props.address.dropAddress.substring(0, 20)}`}...
        
    </InputLabel>
              </Tooltip>
              <InputLabel
                style={{ fontSize: "16px", color: "#686868", textAlign: "left", height: "19px", marginTop: "5px", width: "150px" }}
              >
                Mob: {props.address.consigneeContactNumber}
              </InputLabel>

              <InputLabel
                style={{ fontSize: "16px", color: "#686868", textAlign: "left", height: "19px", marginTop: "5px", width: "150px" }}
              >
                ph: {props.address.phoneNumber}
              </InputLabel>
            </CardContent>
 
            {/* <CardActions style={{display:"flex",flexDirection: "column"}}>
  <RenderDivider /> </CardActions>  */}
          </Card>
          {/* <Box style={{width:"182px",height:"41px"}}> <RenderDivider /></Box> */}
          {props.divider !== "" && <Card style={{
            width: "182px", height: "41px", flexGrow: 1, marginTop: "-41px",
            border: "1px solid #d8d8d8", borderTop: "none", borderTopRightRadius: "0px", borderTopLeftRadius: "0px"
          }}>
            <RenderDivider /></Card>}

          {showPopup1 === OTHER_POPUP && (
            <CreateEditAddressPopup
              isopen={showPopup1 === OTHER_POPUP}
              action={action}
              createEditFormData={createEditFormData}
              onClose={(e) => {
                setShowPopup1(NO_DIALOG);
              }}
              onConfirm={(e) => {
                //  this.forceUpdate();
                setShowPopup1(NO_DIALOG);
                props.saved();
                props.render();
              }}
            />
          )}
          {showPopup2 === ALERT_DIALOG && <ConfirmDialog
            fullWidth={true}
            isopen={showPopup2 === ALERT_DIALOG}
            title={"Attention!"}
            children={"Are You sure to delete the address?"}
            confirmTxt={"Yes"}
            closeTxt={"No"}
 
            confirmButtonCss={classes.confirmButton}
            closeButtonCss={classes.cancelButton}
            onClose={() => {
              setShowPopup2(NO_DIALOG);
            }}
            onConfirm={(e) => {
              console.log("ewerr", props.address);
              AddressService.deleteAddress(props.address.code)
                .then((response) => {
                  console.log(
                    "response after deleting address",
                    response
                  );
        
                  setShowPopup2(NO_DIALOG);
                  props.render();
                  setShowToaster(true);
                })

                .catch(() => {
                  console.log("error");
                });
            }
            }
          />}
          {
            showToaster && <SuccessToast
              icon="check_circle"
              title="Address deleted successfully"
              message=""
              showToast={() => { setShowToaster(false) }}
              position="top-right"
            />}
        </>)
  
   }
  return (
   
      <RenderCard selectedAddress={selectedAddress}/>
           
   
  );
}
