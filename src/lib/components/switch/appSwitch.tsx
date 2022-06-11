import React from 'react';
import { FormLabel, FormControlLabel, Switch } from "@material-ui/core";
import { Field, useField, FieldAttributes, FastField } from "formik";
import { ElementInputProps } from '../../common/ElementInputProps';
import './appSwitch.css';

type MySwitchFieldProps =
    {
        status: boolean,
        onText?: string,
        offText?: string
    } & ElementInputProps & FieldAttributes<{}>;

const MyAppSwitch: React.FC<MySwitchFieldProps> = ({ onText, offText, required, label, type, helperText, error, ...props }) => {
    const [field, meta] = useField<{}>(props);
    let showError = false;
    if (meta.touched && meta.error) {
        showError = true;
        helperText = meta.error;
    }

    let status = false;
    let switchTitle = offText;
    if (field.value === true) {
        status = true;
        switchTitle = onText;
    }

    return (
        <>
            <FormLabel component="div">{label}</FormLabel>
            <FormControlLabel
                control={
                    <Switch checked={status} {...field}
                        id={field.name} />
                }
                label={switchTitle}
            />

        </>
    )
}

const AppSwitch: React.FC<MySwitchFieldProps>
    = ({ onText, offText, required = false, name, label, helperText }) => {


        return (
            <>
                <FastField
                    as={MyAppSwitch} label={label}
                    name={name} id={name}
                    helperText={helperText}
                    required={required} onText={onText} offText={offText} />

            </>
        )

    }

export default React.memo(AppSwitch);