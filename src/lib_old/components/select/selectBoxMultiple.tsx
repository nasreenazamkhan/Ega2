import React, { useEffect } from 'react';
import { Field, useField, FieldAttributes, FastField, FieldProps } from "formik";
import { ElementInputProps, LabelValue } from '../../common/ElementInputProps';
import { FormControl, InputLabel, Select, Input, MenuItem, Checkbox, ListItemText } from '@material-ui/core';


type MySelectFieldProps =
    {
        options: LabelValue[],
        multiple?: boolean,
        selectedItems: String[]
    } & ElementInputProps & FieldAttributes<{}>



const SelectBoxMutliple: React.FC<MySelectFieldProps> = ({ placeholder, options, required = false,
    name, label, helperText, type = "text", selectedItems }) => {
    const renders = React.useRef(0);

    return (
        <>

            <FastField name={name}>
                {
                    ({ form, field, meta }: FieldProps) => {
                        const optionsCopy = [...options];
                        const result = new Map(optionsCopy.map(i => [i.value, i.label]));

                        let itms = field.value;

                        let data = itms.toString();

                        return (
                            <>
                                {/* <div>renders:{renders.current++}</div> */}

                                <FormControl fullWidth variant="outlined">
                                    <InputLabel >{label}</InputLabel>
                                    <Select {...field}
                                        label={label}
                                        id={field.name}
                                        multiple={true}
                                        input={<Input />}
                                        variant="outlined"
                                        renderValue={(e: Array<string>) => {
                                            let xx = [...e];
                                            let fnlList = xx.map((x: string) => {
                                                return result.get(x) + ',';
                                            })
                                            return (<span>{fnlList}</span>)
                                        }}
                                        MenuProps={{
                                            variant: "menu",
                                            getContentAnchorEl: null
                                        }}
                                    >
                                        <MenuItem value="-1" key="-1">
                                            <em>{placeholder}</em>
                                        </MenuItem>
                                        {options.map((option, i) => {
                                            return (
                                                <MenuItem value={option.value} key={i}  >
                                                    <Checkbox checked={data.indexOf(option.value) > -1} />
                                                    <ListItemText primary={option.label} />
                                                </MenuItem>
                                            );
                                        })}

                                    </Select>
                                </FormControl>
                            </>
                        )
                    }
                }
            </FastField>

        </>
    )
}

export default React.memo(SelectBoxMutliple);