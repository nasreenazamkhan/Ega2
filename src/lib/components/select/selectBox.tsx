import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@material-ui/core';
import { ExpandMoreRounded } from '@material-ui/icons';
import { FastField, FieldAttributes, FieldProps } from "formik";
import React, { useEffect } from 'react';
import { ElementInputProps, LabelValue } from '../../common/ElementInputProps';


type MySelectFieldProps =
    {
        options: LabelValue[],
        multiple?: boolean,
    } & ElementInputProps & FieldAttributes<{}>



const SelectBox: React.FC<MySelectFieldProps> = ({ multiple, options, required = false, name, label, disabled,
    placeholder, helperText, fieldAction, style }) => {
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
                                <FormControl fullWidth >
                                    <InputLabel style={{fontWeight:600, color:'#9A9A9A', fontSize:'1rem'}}>{label}</InputLabel>
                                    <Select {...field}
                                        label={label}
                                        id={name}
                                        disabled={disabled}
                                        placeholder={placeholder}
                                        error={showError}
                                        IconComponent={ExpandMoreRounded}
                                        style={style}
                                        MenuProps={{
                                            anchorOrigin: {
                                                vertical: "bottom",
                                                horizontal: "left"
                                            },
                                            getContentAnchorEl: null,
                                        }}
                                    >
                                        {options.map((option, i) => {
                                            return (
                                                <MenuItem value={option.value} key={i} style={{fontSize:'0.9rem', fontFamily:'Dubai Light', fontWeight:600}}>
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