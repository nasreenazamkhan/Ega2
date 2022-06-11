import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import CreateEditAddressPopup from "./CreateEditAddressPopup";
import { InputLabel } from "@material-ui/core";
import { Card } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import "../../assets/styles.css";
import { getHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";
let createEditFormData = {
  consigneeContactName: "",
  consigneeContactNumber: "",
  //dropZone:"",
  dropAddress: "",
  code: "",
  addressNickname: "",
  phoneNumber: "",
  addressLine1: ""

};
let action;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHeight: "237px",
    width: "190px",
    fontSize: "12px",
    borderColor: 'rgb(14 27 61 / 60%)',
    borderWidth: "2px",
    borderStyle: "dashed",
    marginBottom: "0px !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

export default function AddAddressCard(props) {
  const classes = useStyles();
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [pstate, setPstate] = useState(0);
  const [action, setAction] = useState(" ");
  const [zoneOpts, setZoneOpts] = useState([]);
  console.log("action is", action);

  const render = (e) => {
    console.log("hiii");
    e.selected = true;
    props.render(e);
  }

  // useEffect(() => {
  //   const remoteUrl = endpointContants.fetchZone;
  //   let obj1 = { url: remoteUrl };

  //   getHttp(obj1, true)
  //     .then((response) => {
  //       setZoneOpts(response.data.dataItems);

  //     })
  //     .catch((error) => { });
  // }, []);

  return (
    <>
      <Card className={classes.root} style={props.divider ? {minHeight: "278px"} : {minHeight: "237px"}}>
        <IconButton
          aria-label="Add"
        >
          <div>
            <img src="./add_location_plus.svg"
              onClick={() => {
                let formData = {
                  consigneeContactName: "",
                  consigneeContactNumber: "",
                  phoneNumber: "",
                  dropAddress: "",
                  addressLine1: "",
                  addressNickname: "",
                  //dropZone:zoneOpts,
                  dropZone: "JAFZAN",
                  latLng: ""
                };
                createEditFormData = formData;
                setAction("ADD");
                setPstate(pstate + 1);
                setShowPopup(OTHER_POPUP);
                console.log("clicked");
              }} />
          </div>
        </IconButton>
        <div>
          <InputLabel
            class="upperCase "
            style={{ fontSize: "14px", color: "#0E1B3D", fontWeight: 600, fontFamily: 'Dubai Light' }}
          >
            Add Location
          </InputLabel>
        </div>
      </Card>
      {showPopup === OTHER_POPUP && (
        <CreateEditAddressPopup
          isopen={showPopup === OTHER_POPUP}
          action={action}
          createEditFormData={createEditFormData}
          onClose={(e) => {
            setShowPopup(NO_DIALOG);
          }}
          onConfirm={(e) => {
            // this.forceUpdate();
            setShowPopup(NO_DIALOG);
            render(e);
          }}
        />
      )}
    </>
  );
}
