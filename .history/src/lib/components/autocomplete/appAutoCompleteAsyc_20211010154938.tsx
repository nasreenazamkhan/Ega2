import React, { useEffect, Fragment, useState } from 'react';
import { Field, useField, FieldAttributes, FastField, FieldProps } from "formik";
import { ElementInputProps, LabelValue } from '../../common/ElementInputProps';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress, Typography, makeStyles } from '@material-ui/core';
import './autocomplete.css';
import { getHttp } from '../../common/HttpService';
import { propTypes } from 'react-bootstrap/esm/Image';

type MySelectFieldProps =
    {
        options?: LabelValue[],
        remoteUrl?: string,
        reload?: number,
        kvMapping?: any,
        onSelect?: any,
        styling?: any,
        width?: any,
        height?: any,
        isError?: any
    } & ElementInputProps & FieldAttributes<{}>

const useStyles = makeStyles({
    paper: {
        fontSize: "14px",
        fontWeight: 600,
        color: '#0E1B3D',
        fontFamily: 'Dubai Light'
    },
    notchedOutline: {
        '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#666'
        },
        '&:hover $notchedOutline':{
            borderColor: "#666 !important",
          },
          "& .MuiInputBase-input": {
            fontFamily: 'Dubai Light',
            fontSize: '14px',
            fontWeight: 600,
          },
    },
    clearIndicator: {
        fill: '#0E1B3D',
        '& .MuiSvgIcon-root': {
            fill: '#0E1B3D',
        }
    }
});



const AppAutoCompleteAsyc: React.FC<MySelectFieldProps> = ({ options, required = false, name, width, height,
    label, helperText, type = "text", remoteUrl, kvMapping, onSelect, styling = "normal",placeholder, defaultValue,isError }) => {
    const [opts, setOpts] = useState({ q: '', timerId: null, dataset: [] });
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const classes = useStyles();

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
                                onSelect(name, option.value, option.label);
                            }
                            else {
                                event.target.value = '';
                                setFieldValue(name, '');
                                onSelect(name, '', '');
                            }
                        }

                        const onKeyPressInput = (event: any, value: string, reason: string) => {
                            if (event?.type === 'click') {
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
                                    defaultValue={defaultValue}
                                    onChange={handleChange}
                                    onInputChange={onKeyPressInput}
                                    onClose={handleClose}
                                    classes={{ paper: classes.paper, clearIndicator: classes.clearIndicator }}
                                    renderInput={(params: any) => {
                                        return (<>
                                            <div className="autoSelect-txt-div">
                                                <TextField autoComplete="false"
                                                    {...params}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    variant="outlined"
                                                    margin="dense"
                                                    error={isError}
                                                    helperText={helperText}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        style: {
                                                            fontSize: '14px !important',
                                                            color: '#191919',
                                                            boxShadow: '0px 0px 5px #00000029',
                                                            fontFamily: 'Dubai Light',
                                                            fontWeight: 600,
                                                            width: width,
                                                            borderRadius: '3px',
                                                            height: height,
                                                            padding: '2px',
                                                            paddingLeft:'8px'
                                                        },
                                                        classes:  { 
                                                            root: classes.notchedOutline,
                                                            focused: classes.notchedOutline,
                                                            notchedOutline: classes.notchedOutline,
                                                          }
                                                    }}
                                                    InputLabelProps={{
                                                        ...params.InputLabelProps,
                                                        style: {
                                                            fontSize: '15px',
                                                            fontStyle: "normal",
                                                            color: '#5A5A5A',
                                                            fontFamily: 'Dubai Light',
                                                            fontWeight: 600
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