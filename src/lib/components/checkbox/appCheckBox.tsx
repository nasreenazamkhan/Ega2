import React, { useState, useEffect } from 'react';
import { Field, useField, FieldAttributes, FieldProps, FastField, getIn } from "formik";
import { ElementInputProps, LabelValue } from '../../common/ElementInputProps';
import { Checkbox, FormLabel, FormControlLabel } from '@material-ui/core';


type MyCheckFieldProps =
    {
        options: LabelValue[]
    } & ElementInputProps & FieldAttributes<{}>



export const AppCheckBox: React.FC<MyCheckFieldProps> = (props) => {

    const renders = React.useRef(0);
    let oldrender = React.useRef(0);
    const { options, name, label } = props;

    useEffect(() => {
        console.log(' IN useEffect');
    }, [props])
    // const shouldComponentUpdate = (nextProps: any, currentProps: any) => {

    //     // console.log(getIn(currentProps.formik.values, currentProps.name));
    //     // console.log(getIn(nextProps.formik.values, nextProps.name));
    //     console.log('In should update');
    //     if (oldrender.current === renders.current) {
    //         return false;
    //     }
    //     else {
    //         oldrender.current = renders.current;
    //         return true;
    //     }
    //     // return refresh;
    // }

    return (
        <>
            <Field name={name}>
                {
                    ({ form, field }: FieldProps) => {
                        const { setFieldValue } = form;
                        console.log('In field Value');

                        let selectedOptions: any = field.value;
                        for (let i = 0; i < options.length; i++)
                            options[i].selected = false;

                        for (let i = 0; selectedOptions && i < selectedOptions.length; i++) {
                            for (let j = 0; j < options.length; j++) {
                                if (selectedOptions[i] === options[j].value) {
                                    options[j].selected = true;
                                    break;
                                }
                            }
                        }
                        return (
                            <>
                                <FormLabel component="legend">{label}</FormLabel>
                                {
                                    options.map((item, i) => {
                                        return (
                                            <FormControlLabel key={i}
                                                control={<Checkbox
                                                    checked={item.selected}
                                                    value={item.value}
                                                    onClick={(e: any) => {
                                                        renders.current++;
                                                        if (e.target.checked === true) {
                                                            selectedOptions.push(e.target.value);
                                                        } else {
                                                            selectedOptions =
                                                                selectedOptions.filter
                                                                    ((fl: any) => { return fl !== e.target.value })
                                                        }
                                                        if (selectedOptions)
                                                            setFieldValue(name, selectedOptions);
                                                        else
                                                            setFieldValue(name, []);

                                                    }}
                                                />}
                                                label={item.label}
                                            />
                                        )
                                    })
                                }
                            </>
                        )


                    }
                }
            </Field>

        </>
    )
}

