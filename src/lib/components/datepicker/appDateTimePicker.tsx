import React, { useState, useEffect } from 'react';
import { FieldAttributes, Field, FieldProps, useField } from "formik";
import { ElementInputProps } from "../../common/ElementInputProps";
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider, DatePicker, DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";




type MydateProps =
    {

    } & ElementInputProps & FieldAttributes<{}>;

type MyDateState = {
    dpDate: Date;
}

const AppDateTimePicker: React.FC<MydateProps> = (props) => {
    const [compDate, setCompDate] = useState(null);
    const [field, meta, helpers] = useField<{}>(props);


    useEffect(() => {

        var str: any = field.value;
        if (str) {
            let dateStr = str.split(' ')[0];
            let timeStr = str.split(' ')[1];
            let day = dateStr.split('/')[0];
            let mon = dateStr.split('/')[1];
            let yr = dateStr.split('/')[2];
            let hr = timeStr.split(":")[0];
            let min = timeStr.split(":")[1];
            let myDate = new Date(yr, mon - 1, day, hr, min);
            if (myDate instanceof Date)
                setCompDate(myDate);
        }

    }, [])

    const { label, name, ...rest } = props;
    return (
        <Field name={name}>
            {
                ({ form, field }: FieldProps) => {
                    const { setFieldValue } = form;
                    const { value } = field;

                    const handleChange = (val: any) => {

                        if (val && val != 'Invalid Date') {
                            let day = val.getDate();
                            let month = val.getUTCMonth() + 1;
                            let year = val.getUTCFullYear();
                            let hr = val.getHours();
                            let min = val.getMinutes();
                            let datestr = day + '/' + month + '/' + year + ' ' + hr + ':' + min;
                            setFieldValue(name, datestr);

                        }
                        setCompDate(val);
                    }

                    return (
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            {/* <KeyboardDatePicker
                                fullWidth
                                clearable
                                label={label}
                                placeholder={label}
                                value={compDate}
                                format="dd/MM/yyyy" onChange={handleChange} /> */}
                            <KeyboardDateTimePicker
                                label={label}
                                placeholder={label}
                                value={compDate}
                                variant="inline"
                                format={"dd/MM/yyyy HH:mm"}
                                onChange={handleChange}
                                ampm={false}
                                autoOk={true}
                            />

                        </MuiPickersUtilsProvider>
                    )
                }
            }
        </Field>
    )
}

export default React.memo(AppDateTimePicker);
