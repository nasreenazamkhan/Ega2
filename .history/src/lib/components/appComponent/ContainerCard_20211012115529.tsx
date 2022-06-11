import React, { useState, useEffect } from "react";
import {
    Box, Grid, IconButton, Paper, Link, TableContainer, Table, TableHead, TableRow, TableCell, withStyles, createStyles, makeStyles, FormControl,
    Select, InputBase, MenuItem
} from "@material-ui/core";
import './containerCard.css';
import { FiberManualRecord, EditRounded } from "@material-ui/icons";
import ApplnDatePicker from "./../../../lib/components/datepicker/ApplnDatePicker";
import { FormProvider, useForm } from "react-hook-form";
import RequestBoeService from '../../../service/RequestBoeService';
import RequestContainerService from '../../../service/RequestContainerService';
import { OTHER_POPUP, NO_DIALOG } from "./../../../lib/common/Constants";
import CreateEditAddressPopup from "../../../components/address/CreateEditAddressPopup";
import DeleteContainerPopUp from "../../../components/request/DeleteContainerPopup";
import moment from "moment";
import AssignTruckPopup from "../../../components/admin/AssignTruckPopup";
import UploadDocumentPopup from "../../../components/transporter/UploadDocumentPopup";
import DownloadDocumentPopUp from "../../../components/admin/DownloadDocumentPopup";
import Tooltip from '@material-ui/core/Tooltip';

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
        paddingBottom: 0,
        paddingRight: 0,
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
        backgroundColor: "#EAB14D",
        border: '1px solid #EAB14D',
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
        overflowY: 'auto'
    },
    containerRow: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        borderBottom: 'none',
        paddingTop: '0px',
        paddingBottom: '20px',
        paddingLeft: '70px',
        textTransform: 'uppercase'
    },
    icon: {
        fontSize: '1rem',
        display: 'inline-flex',
        verticalAlign: 'middle',
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
    bottomLink: {
        border: '1px solid #0E1B3D',
        color: '#000000',
        fontSize: '12px',
        fontWeight: 600,
        padding: '5px 18px 3px 18px',
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
    cell: {
        paddingRight: 0,
        textAlign: 'right',
        fontWeight: 600,
        fontSize: '0.9rem',
        borderBottom: 'none',
        paddingTop:0
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

const BlueTooltip = withStyles({
    tooltip: {
        color: "#FFFFFF",
        backgroundColor: "#0E1B3DD3",
        fontFamily: "Dubai Light",
        fontWeight: 600,
        paddingLeft: '15px',
        paddingRight: '15px',
        maxWidth: '500px',
        maxHeight: '200px',
        whiteSpace: 'nowrap'
    },
    arrow: {
        "&:before": {
            borderStyle: "none"
        },
        color: "#0E1B3DD3",
    }
})(Tooltip);

let createEditFormData = {
    consigneeContactName: "",
    consigneeContactNumber: "",
    dropAddress: "",
    code: "",
    addressNickname: "",
    phoneNumber: "",
    addressLine1: "",
    dropZone: "",
    container_number: "",
    dpwTransactionId: "",
    requestDetailsNumber: "",
    containerUpdate: false
};

let assignTruckForm = {
    container_number: "",
    transporterCode: "",
    transporterName: "",
    assignedTruck: "",
    tokenIn: "",
    timeInSlot: "",
    tokenInDate: "",
    tokenInSlotTo: "",
    tokenInSlotFrom: "",
    tokenOut: "",
    timeOutSlot: "",
    tokenOutDate: "",
    tokenOutSlotTo: "",
    tokenOutSlotFrom: "",
    status: "",
    requestDetailsNumber: "",
    tokenInAdminComment: "",
    tokenOutAdminComment: "",
    tokenType: ""
}

export default function ContainerCard(props: any) {
    const classes = useStyles();
    const [containerTypeOpts, setContainerTypeOpts] = useState([]);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    const [pstate, setPstate] = useState(0);
    const [containerPopup, setContainerPopup] = useState(false);
    const [dropLocationPopup, setDropLocationPopup] = useState(NO_DIALOG);
    const [action, setAction] = useState("");
    const [assignTruckPopup, setAssignTruckPopup] = useState(false);
    const [tokenType, setTokenType] = useState('FCL OUT');
    const [uploadDocumentPopup, setUploadDocumentPopup] = useState(false);
    const [downloadPopup, setDownloadPopup] = useState(false);

    const methods = useForm({
        // resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: props.row,
    });

    useEffect(() => {
        console.log(props.row)
        setContainerTypeOpts(props.containerTypeOpts)
        props.row.date = moment((props.row.date_time), "DD/MM/YYYY HH:mm").format(
            "DD/MM/YYYY");
        props.row.time = moment((props.row.date_time), "DD/MM/YYYY HH:mm").format(
            "HH:mm");
    }, []);

    const handleChange = (msg?: boolean) => {
        let date = moment((props.row.date + " " + props.row.time), "DD/MM/YYYY HH:mm").format(
            "DD/MM/YYYY HH:mm");
        props.row.date_time = date;
        props.row.editAddress = msg;
        props.handleChange(props.row);
    }

    const deleteContainer = async (remarks: string) => {
        props.row.cancelRemarks = remarks;
        let res = await RequestContainerService.cancelContainer(props.row);
        console.log('cancelRequestByAdmin', res.status, res)
        if (res && res.status == 'success') {
            console.log("success")
            setOpenDeletePopup(false)
            handleChange(true);
        }
    };

    const refresh = () => {
        console.log("refresh called :::");
        setPstate(pstate + 1);
    };

    const approvePod = (container: any) => {
        RequestContainerService.approvePod(
            container
        )
            .then((response) => {
                setDownloadPopup(false);
            })
            .catch(() => {
                console.log("error");
            });
    }

    const rejectPod = (container: any) => {
        console.log("reject pod ::", container);
        RequestContainerService.rejectPod(
            container
        )
            .then((response) => {
                setDownloadPopup(false);
            })

            .catch(() => {
                console.log("error");
            });
    }

    function DeliverUpload() {
        return (
            <UploadDocumentPopup
                onClose={() => setUploadDocumentPopup(false)}
                popUpParams={{
                    uploadType: "POD",
                    referenceNumber: props.row?.container_number,
                    customMessage: "Please note: Document will automatically approved",
                    dpwTransactionId: props.row?.dpwTransactionId,
                    boeNumber: props.row?.boeNumber
                }}
                onSuccess={(e: any) => {
                    console.log("files", e)
                    setUploadDocumentPopup(false)
                }}
            />
        )
    }

    return (
        <div key={props.index}>
            <FormProvider {...methods}>
                <Box className={classes.boxOnTable} >{((props.index + 1) + "").padStart(2, '0')}</Box>
                <TableContainer component={Paper} variant="outlined" className={classes.serviceBox} style={props.row.containerSearch ? { boxShadow: '#168FE4 0px 0px 8px', border: '1px solid #168FE4' } : {}}>
                    <Table style={{ paddingTop: '20px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.containerRow} colSpan={props.row.refStatus?.code == 'MT_DEL' ? 6 : 5} onClick={() => setContainerPopup(true)}>
                                    {props.row.container_number} - {props.row.iso_code}
                                </TableCell>
                                <TableCell colSpan={2} className={classes.cell} style={
                                    props.row.refStatus?.code == 'MT_DEL' ?
                                        { paddingRight: '15px', color: '#63BB7A' } :
                                        props.row.refStatus?.code == 'CNCL' || props.row.refStatus?.code == 'EXP' || props.row.refStatus?.code == 'PODREJ' ?
                                            { paddingRight: '15px', color: '#EA2428' } : props.row.refStatus?.code == 'FCL_DEL' ? { paddingRight: '15px', color: '#F018FF' } :
                                                props.row.refStatus?.code == 'PEND' ? { paddingRight: '15px', color: '#FF6464' } : { paddingRight: '15px', color: '#EB9743' }
                                }>
                                    <FiberManualRecord className={classes.icon} style={
                                        props.row.refStatus?.code == 'MT_DEL' ?
                                            { fill: '#63BB7A' } :
                                            props.row.refStatus?.code == 'CNCL' || props.row.refStatus?.code == 'EXP' || props.row.refStatus?.code == 'PODREJ' ?
                                                { fill: '#EA2428' } : props.row.refStatus?.code == 'FCL_DEL' ? { fill: '#F018FF' } :
                                                    props.row.refStatus?.code == 'PEND' ? { fill: '#FF6464' } : { fill: '#EB9743' }
                                    } /> {props.row.refStatus?.refStatusLocales?.name}
                                    {["CNCL", "FCL_DEL", "MT_DEL", "EXP"].indexOf(props.row.refStatus?.code) == -1 &&
                                        <IconButton onClick={() => setOpenDeletePopup(true)}>
                                            <img src="./delete.svg" />
                                        </IconButton>}
                                    {props.row.refStatus?.code == 'INPRO' && <Link
                                        style={{ paddingLeft: '20px', textDecoration: 'underline' }}
                                        onClick={() => {
                                            setUploadDocumentPopup(true);
                                        }}
                                    >
                                        Delivered?
                                    </Link>}
                                    {uploadDocumentPopup && <DeliverUpload />}
                                </TableCell>
                                {openDeletePopup && (
                                    <DeleteContainerPopUp
                                        onClose={() => setOpenDeletePopup(false)}
                                        refresh={refresh}
                                        admin={true}
                                        message={'container from the booking?'}
                                        onConfirm={(e: string) => deleteContainer(e)}
                                    />
                                )}
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">
                                    <Grid item xs={2}>Container Wt.</Grid>
                                    <Grid item xs={2}>{props.row.containerWeight ?? "--"}</Grid>
                                    {/* {row.containerWt} */}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Grid item xs={2}>Hold Authority</Grid>
                                    <Grid item xs={2}>{props.row.holdAuthority ? props.row.holdAuthority : "--"}</Grid>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Grid item xs={2}>Storage Paid Till</Grid>
                                    <Grid item xs={2}>{props.row.storagePaidTill ? props.row.storagePaidTill : "--"}</Grid>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Grid item xs={2}>DO Validity</Grid>
                                    <Grid item xs={2}>{props.row.orderValidity ? props.row.orderValidity : "--"}</Grid>
                                </StyledTableCell>
                                {!props.multiLocAndTime && <StyledTableCell align="center">
                                    <Grid item xs={2}>Container Type</Grid>
                                    <Grid item xs={2}>
                                        <FormControl className={classes.margin}>
                                            <Select
                                                name={"containerType"}
                                                autoWidth
                                                value={props.row.containerTypeCode}
                                                style={{ textAlign: 'center', width: '130px' }}
                                                onChange={(e: any) => {
                                                    props.row.containerTypeCode = e.target.value
                                                    refresh()
                                                    handleChange()
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
                                                {containerTypeOpts.map((containerType, i) => (
                                                    <CustomMenuItem
                                                        value={containerType.value}
                                                        key={i}>
                                                        {containerType.label}
                                                    </CustomMenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </StyledTableCell>}
                                <StyledTableCell align="center">
                                    <Grid item xs={2}>Declaration Number</Grid>
                                    <Grid item xs={2}>{props.row.boeNumber}</Grid>
                                </StyledTableCell>
                                {props.multiLocAndTime && <StyledTableCell align="left" style={{ paddingLeft: '20px', borderLeft: '2px solid #848484' }}>
                                    <Grid item xs={2}>Pickup</Grid>
                                    <Grid item xs={2}>{props.row.pickupLocation ? props.row.pickupLocation : "--"}</Grid>
                                </StyledTableCell>}
                                {!props.multiLocAndTime && <StyledTableCell align="center" colSpan={2} style={{ width: '50px', paddingRight: '15px' }}>
                                    <Grid item xs={2}>Truck & Token</Grid>
                                    <Grid item xs={2}>
                                        <BlueTooltip arrow title="Can not assign Truck in Pending status." placement="top" disableFocusListener={["FPAY", "PPAY"].indexOf(props.reqStatusCode) == -1} disableHoverListener={["FPAY", "PPAY"].indexOf(props.reqStatusCode) == -1}>
                                            <Link
                                                style={["FPAY", "PPAY"].indexOf(props.reqStatusCode) == -1 ? { textDecoration: 'underline' } : { textDecoration: 'underline', color: '#848484' }}
                                                onClick={() => {
                                                    if (["FPAY", "PPAY"].indexOf(props.reqStatusCode) == -1) {
                                                        assignTruckForm = {
                                                            container_number: props.row.container_number,
                                                            transporterCode: props.row.transporterCode,
                                                            transporterName: props.row.transporterName,
                                                            assignedTruck: props.row.assignedTruck,
                                                            tokenIn: props.row.tokenIn,
                                                            timeInSlot: props.row.timeInSlot,
                                                            tokenInDate: props.row.tokenInDate,
                                                            tokenInSlotTo: props.row.tokenInSlotTo,
                                                            tokenInSlotFrom: props.row.tokenInSlotFrom,
                                                            tokenOut: props.row.tokenOut,
                                                            timeOutSlot: props.row.timeOutSlot,
                                                            tokenOutDate: props.row.tokenOutDate,
                                                            tokenOutSlotTo: props.row.tokenOutSlotTo,
                                                            tokenOutSlotFrom: props.row.tokenOutSlotFrom,
                                                            status: props.row.refStatus?.code,
                                                            requestDetailsNumber: props.row.requestDetailsNumber,
                                                            tokenInAdminComment: props.row.tokenInAdminComment,
                                                            tokenOutAdminComment: props.row.tokenOutAdminComment,
                                                            tokenType: tokenType
                                                        }
                                                        setAssignTruckPopup(true);
                                                    } else {

                                                    }
                                                }}>
                                                {props.row.assignedTruck && props.row.transporterName ?
                                                    props.row.assignedTruck + ' - ' + props.row.transporterName
                                                    : 'Assign'}
                                            </Link>
                                        </BlueTooltip>
                                    </Grid>
                                </StyledTableCell>}
                            </TableRow>
                            {props?.multiLocAndTime && <TableRow>
                                <StyledTableCell align="center">
                                    <Grid item xs={2}>Drop Date</Grid>
                                    <Grid item xs={2} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>
                                        {props.row.date && <ApplnDatePicker
                                            name={"date"}
                                            label=""
                                            value={props.row.date}
                                            iconColor="#1FA5FF"
                                            onChange={(e: any) => {
                                                console.log('date', e)
                                                console.log('date', props.row.date)
                                                props.row.date = e;
                                                handleChange()
                                            }} />}
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Grid item xs={12}>Drop Time</Grid>
                                    <Grid item xs={12} style={{ color: '#000000', fontFamily: 'Dubai Regular' }}>
                                        <BootstrapInput
                                            id="toTime"
                                            name="time"
                                            type="time"
                                            value={props.row.time}
                                            inputProps={{
                                                size: "small",
                                                style: { padding: '6px', paddingLeft: '15px', paddingRight: '15px' }
                                            }}
                                            onChange={(e) => {
                                                props.row.time = e.target.value;
                                                refresh()
                                                handleChange()
                                            }}
                                        />
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Grid item xs={2}>Container Type</Grid>
                                    <Grid item xs={2}>
                                        <FormControl className={classes.margin}>
                                            <Select
                                                name={"containerType"}
                                                autoWidth
                                                value={props.row.containerTypeCode}
                                                style={{ textAlign: 'center', width: '130px' }}
                                                onChange={(e: any) => {
                                                    props.row.containerTypeCode = e.target.value
                                                    refresh()
                                                    // handleChange()
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
                                                {containerTypeOpts.map((containerType, i) => (
                                                    <CustomMenuItem
                                                        value={containerType.value}
                                                        key={i}>
                                                        {containerType.label}
                                                    </CustomMenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell align="center" colSpan={2} style={{ paddingRight: '15px' }} >
                                    <Grid item xs={2}>Truck & Token</Grid>
                                    <Grid item xs={2}>
                                        <Link
                                            style={["FPAY", "PPAY"].indexOf(props.reqStatusCode) == -1 ? { textDecoration: 'underline' } : { textDecoration: 'underline', color: '#AEB2BB' }}
                                            onClick={() => {
                                                if (["FPAY", "PPAY"].indexOf(props.reqStatusCode) == -1) {
                                                    assignTruckForm = {
                                                        container_number: props.row.container_number,
                                                        transporterCode: props.row.transporterCode,
                                                        transporterName: props.row.transporterName,
                                                        assignedTruck: props.row.assignedTruck,
                                                        tokenIn: props.row.tokenIn,
                                                        timeInSlot: props.row.timeInSlot,
                                                        tokenInDate: props.row.tokenInDate,
                                                        tokenInSlotTo: props.row.tokenInSlotTo,
                                                        tokenInSlotFrom: props.row.tokenInSlotFrom,
                                                        tokenOut: props.row.tokenOut,
                                                        timeOutSlot: props.row.timeOutSlot,
                                                        tokenOutDate: props.row.tokenOutDate,
                                                        tokenOutSlotTo: props.row.tokenOutSlotTo,
                                                        tokenOutSlotFrom: props.row.tokenOutSlotFrom,
                                                        status: props.row.refStatus?.code,
                                                        requestDetailsNumber: props.row.requestDetailsNumber,
                                                        tokenInAdminComment: props.row.tokenInAdminComment,
                                                        tokenOutAdminComment: props.row.tokenOutAdminComment,
                                                        tokenType: tokenType
                                                    }
                                                    setAssignTruckPopup(true);
                                                } else {

                                                }
                                            }}>
                                            {props.row.assignedTruck && props.row.transporterName ?
                                                props.row.assignedTruck + ' - ' + props.row.transporterName
                                                : 'Assign'}
                                        </Link>
                                    </Grid>
                                </StyledTableCell>
                                <TableCell rowSpan={2} align="left" className={classes.multiLocCol} style={{ paddingBottom: '40px' }}>
                                    <Grid item xs={12} style={{ color: '#848484' }}>
                                        Drop Location
                                        <IconButton onClick={() => {
                                            createEditFormData = {
                                                consigneeContactName: props.row.consigneeContactName,
                                                consigneeContactNumber: props.row.consigneeContactNumber,
                                                dropAddress: props.row.dropAddress,
                                                phoneNumber: props.row.phoneNumber,
                                                addressLine1: props.row.addressLine1,
                                                dropZone: props.row.dropZone,
                                                container_number: props.row.container_number,
                                                dpwTransactionId: props.row.dpwTransactionId,
                                                requestDetailsNumber: props.row?.requestDetailsNumber,
                                                code: '',
                                                addressNickname: '',
                                                containerUpdate: true
                                            }
                                            setAction("ADMIN_EDIT");
                                            setDropLocationPopup(OTHER_POPUP)
                                        }}>
                                            <EditRounded style={{ fill: '#1FA5FF', fontSize: '1.8rem', paddingLeft: '8px', display: 'inline-flex', verticalAlign: 'sub' }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12} style={{ color: '#686868', fontFamily: 'Dubai Regular', width: '280px' }}>{props.row?.dropAddress}</Grid>
                                </TableCell>
                                {dropLocationPopup === OTHER_POPUP && (
                                    <CreateEditAddressPopup
                                        isopen={dropLocationPopup === OTHER_POPUP}
                                        action={action}
                                        createEditFormData={createEditFormData}
                                        onClose={() => {
                                            setDropLocationPopup(NO_DIALOG);
                                        }}
                                        onConfirm={() => {
                                            setDropLocationPopup(NO_DIALOG);
                                            refresh()
                                            handleChange(true);
                                        }}
                                    />
                                )}
                            </TableRow>}
                            <TableRow>
                                {props.row.truckAssignedOn && <StyledTableCell align="left">
                                    <Grid item xs={2}>Truck Assigned on</Grid>
                                    <Grid item xs={2}>{tokenType == 'MT IN' ? props.row.mtTruckAssignedOn : props.row.truckAssignedOn}</Grid>
                                </StyledTableCell>}
                                {props.row.tokenOutAssignedOn && tokenType == 'FCL OUT' && <><StyledTableCell align="left" >
                                    <Grid item xs={2}>Token Assigned on</Grid>
                                    <Grid item xs={2}>{props.row.tokenOutAssignedOn}</Grid>
                                </StyledTableCell>
                                    <StyledTableCell align="left" >
                                        <Grid item xs={2}>Admin Comments</Grid>
                                        <Grid item xs={2}>{props.row.tokenOutAdminComment}</Grid>
                                    </StyledTableCell></>}
                                {props.row.tokenInAssignedOn && tokenType == 'MT IN' && <><StyledTableCell align="left" >
                                    <Grid item xs={2}>Token Assigned on</Grid>
                                    <Grid item xs={2}>{props.row.tokenInAssignedOn}</Grid>
                                </StyledTableCell>
                                    <StyledTableCell align="left" >
                                        <Grid item xs={2}>Admin Comments</Grid>
                                        <Grid item xs={2}>{props.row.tokenInAdminComment}</Grid>
                                    </StyledTableCell></>}
                                {props.row.driverName && tokenType == 'FCL OUT' && <><StyledTableCell align="left" >
                                    <Grid item xs={2}>Driver Name</Grid>
                                    <Grid item xs={2}>{props.row.driverName}</Grid>
                                </StyledTableCell>
                                    <StyledTableCell align="left" >
                                        <Grid item xs={2}>Driver Number</Grid>
                                        <Grid item xs={2}>{props.row.driverNumber}</Grid>
                                    </StyledTableCell></>}
                                {!props?.multiLocAndTime && <>
                                    {props.row.podUploadedOn && tokenType == 'FCL OUT' && <><StyledTableCell align="left" >
                                        <Grid item xs={2}>POD Uploaded on</Grid>
                                        <Grid item xs={2}>{props.row.podUploadedOn}</Grid>
                                    </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            <img src="./doc_download.svg" height="35px" />
                                            <Link style={{ paddingLeft: '10px', textDecoration: 'underline' }} onClick={() => setDownloadPopup(true)}>
                                                POD File
                                            </Link>
                                            {downloadPopup && <DownloadDocumentPopUp
                                                isopen={downloadPopup}
                                                fileList={props.row.proofOfDelivery}
                                                container={props.row}
                                                canApprove={true}
                                                onClose={() => {
                                                    setDownloadPopup(false);
                                                }}
                                                onApprove={(e: any) => {
                                                    approvePod(e);
                                                    refresh();
                                                    handleChange(true);
                                                }}
                                                onReject={(e: any) => {
                                                    console.log("in callback reject ::", e);
                                                    rejectPod(e);
                                                    refresh();
                                                    handleChange(true);
                                                }}
                                            />}
                                        </StyledTableCell></>}
                                    {props.row.podApprovedOn && tokenType == 'FCL OUT' && <StyledTableCell align="left" >
                                        <Grid item xs={2}>POD Approved on</Grid>
                                        <Grid item xs={2}>{props.row.podApprovedOn}</Grid>
                                    </StyledTableCell>}
                                    {props.row.fclDeliveredOn && tokenType == 'FCL OUT' && <StyledTableCell align="left" >
                                        <Grid item xs={2}>Delivered on</Grid>
                                        <Grid item xs={2}>{props.row.fclDeliveredOn}</Grid>
                                    </StyledTableCell>}
                                    {props.row.mtDeliveredOn && tokenType == 'MT IN' && <StyledTableCell align="left" >
                                        <Grid item xs={2}>Completed on</Grid>
                                        <Grid item xs={2}>{props.row.mtDeliveredOn}</Grid>
                                    </StyledTableCell>}
                                </>}
                            </TableRow>
                            <TableRow>
                                {props?.multiLocAndTime && <>
                                    {props.row.podUploadedOn && tokenType == 'FCL OUT' && <><StyledTableCell align="left" >
                                        <Grid item xs={2}>POD Uploaded on</Grid>
                                        <Grid item xs={2}>{props.row.podUploadedOn}</Grid>
                                    </StyledTableCell>
                                        <StyledTableCell align="left" >
                                            <img src="./doc_download.svg" height="35px" />
                                            <Link style={{ paddingLeft: '10px', textDecoration: 'underline' }} onClick={() => setDownloadPopup(true)}>
                                                POD File
                                            </Link>
                                            {downloadPopup && <DownloadDocumentPopUp
                                                isopen={downloadPopup}
                                                fileList={props.row.proofOfDelivery}
                                                container={props.row}
                                                canApprove={true}
                                                onClose={() => {
                                                    setDownloadPopup(false);
                                                }}
                                                onApprove={(e: any) => {
                                                    approvePod(e);
                                                    refresh();
                                                    handleChange(true);
                                                }}
                                                onReject={(e: any) => {
                                                    console.log("in callback reject ::", e);
                                                    rejectPod(e);
                                                    refresh();
                                                    handleChange(true);
                                                }}
                                            />}
                                        </StyledTableCell></>}
                                    {props.row.podApprovedOn && tokenType == 'FCL OUT' && <StyledTableCell align="left" >
                                        <Grid item xs={2}>POD Approved on</Grid>
                                        <Grid item xs={2}>{props.row.podApprovedOn}</Grid>
                                    </StyledTableCell>}
                                    {props.row.fclDeliveredOn && tokenType == 'FCL OUT' && <StyledTableCell align="left" >
                                        <Grid item xs={2}>Delivered on</Grid>
                                        <Grid item xs={2}>{props.row.fclDeliveredOn}</Grid>
                                    </StyledTableCell>}
                                    {props.row.mtDeliveredOn && tokenType == 'MT IN' && <StyledTableCell align="left" >
                                        <Grid item xs={2}>Completed on</Grid>
                                        <Grid item xs={2}>{props.row.mtDeliveredOn}</Grid>
                                    </StyledTableCell>}
                                </>}
                            </TableRow>
                            {props?.row.expiryIn && <TableRow>
                                <TableCell align="right" colSpan={7} style={{
                                    paddingRight: '15px', color: '#DF1D1D', paddingTop: '8px', paddingBottom: '8px',
                                    fontWeight: 600, fontSize: '0.8rem', borderBottom: 'none'
                                }}>
                                    <img src="./information-button.svg" className={classes.icon2} />
                                    {props?.row.expiryIn}
                                </TableCell>
                            </TableRow>}
                            <TableRow>
                                <TableCell align="right" colSpan={8} style={{ borderBottom: 'none', padding: 0, paddingTop: '15px' }}>
                                    <div>
                                        <Link
                                            className={classes.bottomLink}
                                            style={tokenType == 'FCL OUT' ? { backgroundColor: '#0E1B3D', borderBottomRightRadius: !['MTTRK_ASGN', 'MTTOKASGN', 'MT_DEL'].includes(props.row.refStatus.code) ? '16px': 0, color: '#ffffff', paddingLeft: '25px', paddingRight: '25px' } : { paddingLeft: '25px', paddingRight: '25px' }}
                                            onClick={() => {
                                                setTokenType('FCL OUT')
                                            }}>
                                            FCL OUT
                                        </Link>
                                        {['MTTRK_ASGN', 'MTTOKASGN', 'MT_DEL'].includes(props.row.refStatus.code) && <Link
                                            className={classes.bottomLink}
                                            style={tokenType == 'MT IN' ? { backgroundColor: '#0E1B3D', color: '#ffffff', borderBottomRightRadius: '16px', paddingLeft: '25px', paddingRight: '25px' } : { borderBottomRightRadius: '16px', paddingLeft: '25px', paddingRight: '25px' }}
                                            onClick={() => {
                                                setTokenType('MT IN')
                                            }}>
                                            EMPTY IN
                                        </Link>}
                                    </div>
                                </TableCell>
                            </TableRow>
                            {assignTruckPopup &&
                                <AssignTruckPopup
                                    assignTruckForm={assignTruckForm}
                                    onClose={() => {
                                        setAssignTruckPopup(false);
                                    }}
                                    onConfirm={() => {
                                        setAssignTruckPopup(false)
                                        // handleChange(true)
                                    }}
                                />}
                        </TableHead>
                    </Table>
                </TableContainer>
            </FormProvider>
        </div>
    )

}