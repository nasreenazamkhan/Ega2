import {
    Button, Dialog, DialogActions, DialogContent, TableCell, TableRow, Table, Typography, withStyles, createStyles, makeStyles,
    TableBody, TextField, Grid, Link, InputBase, CircularProgress, IconButton, DialogTitle,
} from "@material-ui/core";
import { green } from '@material-ui/core/colors';
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ApplnAutoCompleteAsync from "../../lib/components/autocomplete/ApplnAutoCompleteAsync";
import ApplnDatePicker from "../../lib/components/datepicker/ApplnDatePicker";
import * as endpointContants from "../../utils/ptmsEndpoints";
import UploadDocumentPopup from "../transporter/UploadDocumentPopup";
import CheckIcon from '@material-ui/icons/CheckRounded';
import AssignTruckAndDriverService from '../../service/AssignTruckAndDriverService';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";


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
    buttonRoot: {
        backgroundColor: "#1360D2",
        boxShadow: '0px 1px 4px #00000029',
        borderRadius: '3px',
        opacity: 1,
        fontSize: '14px',
        padding: '5px 30px 5px 30px',
        fontFamily: 'Dubai Light',
        fontWeight: 600
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
}));

export default function AssignTruckPopup(props: any) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [truckNumber, setTruckNumber] = useState<any>({ label: props.assignTruckForm.assignedTruck, value: props.assignTruckForm.assignedTruck });
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
    const [lengthMsg, setMaxLengthMsg] = useState('');
    const [remarks, setRemarks] = useState('');

    const schema = Yup.object().shape({
        transporterCode: Yup.string().required("Transporter Required")
         
       
       
      });

    const handleClose = () => {
        props.onClose();
        setOpen(false);
    };

    const handleConfirm = () => {
        formvalues.etokenDto.tokenType = formvalues.tokenType;
        console.log(formvalues);
        AssignTruckAndDriverService.assignTruckAdmin(formvalues).then((res) => {
            if (res) {
                console.log('assignTruck', res)
                props.onConfirm();
            }
        })

    }


    useEffect(() => {
        formvalues.etokenDto = {}
        setRemarks(formvalues.tokenType == 'MT IN' ? formvalues.tokenInAdminComment : formvalues.tokenOutAdminComment)
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
    const onSubmit = (data:any) => {
        console.log("data",data);
       // updateRequest();
       
      }

      const methods = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: formvalues,
    });


    return (
      
            <Dialog
                onClose={handleClose}
                open={open}
                PaperProps={{
                    style: { borderRadius: '0px', width: '600px', height: '500px' }
                }}
            >
                <DialogTitle disableTypography style={{ margin: 0, padding: 0}}>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon style={{ fill: '#0E1B3D' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ padding: '18px', paddingBottom: '0px' }}>
                <FormProvider {...methods}>
            <form  id="assignTruckForm" onSubmit={methods.handleSubmit(onSubmit)}>
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
                                        label="Search by Transporter code or name"
                                        style={{ marginTop: "2px" }}
                                        defaultValue={transporter}
                                        kvMapping={transporterKVmapping}
                                        remoteUrl={transporterUrl}
                                        isAssignTruck={true}
                                        onSelectMenu={(option: any) => {
                                            setTruckNumber({ label: '', value: '' });
                                            console.log("transporter selected new", option)
                                            setTruckUrl(
                                                `${endpointContants.fetchTrucksForTransporter}?transporter=${option.value}`
                                            );
                                            formvalues.transporterCode = option.value;
                                            setTransporter({ name: option.label, value: option.value });
                                        }}
                                    />
                                </StyledTableCell>
                                <StyledTableCell colSpan={2} className={classes.cellDesign}>
                                    <ApplnAutoCompleteAsync
                                        name={"assignedTruck"}
                                        label="Search by Truck number"
                                        style={{ marginTop: "2px" }}
                                        defaultValue={truckNumber}
                                        kvMapping={truckKVmapping}
                                        remoteUrl={truckUrl}
                                        isAssignTruck={true}
                                        onSelectMenu={(option: any) => {
                                            console.log("truck selected new", option)
                                            setTruckNumber({ name: option.label, value: option.value });
                                            formvalues.assignedTruck = option.value;
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
                                            defaultValue={formvalues.tokenType == 'MT IN' ? formvalues.tokenIn : formvalues.tokenOut}
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
                                            onChange={(e: any) => {
                                                console.log('date', e)
                                                formvalues.tokenType == 'MT IN' ?
                                                    formvalues.tokenInDate = e :
                                                    formvalues.tokenOutDate = e
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
                                                defaultValue={formvalues.tokenType == 'MT IN' ? formvalues.tokenInSlotTo : formvalues.tokenOutSlotTo}
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
                                                defaultValue={formvalues.tokenType == 'MT IN' ? formvalues.tokenInSlotFrom : formvalues.tokenOutSlotFrom}
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
                                            value={remarks}
                                            defaultValue={formvalues.tokenType == 'MT IN' ? formvalues.tokenInAdminComment : formvalues.tokenOutAdminComment}
                                            inputProps={{
                                                maxLength: 250,
                                            }}
                                            InputProps={{
                                                className: classes.input,
                                            }}
                                            onChange={(e) => {
                                                formvalues.tokenInAdminComment = ""
                                                formvalues.tokenOutAdminComment = ""
                                                console.log('comm', e.target.value);
                                                formvalues.tokenType === 'MT IN' ?
                                                    formvalues.tokenInAdminComment = e.target.value :
                                                    formvalues.tokenOutAdminComment = e.target.value
                                                setRemarks(e.target.value)
                                                if (e.target.value.length >= 230)
                                                    setMaxLengthMsg(250 - e.target.value.length + ' characters left.')
                                                else
                                                    setMaxLengthMsg('')
                                            }}
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography
                                                style={{ textAlign: 'left', fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#ff0101', paddingLeft: '5px' }}>
                                                {lengthMsg}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography
                                                style={{ fontFamily: 'Dubai Light', fontWeight: 600, fontSize: '0.8rem', color: '#777777', textAlign: 'end', paddingRight: '5px' }}>
                                                {(remarks?.length ?? 0) + '/' + 250}</Typography>
                                        </Grid>
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
                                            {success && <CheckIcon className={classes.checkIcon} />}
                                        </Grid>
                                    </Grid>
                                    {uploadDocumentPopup &&
                                        <UploadDocumentPopup
                                            onClose={() => setUploadDocumentPopup(false)}
                                            popUpParams={{
                                                uploadType: "token",
                                            }}
                                            onSuccess={(e: any) => {
                                                let files = e.files;
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
                                                promiseData.then((result: any) => {
                                                    const contentArr = result.split(",");
                                                    const fileType = contentArr[0]
                                                        .replace("data:", "")
                                                        .replace(";base64", "");
                                                    formvalues.etokenDto.fileContent = contentArr[1];
                                                    formvalues.etokenDto.fileType = fileType;
                                                    formvalues.etokenDto.fileName = file.name;
                                                    formvalues.etokenDto.adminComment = e.comments;
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
                    </form>
                    </FormProvider>
                </DialogContent>
               
                <DialogActions>
                    <Button
                        classes={{ root: classes.buttonRoot }}
                        type="submit"
                        form="assignTruckForm"
                       // onClick={handleConfirm}
                       >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

      
    )

}