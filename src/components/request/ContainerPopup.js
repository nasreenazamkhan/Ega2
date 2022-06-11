import React from "react";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, Button, TextField, Typography, DialogTitle, OutlinedInput } from "@material-ui/core";
import * as endpointContants from "../../utils/ptmsEndpoints";
import { postHttp } from "../../lib/common/HttpService";
import Table from "@material-ui/core/Table";
import MapComponent from "../googlemap/Map";
import Grid from "@material-ui/core/Grid";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";

const useStyles = makeStyles({
  buttonStyle: {
    width: "84px",
    height: "30px",
    boxShadow: "0px 0px 7px #00000029",
    borderRadius: '3px',
    opacity: 1,
    fontFamily: 'Dubai Light',
    fontWeight: 600, fontSize: '14px',
    marginRight: '10px'
  },
  cancelButton: {
    backgroundColor: "#FAFAFA",
    border: "2px solid #0E1B3D",
    color: "#0E1B3D",
  },
  updateButton: {
    backgroundColor: "#1360D2",
    alignSelf: "right",
  },
  textfield: {
    border: '1px solid #168FE4BC',
    borderRadius: '4px',
    fontWeight: 600,
    fontSize: '14px',
    paddingLeft: '5px',
    color: '#494949',
    '& .MuiInputBase-input': {
      fontFamily: 'Dubai Light',
    }
  }
});

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: "6.5px",
  },
})(MuiTableCell);

const StyledTableCell = withStyles((theme) =>
  createStyles({
    body: {
      borderBottom: "none",
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      fontSize: '15px',
    },
  }),
)(TableCell);

const DialogContent = withStyles(() => ({
  root: {
    textAlign: "center",
  },
}))(MuiDialogContent);

const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      fontWeight: 600,
      color: '#494949',
      fontSize: '13px',
      fontFamily:'Dubai Light'
    },
    "& .MuiOutlinedInput-input": {
      padding:'8px',
      marginTop:0
    },
    '& label.Mui-focused': {
      color: '#9A9A9A',
      fontWeight: 600,
      fontSize: '13px',
      fontFamily:'Dubai Light'
    },
    '& .MuiInputBase-input':{
      fontSize: '13px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
    },
    '& .MuiFormHelperText-root.Mui-error':{
      fontWeight: 600,
      fontFamily:'Dubai Light',
      fontSize: '13px',
      color:'#EA2428',
      marginLeft:0,
      marginRight:0,
      marginTop:0
    },
    '& label.Mui-focused.Mui-error': {
      color:'#EA2428'
    },
  },
})(TextField);

