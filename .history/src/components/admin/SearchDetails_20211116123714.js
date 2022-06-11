import {
    Paper, Table, Button, TableCell, TableBody, TableRow, IconButton, makeStyles, Box, withStyles, createStyles, Grid, Link,
    InputBase, FormControl, Select, MenuItem, InputAdornment, FormHelperText, Typography, InputLabel,TextField
} from "@material-ui/core";
import BookingService from '../../service/BookingService';
import TransporterService from '../../service/TransporterService';
import React, { useState, useEffect } from "react";
import { ArrowBackIosRounded, CheckCircleRounded, EditRounded } from "@material-ui/icons";
import CommonService from "../../service/CommonService";
import ApplnDatePicker from "./../../lib/components/datepicker/ApplnDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import ContainerCard from "../../lib/components/appComponent/ContainerCard";
import CreateEditAddressPopup from "./../address/CreateEditAddressPopup";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import PaymentBreakupPopUp from "../request/PaymentBreakupPopup";
import RequestBoeService from "../../service/RequestBoeService";
import DeleteContainerPopUp from "../request/DeleteContainerPopup";
import moment from "moment";
import { useHistory } from "react-router-dom";
import * as endpointContants from '../../utils/ptmsEndpoints';
import CustomizedDataTable from "../../lib/components/table/CustomizedDataTable";
import { COLUMN_TYPE_STRING, COLUMN_TYPE_NUMBER, } from "../../lib/common/Constants";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";


// const requestOptions = [
//   { label: "Request Now", value: "NOW" },
//   { label: "Request Later", value: "LATER" },
// ];



const useStyles = makeStyles((theme) => ({
    boxOnTable: {
        left: '22px',
        top: '55px',
        padding: '0',
        paddingTop: '12px',
        width: '48px',
        height: '58px',
        backgroundColor: '#003754',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        marginBottom: '10px',
        verticalAlign: 'middle',
        fontSize: '1.5rem',
        border: '1px solid #335363',
        fontFamily: 'Dubai Light',
    },
    boxOnPaper: {
        width: '55px',
        height: '55px',
        backgroundColor: '#003754',
        color: '#FFFFFF',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '1.5rem',
        border: '1px solid #335363',
        fontFamily: 'Dubai Light',
    },
    serviceBox: {
        padding: '10px',
        paddingLeft: '15px',
        paddingTop: '12px',
        borderRadius: '16px',
        boxShadow: '0px 3px 6px #00000029',
        border: '1px solid #E2E2E2',
        color: '#464646',
        fontFamily: 'Dubai Light',
        fontWeight: 600,
    },
    statusBox: {
        fontSize: '0.6rem',
        color: '#fff',
        borderRadius: '22px',
        padding: '2px',
        paddingLeft: '23px',
        paddingRight: '23px',
        fontFamily: 'Dubai Light',
        marginLeft: '20px',
        display: 'inline-flex',
        verticalAlign: 'middle',
    },
    paper: {
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '5px',
        width: '100%',
        fontWeight: 600,
        padding: '30px',
        paddingTop: '10px',
        color: '#292929',
        marginTop: '30px',
        height: '100%',
        overflowY: 'auto',
    },
    containerRow: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        borderBottom: 'none',
        paddingTop: '30px',
        paddingBottom: '20px',
        paddingLeft: '60px',
        textTransform: 'uppercase'
    },
    icon: {
        fontSize: '1rem',
        display: 'inline-flex',
        verticalAlign: 'middle',
        fill: "#FF6464"
    },
    icon2: {
        zoom: 0.7,
        display: 'inline-flex',
        verticalAlign: 'middle',
        marginRight: '10px'
    },
    margin: {
        margin: theme.spacing(0),
    },
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em',
            display: 'block'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
            background: 'transparent'
        },
        '*::-webkit-scrollbar-thumb': {
            background: '#727272 0% 0% no-repeat padding-box',
            borderRadius: '10px',
            outline: '1px solid slategrey',
            maxHeight: '50px'
        },
    },
    multiLocCol: {
        borderLeft: '2px solid #848484',
        borderBottom: 'none',
        fontSize: '0.9rem',
        padding: '5px',
        paddingLeft: '20px',
        fontFamily: 'Dubai Light',
        fontWeight: 600,
        color: '#848484',
        width: '160px'
    },
    InputRoot: {
        '&::-webkit-calendar-picker-indicator': {
            display: 'none',
            '-webkit-appearance': 'none'
        }
    }
}));

