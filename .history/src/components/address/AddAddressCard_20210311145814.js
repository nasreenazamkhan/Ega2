import React, { Fragment, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import CreateEditAddressPopup from "./CreateEditAddressPopup";
import { InputLabel } from "@material-ui/core";
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import "../../assets/styles.css";
import { postHttp, getHttp } from "../../lib/common/HttpService";
import * as endpointContants from "../../utils/ptmsEndpoints";
let createEditFormData = {
  consigneeContactName: "",
  consigneeContactNumber: "",
 //dropZone:"",
  dropAddress: "",
  code: "",
  addressNickname: "",
  phoneNumber: "",
  addressLine1:""
  
};
let action;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    height: "230px",
    width: "182px",
    fontSize: "12px",
    borderColor: "#0E1B3D",
    borderWidth: "1.5px",
    borderStyle: "dashed",
    marginBottom: "0px !important",
    display:"flex",
justifyContent:"center",
alignItems:"center",
flexDirection: "column"
  },
}));

export default function AddAddressCard(props) {
  const classes = useStyles();
  const [showPopup, setShowPopup] = useState(NO_DIALOG);
  const [pstate, setPstate] = useState(0);
  const [action, setAction] = useState(" ");
  const [zoneOpts, setZoneOpts] = useState([]);
  console.log("action is", action);

  const render = () => {
    console.log("hiii");
    props.render();
  }

  useEffect(() => {
    const remoteUrl = endpointContants.fetchZone;
    let obj1 = { url: remoteUrl };

    getHttp(obj1, true)
      .then((response) => {
        setZoneOpts(response.data.dataItems);
       
      })
      .catch((error) => {});
  }, []);

  return (
    <>
       <Card className={classes.root}>
      <IconButton
        aria-label="Add"
       // className="centerPosition"
        // onClick={() => {
        //   let formData = {
        //     consigneeContactName: "",
        //     consigneeContactNumber: "",
        //     phoneNumber: "",
        //     dropAddress: "",
        //     addressLine1: "",
        //     addressNickname: "",
        //     //dropZone:zoneOpts,
        //     dropZone:"",
        //   };
        //   createEditFormData = formData;
        //   setAction("ADD");
        //   setPstate(pstate + 1);
        //   setShowPopup(OTHER_POPUP);
        //   console.log("clicked");
        // }}
      >
        <div>
          <div>
            {" "}
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
            dropZone:"JAFZAN",
          };
          createEditFormData = formData;
          setAction("ADD");
          setPstate(pstate + 1);
          setShowPopup(OTHER_POPUP);
          console.log("clicked");
        }}/>
          </div>
          <div>
            <InputLabel
              class="upperCase "
              style={{ fontSize: "12px", color: "#0568AE" }}
            >
              Add Location
            </InputLabel>
          </div>
        </div>
        </IconButton>
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
            render();
          }}
        />
      )}
    </>
  );
}
