import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
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
  Button,
  TextField,
  Tooltip
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Link from "@material-ui/core/Link";
import RequestContainerService from "../../service/RequestContainerService";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";


// const requestOptions = [
//   { label: "Request Now", value: "NOW" },
//   { label: "Request Later", value: "LATER" },
// ];

const schema = Yup.object().shape({
  driverName: Yup.string().required("Driver name is required")
 
});

const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      color: '#0E1B3D',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
      top: '-10px',
      fontSize: '14px'
    },
    '& .MuiOutlinedInput-input': {
      padding: '8px',
      fontSize: '14px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
    },
    '& label.Mui-focused': {
      color: '#0E1B3D',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#168FE4BC',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
      '&:hover fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#168FE4BC',
        boxShadow: '0px 0px 5px #00000029',
        borderWidth: '1.5px'
      },
    },
  },
})(TextField);

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

const TableCell = withStyles({
  root: {
    borderBottom: "none",

    padding: "6.5px",
  },
})(MuiTableCell);

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

const DialogContent = withStyles(() => ({
  root: {
    textAlign: "center",
    overflowY: "unset"
  },
}))(MuiDialogContent);


const DialogActions = withStyles(() => ({
  root: {
    padding: "8px 44px"
  },
}))(MuiDialogAcions);