const StyledTableCell = withStyles(() =>
    createStyles({
        head: {
            borderBottom: 'none',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            padding: '5px',
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            color: '#848484',
            width: '160px'
        },
        body: {
            fontSize: '0.9rem',
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            color: '#434343',
            borderBottom: '0px',
            padding: '5px',
        },
    }),
)(TableCell);

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(1),
        },
    },
    input: {
        boxShadow: '0px 0px 5px #00000029',
        border: '1.5px solid #168FE4BC',
        borderRadius: '4px',
        position: 'relative',
        fontSize: '0.8rem',
        fontWeight: 600,
        padding: '2px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: 'Dubai Regular',
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
     
    },
}))(InputBase);

const StyledButton1 = withStyles(() =>
    createStyles({
        root: {
            width: "120px",
            height: "39px",
            backgroundColor: "#1360D2",
            boxShadow: "0px 1px 4px #00000029",
            border: "1px solid #1360D2",
            borderRadius: "3px",
            alignSelf: "right",
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            fontSize: '0.8rem',
            color: '#FFFFFF',
            '&:hover': {
                color: '#1360D2',
              }
        },
    })
)(Button);

const StyledButton3 = withStyles(() =>
    createStyles({
        root: {
            width: "120px",
            height: "39px",
            color: '#fff',
            backgroundColor: '#FF6464',
            boxShadow: "0px 1px 4px #00000029",
            borderRadius: "3px",
            border: "1px solid #FF6464",
            alignSelf: "right",
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            fontSize: '0.8rem',
            marginRight: '10px',
            '&:hover': {
                color: '#FF6464',
              }
        },
    })
)(Button);

const StyledButton2 = withStyles(() =>
    createStyles({
        root: {
            width: "140px",
            height: "39px",
            backgroundColor: "#1360D2",
            boxShadow: "0px 1px 4px #00000029",
            borderRadius: "3px",
            opacity: 1,
            alignSelf: "right",
            fontFamily: 'Dubai Light',
            border: "1px solid #1360D2",
            fontWeight: 600,
            fontSize: '0.8rem',
            marginRight: '10px',
            marginLeft: '10px',
            color: '#FFFFFF',
            '&:hover': {
                color: '#1360D2',
              }
        },
    })
)(Button);

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

const intervalOpts = [
    { label: "No Interval", value: "0 min" || null },
    { label: "30 min", value: "30 min" },
    { label: "1 hr", value: "1hr" },
    { label: "2 hr", value: "2hr" },
    { label: "3 hr", value: "3hr" },
    { label: "4 hr", value: "4hr" },
];

const truckNumberOpts = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
]

let createEditFormData = {
    consigneeContactName: "",
    consigneeContactNumber: "",
    dropAddress: "",
    code: "",
    addressNickname: "",
    phoneNumber: "",
    addressLine1: "",
    dropZone: ""
};

