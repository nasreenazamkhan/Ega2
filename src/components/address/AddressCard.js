import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Card, CardContent, CardHeader, withStyles } from "@material-ui/core/";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import CreateEditAddressPopup from "./CreateEditAddressPopup";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import AddressService from "./AddressService";
import Link from "@material-ui/core/Link";
import { InputLabel, Tooltip } from "@material-ui/core";
import { ALERT_DIALOG } from "../../lib/common/Constants";
import ConfirmDialog from "../../lib/components/dialog/confirmDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHeight: "237px",
    width: "190px ",
    fontSize: "12px",
    border: " 1px solid #d8d8d8",
    borderRadius: '5px',
  },
  clickableIcon: {
    color: "grey",
    "&:hover": {
      color: "red",
    },
  },
  cancelButton: {
    border: "1px solid #0E1B3D",
    color: "#0E1B3D",
    width: '100px',
    height: '35px',
    paddingRight: '15px',
    fontSize: '12px',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    borderRadius: '3px'
  },
  confirmButton: {
    backgroundColor: "#1360D2",
    color: "#fff",
    width: '100px',
    height: '35px',
    fontSize: '12px',
    fontFamily: 'Dubai Light',
    fontWeight: 600,
    borderRadius: '3px'
  },
  selected: {
    border: "2px solid #1360D2",
    boxShadow: '0px 3px 6px #00000029',
    marginTop: '-35px'
  },
  notSelected: {
    border: "1px solid red",
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Dubai Regular",
    fontWeight: 600,
    textTransform: 'capitalize',
    paddingLeft: "0px",
    color: "#0E1B3D"
  },
  dividerText: {
    textDecoration: "underline",
    color: "#0568AE",
    fontSize: "16px",
    alignItems: "center",
    cursor: "pointer",
    fontWeight: 600,
    fontFamily: 'Dubai Light',
  },
  dividerCard: {
    width: "190px",
    height: "41px",
    border: "1px solid #d8d8d8",
    paddingTop: '5px',
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    textAlign: 'center',
    borderTop: "none",
  },
  dividerCardSelected: {
    borderTop: "none",
    border: "2px solid #1360D2",
    boxShadow: '0px 3px 6px #00000029'
  },
  dataText: {
    fontSize: "15px",
    color: "#686868",
    textAlign: "left",
    fontFamily: "Dubai Light",
    fontWeight: 600,
    paddingBottom: '9px',
    marginBottom: 0
  }
}));

let formData = {
  consigneeContactName: "",
  consigneeContactNumber: "",
  addressNickname: "",
  dropAddress: "",
  code: "",
  phoneNumber: "",
  addressLine1: "",
  dropZone: ""
};

