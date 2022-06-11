import React, { useState } from "react";
import {
  Dialog,
  Table,
  TableBody,
  TableRow,
  InputLabel,
  IconButton,

  TableCell,
  withStyles,
  
 
  makeStyles,
} from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiTableCell from "@material-ui/core/TableCell";
import CloseIcon from "@material-ui/icons/Close";

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

export default function TruckReadOnlyPopUp(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </>
    );
  });

  const DialogContent = withStyles(() => ({
    root: {
      textAlign: "center",
      overflowY: "unset",
    },
  }))(MuiDialogContent);

  const handleClose = () => {
    console.log("handleClose");
    setOpen(false);
    props.onClose();
  };

  const TableCell = withStyles({
    root: {
      borderBottom: "none",

      padding: "6.5px",
    },
  })(MuiTableCell);

  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}   PaperProps={{
        style: { borderRadius: '0px', width: '800px' }
      }}>
      <DialogTitle
        style={{
          backgroundColor: "#FFF",
          color: "black",
          textAlign: "left",
        }}
        onClose={handleClose}
      ></DialogTitle>
      <DialogContent>
        <Table >
          <TableBody>
            <TableRow>
              <TableCell>
                <InputLabel
                  style={{
                    color: "#434343",
                    fontSize: "19px",
                  }}
                >
                  Truck Details
                </InputLabel>
                <hr className={classes.hrStyle} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell >
                <InputLabel style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}>
                  Transporter name
                </InputLabel>
                <InputLabel>
                  {props.tokenType === "FCL_OUT"
                    ? props.containers.transporterCode +
                      " - " +
                      props.containers.transporterName
                    : props.containers.mtTransporterCode +
                      " - " +
                      props.containers.mtTransporterName}
                </InputLabel>
              </TableCell>
              <TableCell>
                <InputLabel style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}>
                  Truck Number
                </InputLabel>
                <InputLabel>
                  {props.tokenType === "FCL_OUT"
                    ? props.containers.assignedTruck
                    : props.containers.mtTruck}
                </InputLabel>
              </TableCell>
              <TableCell>
                <InputLabel style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}>
                  Assigned On
                </InputLabel>
                <InputLabel>
                  {props.tokenType === "FCL_OUT"
                    ? props.containers.truckAssignedOn
                    : props.containers.mtTruckAssignedOn}
                </InputLabel>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
