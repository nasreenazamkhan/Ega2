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


const AppAutoCompleteAsyc: React.FC<MySelectFieldProps> = ({ options, required = false, name,
    label, helperText, type = "text", remoteUrl, kvMapping }) => {
    const [opts, setOpts] = useState({ q: '', timerId: null, dataset: [] });
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
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
        // if (options && options.length > 0) {
        //     setOpts({
        //         q: '',
        //         dataset: options,
        //         timerId: null
        //     })
        // }
    }, [])


    return (
        <>

            <Field name={name}>
                {
                    ({ form, field, meta }: FieldProps) => {
                        const { setFieldValue } = form;

                        let timerId: any = null;

                        const autocompleteSearch = (value: any) => {
                            setLoading(true);
                            let qurl = remoteUrl + '?q=' + value;
                            getHttp({ url: qurl }, false).then(e => {
                                let dItems: any = [];
                                console.log(e);
                                dItems = e.map((ele: any) => {
                                    let labEle = 'ele.' + kvMapping.label;
                                    let labelv = eval(labEle);
                                    let valEle = 'ele.' + kvMapping.value;
                                    let val = eval(valEle);
                                    return { label: labelv, value: val }
                                });
                                console.log(dItems);
                                setOpts((prevState) => ({
                                    ...prevState,
                                    dataset: dItems
                                }));
                                setLoading(false);

                            }).catch(error => {
                                setLoading(false);
                                let eitems = [{ label: 'Unable to Fetch the data: ' + error, value: '-3333' }]
                                setOpts((prevState) => ({
                                    ...prevState,
                                    dataset: eitems
                                }));
                            })
                        };







                        const handleChange = (event: any, option: LabelValue) => {
                            setRefresh(true);
                            if (option != null) {
                                setFieldValue(name, option.value);

                            }
                            else {
                                event.target.value = '';
                                setFieldValue(name, '');
                            }
                        }

                        const onKeyPressInput = (event: any, value: string, reason: string) => {
                            if (event.type === 'click') {
                                return;
                            }
                            setRefresh(true);

                            if (remoteUrl && value !== '') {
                                clearTimeout(opts.timerId);

                                timerId = setTimeout(() => {
                                    autocompleteSearch(value)
                                }, 200);
                                setOpts((prevState) => ({
                                    ...prevState,
                                    q: value,
                                    timerId: timerId
                                }));


                            }

                        }

                        const handleClose = (event: any, reason: any) => {

                            if (remoteUrl) {
                                setOpts((prevState) => ({
                                    ...prevState,
                                    dataset: []
                                }));
                            }
                            console.log('closing');
                            setRefresh(false);


                        }

                        return (

                            <>
                                {/* <div>renders:{renders.current++}</div> */}

                                <Autocomplete
                                    freeSolo
                                    autoComplete={false}
                                    options={opts.dataset}
                                    getOptionLabel={(option: LabelValue) => option.label}
                                    getOptionSelected={(option: LabelValue, value: any) => {
                                        return true;
                                    }}
                                    fullWidth
                                    onChange={handleChange}
                                    onInputChange={onKeyPressInput}
                                    onClose={handleClose}
                                    renderInput={(params: any) => {
                                        return (<>
                                            <div className="autoSelect-txt-div">
                                                <TextField autoComplete="false"   {...params} label={label}
                                                />
                                                {loading && <CircularProgress className="auto-search-loading-icon" />}
                                            </div>
                                        </>)
                                    }}
                                />
                            </>
                        )
                    }
                }
            </Field>
        </>
    )
}

export default React.memo(AppAutoCompleteAsyc);