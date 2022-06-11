import React, { useEffect, Fragment, useState } from 'react';
import { Field, useField, FieldAttributes, FastField, FieldProps } from "formik";
import { ElementInputProps, LabelValue } from '../../common/ElementInputProps';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress ,Typography} from '@material-ui/core';
import './autocomplete.css';
import { getHttp } from '../../common/HttpService';

type MySelectFieldProps =
    {
        options?: LabelValue[],
        remoteUrl?: string,
        reload?: number,
        kvMapping?: any,
        onSelect?(name:any, value:any, label:any): void,
        onSelectMenu?(name:any, value:any, label:any): void,
        styling?:any,
        input?:any,
        isAssignTruck?:boolean
       
    } & ElementInputProps & FieldAttributes<{}>


const AppAutoCompleteAsyc: React.FC<MySelectFieldProps> = ({ 
    options, required = false, name, onSelectMenu, label, helperText, type = "text", remoteUrl, kvMapping, onSelect, isAssignTruck, styling="normal", input}) => {
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
                            let qurl;

                            if (remoteUrl.indexOf('?') === -1) {
                               qurl = remoteUrl + '?q=' + `${value}`;
                            } else {
                                
                                 qurl = remoteUrl + '&q=' + `${value}`;
                            }
                         
                            
                         
                            console.log("url::::", qurl);
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
                                if(!isAssignTruck) onSelect(name, option.value,option.label); 
                                if(isAssignTruck) onSelectMenu(name, option.value,option.label);
                            }
                            else {
                                event.target.value = '';
                                setFieldValue(name, '');
                                if(!isAssignTruck) onSelect(name, '','');
                                if(isAssignTruck) onSelectMenu(name, '','');
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
                                    renderOption={(option) => (
                                        <Typography variant="h3">{option.label}</Typography>
                                      )}
                                    getOptionLabel={(option: LabelValue) => option.label}
                                    getOptionSelected={(option: LabelValue, value: any) => {
                                        return true;
                                    }}
                                    
                                    onChange={handleChange}
                                    onInputChange={onKeyPressInput}
                                    onClose={handleClose}
                                    renderInput={(params: any) => {
                                        return (<>
                                            <div className="autoSelect-txt-div">
                                                <TextField autoComplete="false"   
                                                input={input}
                                                {...params} 
                                                label={label}  
                                                variant="outlined"
                                                margin="dense"   
                                                InputProps={{
                                                    style:{
                                                        fontSize: '15px', 
                                                        color:'#0E1B3D',
                                                        fontFamily:'Dubai Light',
                                                        fontWeight:600
                                                       }
                                                }}
                                                InputLabelProps={{
                                                    style:{
                                                     fontSize: '15px', 
                                                     fontStyle: styling,
                                                     color:'#5A5A5A',
                                                     fontFamily:'Dubai Light',
                                                     fontWeight:600
                                                    }
                                                }}
                                                   
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