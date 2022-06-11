import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Typography from "@material-ui/core/Typography";
import { Avatar, Divider, Grid, IconButton, InputLabel, Paper, StepContent, SwipeableDrawer } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import clsx from 'clsx';
import { timer } from "rxjs";
import BookingService from "../../service/BookingService";

const TestConnector = withStyles({
    line: {
        borderColor: '#0E1B3D',
        borderLeftStyle: 'dashed',
        borderLeftWidth: 2,
        marginLeft: '129px',
    },
    root: {
        padding: '0 0 2px'
    }
})(StepConnector);

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    icon: {
        color: "green !important",
    },
    list: {
        width: '500px'
    },
    title: {
        fontFamily: 'Dubai Light',
        fontWeight: 600,
        fontSize: '18px'
    },
    iconRoot: {
        display: 'flex',
    },
    avtar: {
        wordWrap: 'break-word',
        textAlign: 'center',
        backgroundColor: '#0E1B3DBD',
        boxShadow: '0px 3px 2px #00000029',
        border: '1px solid #EEEEEE',
        borderRadius: '28px',
        width: '45px',
        height: '43px',
        fontSize: '12px',
        fontFamily: 'Dubai Light',
        fontWeight: 600,
    },
    avtarGrey: {
        wordWrap: 'break-word',
        textAlign: 'center',
        backgroundColor: '#848484',
        boxShadow: '0px 3px 2px #00000029',
        border: '1px solid #EEEEEE',
        borderRadius: '28px',
        width: '45px',
        height: '43px',
        fontSize: '12px',
        fontFamily: 'Dubai Light',
        fontWeight: 600,
    },
    circle: {
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: '#1FB4FF',
    },
    label: {
        fontFamily: 'Dubai Light',
        fontWeight: 600,
        fontSize: '14px',
        color: '#434343 !important',
        '&.MuiStepLabel-label.MuiStepLabel-completed': {
            fontWeight: 600,
        },
        '& .MuiStepLabel-label.MuiStepLabel-active': {
            fontWeight: 600,
        }
    },
    line: {
        borderColor: '#0E1B3D',
        borderLeftStyle: 'dashed',
        borderLeftWidth: 2,
        marginLeft: '156px',
        height: '25px',
        backgroundColor: 'transparent'
    },
}));

export default function Track(props: any) {
    const classes = useStyles();
    const [open, setOpen] = useState(true)
    const [activeStep, setActiveStep] = useState(2);
    const [data, setData] = useState([]);

    useEffect(() => {
        BookingService.fetchTrackDetails(
            props?.trackDetails?.containerNo
        ).then((response) => {
            console.log('containerTrack', response);
            // props?.trackDetails?.tracks
            // ContainerTrackList
            let res = response.data.dataItems[0];
            const compareList = res?.containerTrackList.reduce((objectsByRequest: any, obj: any) => {
                const value = obj['date'];
                objectsByRequest[value] = (objectsByRequest[value] || []).concat(obj);
                return objectsByRequest;
            }, {});
            console.log(compareList)
            setData(compareList)
            // setData(props?.trackDetails?.tracks)
        });
    }, [])

    function getStepContent(activeStep: any) {
        switch (activeStep) {
            case 1:
                return (
                    <></>
                );
            case 2:
                return (
                    <></>
                );
            case 3:
                return (
                    <></>
                );
            case 4:
                return (
                    <></>
                );
            case 5:
                return (
                    <></>
                );
        }
    }

    function SetTimeIcon(props: any) {
        const { inlist } = props;
        return (
            <div className={classes.iconRoot}>
                <Avatar className={inlist.status == "TRUCK_LEAVE" || inlist.status == "TRUCK_DROP" ? classes.avtarGrey : classes.avtar}>{inlist.time}</Avatar>
            </div>
        );
    }

    const handleClose = () => {
        setOpen(false)
        props.onClose();
    }


    return (
        <SwipeableDrawer defaultValue={data} anchor={"right"} open={open} onOpen={() => setOpen(true)} onClose={handleClose}>
            <div className={clsx(classes.list)}>
                <Paper>
                    <Grid container style={{ padding: '10px', paddingRight: 0, paddingBottom: '5px' }}>
                        <Grid item xs={11} justify="flex-start" alignItems="flex-start" >
                            <Typography noWrap className={classes.title}>
                                {`Tracking Details for ${props?.trackDetails?.containerNo}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} justify="flex-start" alignItems="flex-start" >
                            <IconButton onClick={handleClose} style={{ padding: '5px' }}>
                                <Close fontSize="small" style={{ fill: '#0E1B3D' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
                {Object.keys(data).map((cat: any, i: any) => (
                    <Stepper orientation="vertical" activeStep={activeStep} connector={<TestConnector />} style={{ paddingTop: 0, paddingBottom: 0 }}>
                        {/* {Object.keys(data).map((cat: any) => (
                        <> */}
                        <div className="row" style={{ marginBottom: '8px' }} hidden={i == 0}>
                            <Divider orientation="vertical" className={classes.line} />
                        </div>
                        <div className="row" style={{ marginBottom: 0, height: '18px', paddingLeft: '50px' }}>
                            <div style={{ width: '100px', fontSize: '15px', fontWeight: 600, color: '#434343', fontFamily: 'Dubai Regular' }}>{cat}</div>
                            <div className={classes.circle} />
                        </div>
                        {data[cat].map((item: any, index: any) => (
                            <Step key={index} style={{ marginLeft: '120px' }}>
                                <StepLabel
                                    classes={{ label: classes.label, root: classes.label }}
                                    StepIconComponent={SetTimeIcon}
                                    StepIconProps={{
                                        itemID: index,
                                        inlist: { time: item.time, status: item.status }
                                    }}
                                >{item.trackDescription ?? ""}</StepLabel>
                                <StepContent>
                                </StepContent>
                            </Step>
                        ))}
                        {/* </>
                    ))} */}
                    </Stepper>
                ))}
                <div>
                    <Typography component={"div"} className={classes.instructions}>
                        {getStepContent(activeStep)}
                    </Typography>
                </div>
            </div>
        </SwipeableDrawer>
    );
}
