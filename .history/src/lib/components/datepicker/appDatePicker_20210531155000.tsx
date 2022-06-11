import React, { useState, useEffect } from 'react';
import { FieldAttributes, Field, FieldProps, useField, FastField, useFormikContext } from "formik";
import { ElementInputProps } from "../../common/ElementInputProps";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";




type MydateProps =
    {

    } & ElementInputProps & FieldAttributes<{}>;

type MyDateState = {
    dpDate: Date;
}



const AppDatePicker: React.FC<MydateProps> = (props) => {

    const [field, meta, helpers] = useField<{}>(props);
    const renders = React.useRef(0);

    const { label, name,iconColor ,defaultDate,...rest } = props;
    let compDate:Date=defaultDate?defaultDate:null;
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

                        }
                        else
                        {
                            setFieldValue(name, datestr);
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
                                    placeholder={label}
                                    value={compDate}
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    autoOk={true}
                                    onChange={val => {
                                        compDate = val;
                                        handleChange(val)
                                    }
                                  

                                    }
                                    margin="dense"
                                    inputVariant="outlined"
                                    InputProps = {{
                                        endAdornment: null,
                                        style:{
                                           fontSize: '16px',
                                           fontFamily:'Dubai Regular'
                                           }
                                    }}
                                    InputLabelProps={{
                                       style:{
                                       fontSize: '16px',
                                       fontFamily:'Dubai Regular'
                                       
                                       }}}
                                    KeyboardButtonProps={{
                                        style:{
                                            fontSize: '16px',
                                            color:iconColor,
                                            padding:0
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

