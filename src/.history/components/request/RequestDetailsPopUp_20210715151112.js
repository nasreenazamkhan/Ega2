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

export default function RequestDetailsPopUp(props) {
 
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
       

            <Table size="small">
              <TableBody>
                
                <hr className={classes.hrStyle} />
                <TableRow>
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#777777" }}
                    >
                     Requester Name
                    </InputLabel>
                    <InputLabel>{}</InputLabel>
                  </TableCell>
                  <TableCell>
                  <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#777777" }}
                    >
                      Requester Number
                    </InputLabel>
                    <InputLabel>{}</InputLabel>
                  </TableCell>
                  <TableCell>
                  <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#777777" }}
                    >
                    Booked On
                    </InputLabel>
                    <InputLabel>{}</InputLabel>
                  </TableCell>
                </TableRow>

                <TableRow>
                
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                    Company Name
                    </InputLabel>
                    <InputLabel>{}</InputLabel>
                  </TableCell>
             

             
                  <TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                     Importer Comments
                    </InputLabel>
                    <InputLabel>{}</InputLabel>
                  </TableCell>
                 
                </TableRow>
                </TableBody>
                </Table>

               
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
