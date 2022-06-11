import {
    Button, Dialog, DialogContent, DialogTitle, DialogActions, TableCell, createStyles, withStyles, TableHead, Table, TableRow,
    Typography, TableBody, FormControl, InputBase, Select, MenuItem, makeStyles, IconButton, Grid
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ApplnDatePicker from "../../../lib/components/datepicker/ApplnDatePicker";
import TransporterService from "../../../service/TransporterService";
import CloseIcon from "@material-ui/icons/Close";

const StyledTableCell = withStyles(() =>
    createStyles({
        head: {
            borderBottom: 'none',
            fontSize: '0.9rem',
            whiteSpace: 'nowrap',
            padding: '5px',
            fontWeight: 600,
            color: '#0E1B3D',
            width: '160px',
        },
        body: {
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#0E1B3D',
            borderBottom: '0px',
            padding: '5px',
            paddingTop: '25px'
        },
    }),
)(TableCell);

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(1),
        },
        "& .MuiInputBase-input": {
            fontFamily: 'Dubai Light',
            fontSize: '0.8rem',
            fontWeight: 600
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
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const rateTypeOptn = [
    { label: "Percentage", value: "PERCENT" },
    { label: "Flat", value: "FLAT" },
]

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    dialogTitle: {
        backgroundColor: '#ffffff',
        textAlign: 'left',
        paddingBottom: 0,
        paddingTop: '25px'
    },
    selectMenu: {
        fontSize: "0.8rem",
        fontWeight: 600,
        fontFamily: 'Dubai Light'
    }
}));


export default function RateCardPopup(props: any) {
    const [pstate, setPstate] = useState(0);
    const [open, setOpen] = useState(true);
    const [rateCardData, setRateCardData] = useState([]);
    const rows = [
        { label: 'Zone Code', name: 'zoneCode', render: (item: any) => item.zoneName },
        { label: 'Rate Type', name: 'rateType', render: (item: any) => item.rateType },
        { label: 'Rate Amount', name: 'rateAmount', render: (item: any) => item.rateAmount },
        { label: 'Valid From', name: 'validFrom', render: (item: any) => item.validFrom },
        { label: 'Valid To', name: 'validTo', render: (item: any) => item.validTo },
    ];

    const classes = useStyles();

    const methods = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: props.rateCardData,
    });

    useEffect(() => {
        console.log('rateCardData', props.rateCardData);
        setRateCardData(props.rateCardData)
    }, []);

    const handleClose = () => {
        props.onClose();
        setOpen(false);
    };

    const handleConfirm = async () => {
        console.log('rateCardData', rateCardData);
        let data = rateCardData.filter(value => value.isUpdated);
        console.log(data);
        let res = await TransporterService.saveOrUpdateRateCard(data, props.haulierCode);
        console.log('saveOrUpdateRateCard', res.status, res)
        if (res) {
            console.log('saveOrUpdateRateCard', res);
            setOpen(false);
            props.onSave();
        }
    }

    const renderDialogTitle = () => {
        return (
            <Grid container style={{ marginBottom: 0 }}>
                <Grid item xs={11}>
                    <Typography style={{ fontSize: '18px', fontFamily: 'Dubai Medium', color: '#484848' }}>
                        Rate Card Details
                    </Typography>
                    <hr style={{ borderTop: '4px solid #FF3E3E', width: '15%', margin: 0 }} />
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon style={{ fill: '#0E1B3D' }} />
                    </IconButton>
                </Grid>
                {rateCardData[0]?.lastModifiedOn && <Grid item xs={12} style={{ paddingTop: '15px', textAlign: 'right' }}>
                    <Typography style={{ color: '#484848', fontSize: '15px', fontFamily: 'Dubai Light', fontWeight: 600 }}>{`Last Modified on: ${rateCardData[0]?.lastModifiedOn}`}</Typography>
                </Grid>}
            </Grid>
        );
    }

    return (
        <FormProvider {...methods}>
            <Dialog
                onClose={handleClose}
                open={open}
                PaperProps={{
                    style: { borderRadius: '0px', minWidth: '600px', minHeight: '450px' }
                }}
            >
                <DialogTitle disableTypography className={classes.dialogTitle}>
                    {renderDialogTitle()}
                </DialogTitle>
                <DialogContent style={{ padding: '18px', paddingBottom: 0, paddingTop: 0 }}>
                    <Table>
                        <TableBody>
                            {rows.map(({ label, name, render }) => (
                                <TableRow key={name}>
                                    <StyledTableCell style={name === "zoneCode" ? { paddingTop: '10px', borderBottom: '1.5px solid #A5A5A5' } : {}}>
                                        {label}
                                    </StyledTableCell>
                                    {rateCardData?.map((item: any, i: any) => (
                                        name === "rateType" ? (
                                            <StyledTableCell align="left" key={i}>
                                                <FormControl>
                                                    <Select
                                                        name={name}
                                                        defaultValue={item.rateType == null ? 'none' : render(item)}
                                                        style={item.rateType == null ?
                                                            { color: '#686868', width: '100px' } :
                                                            { width: '100px' }}
                                                        onChange={(e: any) => {
                                                            console.log('rateType', e);
                                                            item.rateType = e.target.value;
                                                            item.isUpdated = true;
                                                            setPstate(pstate + 1);
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
                                                        <MenuItem value={'none'} disabled className={classes.selectMenu}>
                                                            Select Type
                                                        </MenuItem>
                                                        {rateTypeOptn.map((type, i) => (
                                                            <MenuItem
                                                                className={classes.selectMenu}
                                                                value={type.value}
                                                                key={i}>
                                                                {type.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </StyledTableCell>) :
                                            name === "rateAmount" ? (
                                                <StyledTableCell align="left" key={i}>
                                                    <BootstrapInput
                                                        name={name}
                                                        type="number"
                                                        placeholder={"Amount"}
                                                        defaultValue={render(item)}
                                                        inputProps={{
                                                            // size: "small",
                                                            style: { padding: '6px', paddingLeft: '15px', paddingRight: '15px', width: '90px' }
                                                        }}
                                                        onChange={(e) => {
                                                            console.log('rateamount', e);
                                                            item.rateAmount = e.target.value;
                                                            item.isUpdated = true;
                                                        }}
                                                    />
                                                </StyledTableCell>) :
                                                name === "zoneCode" ? (
                                                    <StyledTableCell align="left" style={{ paddingTop: '10px', borderBottom: '1.5px solid #A5A5A5' }} key={i}>
                                                        {render(item)}
                                                    </StyledTableCell>
                                                ) : (<StyledTableCell align="left" key={i}>
                                                    <ApplnDatePicker
                                                        name={name}
                                                        label=""
                                                        width="115px"
                                                        placeholder={"dd/mm/yyyy"}
                                                        value={render(item)}
                                                        iconColor="#1FA5FF"
                                                        onChange={(e: any) => {
                                                            item.isUpdated = true;
                                                            name === "validFrom" ?
                                                                item.validFrom = e :
                                                                item.validTo = e
                                                        }} />
                                                </StyledTableCell>)
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button style={{
                        // backgroundColor: "#1360D2",
                        // color: "#fff",
                        // width: '100px',
                        // height: '35px',
                        // fontSize: '16px',
                        // fontFamily: 'Dubai Light',
                        // fontWeight: 600,
                        // borderRadius: '3px',
                        marginTop: '15px',
                        marginRight: '20px',
                        marginBottom: '15px'
                    }}
                        onClick={handleConfirm}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </FormProvider>
    );
}