import {
    Paper, Table, Button, TableCell, TableBody, TableRow, IconButton, makeStyles, Box, withStyles, createStyles, Grid, Link,
    InputBase, FormControl, Select, MenuItem, InputAdornment, TextField
} from "@material-ui/core";
import BookingService from '../../service/BookingService';
import TransporterService from '../../service/TransporterService';
import React, { useState, useEffect } from "react";
import { ArrowBackIosRounded, EditRounded } from "@material-ui/icons";
import CommonService from "../../service/CommonService";
import ApplnDatePicker from "./../../lib/components/datepicker/ApplnDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import ContainerCard from "../../lib/components/appComponent/ContainerCard";
import CreateEditAddressPopup from "./../address/CreateEditAddressPopup";
import { OTHER_POPUP, NO_DIALOG } from "../../lib/common/Constants";
import PaymentBreakupPopUp from "../request/PaymentBreakupPopup";
import RequestBoeService from "../../service/RequestBoeService";
import { cancelRequestByAdmin } from "../../utils/ptmsEndpoints";
import DeleteContainerPopUp from "../request/DeleteContainerPopup";
import moment from "moment";

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
        marginTop: '80px',
        height: '700px',
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
            background: "#168FE4 0% 0% no-repeat padding-box",
            boxShadow: "0px 1px 4px #00000029",
            borderRadius: "8px",
            opacity: 1,
            alignSelf: "right",
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            fontSize: '0.8rem'
        },
    })
)(Button);

const StyledButton3 = withStyles(() =>
    createStyles({
        root: {
            width: "120px",
            height: "39px",
            background: "#FF6464 0% 0% no-repeat padding-box",
            boxShadow: "0px 1px 4px #00000029",
            borderRadius: "8px",
            opacity: 1,
            alignSelf: "right",
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            fontSize: '0.8rem',
            marginRight: '10px'
        },
    })
)(Button);

const StyledButton2 = withStyles(() =>
    createStyles({
        root: {
            width: "140px",
            height: "39px",
            background: "#168FE4 0% 0% no-repeat padding-box",
            boxShadow: "0px 1px 4px #00000029",
            borderRadius: "8px",
            opacity: 1,
            alignSelf: "right",
            fontFamily: 'Dubai Light',
            fontWeight: 600,
            fontSize: '0.8rem',
            marginRight: '10px',
            marginLeft: '10px'
        },
    })
)(Button);