export default function SearchDetails(props) {
    const classes = useStyles();
    const [data, setData] = useState();
    const [inputType, setInputType] = useState(props?.search?.serviceType);
    const [searchValue, setSearchValue] = useState(props?.search?.serviceNumber);
    const [transporterNameOpts, setTransporterNameOpts] = useState([]);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [formvalues, setFormvalues] = useState({
        noOfTrucks: '',
        transporterName: '',
        timeInterval: '',
        dropDate: '',
        dropTime: '',
    });
    const [showPopup, setShowPopup] = useState(NO_DIALOG);
    const [action, setAction] = useState("");
    const [pstate, setPstate] = useState(0);
    const [paymentBreakupPopup, setPaymentBreakupPopup] = useState(false);
    const [containerTypeOpts, setContainerTypeOpts] = useState([]);
    const [noDataFound, showNoDataFound] = useState(false);

    let history = useHistory();

    useEffect(() => {
        fetchOnBoardedTransporters()
        fetchContainerTypes()
    }, []);

    useEffect(() => {
        if (inputType === "booking") {
            doSearch(searchValue, inputType)
        }
    }, [pstate]);

    const fetchContainerTypes = async () => {
        let res = await RequestBoeService.fetchContainerTypes();
        console.log('fetchContainerTypes', res.status, res)
        if (res) {
            console.log('fetchContainerTypes', res)
            await setContainerTypeOpts(res)
        }
    }



    const validationSchema = Yup.object().shape({
        noOfTrucks: Yup.string().required('Trucks Required'),
        dropDate: Yup.string().required('Date Required'),
        // description: Yup.string(),
        // daysOfWeek: Yup.array()
        //   .of(
        //     Yup.object().shape({
        //       dayOfWeek: Yup.string(),
        //       checked: Yup.boolean(),
        //     })
        //   )
        //   .required('Required'),
        // taskSchedules: Yup.array(),
      })

      const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onSubmit",
        reValidateMode: "onSubmit"
        //defaultValues: formvalues,
    });

    const fetchOnBoardedTransporters = async () => {
        let res = await TransporterService.fetchOnBoardedTransporters();
        console.log('fetchOnBoardedTransporters', res.status, res)
        if (res) {
            console.log('fetchOnBoardedTransporters', res)
            await setTransporterNameOpts(res)
        }
    }

    const doSearch = (value, type) => {
        BookingService.getBookingByNumber(value, true).then((res) => {
            if (res && res?.status === "success") {
                setData(res?.data?.dataItems[0])
                let date = moment((res?.data?.dataItems[0].dropDateTime), "DD/MM/YYYY HH:mm").format(
                    "DD/MM/YYYY");
                let time = moment((res?.data?.dataItems[0].dropDateTime), "DD/MM/YYYY HH:mm").format(
                    "HH:mm");
                console.log("date time", date, time)
                const form = {
                    noOfTrucks: res?.data?.dataItems[0].truckNumber,
                    transporterName: res?.data?.dataItems[0].assignedTransporterCode,
                    timeInterval: res?.data?.dataItems[0].dropInterval,
                    dropDate: date,
                    dropTime: time
                }
                setFormvalues(form)
            } else {
                showNoDataFound(true)
            }
        })
    }

    const downloadTaxReceipt = () => {
        CommonService.downloadInvoice(searchValue);
    };

    const downloadBookingReceipt = () => {
        CommonService.downloadReceipt(searchValue);
    };

    const cancelRequest = async (remarks) => {
        const body = {
            referenceNumber: data?.referenceNumber,
            cancelRemarks: remarks,
        }
        let res = await RequestBoeService.cancelRequestByAdmin(body);
        console.log('cancelRequestByAdmin', res.status, res)
        if (res && res.status == 'success') {
            console.log("success")
            setOpenDeletePopup(false)
            setPstate(prev => prev+1)
        }
    }

    const updateRequest = async () => {
        console.log(formvalues);
        let date = moment((formvalues.dropDate + " " + formvalues.dropTime), "DD/MM/YYYY HH:mm").format(
            "DD/MM/YYYY HH:mm");
        data.truckNumber = formvalues.noOfTrucks;
        data.assignedTransporterCode = formvalues.transporterName;
        data.dropInterval = formvalues.timeInterval;
        data.dropDateTime = date;
        console.log(data);
        let res = await RequestBoeService.updateRequestByAdmin(data);
        console.log('updateRequestByAdmin', res.status, res)
        if (res && res.status == 'success') {
            console.log("success")
            setOpenDeletePopup(false)
        }
    }

    const refresh = () => {
        console.log("refresh called :::");
        setPstate(pstate + 1);
    };

    const back = () => {
        if (props?.search?.serviceType == 'booking')
            props.onBack();
        else if (props?.search?.serviceType == 'container')
            setInputType('container');
        else if (props?.search?.serviceType == 'haulier')
            setInputType('haulier');
        else if (props?.search?.serviceType == 'declaration')
            setInputType('declaration');
    }

    
  const onSubmit = (data) => {
    console.log("data is", data);
   
  }
  
  

  console.log("errors",methods.errors);
  console.log("formValues",formvalues);
  console.log("formValues2",methods.getValues());

    function BookingSearch() {
        return (
            <>
                {data && 
                    <FormProvider {...methods}>
                        <form  onSubmit={methods.handleSubmit(onSubmit)}>
                            <Paper className={classes.paper} >
                                <Grid container spacing={1}>
                                    <Grid item xs={1}>
                                        <Box className={classes.boxOnPaper}>
                                            <IconButton onClick={back}>
                                                <ArrowBackIosRounded style={{ fill: '#fff', stroke: '#fff', strokeWidth: '1px' }} />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={["CNCL", "MT_DEL", "EXP", "FPAY", "PPAY"].indexOf(data?.refStatus?.code) == -1 ? 5 : 8} style={{ fontSize: '1.3rem', justifyItems: 'center', alignItems: 'center', fontWeight: 600 }}>
                                        <div direction="row" >
                                            {data?.referenceNumber}
                                            <Box
                                                style={
                                                    data?.refStatus?.code == 'TRANSCONF' || data?.refStatus?.code == 'MT_DEL' ?
                                                        { backgroundColor: "#63BB7A", border: '1px solid #63BB7A' } :
                                                        data?.refStatus?.code == 'CNCL' || data?.refStatus?.code == 'EXP' || data?.refStatus?.code == 'FPAY' ?
                                                            { backgroundColor: "#EA2428", border: '1px solid #EA2428' } :
                                                            { backgroundColor: "#EB9743", border: '1px solid #EB9743' }}
                                                className={classes.statusBox}>
                                                {data?.refStatus?.refStatusLocales?.name}
                                            </Box>
                                        </div>
                                        {data?.refStatus?.code == 'SUCC' && <div direction="row" align="left" colSpan={6} style={{
                                            paddingRight: 0, color: '#63BB7A', fontFamily: 'Dubai Regular',
                                            fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none'
                                        }}>
                                            <CheckCircleRounded style={{ fill: '#0AA06E', fontSize: '1rem' }} /> Payment Successful
                                        </div>}
                                        {['SUCC', 'TRANSCONF'].includes(data?.refStatus?.code) && <div direction="row" align="left" colSpan={6} style={{
                                            paddingRight: 0, color: '#DF1D1D', fontFamily: 'Dubai Regular',
                                            fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none'
                                        }}>
                                            <img src="./information-button.svg" className={classes.icon2} /> Expires in {data?.expiryIn}
                                        </div>}
                                    </Grid>
                                    {openDeletePopup && (
                                        <DeleteContainerPopUp
                                            onClose={() => setOpenDeletePopup(false)}
                                            onConfirm={(e) => cancelRequest(e)}
                                            refresh={refresh}
                                            admin={true}
                                            message={'booking?'}
                                        />
                                    )}
                                    <Grid item xs={["CNCL", "MT_DEL", "EXP", "FPAY", "PPAY"].indexOf(data?.refStatus?.code) == -1 ? 6 : 3} style={{ justifyItems: 'center', alignItems: 'center', display: 'flex' }}>
                                        {["CNCL", "MT_DEL", "EXP"].indexOf(data?.refStatus?.code) == -1 &&
                                            <StyledButton3 onClick={() => setOpenDeletePopup(true)}>
                                                Cancel
                                            </StyledButton3>}
                                        {["FPAY", "PPAY", "CNCL"].indexOf(data?.refStatus?.code) == -1 && <><StyledButton1 onClick={() => downloadTaxReceipt()}>
                                            <img src="./doc_download.svg" />
                                            <span style={{ paddingLeft: '5px' }}>Tax Receipt</span>
                                        </StyledButton1>
                                            <StyledButton2 onClick={() => downloadBookingReceipt()}>
                                                <img src="./doc_download.svg" />
                                                <span style={{ paddingLeft: '5px' }}>Booking Receipt</span>
                                            </StyledButton2></>}
                                        {["CNCL", "MT_DEL", "EXP"].indexOf(data?.refStatus?.code) == -1 && <StyledButton1  type="submit"
                  onClick={() => methods.handleSubmit(onSubmit)} //onClick={updateRequest}
                  >
                                            Update
                                        </StyledButton1>}
                                    </Grid>
                                </Grid>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>Amount paid</Grid>
                                                <Grid item xs={12} style={{ color: '#0568AE', fontFamily: 'Dubai Regular' }}>
                                                    <Link style={{ textDecoration: 'underline' }} onClick={() => setPaymentBreakupPopup(true)}>
                                                        {'AED ' + Number(data?.totalAmt).toFixed(2)}
                                                    </Link>
                                                </Grid>
                                                {paymentBreakupPopup && (
                                                    <PaymentBreakupPopUp
                                                        paymentDetails={data}
                                                        onClose={() => setPaymentBreakupPopup(false)}
                                                    />
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>No. of Containers</Grid>
                                                <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>{data?.noOfContainers}</Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>Booked on</Grid>
                                                <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>{data?.creationDate}</Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>No. of Trucks</Grid>
                                                <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>
                                                  {/* <TextField
                          placeholder="Format: 971xxxxxxxxx"
                          name="noOfTrucks"
                          variant="outlined"
                          inputRef={methods.register()}
                          error={
                            methods.errors?.noOfTrucks ? true : false
                          }
                          helperText={
                            methods.errors?.noOfTrucks?.message
                              ? methods.errors.noOfTrucks.message
                              : ""
                          }
                          style={{ width: '150px' }}  />  */}

{/* <TextField
    select
    name='noOfTrucks'
    input={<BootstrapInput />}
    inputRef={methods.register()}
                                                          
                                                            error={
                                                                methods.errors?.noOfTrucks ? true : false
                                                              }
                                                              helperText={
                                                                methods.errors?.noOfTrucks?.message
                                                                  ? methods.errors.noOfTrucks.message
                                                                  : ""
                                                              }

    onChange={e =>{ formvalues.noOfTrucks = e.target.value;
        setFormvalues(formvalues); methods.setValue('noOfTrucks', e.target.value, { shouldValidate: true })}}
    defaultValue={formvalues.noOfTrucks}>
    {truckNumberOpts.map((trucks, i) => (
      <CustomMenuItem   value={trucks.value}
      key={i}>
      {trucks.label}
      </CustomMenuItem>
    ))}
  </TextField> */}

                          


                                                    
                                                   
 <FormControl  error={Boolean(methods.errors?.noOfTrucks)} >
                                                     <Select
                                                            name={"noOfTrucks"}
                                                            autoWidth
                                                            defaultValue={formvalues.noOfTrucks}
                                                            style={{ textAlign: 'center' }}
                                                             value={methods.getValues().noOfTrucks}
                                                            onChange={(e) => {
                                                                formvalues.noOfTrucks = e.target.value;
                                                                setFormvalues(formvalues);
                                                                methods.setValue('noOfTrucks', e.target.value, { shouldValidate: true })
                                                            }}
                                                            input={<BootstrapInput />}
                                                            inputRef={methods.register()}
                                                          
                                                            error={
                                                                methods.errors?.noOfTrucks ? true : false
                                                              }
                                                              helperText={
                                                                methods.errors?.noOfTrucks?.message
                                                                  ? methods.errors.noOfTrucks.message
                                                                  : ""
                                                              }

                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left"
                                                                },
                                                                getContentAnchorEl: null,
                                                            }}
                                                        >
                                                            {truckNumberOpts.map((trucks, i) => (
                                                                <CustomMenuItem
                                                                    value={trucks.value}
                                                                    key={i}>
                                                                    {trucks.label}
                                                                </CustomMenuItem>
                                                            ))}
                                                        </Select>
                                                      <FormHelperText>{ methods.errors?.noOfTrucks?.message
                                                                  ? methods.errors.noOfTrucks.message
                                                                  : ""}</FormHelperText>
                                                        </FormControl>  
                                                 
                                                </Grid> 
                                            </StyledTableCell>
                                             {data?.multiLocAndTime && <><StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>Requestor Name</Grid>
                                                <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>{data?.requesterName}</Grid>
                                            </StyledTableCell>
                                                <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                    <Grid item xs={12}>Requestor Contact</Grid>
                                                    <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>+{data?.requesterContactNumber}</Grid>
                                                </StyledTableCell></>}
                                            {!data?.multiLocAndTime && <>
                                                <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                    <Grid item xs={12}>Drop Date</Grid>
                                                    <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular', width: '120px' }}>
                                                        {formvalues.dropDate && <ApplnDatePicker
                                                            name={"dropDate"}
                                                            label=""
                                                            value={formvalues.dropDate}
                                                            iconColor="#1FA5FF"        
                                                            onChange={(e) => {
                                                                formvalues.dropDate = e;
                                                              
                                                                //setFormvalues(formvalues);
                                                            }} />}
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                    <Grid item xs={12}>Drop Time</Grid>
                                                    <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>
                                                        <BootstrapInput
                                                            id="toTime"
                                                            name="dropTime"
                                                            type="time"
                                                            defaultValue={formvalues.dropTime}
                                                            classes={{ root: classes.InputRoot }}
                                                            inputProps={{
                                                                size: "small",
                                                                style: { padding: '6px', paddingLeft: '15px', paddingRight: '15px' }
                                                            }}
                                                            onChange={(e) => {
                                                                formvalues.dropTime = e.target.value;
                                                               
                                                                setFormvalues(formvalues);
                                                            }}
                                                        />
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                    <Grid item xs={12}>Time Interval</Grid>
                                                    <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>
                                                        <FormControl className={classes.margin}>
                                                            <Select
                                                                name={"timeInterval"}
                                                                defaultValue={formvalues.timeInterval}
                                                                style={{ width: '100px', textAlign: 'right' }}
                                                                onChange={(e) => {
                                                                    formvalues.timeInterval = e.target.value;
                                                                    setFormvalues(formvalues);
                                                                }}
                                                                input={<BootstrapInput />}
                                                                MenuProps={{
                                                                    anchorOrigin: {
                                                                        vertical: "bottom",
                                                                        horizontal: "left"
                                                                    },
                                                                    getContentAnchorEl: null,
                                                                }}
                                                                startAdornment={
                                                                    <InputAdornment position="start" style={{ position: 'absolute', zIndex: '11', marginLeft: '10px' }}>
                                                                        <img src="./interval.svg" height="18px" />
                                                                    </InputAdornment>
                                                                }
                                                            >
                                                                {intervalOpts.map((interval, i) => (
                                                                    <CustomMenuItem
                                                                        value={interval.value}
                                                                        key={i}>
                                                                        {interval.label}
                                                                    </CustomMenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </StyledTableCell>
                                            </>}
                                        </TableRow>
                                        <TableRow style={{ paddingTop: '50px' }}>
                                            {!data?.multiLocAndTime && <><StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>Requestor Name</Grid>
                                                <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>{data?.requesterName}</Grid>
                                            </StyledTableCell>
                                                <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                    <Grid item xs={12}>Requestor Contact</Grid>
                                                    <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>+{data?.requesterContactNumber}</Grid>
                                                </StyledTableCell></>}
                                            <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>Requestor Company</Grid>
                                                <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>{data?.requesterCompany}</Grid>
                                            </StyledTableCell>
                                            {data?.multiLocAndTime && <>
                                                <StyledTableCell align="left" colSpan={2} style={{ paddingTop: '20px' }}>
                                                    <Grid item xs={12}>Importer Comments</Grid>
                                                    <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>{data?.importerComments ? data?.importerComments : '--'}</Grid>
                                                </StyledTableCell>
                                                <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                    <Grid item xs={12}>Transporter Name</Grid>
                                                    <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>
                                                        <FormControl className={classes.margin}>
                                                            <Select
                                                                name={"transporterName"}
                                                                autoWidth
                                                                defaultValue={formvalues.transporterName}
                                                                style={{ textAlign: 'center', width: '150px' }}
                                                                onChange={(e) => {
                                                                    formvalues.transporterName = e.target.value;
                                                                    setFormvalues(formvalues);
                                                                }}
                                                                input={<BootstrapInput />}
                                                                MenuProps={{
                                                                    anchorOrigin: {
                                                                        vertical: "bottom",
                                                                        horizontal: "left"
                                                                    },
                                                                    getContentAnchorEl: null,
                                                                }}
                                                            >
                                                                {transporterNameOpts.map((transporterName, i) => (
                                                                    <CustomMenuItem
                                                                        value={transporterName.value}
                                                                        key={i}>
                                                                        {transporterName.label}
                                                                    </CustomMenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </StyledTableCell></>} 
                                            <StyledTableCell style={{ paddingTop: '20px' }}></StyledTableCell>
                                             {!data?.multiLocAndTime && <StyledTableCell align="left" colSpan={2} rowSpan={2} style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12} style={{ color: '#848484' }}>
                                                    Drop Location
                                                    <IconButton onClick={() => {
                                                        createEditFormData = {
                                                            consigneeContactName: data?.containerList[0]?.consigneeContactName,
                                                            consigneeContactNumber: data?.containerList[0]?.consigneeContactNumber,
                                                            dropAddress: data?.containerList[0]?.dropAddress,
                                                            phoneNumber: data?.containerList[0]?.phoneNumber,
                                                            addressLine1: data?.containerList[0]?.addressLine1,
                                                            dropZone: data?.containerList[0]?.dropZone,
                                                            containerUpdate: false,
                                                            latLng: data?.containerList[0]?.latLng,
                                                            requestDetailsNumber: data?.referenceNumber
                                                        }
                                                        setAction("ADMIN_EDIT");
                                                        setShowPopup(OTHER_POPUP);
                                                    }}>
                                                        <EditRounded style={{ fill: '#1FA5FF', fontSize: '1.8rem', paddingLeft: '8px', display: 'inline-flex', verticalAlign: 'sub' }} />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={12} style={{ color: '#686868', fontFamily: 'Dubai Regular', width: '280px' }}>{data?.dropLocation}</Grid>
                                            </StyledTableCell>}
                                            {showPopup === OTHER_POPUP && (
                                                <CreateEditAddressPopup
                                                    isopen={showPopup === OTHER_POPUP}
                                                    action={action}
                                                    createEditFormData={createEditFormData}
                                                    onClose={() => {
                                                        setShowPopup(NO_DIALOG);
                                                    }}
                                                    onConfirm={() => {
                                                        setShowPopup(NO_DIALOG);
                                                        refresh();
                                                    }}
                                                />
                                            )}

                                        </TableRow>
                                        {!data?.multiLocAndTime && <TableRow style={{ paddingTop: '50px' }}>
                                            <StyledTableCell align="left" colSpan={2} style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>Importer Comments</Grid>
                                                <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>{data?.importerComments ? data?.importerComments : '--'}</Grid>
                                            </StyledTableCell>
                                            <StyledTableCell align="left" style={{ paddingTop: '20px' }}>
                                                <Grid item xs={12}>Transporter Name</Grid>
                                                <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>
                                                    <FormControl className={classes.margin}>
                                                        <Select
                                                            name={"transporterName"}
                                                            autoWidth
                                                            defaultValue={formvalues.transporterName}
                                                            style={{ textAlign: 'center', width: '150px' }}
                                                            onChange={(e) => {
                                                                formvalues.transporterName = e.target.value;
                                                                setFormvalues(formvalues);
                                                            }}
                                                            input={<BootstrapInput />}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left"
                                                                },
                                                                getContentAnchorEl: null,
                                                            }}
                                                        >
                                                            {transporterNameOpts.map((transporterName, i) => (
                                                                <CustomMenuItem
                                                                    value={transporterName.value}
                                                                    key={i}>
                                                                    {transporterName.label}
                                                                </CustomMenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </StyledTableCell>
                                        </TableRow>} 
                                    </TableBody>
                                </Table>
                                {data?.containerList?.map((row, index) => (
                                    <ContainerCard
                                        key={index}
                                        row={row}
                                        index={index}
                                        reqStatusCode={data?.refStatus?.code}
                                        multiLocAndTime={data?.multiLocAndTime}
                                        containerTypeOpts={containerTypeOpts}
                                        handleChange={(e) => {
                                            console.log('cont', e)
                                            data.containerList[index] = e;
                                            console.log('list', data.containerList);
                                            if (e.editAddress)
                                                refresh()
                                        }}
                                    />
                                ))}
                            </Paper>
                        </form>
                    </FormProvider>} 
                    {!data && noDataFound &&<Paper elevation={5} style={{ borderRadius: 8, padding: '30px', marginTop: 20, minWidth: '760px', minHeight: '100px', color: '#FF7171' }}>
                        <Grid container direction="row" spacing={5}>
                            <Grid item sm={12} xs={12}>
                                <Typography variant="subtitle1" style={{ fontSize: '16px', textAlign: 'center' }}>
                                    <b>{'No records found'}</b></Typography>
                            </Grid>
                        </Grid>
                    </Paper>}
            </>
        )
    }

    const BookingCol = [
        {
            name: "Booking Number",
            type: COLUMN_TYPE_STRING,
            key: "referenceNumber",
            id: 0,
            sort: true,
            sortActive: true,
        },
        {
            name: "Booked on",
            type: COLUMN_TYPE_STRING,
            key: "creationDate",
            id: 1,
            sort: true,
            sortActive: true,
        },
        {
            name: "Containers",
            type: COLUMN_TYPE_NUMBER,
            key: "noOfContainers",
            id: 2,
            sort: true,
            sortActive: true,
        },
        {
            name: "Trucks",
            type: COLUMN_TYPE_NUMBER,
            key: "noOfTrucks",
            id: 3,
            sort: true,
            sortActive: true,
        },
        {
            name: "Amount",
            type: COLUMN_TYPE_STRING,
            key: "amount",
            id: 4,
            sort: true,
            sortActive: true
        },
        {
            name: "Expires In",
            type: COLUMN_TYPE_STRING,
            key: "expiryIn",
            id: 5,
            sort: true,
            sortActive: true,
        },

    ];

    const actions = [{ item: 1, tip: "action", icon: "edit_headline" }];

    const remoteUrl = inputType == 'container' ?
        endpointContants.containerSearchUrl + "?containerNumber=" + props?.search?.serviceNumber :
        inputType == 'declaration' ?
            endpointContants.declarationSearchUrl + "?declarationNumber=" + props?.search?.serviceNumber :
            endpointContants.haulierSearchUrl + "?haulierCode=" + props?.search?.serviceNumber;

    function ContainerSearch() {
        const [summaryCount, setSummaryCount] = useState(0);

        const updateCount = (e) => {
            console.log("count in update count", e);
            setSummaryCount(e.summaryCount);
          };

        return (
            <div style={{ marginTop: '20px' }}>
                {/* <Grid item xs={12} style={{ color: '#0E1B3D', fontSize: '18px', fontWeight: 600, fontFamily:'Dubai Light' }}>
                    {inputType == 'container' ? 'Container Number : ' :
                        inputType == 'declaration' ? 'Declaration Number : ' : 'Haulier Code : '} {searchValue}
                </Grid> */}
                <InputLabel
                    style={{
                        fontSize: "16px",
                        color: "#0E1B3D",
                        fontWeight: 600,
                        fontFamily: "Dubai Regular",
                        marginBottom: '10px'
                    }}> Displaying {summaryCount} bookings  </InputLabel>
                {(searchValue && remoteUrl) && 
                <CustomizedDataTable
                    // refresh={pstate}
                    tableKeys={BookingCol}
                    countData={(e) => updateCount(e)}
                    remote={true}
                    remoteUrl={remoteUrl}
                    dataRootKey={"elements"}
                    actions={actions}
                    screen={"Admin"}
                    handleClick={(row, index, action, element) => {
                        setInputType('booking');
                        row.containerList.filter(x => x.container_number == searchValue.toLowerCase()).map(x => {
                            x.containerSearch = true;
                        })
                        console.log('row', row)
                        setData(row);
                        let date = moment((row.dropDateTime), "DD/MM/YYYY HH:mm").format(
                            "DD/MM/YYYY");
                        let time = moment((row.dropDateTime), "DD/MM/YYYY HH:mm").format(
                            "HH:mm");
                        setFormvalues({
                            noOfTrucks: row.truckNumber,
                            transporterName: row.assignedTransporterCode,
                            timeInterval: row.dropInterval,
                            dropDate: date,
                            dropTime: time
                        })
                        setSearchValue(row.referenceNumber);
                    }}
                />
                }
            </div>
        )
    }


    return (
        <>
            {inputType == 'booking' && <BookingSearch />}
            {inputType !== 'booking' && <ContainerSearch />}
        </>
    )
}