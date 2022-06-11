import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@material-ui/core';
import { FastField, FieldAttributes, FieldProps } from "formik";
import React, { useEffect } from 'react';
import { ElementInputProps, LabelValue } from '../../common/ElementInputProps';


type MySelectFieldProps =
    {
        options: LabelValue[],
        multiple?: boolean
    } & ElementInputProps & FieldAttributes<{}>



const SelectBox: React.FC<MySelectFieldProps> = ({ multiple, options, required = false, name, label,
    placeholder, helperText, fieldAction }) => {
    let originalHelperText = '';
    useEffect(() => {
        originalHelperText = helperText;
    }, []);
    const renders = React.useRef(0);

    return (
        <>

            <FastField name={name}>
                {
                    ({ form, field, meta }: FieldProps) => {

                        let showError = false;
                        if (meta.touched && meta.error) {
                            showError = true;
                            helperText = meta.error;
                        } else {
                            helperText = originalHelperText;
                        }
                        return (
                            <>
                                {/* <div>renders:{renders.current++}</div> */}
                                <FormControl fullWidth>
                                    <InputLabel >{label}</InputLabel>
                                    <Select {...field}
                                        label={label}
                                        id={name}
                                        placeholder={placeholder}
                                        error={showError}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        {options.map((option, i) => {
                                            // console.log(option);

                                            return (
                                                <MenuItem value={option.value} key={i}>
                                                    {option.label}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                    <FormHelperText className={showError === true ? "Mui-error" : ""} >{helperText}</FormHelperText>
                                </FormControl>
                            </>
                        )
                    }
                }
            </FastField>

        </>
    )
}

export default React.memo(SelectBox);