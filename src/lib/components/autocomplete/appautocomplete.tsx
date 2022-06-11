import React, { useEffect, Fragment, useState } from 'react';
import { Field, useField, FieldAttributes, FastField, FieldProps } from "formik";
import { ElementInputProps, LabelValue } from '../../common/ElementInputProps';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress } from '@material-ui/core';
import './autocomplete.css';
import { getHttp } from '../../common/HttpService';


type MySelectFieldProps =
    {
        options?: LabelValue[],
        remoteUrl?: string,
        reload?: number,
        kvMapping?: any
    } & ElementInputProps & FieldAttributes<{}>


const AppAutoComplete: React.FC<MySelectFieldProps> = ({ options, required = false, name,
    label, reload, kvMapping }) => {
    const [opts, setOpts] = useState({ q: '', timerId: null, dataset: [] });
    const renders = React.useRef(0);

    const intializeList = () => {
        if (options && options.length > 0) {
            let ds: any = options;
            if (kvMapping) {
                ds = options.map((opt) => {
                    let labEle = 'opt.' + kvMapping.label;
                    let labelv = eval(labEle);
                    let valEle = 'opt.' + kvMapping.value;
                    let val = eval(valEle);
                    return { label: labelv, value: val }
                })
            }
            setOpts({
                q: '',
                dataset: ds,
                timerId: null
            })

            console.log(ds);
        }

    }


    useEffect(() => {
        intializeList();
    }, [])

    useEffect(() => {
        intializeList();
    }, [reload])


    return (
        <>

            <Field name={name}>
                {
                    ({ form, field, meta }: FieldProps) => {
                        const { setFieldValue } = form;

                        return (

                            <>
                                {/* <div>renders:{renders.current++}</div> */}
                                <Autocomplete
                                    value={field.value}
                                    placeholder={label}
                                    autoHighlight
                                    options={opts.dataset}
                                    getOptionLabel={(option) => option ? option.label : ''}
                                    getOptionSelected={(option: LabelValue, value: any) => {
                                        return value.value === option.value
                                    }}
                                    // renderOption={(opt, stat) => {
                                    //     console.log(opt)
                                    //     return <>carren</>
                                    // }}
                                    style={{ width: 300 }}
                                    onChange={(e, item) => item ? setFieldValue(name, item) : setFieldValue(name, '')}
                                    renderInput={(params) => <TextField {...params} label={label} />}
                                />

                            </>
                        )
                    }
                }
            </Field>
        </>
    )
}

export default React.memo(AppAutoComplete);