const intervalOpts = [
    { label: "30 min", value: "30min" },
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
    const [boeDetails, setBoeDetails] = useState();
    const [booking, setBooking] = useState();
    const [containers, setContainers] = useState();
    const [success, setSuccess] = useState(false);
    const [inputType, setInputType] = useState('');
    const [searchValue, setSearchValue] = useState('');
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

    useEffect(() => {
        fetchOnBoardedTransporters()
        setSearchValue(props?.history?.location?.state?.search?.serviceNumber)
        setInputType(props?.history?.location?.state?.search?.serviceType)
        if (props?.history?.location?.state?.from == true) {
            doSearch(props?.history?.location?.state?.search?.serviceNumber, props?.history?.location?.state?.search?.serviceType)
        }
    }, []);


    const methods = useForm({
        // resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: formvalues,
    });

    const fetchOnBoardedTransporters = async () => {
        let res = await TransporterService.fetchOnBoardedTransporters();
        console.log('fetchOnBoardedTransporters', res.status, res)
        if (res) {
            console.log('fetchOnBoardedTransporters', res)
            await setTransporterNameOpts(res)
        }
    }

    const doSearch = async (value, type) => {
        if (type === "declaration") {
            await setBooking();
            await setContainers()
            let res = await BookingService.getRequestByDeclaration(value)
            if (res && res?.status === "success") {
                await setBoeDetails({ ...boeDetails, "data": res?.data?.dataItems })
                await setSuccess(true)
                await setData(res?.data?.dataItems)
            } else {
                await setSuccess(false)
            }
        } else if (type === "booking") {
            await setBoeDetails();
            await setContainers()
            let res = await BookingService.getBookingByNumber(value,true)
            if (res && res?.status === "success") {
                await setSuccess(true)
                await setData(res?.data?.dataItems[0])
                let date = moment((res?.data?.dataItems[0].dropDateTime), "DD/MM/YYYY HH:mm").format(
                    "DD/MM/YYYY");
                let time = moment((res?.data?.dataItems[0].dropDateTime), "DD/MM/YYYY HH:mm").format(
                    "HH:mm");
                console.log("date time", date, time)
                setFormvalues({
                    noOfTrucks: res?.data?.dataItems[0].noOfTrucks,
                    transporterName: res?.data?.dataItems[0].assignedTransporterCode,
                    timeInterval: res?.data?.dataItems[0].dropInterval,
                    dropDate: date,
                    dropTime: time
                })
            }
            else {
                await setSuccess(false)
            }
        } else if (type === "container") {
            await setBooking();
            await setBoeDetails();
            await setSuccess(true);
            await console.log("CONT ", type);
            let res = await BookingService.getContainerRequest(value)
            if (res && res?.status === "success") {
                await setSuccess(true)
                await setContainers({ ...containers, "data": res?.data?.dataItems })
                await setData(res?.data?.dataItems)
            }
            else {
                await setSuccess(false)
            }
        }
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
        }
    }

    const updateRequest = async () => {
        console.log(formvalues);
        let date = moment((formvalues.dropDate + " " + formvalues.dropTime), "DD/MM/YYYY HH:mm").format(
            "DD/MM/YYYY HH:mm");
        data.noOfTrucks = formvalues.noOfTrucks;
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

    return (
        <>
            {data &&
                <FormProvider {...methods}>
                    <form>
                        <Paper className={classes.paper} >
                            <Grid container spacing={1}>
                                <Grid item xs={1}>
                                    <Box className={classes.boxOnPaper}>
                                        <IconButton onClick={() => console.log("back")}>
                                            <ArrowBackIosRounded style={{ fill: '#fff', stroke: '#fff', strokeWidth: '1px' }} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={["CNCL", "MT_DEL", "EXP"].indexOf(data?.refStatus?.code) == -1 ? 5 :7} style={{ fontSize: '1.3rem', justifyItems: 'center', alignItems: 'center', fontWeight: 600 }}>
                                    <div direction="row" >
                                        {data?.referenceNumber}
                                        <Box
                                            style={
                                                data?.refStatus?.code == 'SUCC' || data?.refStatus?.code == 'TRANSCONF' || data?.refStatus?.code == 'MT_DEL' ?
                                                    { backgroundColor: "#63BB7A", border: '1px solid #63BB7A' } :
                                                    data?.refStatus?.code == 'CNCL' || data?.refStatus?.code == 'EXP' || data?.refStatus?.code == 'FPAY' ?
                                                        { backgroundColor: "#EA2428", border: '1px solid #EA2428' } :
                                                        { backgroundColor: "#EB9743", border: '1px solid #EB9743' }}
                                            className={classes.statusBox}>
                                            {data?.refStatus?.refStatusLocales?.name}
                                        </Box>
                                    </div>
                                    {data?.refStatus?.code == 'PEND' && <div direction="row" align="left" colSpan={6} style={{
                                        paddingRight: 0, color: '#DF1D1D',
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
                                <Grid item xs={["CNCL", "MT_DEL", "EXP"].indexOf(data?.refStatus?.code) == -1 ? 6 : 4} style={{ justifyItems: 'center', alignItems: 'center', display: 'flex' }}>
                                    {["CNCL", "MT_DEL", "EXP"].indexOf(data?.refStatus?.code) == -1  && 
                                    <StyledButton3 onClick={() => setOpenDeletePopup(true)}>
                                        Cancel
                                    </StyledButton3>}
                                    <StyledButton1 onClick={() => downloadTaxReceipt()}>
                                        <img src="./doc_download.svg" />
                                        <span style={{ paddingLeft: '5px' }}>Tax Receipt</span>
                                    </StyledButton1>
                                    <StyledButton2 onClick={() => downloadBookingReceipt()}>
                                        <img src="./doc_download.svg" />
                                        <span style={{ paddingLeft: '5px' }}>Booking Receipt</span>
                                    </StyledButton2>
                                    <StyledButton1 onClick={updateRequest}>
                                        Update
                                    </StyledButton1>
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
                                                <FormControl className={classes.margin}>
                                                    <Select
                                                        name={"noOfTrucks"}
                                                        autoWidth
                                                        value={formvalues.noOfTrucks}
                                                        style={{ textAlign: 'center' }}
                                                        onChange={(e) => {
                                                            setFormvalues({
                                                                ...formvalues,
                                                                noOfTrucks: e.target.value
                                                            })
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
                                                        {truckNumberOpts.map((trucks, i) => (
                                                            <MenuItem
                                                                value={trucks.value}
                                                                style={{ fontSize: "14px", fontWeight: '600' }}
                                                                key={i}>
                                                                {trucks.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
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
                                                        onChange={() => {
                                                            console.log('date', methods.getValues().dropDate)
                                                            console.log('date', formvalues.dropDate)
                                                            setFormvalues({
                                                                ...formvalues,
                                                                dropDate: methods.getValues().dropDate
                                                            })
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
                                                        value={formvalues.dropTime}
                                                        classes={{ root: classes.InputRoot }}
                                                        inputProps={{
                                                            size: "small",
                                                            style: { padding: '6px', paddingLeft: '15px', paddingRight: '15px' }
                                                        }}
                                                        onChange={(e) => {
                                                            setFormvalues({
                                                                ...formvalues,
                                                                dropTime: e.target.value
                                                            })
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
                                                            value={formvalues.timeInterval}
                                                            style={{ width: '100px', textAlign: 'right' }}
                                                            onChange={(e) => {
                                                                setFormvalues({
                                                                    ...formvalues,
                                                                    timeInterval: e.target.value
                                                                })
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
                                                                <MenuItem
                                                                    value={interval.value}
                                                                    style={{ fontSize: "14px", fontWeight: '600' }}
                                                                    key={i}>
                                                                    {interval.label}
                                                                </MenuItem>
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
                                                            value={formvalues.transporterName}
                                                            style={{ textAlign: 'center', width: '150px' }}
                                                            onChange={(e) => {
                                                                setFormvalues({
                                                                    ...formvalues,
                                                                    transporterName: e.target.value
                                                                })
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
                                                                <MenuItem
                                                                    value={transporterName.value}
                                                                    style={{ fontSize: "14px", fontWeight: '600' }}
                                                                    key={i}>
                                                                    {transporterName.label}
                                                                </MenuItem>
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
                                                        dropZone: data?.containerList[0]?.dropZoneCode,
                                                        containerUpdate: false,
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
                                                    setPstate(pstate + 1);
                                                    doSearch(props?.history?.location?.state?.search?.serviceNumber, props?.history?.location?.state?.search?.serviceType)
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
                                                        value={formvalues.transporterName}
                                                        style={{ textAlign: 'center', width: '150px' }}
                                                        onChange={(e) => {
                                                            setFormvalues({
                                                                ...formvalues,
                                                                transporterName: e.target.value
                                                            })
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
                                                            <MenuItem
                                                                value={transporterName.value}
                                                                style={{ fontSize: "14px", fontWeight: '600' }}
                                                                key={i}>
                                                                {transporterName.label}
                                                            </MenuItem>
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
                                    handleChange={(e) => {
                                        console.log('cont', e)
                                        data.containerList[index] = e;
                                        console.log('list', data.containerList);
                                    }}
                                />
                            ))}
                        </Paper>
                    </form>
                </FormProvider>}
        </>
    )
}