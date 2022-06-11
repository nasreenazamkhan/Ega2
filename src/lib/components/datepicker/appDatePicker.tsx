import React, { useState, useEffect } from 'react';
import { FieldAttributes, Field, FieldProps, useField, FastField, useFormikContext } from "formik";
import { ElementInputProps } from "../../common/ElementInputProps";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { IconButton, makeStyles } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

type MydateProps =
    { handleDateChange?(value: any): void, booking?:Boolean } & ElementInputProps & FieldAttributes<{}>;

type MyDateState = {
    dpDate: Date;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiInputBase-input': {
            fontSize: '14px',
            paddingTop: '8px',
            paddingLeft: '2px',
            color: '#191919',
            fontFamily: 'Dubai Light',
            fontWeight: 600,
        }
    }
}))


const AppDatePicker: React.FC<MydateProps> = (props) => {

    const [field, meta, helpers] = useField<{}>(props);
    const renders = React.useRef(0);
    const classes = useStyles();
    const { label, name, iconColor, defaultDate, ...rest } = props;
    let compDate: Date = defaultDate ? defaultDate : null;
    // console.log(props);
    useEffect(() => {
    }, [])

    var str: any = field.value;
    if (str && str.length > 0) {
        let day = str.split('/')[0];
        let mon = str.split('/')[1];
        let yr = str.split('/')[2];
        let myDate = new Date(yr, mon - 1, day);
        if (myDate instanceof Date)
            compDate = myDate;
    }

    return (
        <FastField name={name}>
            {
                ({ form, field }: FieldProps) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    let datestr = '';
                    const handleChange = (val: any) => {
                        let datt = null;
                        console.log(val);
                        if (val && val !== 'Invalid Date') {
                            let day = val.getDate();
                            let month = val.getMonth() + 1;
                            let year = val.getFullYear();
                            datestr = day + '/' + (val.getMonth() + 1) + '/' + year;
                            setFieldValue(name, datestr);
                            if(props.booking) props.handleDateChange(datestr);
                        }
                        else {
                            setFieldValue(name, datestr);
                            if(props.booking) props.handleDateChange(datestr);
                        }
                        console.log(datestr);
                    }

                    return (
                        <>
                            {/* <div>renders:{renders.current++}</div> */}

                            <MuiPickersUtilsProvider utils={DateFnsUtils}  >
                                <KeyboardDatePicker
                                    fullWidth
                                    label={label}
                                    placeholder={rest.placeholder}
                                    value={compDate}
                                    variant="inline"
                                    className={classes.root}
                                    format="dd/MM/yyyy"
                                    autoOk={true}
                                    onChange={val => {
                                        compDate = val;
                                        handleChange(val)
                                    }}
                                    margin="dense"
                                    // inputVariant="outlined"
                                    InputProps={{
                                        endAdornment: null,
                                        disableUnderline: true,
                                        style: {
                                            fontFamily: 'Dubai Regular',
                                            boxShadow: '0px 0px 5px #00000029',
                                            border: '1px solid #666',
                                            borderRadius: '3px',
                                            width: props.width ? props.width : '140px',
                                            height: props.height ? props.height : '30px',
                                            fontWeight: 600,
                                            padding: '2px',
                                            paddingLeft: '8px',
                                            color: '#191919',
                                        },
                                    }}
                                    keyboardIcon={<img src="./calendar.svg" alt="calendar" width="15px" height="15px" style={{ margin: '5px' }} />}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '16px',
                                            fontFamily: 'Dubai Regular',
                                        }
                                    }}
                                    KeyboardButtonProps={{
                                        style: {
                                            fontSize: '16px',
                                            color: iconColor,
                                            padding: 0
                                        }
                                    }}
                                />

                            </MuiPickersUtilsProvider>
                        </>
                    )
                }
            }
        </FastField>
    )
}

export default React.memo(AppDatePicker);

