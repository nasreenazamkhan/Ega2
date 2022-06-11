import React, { useState } from "react";
import { Dialog,Table,TableBody,TableRow,InputLabel,IconButton
    ,CloseIcon,TableCell,withStyles} from "@material-ui/core";




export default function TruckReadOnlyPopUp(props) {

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
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
      });

      const handleClose = () => {
        console.log("handleClose");
        setOpen(false);
        props.onClose();
       
      };

      return (
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
    Truck Details
  </InputLabel>
  <hr className={classes.hrStyle} />
</TableCell>
</TableRow>
<TableRow>
<TableCell colSpan={2}>
  <InputLabel
    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
  >
    Transporter name
  </InputLabel>
  <InputLabel>
  {(props.tokenType==='FCL_OUT')?
    props.containers.transporterCode+" - "+props.containers.transporterName
    : props.containers.mtTransporterCode+" - "+props.containers.mtTransporterName
  }</InputLabel>
</TableCell>
<TableCell>
<InputLabel
    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
  >
    Truck Number
  </InputLabel>
  <InputLabel>{(props.tokenType==='FCL_OUT')?props.containers.assignedTruck:props.containers.mtTruck}</InputLabel>
</TableCell>
<TableCell>
<InputLabel
    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
  >
    Assigned On
  </InputLabel>
  <InputLabel>{(props.tokenType==='FCL_OUT')?props.containers.truckAssignedOn:props.containers.mtTruckAssignedOn}</InputLabel>
</TableCell>
</TableRow>


</TableBody>
</Table>


      )


}



