import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  withStyles,
  createStyles,
  OutlinedInput,
  IconButton
} from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { MenuItem, Select } from "@material-ui/core";
import { InputLabel, Tooltip } from "@material-ui/core";
import debounce from "lodash/debounce";
import "bootstrap/dist/css/bootstrap.css";
import CreateEditAddressPopup from "../address/CreateEditAddressPopup";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import { AddCircle, ExpandMoreRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteContainerPopUp from "./DeleteContainerPopup";


const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#168FE4BC",
      color: "#686868",
      borderRadius: '4px',
      boxShadow: '0px 0px 5px #00000029',
    },
    "& .MuiInputBase-input": {
      fontFamily: 'Dubai Light',
      fontSize: '14px',
      fontWeight: 600,
    },
    "& .MuiOutlinedInput-input": {
      paddingLeft: '10px',
      paddingRight: '10px'
    }
  },
  focused: {},
  notchedOutline: {},
}));

const CustomMenuItem = withStyles((theme) => createStyles({
  root: {
    color: '#2B2B2B',
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: 'Dubai Light',
    padding: '8px 20px 8px 20px',
    "&$selected": {
      backgroundColor: "#1360D2",
      color: '#FFFFFF'
    }
  },
  selected: {

  }
})
)(MenuItem);

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      fontSize: '16px',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    body: {
      fontSize: '0.9rem',
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      borderBottom: '0px',
    },
  }),
)(TableCell);