export default function AddressCard(props) {
  const classes = useStyles();
  console.log("Props in addressCard ::", props);
  const [showPopup1, setShowPopup1] = useState(NO_DIALOG);
  const [pstate, setPstate] = useState(0);
  const [action, setAction] = useState(" ");
  const [addressData, setAddressData] = useState(props.addressList);
  const [showPopup2, setShowPopup2] = useState(NO_DIALOG);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [createEditFormData, setCreateEditFormData] = useState(props.address);


  const openPopup = () => {
    console.log("props... in address card on click of edit::", props);
    // createEditFormData = props.address;
    createEditFormData.dropZone = props.address.selectedDropZone;
    setCreateEditFormData(createEditFormData)
    console.log("createEditFormData in popup::", createEditFormData);
    setAction("EDIT");
    setPstate(pstate + 1);
    setShowPopup1(OTHER_POPUP);
  };

  useEffect(() => {
    console.log(createEditFormData)
    console.log(props.address)
    // addressData.map((address, i) => {
    //   console.log("address in loop", address);
    //     address.selected = false;
    // });
  }, [])

  // const save = (e) => {
  //   addressData.map((address, i) => {
  //     console.log("address in loop", address);
  //     if (address.code !== props.address.code) {
  //       console.log(address.code !== add.code)
  //       address.selected = false;
  //     }
  //   });
  //   console.log(e);
  //   let add = e ? e : props.address;
  //   add.selected = true;
  //   setCreateEditFormData(add)
  //   console.log("props... in address card on click of link", props);
  //   setSelectedAddress(add);
  //   props.saved(add);
  // };
  const save = (e) => {
    console.log("props... in address card on click of link", props);
    let add = e ? e : props.address;
    add.selected = true;
    add.deliverCheck = e ? false : true;
    setSelectedAddress(add);
    setCreateEditFormData(add)
    addressData.map((address, i) => {
      console.log("address in loop", address);
      if (address.code !== add.code) {
        console.log(address.code !== add.code)
        address.selected = false;
      }
    });
    props.saved(add);
  };

  const BlueTooltip = withStyles({
    tooltip: {
      color: "#FFFFFF",
      backgroundColor: "#0E1B3DD3",
      fontFamily: "Dubai Light",
      fontWeight: 600,
      paddingLeft: '15px',
      paddingRight: '15px'
    },
    arrow: {
      "&:before": {
        borderStyle: "none"
      },
      color: "#0E1B3DD3",
    }
  })(Tooltip);

  const RenderEditIcon = () => {
    console.log("renderEditIcon addressCard ::", props);
    return (
      <>
        {props.editFlag === "true" &&
          <BlueTooltip title="Edit contact details" arrow placement="top-end" >
            <IconButton
              onClick={openPopup}
              address={createEditFormData}
              render={props.render}
            >
              <img src='./pencil_edit.svg' />
            </IconButton>
          </BlueTooltip>}
        {props.deleteFlag === "true" && <IconButton
          onClick={() => { setShowPopup2(ALERT_DIALOG); }}
          address={createEditFormData}
        >
          <img src='./delete.svg' height="16px" />
        </IconButton>}
      </>
    );
  };

  const RenderDivider = () => {
    // if (props.divider !== "") {
    return (
      <Link className={classes.dividerText} onClick={() => save()}>
        {props.divider}
      </Link>
    );
    // }
  };

  const RenderCard = () => {
    console.log("77777777777", props);
    console.log("8888888", selectedAddress);
    return (
      <>
        {createEditFormData.selected && <img src="./check-success.svg" height="35px" style={{ top: "-15px", left: '120px', position: 'relative' }} />}
        <Card className={createEditFormData.selected ? [classes.selected, classes.root] : classes.root}
          style={props.divider !== "" ? { borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px" } : {}}>
          <CardHeader style={{ padding: "0 0 0 0px" }}
            action={<RenderEditIcon address={createEditFormData} />}
            title={`${createEditFormData.addressNickname}`}
            classes={{
              title: classes.headerTitle
            }}
          />
          <Divider />
          <CardContent style={{ paddingLeft: "3px", paddingBottom: 0 }}>
            <InputLabel className={classes.dataText}>
              {createEditFormData.consigneeContactName}
            </InputLabel>
            <InputLabel className={classes.dataText}>
              {createEditFormData.selectedDropZoneLabel}
            </InputLabel>
            {/* <BlueTooltip title={createEditFormData.dropAddress} arrow placement="top-end"> */}
            <InputLabel className={classes.dataText}>
              {/* style={{overflow: 'ellipsis', whiteSpace: 'nowrap' }}  */}
              {/* {`${createEditFormData.dropAddress.substring(0, 20)}`}... */}
              {createEditFormData.dropAddress}
            </InputLabel>
            {/* </BlueTooltip> */}
            <InputLabel className={classes.dataText}>
              Mob: {createEditFormData.consigneeContactNumber}
            </InputLabel>
            <InputLabel className={classes.dataText} style={{ paddingBottom: 0 }}>
              Ph: {createEditFormData.phoneNumber}
            </InputLabel>
          </CardContent>
        </Card>
        {props.divider !== "" && <Card className={createEditFormData.selected ? [classes.dividerCardSelected, classes.dividerCard] : classes.dividerCard}>
          <RenderDivider />
        </Card>}

        {showPopup1 === OTHER_POPUP && (
          <CreateEditAddressPopup
            isopen={showPopup1 === OTHER_POPUP}
            action={action}
            createEditFormData={createEditFormData}
            onClose={(e) => {
              setShowPopup1(NO_DIALOG);
              setPstate(pstate + 1)
            }}
            onConfirm={(e) => {
              setShowPopup1(NO_DIALOG);
              setPstate(pstate + 1)
              save(e);
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
            console.log("ewerr", createEditFormData);
            AddressService.deleteAddress(createEditFormData.code)
              .then((response) => {
                console.log(
                  "response after deleting address",
                  response
                );
                setShowPopup2(NO_DIALOG);
                setPstate(pstate + 1)
                props.render();

              })
              .catch(() => {
                console.log("error");
              });
          }}
        />}
      </>)
  }

  return (
    <RenderCard selectedAddress={selectedAddress} />
  );
}