export default function TrucknTokenDetailsPopup(props) {
  console.log("start job props", props);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [formvalues, setFormvalues] = useState({
    driverName: props.containers.driverName ? props.containers.driverName : "",
    driverContactNo: props.containers.driverContactNo ? props.containers.driverContactNo : ""
  });
  const [disable, setDisable] = useState("disabled");
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: formvalues,
  });


  const handleClose = () => {
    console.log("handleClose");
    setOpen(false);
    props.onClose();

  };
  const onEtokenDownload = (jobRefNo, containerNumber, tokenType) => {
    RequestContainerService.fetchEtoken(jobRefNo, containerNumber, tokenType)
      .then((response) => {
        if (response.isAxiosError) throw new Error(response.status);
        else {

          const linkSource = `data:${response.data.dataItems[0].filetype};base64,${response.data.dataItems[0].fileContent}`;
          const downloadLink = document.createElement("a");

          downloadLink.href = linkSource;
          downloadLink.download = response.data.dataItems[0].fileName;
          downloadLink.target = "_blank";
          // alert(downloadLink);
          downloadLink.click();
        }
      })

      .catch(() => {
        console.log("error");
      });
  }

  return (
    <FormProvider {...methods}>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        open={open}
      >
        <DialogTitle
          style={{
            backgroundColor: "#FFF",
            color: "black",
            textAlign: "left",
          }}
          onClose={handleClose}
        >

        </DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>
                  <InputLabel
                    style={{
                      color: "#434343",
                      fontSize: "19px",
                      paddingTop:'20px'
                    }}
                  >
                    Token Details
                  </InputLabel>
                  <hr className={classes.hrStyle} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel
                    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                  >
                    Token Number
                  </InputLabel>
                  <InputLabel>{(props.tokenType === 'FCL_OUT') ? props.containers.tokenOut : props.containers.tokenIn}</InputLabel>

                </TableCell>
                <TableCell>
                  <InputLabel
                    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                  >
                    Token Date
                  </InputLabel>
                  <InputLabel>{(props.tokenType === 'FCL_OUT') ? props.containers.tokenOutDate : props.containers.tokenInDate}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel
                    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                  >
                    Time Slot
                  </InputLabel>
                  <InputLabel>{(props.tokenType === 'FCL_OUT') ?
                    (props.containers.tokenOutSlotFrom + " - " + props.containers.tokenOutSlotTo)
                    : (props.containers.tokenInSlotFrom + " - " + props.containers.tokenInSlotTo)}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel
                    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                  >
                    Admin Comments
                  </InputLabel>
                  <Tooltip title={(props.tokenType === 'FCL_OUT') ? props.containers.tokenOutAdminComment : props.containers.tokenInAdminComment} arrow>
                    <InputLabel style={{ whiteSpace: 'nowrap' }}>
                      {(props.tokenType === 'FCL_OUT') ?
                        props.containers.tokenOutAdminComment
                          ? (props.containers.tokenOutAdminComment.substring(0, 16) + "...") : "\u00A0"
                        :
                        props.containers.tokenInAdminComment
                          ? (props.containers.tokenInAdminComment.substring(0, 16) + "...") : "\u00A0"
                      }
                    </InputLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                {props.tokenType === 'FCL_OUT' &&
                  <><TableCell>
                    <InputLabel
                      style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                    >
                      Driver Name
                    </InputLabel>
                    {props.containers.refStatus.code === "CONF" &&
                      <CssTextField
                        placeholder="Enter Driver Name"
                        variant="outlined"
                        style={{ width: '150px' }}
                        inputRef={methods.register()}
                        error={
                          methods.errors?.driverName ? true : false
                        }
                        helperText={
                          methods.errors?.driverName?.message
                            ? methods.errors.driverName.message
                            : ""
                        }
                      
                        name="driverName" onChange={(e) => {
                         // formvalues.driverName = e.target.value;
                          if (formvalues.driverContactNo.length > 0 && formvalues.driverName.length > 0)
                            setDisable('');
                        }}
                         />}
                    {/* {(props.containers.refStatus.code === "INPRO" || props.containers.refStatus.code === "PODUPL"|| props.containers.refStatus.code === "PMTTOK"
                      || props.containers.refStatus.code === "PODIMPAPPR" || props.containers.refStatus.code === "PODREJ"||props.containers.refStatus.code === "FCL_DEL") && */}
                    {props.containers.refStatus.code !== "CONF" && props.tokenType === 'FCL_OUT' &&
                      <InputLabel>{props.containers?.driverNumber}</InputLabel>}

                  </TableCell><TableCell>
                      <InputLabel
                        style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                      >
                        Driver Number
                      </InputLabel>
                      {props.containers.refStatus.code === "CONF" &&
                        <CssTextField
                          placeholder="Enter Driver Number"
                          name="driverContactNo"
                          variant="outlined"
                          style={{ width: '150px' }} onChange={(e) => {
                            formvalues.driverContactNo = e.target.value;
                            if (formvalues.driverName.length > 0 && formvalues.driverContactNo.length > 0)
                              setDisable('');
                          }} />}

                      {props.containers.refStatus.code !== "CONF" && props.tokenType === 'FCL_OUT' &&
                        <InputLabel>{props.containers?.driverNumber}</InputLabel>}
                    </TableCell></>
                }
                <TableCell colSpan={(props.tokenType === 'FCL_OUT') ? 2 : 4}>
                  <InputLabel
                    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                  >
                    {'\u00A0'}
                  </InputLabel>
                  <InputLabel>
                    <img src="./download_doc.svg" onClick={() => onEtokenDownload(props.bookingNumber,
                      props.containers.container_number, props.tokenType)} />{'\u00A0'}
                    <Link onClick={() => onEtokenDownload(props.bookingNumber, props.containers.container_number, props.tokenType)}>
                      Download e-token</Link>
                  </InputLabel>
                </TableCell>
              </TableRow>
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
                    {(props.tokenType === 'FCL_OUT') ?
                      props.containers.transporterCode + " - " + props.containers.transporterName
                      : props.containers.mtTransporterCode + " - " + props.containers.mtTransporterName
                    }</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel
                    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                  >
                    Truck Number
                  </InputLabel>
                  <InputLabel>{(props.tokenType === 'FCL_OUT') ? props.containers.assignedTruck : props.containers.mtTruck}</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel
                    style={{ whiteSpace: "nowrap", color: "#9A9A9A" }}
                  >
                    Assigned On
                  </InputLabel>
                  <InputLabel>{(props.tokenType === 'FCL_OUT') ? props.containers.truckAssignedOn : props.containers.mtTruckAssignedOn}</InputLabel>
                </TableCell>
              </TableRow>


            </TableBody>
          </Table>

        </DialogContent>
        {(props.containers.refStatus.code === "CONF") &&
          <DialogActions>
            {/* <Link
              onClick={() => {
                props.onClose();
              }}
            >
              Cancel
            </Link> */}

            <Button
              disabled={disable}
              onClick={() => {
                var value = {
                  requestDetailsNumber: props.bookingNumber,
                  container_number: props.containers.container_number,
                  driverName: formvalues.driverName,
                  driverNumber: formvalues.driverContactNo
                }
                RequestContainerService.start(value)
                  .then((response) => {
                    props.onClose(response);
                  }).catch(() => {
                    console.log("error");
                  });
              }}
            >
              Start
            </Button>
          </DialogActions>}
      </Dialog>
    </FormProvider>
  );
}
