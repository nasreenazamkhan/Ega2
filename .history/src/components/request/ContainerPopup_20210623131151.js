import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import {
  DialogActions,
  InputLabel,
  TableHead,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import * as endpointContants from "../../utils/ptmsEndpoints";
import { postHttp } from "../../lib/common/HttpService";
import Table from "@material-ui/core/Table";
import MapComponent from "../googlemap/Map";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "red",
  },
});

const useStyles = makeStyles({
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  table: {
    width: "200px",
  },

  label: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Medium",
    whiteSpace: "nowrap",
  },

  labelData: {
    fontSize: "16px",
    color: "#000000",
    fontFamily: "Dubai Regular",
    whiteSpace: "nowrap",
  },
  hrStyle: {
    width: "52px",
    marginLeft: "5px",
    background: "#FF5667",
    height: "2px",
    border: "0px",

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
  },
})(MuiTableCell);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    // <MuiDialogTitle disableTypography className={classes.root} {...other}>
    //   <Typography variant="h6">{children}</Typography>
    <>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
  // </MuiDialogTitle>
});

const DialogContent = withStyles(() => ({
  root: {
    textAlign: "center",
  },
}))(MuiDialogContent);

export default function ContainerPopup(props) {
  console.log("in container pop up ::", props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
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
      </DialogTitle>
      <DialogContent>
        <div class="row">
          <div class="col">
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{
                        color: "#434343",
                        fontSize: "19px",
                      }}
                    >
                      {props.containers.container_number}
                    </InputLabel>
                  </TableCell>
                </TableRow>
                <hr className={classes.hrStyle} />
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Consignee Name
                    </InputLabel>
                    <InputLabel>{props.containers.consigneeDetails}</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Storage Validity
                    </InputLabel>
                    <InputLabel>{props.containers.storagePaidTill}</InputLabel>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Hold Authority
                    </InputLabel>
                    <InputLabel>{props.containers.holdAuthority}</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Declaration Number
                    </InputLabel>
                    <InputLabel>{props.containers.boeNumber}</InputLabel>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Container Weight
                    </InputLabel>
                    <InputLabel>{props.containers.container_number}</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      DO Validity
                    </InputLabel>
                    <InputLabel>{props.containers.orderValidity}</InputLabel>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{
                        whiteSpace: "nowrap",
                        color: "#434343",
                        fontSize: "19px",
                      }}
                    >
                      Drop Details
                    </InputLabel>
                  </TableCell>
                </TableRow>
                <hr className={classes.hrStyle} />
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Pickup
                    </InputLabel>
                    <InputLabel>{props.containers.pickupLocation}</InputLabel>
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Drop date & time
                    </InputLabel>
                    <InputLabel>{props.containers.date_time}</InputLabel>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Drop Location
                    </InputLabel>
                    <InputLabel>{props.containers.dropAddress}</InputLabel>
                  </TableCell>
                </TableRow>
         
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Contact Person
                    </InputLabel>
                    {props.enableButton &&  props.containers.isActive === 1 && (
                      <TextField
                        variant="outlined"
                        size="small"
                        defaultValue={props.containers.consigneeContactName}
                        onChange={(event) => {
                          props.containers.consigneeContactName =
                            event.target.value;
                          console.log(
                            " props.containers.consigneeContactName ::",
                            props.containers.consigneeContactName
                          );
                        }}
                      ></TextField>
                    )}
                    {!props.enableButton || props.containers.isActive === 0 && (
                      <InputLabel>
                        {props.containers.consigneeContactName}
                      </InputLabel>
                    )}
                  </TableCell>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Phone Number
                    </InputLabel>
                    {props.enableButton  &&  props.containers.isActive === 1 && (
                      <TextField
                        variant="outlined"
                        size="small"
                        defaultValue={props.containers.consigneeContactNumber}
                        onChange={(event) => {
                          //  setSearchValue(event.target.value);
                        }}
                      ></TextField>
                    )}
                    {!props.enableButton || props.containers.isActive === 0 && (
                      <InputLabel>
                        {props.containers.consigneeContactNumber}
                      </InputLabel>
                    )}
                  </TableCell>
                </TableRow>
                { props.enableButton &&  props.containers.isActive === 1 && (
                  <TableRow>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          style={{
                            width: "84px",
                            height: "30px",
                            background: "#FAFAFA 0% 0% no-repeat padding-box",
                            boxShadow: "0px 0px 7px #00000029",
                            border: "2px solid #0568AE",
                            borderRadius: "8px",
                            opacity: 1,
                            color: "#0568AE",
                            marginLeft: "220px",
                          }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    
                      <Grid item xs={6}>
                        <Button
                          style={{
                            width: "83px",
                            height: "31px",
                            background:
                              "transparent linear-gradient(180deg, #1E84EA 0%, #2673CE 67%, #364F91 100%) 0% 0% no-repeat padding-box",
                            boxShadow: "0px 1px 4px #00000029",
                            borderRadius: "8px",
                            alignSelf: "right",
                            opacity: 1,
                            marginLeft: "200px",
                          }}
                          onClick={() => {
                            const remoteUrl = `${endpointContants.updateRequestContainer}`;

                            let obj = {
                              url: remoteUrl,
                              body: props.containers,
                            };
                            postHttp(obj, true)
                              .then((response) => {
                                props.onClose();
                                props.refresh();
                              })
                              .catch((error) => {});
                          }}
                        >
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  </TableRow>
                )}
                {props.containers.isActive === 0 && (
                  <>
                    {" "}
                    <hr></hr>
                    <TableRow>
                      <TableCell>
                        <InputLabel
                          style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                        >
                          Cancelled on
                        </InputLabel>
                        <InputLabel>{props.containers.cancelledOn}</InputLabel>
                      </TableCell>
                      <TableCell>
                        <InputLabel
                          style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                        >
                          Cancelled by
                        </InputLabel>
                        <InputLabel>{props.containers.cancelledBy}</InputLabel>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <InputLabel
                          style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                        >
                          Reason for cancellation
                        </InputLabel>
                        <InputLabel>
                          {props.containers.cancelRemarks}
                        </InputLabel>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </div>
          <div class="col">
            <MapComponent
              handleClick={(e) => {}}
              zone={props.containers.dropZoneCode}
              address={props.containers.dropAddress}
              latLng={props.containers.latLng}
            />
          </div>
        </div>
      </DialogContent>
      {/* <DialogActions >
        <Button>No</Button>
        <Button
          style={{ backgroundColor: "#0E1B3D" }}
          onClick={() => {
            const remoteUrl = `${endpointContants.cancelContainer}`;

            let obj = {
              url: remoteUrl,
              body: props.containers,
            };
            postHttp(obj, true)
              .then((response) => {
                props.onClose();
                props.refresh();
              })
              .catch((error) => {});
          }}
        >
          Yes
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}