const BlueTooltip = withStyles({
  tooltip: {
    color: "#FFFFFF",
    backgroundColor: "#0E1B3DD3",
    fontFamily: "Dubai Light",
    fontWeight: 600,
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  arrow: {
    "&:before": {
      borderStyle: "none"
    },
    color: "#0E1B3DD3",
  }
})(Tooltip);

const DeliverContainers = (props) => {
  const outlinedInputClasses = useOutlinedInputStyles();
  console.log("props value", props);
  const [addressOpt, setAddressOpt] = useState([]);
  const [showColumns, SetShowColumns] = useState(false);
  const [render, setRender] = useState(0);
  const [location, setLocation] = useState('');
  const [addressPopup, setAddressPopup] = useState({ showPopup: false, action: '' });
  const [containerTypeOpts, setContainerTypeOpts] = useState(props.containerOpts);
  const [showConfirm, setShowConfirm] = useState(false);
  const [consigneeState, setConsigneeState] = React.useState({
    debouncedNumber: "",
    debouncedName: ""
  });
  const deliverContainerForm = {
    addressOpt: [],
    vehicleTypeOpt: [],
  };

  const debouncedLog = React.useCallback(
    debounce((log) => {
      console.log('debounced log called')
      props.data.consigneeContactNumber = log;
      props.containers.consigneeContactNumber = props.data?.consigneeContactNumber;
     console.log(props.object((prev)=>{console.log(prev)});
      setRender(render + 1);
      
      // setConsigneeState(prevState => ({
      //   ...prevState,
      //   debouncedNumber: log
      // }));
    }, 1000),
    []
  );

  const debouncedName = React.useCallback(
    debounce((log) => {
      console.log('debounced name called')
      props.data.consigneeContactName = log;
      props.containers.consigneeContactName = props.data?.consigneeContactName;
      setRender(render + 1);

      // setConsigneeState(prevState => ({
      //   ...prevState,
      //   debouncedName: log
      // }));

    }, 500),
    []
  );

  const renderContainerTooltip = props => (
    <div style={{ minWidth: '340px', height: '200px', padding: '20px', fontSize: '14px' }}>
      <div className="row" style={{ marginBottom: '8px' }}>Container Number-{props.container_number}</div>
      <div className="row" style={{ marginBottom: '8px' }}>Consignee Name-{props.consigneeDetails.split("/")[0]}</div>
      <div className="row" style={{ marginBottom: '8px' }}>Storage Validity date -{props.storagePaidTill}</div>
      <div className="row" style={{ marginBottom: '8px' }}>Hold Authority -{props.holdAuthority}</div>
      <div className="row" style={{ marginBottom: '8px' }}>Declaration Number -{props.boeNumber}</div>
      <div className="row" style={{ marginBottom: '8px' }}>Container Weight -{props.containerWeight}</div>
      <div className="row" style={{ marginBottom: '8px' }}>Pickup Location -{props.pickupLocation}</div>
    </div>
  );


  const setConsigneeContactNumber = React.useCallback(({ target: { value: log } }) => {
    debouncedLog(log);
  }, []);

  const setConsigneeName = React.useCallback(({ target: { value: log } }) => {

    debouncedName(log);
  }, []);

  var container = {
    index: 0,
    container_number: "",
    iso_code: "",
    contact_person: "",
    contact_number: "",
    truck_type: "",
    date_time: "",
    location: "",
  };

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: deliverContainerForm,
  });

  useEffect(() => {
    if (consigneeState.debouncedName) {
      props.containers.consigneeContactName = consigneeState.debouncedName;
      props.data.consigneeContactName = consigneeState.debouncedName;
      //props.containers.consigneeContactName = props.data.consigneeContactName;
    }
    if (consigneeState.debouncedNumber) {
      props.containers.consigneeContactNumber = consigneeState.debouncedNumber;
      props.data.consigneeContactNumber = consigneeState.debouncedNumber;
      //props.containers.consigneeContactNumber = props.data.consigneeContactNumber;
    }
    console.log(" props.data.consigneeContactName", props.data?.consigneeContactName)
    console.log(" props.containers.consigneeContactName", props.containers.consigneeContactName)
    console.log("  props.containers.consigneeContactNumber", props.containers.consigneeContactNumber)
  }, [consigneeState])

  useEffect(() => {
    let opt = {
      label: "",
      value: "",
    };
    {
      props.addressData ? props.addressData.map((address, i) => {
        let opt = {
          label: address.dropAddress,
          value: address.code,
        };
        addressOpt.push(opt);
      }) : addressOpt.push([])
    }
    console.log("Address options ::", addressOpt);
    if (props.multiLocFlag === false && props.multiTimeFlag === false) {
      SetShowColumns(false);
    } else {
      SetShowColumns(true);
    }
  }, []);

  const RenderContactPerson = (props) => {
    // props.data?.length !== 0 && 
    if ((props.multiTimeFlag === true || !showColumns)) {
      props.containers.consigneeContactName = props.data?.consigneeContactName;
      props.containers.consigneeContactEmail = props.data?.consigneeContactEmail;
      props.containers.phoneNumber = props.data?.phoneNumber;
      props.containers.addressLine1 = props.data?.addressLine1;
      props.containers.addressCode = props.data?.code;
      props.containers.addressNickname = props.data?.addressNickname;
      props.containers.latLng = props.data?.latLng;
      if (props.data?.selectedDropZone != undefined)
        props.containers.dropZone = props.data?.selectedDropZone;
    }

    if (props.multiLocFlag === true) {
      return (
        <>
          <OutlinedInput
            style={{ height: "30px", width: "120px" }}
            classes={outlinedInputClasses}
            
            placeholder="Select Location"
            size="small"
            variant="outlined"
            defaultValue={props.containers.consigneeContactName}
            onChange={(e) => {
              props.containers.consigneeContactName = e.target.value;
            }}
          />
        </>
      );
    } else if (props.multiTimeFlag === true || !showColumns) {
      return (
        <>
          {props.index === 0 &&
            <OutlinedInput
              style={{ height: "30px", width: "120px" }}
              classes={outlinedInputClasses}
              size="small"
              variant="outlined"
            
              placeholder="Select Location"
              //defaultValue={consigneeState.debouncedName ? consigneeState.debouncedName : props.containers.consigneeContactName}
              defaultValue={props.containers.consigneeContactName}
              onChange={setConsigneeName}
            />}
          {props.index > 0 &&
            <InputLabel style={{ color: "#686868", paddingTop: "15px", paddingLeft: "10px" }}>
              {/* {consigneeState.debouncedName ? consigneeState.debouncedName : props.containers.consigneeContactName} */}
              {props.containers.consigneeContactName}

            </InputLabel>}
        </>
      );
    }
  };

  const RenderContainerType = (props) => {
    return (
      <>
        <Select
          value={props.containers.containerType == null ? 'none' : props.containers.containerType}
          style={props.containers.containerType == null ?
            { color: '#686868', height: "30px", minWidth: "130px", textTransform: "capitalize" } :
            { height: "30px", minWidth: "130px", textTransform: "capitalize" }}
          input={
            <OutlinedInput
              name="containerType"
              classes={outlinedInputClasses}
            />
          }
          IconComponent={ExpandMoreRounded}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: null,
          }}
          onChange={(e) => {
            setRender(render + 1);
            props.containers.containerType = e.target.value;
          }}
        >
          <MenuItem value={'none'} disabled style={{ fontSize: "14px", fontWeight: 600, fontFamily: 'Dubai Light' }}>
            Select Type
          </MenuItem>
          {containerTypeOpts.map((containerType, i) => {
            return (
              <CustomMenuItem
                style={{ textTransform: "capitalize" }}
                value={containerType.value}
                key={containerType.label}>
                {containerType.label.toLowerCase()}
              </CustomMenuItem>
            );
          })}
        </Select>
      </>
    );
  }

  const RenderLocation = (props) => {
    const updateDetails = (e) => {
      setRender(render + 1);
      if (e.target.value == 'add') {
        console.log(addressOpt)
        let formData = {
          consigneeContactName: "",
          consigneeContactNumber: "",
          phoneNumber: "",
          dropAddress: "",
          addressLine1: "",
          addressNickname: "",
          dropZone: "JAFZAN",
          latLng: ""
        };
        setAddressPopup({ data: formData, showPopup: true, action: 'ADD', cont: props.containers });
        // e.stopPropagation()
      } else {
        // setAddressOpt([]);
        setLocation(e.target.value);
        props.containers.locationCode = e.target.value;
        {
          addressOpt.map((address, i) => {
            if (address.value === e.target.value)
              props.containers.dropAddress = address.label;
          });
          props.addressData.map((address, i) => {
            if (props.containers.locationCode === address.code) {
              props.containers.consigneeContactName = address.consigneeContactName;
              props.containers.consigneeContactNumber =
                address.consigneeContactNumber;
              props.containers.consigneeContactEmail = address.consigneeContactEmail;
              props.containers.phoneNumber = address.phoneNumber;
              props.containers.addressLine1 = address.addressLine1;
              props.containers.addressCode = address.Code;
              props.containers.addressNickname = address.addressNickname;
              props.containers.dropZone = address.selectedDropZone;
              props.containers.latLng = address.latLng;
              setAddressPopup({ data: props.containers, showPopup: true, action: 'EDIT' });
            }
          });
        }
      }
    }

    console.log("Render Location:::", props);
    // if (props.containers.locationCode) {
    //   let opt = {
    //     label: props.containers.dropAddress,
    //     value: props.containers.locationCode,
    //   };
    //   addressOpt.push(opt);
    // }
    if (props.multiLocFlag === true) {
      return (
        <>
          <Select
            name="location"
            variant="outlined"
            style={{ height: "30px", maxWidth: "250px", minWidth: '130px', color: '#686868' }}
            value={props.containers.locationCode ? props.containers.locationCode : 'none'}
            id={props.containers.locationCode}
            IconComponent={ExpandMoreRounded}
            input={
              <OutlinedInput
                name="containerType"
                classes={outlinedInputClasses}
              />
            }
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              getContentAnchorEl: null,
            }}
            onChange={(e) => {
              updateDetails(e)
            }}
          >
            <MenuItem value={'none'} disabled style={{ fontSize: "14px", fontWeight: 600, fontFamily: 'Dubai Light' }}>
              Select Location
            </MenuItem>
            {addressOpt.map((addressOpt, i) => {
              return (
                <CustomMenuItem value={addressOpt.value} key={i}
                  style={{}}>
                  {(addressOpt.label.substring(0, 50) + "...")}
                </CustomMenuItem>
              );
            })}
            <CustomMenuItem value={'add'}
              style={{ color: '#168FE4', textAlign: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
              <AddCircle style={{ fill: '#168FE4', marginRight: '10px', fontSize: '20px' }} />
              <span style={{ textDecoration: 'underline' }}>Add New Address</span>
            </CustomMenuItem>
          </Select>
        </>
      );
    } else if (props.multiTimeFlag === true || !showColumns) {
      // if (props.data?.length !== 0) {
        props.containers.locationCode = props.data?.code;
        props.containers.dropAddress = props.data?.dropAddress;
        props.containers.phoneNumber = props.data?.phoneNumber;
        props.containers.addressNickname = props.data?.addressNickname;
        props.containers.addressLine1 = props.data?.addressLine1;
        props.containers.latLng = props.data?.latLng;
      // }
      return (
        <>
          <BlueTooltip title={props.containers.dropAddress} arrow disableFocusListener={!props.containers.dropAddress} disableHoverListener={!props.containers.dropAddress}>
            <div>
              <img src="./location.svg" height="16px" />
              <span style={{ color: "#686868", paddingTop: "15px", maxWidth: "250px", minWidth: '120px', whiteSpace: 'nowrap', fontSize: '14px', fontFamily: 'Dubai Light', fontWeight: 600, paddingLeft: '5px' }}>
                {props.containers.dropAddress ? (props.containers.dropAddress.substring(0, 35) + "...") : "Select Location From Above"}
              </span>
            </div>
          </BlueTooltip>
        </>
      );
    }
  };

  const RenderContactNumber = (props) => {
    if (props.multiLocFlag === true) {
      return (
        <>
          <OutlinedInput
            style={{ height: "30px", color: '#686868', width: "120px" }}
            classes={outlinedInputClasses}
           
            placeholder="Select Location"
            size="small"
            variant="outlined"
            defaultValue={props.containers.consigneeContactNumber}
            onChange={(e) => props.containers.consigneeContactNumber = e.target.value}
          />
        </>
      )
    } else if (props.multiTimeFlag === true || !showColumns) {
      // if (props.data?.length !== 0)
        props.containers.consigneeContactNumber = props.data?.consigneeContactNumber;
      if (props.index == 0) {
        return (
          <>
            <OutlinedInput
              style={{ height: "30px", width: "120px", color: '#686868' }}
              classes={outlinedInputClasses}
              size="small"
            
              placeholder="Select Location"
              variant="outlined"
              // defaultValue={consigneeState.debouncedNumber ? consigneeState.debouncedNumber : props.containers.consigneeContactNumber}
              defaultValue={props.containers.consigneeContactNumber}
              onChange={setConsigneeContactNumber}
            />
          </>
        );
      }
      else {
        return (
          <InputLabel
            style={{ color: "#686868", paddingLeft: "10px", fontFamily: 'Dubai Light', fontSize: '14px', fontWeight: 600 }}
          >
            {/* {consigneeState.debouncedNumber ? consigneeState.debouncedNumber : props.containers.consigneeContactNumber} */}
            {props.containers.consigneeContactNumber}
          </InputLabel>
        );
      }
    }
  }

  function randomColor() {
    let hex = Math.floor(Math.random() * 3);
    let color;
    if (hex == 0)
      color = "#FF7F7B";
    else if (hex == 1)
      color = "#828AF8";
    else
      color = "#FF7BEE";
    return color;
  }

  return (
    <>
      <FormProvider {...methods}>
        <form>
          <div style={{ borderRadius: '10px 10px 0px 0px', border: '1px solid #fff' }}>
            <Table aria-label="simple table" style={{ width: '100%' }}>
              <TableHead style={{ backgroundColor: '#696F83', color: '#FFFFFF' }}>
                <TableRow >
                  <StyledTableCell style={{ borderTopLeftRadius: '10px' }}> Container Number</StyledTableCell>
                  <StyledTableCell> Container Type </StyledTableCell>
                  <StyledTableCell> Contact Person </StyledTableCell>
                  <StyledTableCell> Mobile Number </StyledTableCell>
                  {showColumns && (
                    <>
                      <StyledTableCell> Drop Date </StyledTableCell>
                      <StyledTableCell> Drop Time </StyledTableCell>
                    </>
                  )}
                  <StyledTableCell> Location </StyledTableCell>
                  <StyledTableCell style={{ borderTopRightRadius: '10px' }}></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.containers.map((containers, inx) => (
                  <TableRow key={containers.container_number}>
                    <StyledTableCell>
                      <BlueTooltip arrow title={renderContainerTooltip(containers)}>
                        <div style={{
                          display: 'inline-flex',
                          boxSizing: 'inherit',
                          textAlign: 'center',
                          alignItems: 'center',
                          gap: '13px',
                          minWidth: '120px'
                        }}>
                          <Avatar style={{ height: '25px', width: '25px', padding: '14px', marginRight: '8px', fontFamily: 'Dubai Light', backgroundColor: randomColor(), fontSize: '14px' }} > {containers.consigneeDetails.split("/")[1]}</Avatar>
                          <InputLabel
                            style={{ color: "#0568AE", fontWeight: "bold", textDecoration: "underline", fontFamily: 'Dubai Light', paddingTop: '5px' }}
                          >
                            {containers.container_number + " - " + containers.iso_code}
                          </InputLabel>
                        </div>
                      </BlueTooltip>
                    </StyledTableCell>
                    <StyledTableCell>
                      <RenderContainerType
                        containers={containers}
                        index={inx}
                        data={props.data}
                      ></RenderContainerType>
                    </StyledTableCell>
                    <StyledTableCell>
                      <RenderContactPerson
                        containers={containers}
                        index={inx}
                        data={props.data}
                        multiTimeFlag={props.multiTimeFlag}
                        multiLocFlag={props.multiLocFlag}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <RenderContactNumber
                        containers={containers}
                        index={inx}
                        data={props.data}
                        multiTimeFlag={props.multiTimeFlag}
                        multiLocFlag={props.multiLocFlag}
                      />
                    </StyledTableCell>
                    {showColumns && (
                      <>
                        <StyledTableCell>
                          <ApplnDatePicker
                            name={"date"}
                            width={"120px"}
                            height={"33px"}
                            placeholder={"dd/mm/yyyy"}
                            iconColor="#1FA5FF"
                            disablePastDate={true}
                            value={containers.date}
                            onChange={(e) => {
                              containers.date = e;
                              console.log("date new " + containers.date);
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <OutlinedInput
                            style={{ height: "30px", maxWidth: "85px" }}
                            classes={outlinedInputClasses}
                            variant="outlined"
                            id="toTime"
                            type="time"
                            value={containers.time}
                            inputProps={{
                              size: "small",
                            }}
                            onChange={(event) => {
                              containers.time = event.target.value;
                              console.log("new time", containers.time);
                            }}
                          />
                        </StyledTableCell>
                      </>
                    )}
                    <StyledTableCell>
                      <RenderLocation
                        containers={containers}
                        data={props.data}
                        multiTimeFlag={props.multiTimeFlag}
                        multiLocFlag={props.multiLocFlag}
                        addressData={props.addressData}
                        render={props.render}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton onClick={() => setShowConfirm(true)}>
                        <img src="./delete.svg" />
                      </IconButton>
                    </StyledTableCell>
                    {showConfirm && (
                      <DeleteContainerPopUp
                        onClose={() => setShowConfirm(false)}
                        refresh={() => setRender(render + 1)}
                        admin={true}
                        message={'container from the booking?'}
                        onConfirm={(e) => {
                          setShowConfirm(false)
                          props.onDeleteClicked(containers.container_number)
                        }}
                      />
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </form>
      </FormProvider>

      {addressPopup.showPopup && (
        <CreateEditAddressPopup
          isopen={addressPopup.showPopup}
          action={addressPopup.action}
          createEditFormData={addressPopup.data}
          onClose={(e) => {
            setAddressPopup({ showPopup: false });
          }}
          onConfirm={(e) => {
            let opt = {
              label: e.dropAddress,
              value: e.code,
            };
            addressOpt.push(opt);
            addressPopup.cont.locationCode = e.code;
            // addressOpt.map((address, i) => {
            // if (address.value === e.code){
            addressPopup.cont.dropAddress = e.dropAddress;
            addressPopup.cont.consigneeContactName = e.consigneeContactName;
            addressPopup.cont.consigneeContactNumber = e.consigneeContactNumber;
            addressPopup.cont.consigneeContactEmail = e.consigneeContactEmail;
            addressPopup.cont.phoneNumber = e.phoneNumber;
            addressPopup.cont.addressLine1 = e.addressLine1;
            addressPopup.cont.addressCode = e.Code;
            addressPopup.cont.addressNickname = e.addressNickname;
            addressPopup.cont.dropZone = e.dropZone;
            addressPopup.cont.latLng = e.latLng;
            // } 
            // });
            setAddressPopup({ showPopup: false, cont: addressPopup.cont });
            setRender(render + 1)
          }}
        />
      )}
    </>
  );
};
export default DeliverContainers;