export default function ContainerPopup(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };

  const schema = Yup.object({
    consigneeContactName: Yup.string().required("Contact name is required"),
    consigneeContactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^[0-9]+$/,"Enter valid number")
    .matches(/^[971]/,"Number should start with 971")
    .min(11,(obj) => {return `Minimum length ${obj.min} digit`})
    .max(12, (obj) => {return `Max length ${obj.max} digit`}),
  });

  const confirmDetailsForm = {
    consigneeContactName: props.containers.consigneeContactName,
    consigneeContactNumber: props.containers.consigneeContactNumber
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: confirmDetailsForm,
  });

  const onUpdate = () => {
    if (methods.formState.isValid) {
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
      .catch((error) => { });
    }
  }


  return (

    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={methods.handleSubmit(onUpdate)}>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          onClose={handleClose}
          open={open}
        >
          <DialogContent style={{ padding: 0 }}>
            <div class="row" style={{ margin: 0, marginLeft: '15px' }}>
              <div class="col" style={{ maxWidth: "400px", padding: 0, paddingTop: '20px', paddingBottom: '20px' }}>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell colspan={2} style={{
                        backgroundColor: "#FFF",
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: '19px',
                        color: '#434343',
                      }}>
                        <IconButton
                          className="icon-button"
                          aria-label="close"
                          onClick={handleClose}
                          style={{ marginTop: '10px' }}
                        >
                          <CloseIcon style={{ fill: '#0E1B3D' }} />
                        </IconButton>
                        {props.containers.container_number} - {props.containers.iso_code}
                        <hr style={{ borderTop: '3px solid #FF3E3E', width: '52px', margin: 0 }} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Consignee Name
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.consigneeDetails ?? "--"}
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Storage Validity
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.storagePaidTill ?? "--"}
                        </Grid>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow >
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Hold Authority
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.holdAuthority ?? "--"}
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Declaration Number
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.boeNumber ?? "--"}
                        </Grid>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow >
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Container Weight
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.containerWeight ?? "--"}
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          DO Validity
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.orderValidity ?? "--"}
                        </Grid>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colspan={2} style={{
                        backgroundColor: "#FFF",
                        textAlign: "left",
                        fontWeight: 600,
                        fontSize: '19px',
                        color: '#434343',
                      }}>
                        Drop Details
                        <hr style={{ borderTop: '3px solid #FF3E3E', width: '52px', margin: 0 }} />
                      </TableCell>
                    </TableRow>
                    <TableRow >
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Pickup
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.pickupLocation ?? "--"}
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Drop date & time
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.date_time ?? "--"}
                        </Grid>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow >
                      <StyledTableCell colspan={2} >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Drop Location
                        </Grid>
                        <Grid item xs={12} style={{ color: "#494949" }}>
                          {props.containers.dropAddress ?? "--"}
                        </Grid>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Contact Person
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom:'20px' }}>
                          {props.enableButton && props.containers.isActive === 1 && (
                            <CssTextField
                              variant="outlined"
                              size="small"
                              name="consigneeContactName"
                              placeholder="Enter Name"
                              autoComplete="off"
                              inputProps={{
                                maxLength: 255,
                              }}
                              style={{ height: "30px", width: "171px" }}
                              inputRef={methods.register()}
                              error={methods.errors.consigneeContactName}
                              helperText={methods.errors.consigneeContactName?.message}
                              defaultValue={props.containers.consigneeContactName}
                              onChange={(event) => {
                                props.containers.consigneeContactName =
                                  event.target.value;
                              }}
                            />
                          )}
                          {(!props.enableButton || props.containers.isActive === 0) && (
                            <>{props.containers.consigneeContactName}</>
                          )}
                        </Grid>
                      </StyledTableCell>
                      <StyledTableCell >
                        <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                          Phone Number
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom:'20px' }}>
                          {props.enableButton && props.containers.isActive === 1 && (
                            <CssTextField
                              variant="outlined"
                              size="small"
                              name="consigneeContactNumber"
                              placeholder="Enter Number in 971xxxxxxxxx format"
                              inputRef={methods.register()}
                              style={{ height: "30px", width: "171px" }}
                              error={methods.errors.consigneeContactNumber}
                              helperText={methods.errors.consigneeContactNumber?.message}
                              defaultValue={props.containers.consigneeContactNumber}
                              onChange={(event) => {
                                props.containers.consigneeContactNumber = event.target.value;
                              }}
                            />
                          )}
                          {(!props.enableButton || props.containers.isActive === 0) && (
                            <>{props.containers.consigneeContactNumber}</>
                          )}
                        </Grid>
                      </StyledTableCell>
                    </TableRow>
                    {props.enableButton && props.containers.isActive === 1 && (
                      <TableRow>
                        <TableCell colspan={2}>
                          <Grid item xs={12} style={{ textAlign: 'end' }}>
                            <Button
                              className={[classes.buttonStyle, classes.cancelButton]}
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className={[classes.buttonStyle, classes.updateButton]}
                              onClick={methods.handleSubmit(onUpdate)}
                            >
                              Update
                            </Button>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )}
                    {props.containers.isActive === 0 && (
                      <>
                        {" "}
                        <hr />
                        <TableRow >
                          <StyledTableCell >
                            <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                              Cancelled on
                            </Grid>
                            <Grid item xs={12} style={{ color: "#494949" }}>
                              {props.containers.cancelledOn ?? "--"}
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell >
                            <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                              Cancelled by
                            </Grid>
                            <Grid item xs={12} style={{ color: "#494949" }}>
                              {props.containers.cancelledBy ?? "--"}
                            </Grid>
                          </StyledTableCell>
                        </TableRow>
                        <TableRow >
                          <StyledTableCell colspan={2} >
                            <Grid item xs={12} style={{ color: "#9A9A9A" }}>
                              Reason for cancellation
                            </Grid>
                            <Grid item xs={12} style={{ color: "#494949" }}>
                              {props.containers.cancelRemarks ?? "--"}
                            </Grid>
                          </StyledTableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div class="col" style={{ paddingRight: 0 }}>
                <MapComponent
                  handleClick={(e) => { }}
                  zone={props.containers.dropZoneCode}
                  address={props.containers.dropAddress}
                  latLng={props.containers.latLng ? JSON.parse(props.containers.latLng) : ''}
                  handleError={(e) => { }}
                  action={"VIEW"}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </FormProvider>
  );
}
