import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { FastField, FieldAttributes, FieldProps } from "formik";
import React from 'react';
import { ElementInputProps, LabelValue } from '../../common/ElementInputProps';


type MyRadioProps =
    {
        selectedOption: string,
        options: LabelValue[]
    } & ElementInputProps & FieldAttributes<{}>;


const AppRadio: React.FC<MyRadioProps> = ({ options, required = false, name, label, helperText }) => {
    return (
        <>

            <FastField name={name}>
                {
                    ({ form, field, meta }: FieldProps) => {

                        let showError = false;
                        if (meta.touched && meta.error) {
                            showError = true;
                            helperText = meta.error;
                        }
                        return (
                            <>
                                <FormLabel component="legend">{label}</FormLabel>
                                <RadioGroup aria-label="gender" id={field.name}
                                    {...field} row={true}>
                                    {options.map((option, i) => {
                                        return (
                                            <FormControlLabel key={i} value={option.value}
                                                control={<Radio />} label={option.label} />
                                        );
                                    })}
                                </RadioGroup>

                            </>
                        )
                    }
                }
            </FastField>

        </>
    )
}

export default React.memo(AppRadio);