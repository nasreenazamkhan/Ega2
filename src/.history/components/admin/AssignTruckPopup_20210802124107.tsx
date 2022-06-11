import {
    Button, Dialog, DialogActions, DialogContent, TableCell, TableRow, Table, Typography, withStyles, createStyles, makeStyles,
    TableBody, TextField, Grid, Link, InputBase, CircularProgress
} from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AppAutoCompleteAsyc from "../../lib/components/autocomplete/appAutoCompleteAsyc";
import ApplnAutoCompleteAsync from "../../lib/components/autocomplete/ApplnAutoCompleteAsync";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import * as endpointContants from "../../utils/ptmsEndpoints";
import UploadDocumentPopup from "../transporter/UploadDocumentPopup";
import CheckIcon from '@material-ui/icons/CheckRounded';
import AssignTruckAndDriverService from '../../service/AssignTruckAndDriverService';

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

const StyledTableCell = withStyles(() =>
    createStyles({
        body: {
            borderBottom: 'none',
        },
    }),
)(TableCell);

const useStyles = makeStyles((theme) => ({
    cellDesign: {
        fontFamily: 'Dubai Light',
        fontWeight: 600,
        fontSize: '15px',
        paddingTop: '0px',
        paddingBottom: '0px',
    },
    input: {
        padding: '0px 10px 0px 5px'
    },
    fabProgress: {
        color: green[500],
        zIndex: 1,
    },
    checkIcon: {
        fill: green[500],
        zIndex: 1,
        stroke: green[500],
        strokeWidth: 1.2
    },
}));


export default function AssignTruckPopup(props: any) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [truckNumber, setTruckNumber] = useState<any>({ label: props.assignTruckForm.truckNumber, value: props.assignTruckForm.truckNumber });
    const [transporter, setTransporter] = useState<any>({ label: props.assignTruckForm.transporterName, value: props.assignTruckForm.transporterCode });
    const [truckUrl, setTruckUrl] = useState(`${endpointContants.fetchTrucksForTransporter}?transporter=''`);
    const transporterUrl = `${endpointContants.fetchTransporters}`;
    const truckKVmapping = { label: "label", value: "value" };
    const transporterKVmapping = { label: "label", value: "value" };
    const [formvalues, setFormvalues] = useState(props.assignTruckForm);
    const [uploadDocumentPopup, setUploadDocumentPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef<number>();

    const handleClose = () => {
        props.onClose();
        setOpen(false);
    };

    const handleConfirm = async() => {
        formvalues.etokenDto.tokenType = formvalues.tokenType;
        console.log(formvalues);
        let res = await AssignTruckAndDriverService.assignTruckAdmin(formvalues);
        console.log('assignTruck', res.status, res)
        if (res) {
            console.log('assignTruck', res)
            await  props.onClose();
        }
    }

    const methods = useForm({
        //resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: formvalues,
    });

    useEffect(() => {
        formvalues.etokenDto = {}
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        setUploadDocumentPopup(true)
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 5000);
        }
    };

    return (
        <FormProvider {...methods}>
            <Dialog
                onClose={handleClose}
                open={open}
                PaperProps={{
                    style: { borderRadius: '0px', width: '600px', height: '500px' }
                }}
            >
                <DialogContent style={{ padding: '18px', paddingBottom: '0px' }}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <StyledTableCell colSpan={4}>
                                    <Typography style={{ fontFamily: "Dubai Medium" }}>
                                        Truck Details
                                    </Typography>
                                    <hr style={{ borderTop: '4px solid #FF3E3E', width: '15%', margin: 0 }} />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell colSpan={2} className={classes.cellDesign}>
                                    <ApplnAutoCompleteAsync
                                        name={"transporterCode"}
                                        label="Search by Transporter name"
                                        style={{ marginTop: "2px" }}
                                        defaultValue={transporter}
                                        kvMapping={transporterKVmapping}
                                        remoteUrl={transporterUrl}
                                        isAssignTruck={true}
                                        onSelectMenu={(value: any) => {
                                            setTruckNumber({ label: '', value: '' });
                                            console.log("transporter selected new", value)
                                            setTruckUrl(
                                                `${endpointContants.fetchTrucksForTransporter}?transporter=${value}`
                                            );
                                            formvalues.transporterCode = value;
                                            // setTransporter({ name: option.label, value: option.value });
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell colSpan={2} className={classes.cellDesign}>
                                    <ApplnAutoCompleteAsync
                                        name={"truckNumber"}
                                        label="Search by Truck number"
                                        style={{ marginTop: "2px" }}
                                        defaultValue={truckNumber}
                                        kvMapping={truckKVmapping}
                                        remoteUrl={truckUrl}
                                        isAssignTruck={true}
                                        onSelectMenu={(value: any) => {
                                            console.log("truck selected new", value)
                                            // setTruckNumber({ name: option.label, value: option.value });
                                            formvalues.truckNumber = value;
                                        }}
                                    />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell colSpan={4} style={{ paddingTop: '35px', paddingBottom: '0px' }}>
                                    <Typography style={{ fontFamily: "Dubai Medium" }}>
                                        Token Details
                                    </Typography>
                                    <hr style={{ borderTop: '4px solid #FF3E3E', width: '15%', margin: 0 }} />
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell className={classes.cellDesign} style={{ paddingRight: '0px' }}>
                                    <Grid item xs={12} style={{ paddingBottom: '5px' }}>Token number</Grid>
                                    <Grid item xs={12}>
                                        <CssTextField
                                            placeholder="Enter token"
                                            variant="outlined"
                                            style={{ width: '150px' }}
                                            value={formvalues.tokenType == 'MT IN' ? formvalues.tokenIn : formvalues.tokenOut}
                                            onChange={(e) => {
                                                console.log('from', e.target.value);
                                                formvalues.tokenType == 'MT IN' ?
                                                    formvalues.tokenIn = e.target.value :
                                                    formvalues.tokenOut = e.target.value
                                            }}
                                        />
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell className={classes.cellDesign} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                    <Grid item xs={12} style={{ paddingBottom: '5px' }}>Token Date</Grid>
                                    <Grid item xs={12}>
                                        <ApplnDatePicker
                                            name={"tokenDate"}
                                            label=""
                                            placeholder="dd/mm/yyyy"
                                            height="32px"
                                            width="120px"
                                            value={formvalues.tokenType == 'MT IN' ? formvalues.tokenInDate : formvalues.tokenOutDate}
                                            iconColor="#1FA5FF"
                                            onChange={() => {
                                                console.log('date', methods.getValues().tokenDate)
                                                formvalues.tokenType == 'MT IN' ?
                                                    formvalues.tokenInDate = methods.getValues().tokenDate :
                                                    formvalues.tokenOutDate = methods.getValues().tokenDate
                                            }} />
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell colSpan={2} className={classes.cellDesign} style={{ paddingLeft: '0px' }}>
                                    <Grid item xs={12} style={{ paddingTop: '30px', paddingBottom: '5px' }}>Time slot</Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <CssTextField
                                                placeholder="hh:mm"
                                                variant="outlined"
                                                name="fromTime"
                                                type="time"
                                                fullWidth
                                                value={formvalues.tokenType == 'MT IN' ? formvalues.tokenInSlotTo : formvalues.tokenOutSlotTo}
                                                onChange={(e) => {
                                                    console.log('from', e.target.value);
                                                    formvalues.tokenType == 'MT IN' ?
                                                        formvalues.tokenInSlotTo = e.target.value :
                                                        formvalues.tokenOutSlotTo = e.target.value
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CssTextField
                                                variant="outlined"
                                                fullWidth
                                                placeholder="hh:mm"
                                                name="toTime"
                                                type="time"
                                                value={formvalues.tokenType == 'MT IN' ? formvalues.tokenInSlotFrom : formvalues.tokenOutSlotFrom}
                                                onChange={(e) => {
                                                    console.log('from', e.target.value);
                                                    formvalues.tokenType == 'MT IN' ?
                                                        formvalues.tokenInSlotFrom = e.target.value :
                                                        formvalues.tokenOutSlotFrom = e.target.value
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell colSpan={2} className={classes.cellDesign}>
                                    <Grid item xs={12} style={{ paddingBottom: '5px' }}>Admin Comments</Grid>
                                    <Grid item xs={12}>
                                        <CssTextField
                                            placeholder="Please add comments"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={2}
                                            value={formvalues.tokenType == 'MT IN' ? formvalues.tokenInAdminComment : formvalues.tokenOutAdminComment}
                                            InputProps={{
                                                className: classes.input,
                                            }}
                                            onChange={(e) => {
                                                console.log('comm', e.target.value);
                                                formvalues.tokenType == 'MT IN' ?
                                                        formvalues.tokenInAdminComment = e.target.value :
                                                        formvalues.tokenOutAdminComment = e.target.value
                                            }}
                                        />
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell className={classes.cellDesign} >
                                    <Grid container spacing={1} style={{ paddingTop: '50px' }}>
                                        <Grid item xs={2}>
                                            <img src="./upload-icon-small.svg" />
                                        </Grid>
                                        <Grid item xs={7} style={{ paddingTop: '10px' }}>
                                            <Link style={{ textDecoration: 'underline' }}
                                                onClick={handleButtonClick}>
                                                Upload e-token
                                            </Link>
                                        </Grid>
                                        <Grid item xs={3}>
                                        {loading && <CircularProgress size={30} thickness={5} className={classes.fabProgress} />}
                                        {success && <CheckIcon className={classes.checkIcon}/>}
                                        </Grid>
                                    </Grid>
                                    {uploadDocumentPopup &&
                                        <UploadDocumentPopup
                                            onClose={() => setUploadDocumentPopup(false)}
                                            popUpParams={{
                                                uploadType: "token",
                                            }}
                                            onSuccess={(files: any) => {
                                                console.log(files);
                                                    let file = files[0];
                                                    let promiseData = new Promise(
                                                        (resolve, reject) => {
                                                          const reader = new FileReader();
                                                          reader.onload = (event) => {
                                                            resolve(event.target.result);
                                                          };
                                                          reader.onerror = (err) => {
                                                            reject(err);
                                                          };
                                                          reader.readAsDataURL(file);
                                                        }
                                                      );
                                                      promiseData.then((result:any) => {
                                                        const contentArr = result.split(",");
                                                        const fileType = contentArr[0]
                                                          .replace("data:", "")
                                                          .replace(";base64", "");
                                                        formvalues.etokenDto.fileContent = contentArr[1];
                                                        formvalues.etokenDto.fileType = fileType;
                                                        formvalues.etokenDto.fileName = file.name;
                                                        console.log("Document", contentArr[1], fileType, file.name)
                                                      });
                                                
                                                timer.current = window.setTimeout(() => {
                                                    setUploadDocumentPopup(false)
                                                }, 5000);
                                               
                                            }}
                                        />}
                                </StyledTableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button style={{
                        backgroundColor: "#1360D2",
                        color: "#fff",
                        width: '100px',
                        height: '35px',
                        fontSize: '16px', fontFamily: 'Dubai Light', fontWeight: 600,
                        borderRadius: '4px',
                        marginRight: '40px',
                        marginBottom: '15px'
                    }}
                        onClick={handleConfirm}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </FormProvider>
    )

}