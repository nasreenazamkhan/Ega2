import { TextField, makeStyles, FormControl, InputLabel, Input, Icon } from "@material-ui/core";
import { ClearOutlined } from '@material-ui/icons';
import { FastField, FieldAttributes, FieldProps } from "formik";
import React, { useEffect, useState, forwardRef, Ref, Props } from 'react';
import { ElementInputProps } from '../../common/ElementInputProps';
import theme from "../../common/theme/theme";
import ClearIcon from "../icons/clearIcon";
import { isNumericKey, isBackSpace, isDeleteKeys, isNavigationKeys } from "../../common/Utils";




const useStyles = makeStyles(theme => ({
    telac: {
        width: '12%',
        marginRight: '3%'

    },
    telcc: {
        width: '10%',
        marginRight: '3%'

    },
    telnum: {
        width: '60%'
    },
    helperText: {
        position: 'absolute',
        left: "-45%",
        bottom: "-73%"
    },
    iconDiv: {
        width: "10%",
        "& span": {
            position: "absolute",
            top: "30%",
            fontSize: "16px"
        }
    },
    txtDiv: {
        display: "flex"
    }
}));

const TelNumber: React.FC<ElementInputProps>
    = (props) => {
        const renders = React.useRef(0);
        const classes = useStyles();
        const cc: any = React.createRef();
        const ac: any = React.createRef();
        const tel: any = React.createRef();
        const { name } = props;
        let { helperText, fieldIcon } = props;
        let originalHelperText = helperText;
        let [icon, setIcon] = useState(null);
        let showIcon = false;


        useEffect(() => {
        }, [])

        return (
            <>
                <FastField name={name}>
                    {
                        ({ form, field, meta }: FieldProps) => {
                            const { setFieldValue, setFieldTouched } = form;

                            let showError = false;

                            if (meta.error && meta.touched) {
                                showError = true;
                                helperText = meta.error;
                            } else {
                                helperText = originalHelperText;
                            }
                            if (field.value) {
                                showIcon = true;
                            } else {
                                showIcon = false;
                            }



                            const updateTelNum = (v: any, pos: any) => {

                                let telpattern = field.value;
                                let arr = telpattern.split('-');
                                arr[pos] = v
                                if (pos === 0 && v.length === 3)
                                    ac.current.focus();
                                if (pos === 1 && v.length === 2)
                                    tel.current.focus();

                                // ac.current.focus();
                                setFieldValue(name, arr.join('-'));
                                setFieldTouched(name);

                            }
                            return (
                                <>
                                    <input type="text" name={name} style={{ visibility: 'hidden', width: '0px', position: 'absolute' }} />
                                    <InputLabel error={showError} htmlFor="cc">{props.label}</InputLabel>
                                    <div className={classes.txtDiv}>
                                        {fieldIcon && <div className={classes.iconDiv}><Icon>{fieldIcon}</Icon></div>}
                                        <div>
                                            <TelField val={field.value} pos={0}
                                                style={classes.telcc} showIcon={false}
                                                maxlen="3" showError={showError}
                                                handleKeyUp={(v: any) => updateTelNum(v, 0)} />
                                            <TelField val={field.value} pos={1}
                                                style={classes.telac} showIcon={false}
                                                maxlen="3" showError={showError}
                                                handleKeyUp={(v: any) => updateTelNum(v, 1)} ref={ac} />
                                            <TelField val={field.value} pos={2}
                                                style={classes.telnum} showIcon={showIcon}
                                                maxlen="7" showError={showError} helperText={helperText}
                                                helperStyle={classes.helperText}
                                                handleKeyUp={(v: any) => updateTelNum(v, 2)}
                                                handleIconClick={() => setFieldValue(name, '')} ref={tel} />
                                        </div>
                                    </div>

                                </>

                            )
                        }
                    }

                </FastField>

            </>
        )

    }


interface TelProps {
    showIcon?: boolean,
    maxlen?: string,
    pos?: number,
    val?: string,
    style?: string,
    showError?: any,
    helperText?: any
    helperStyle?: any,
    handleKeyUp?(event: string): void;
    handleIconClick?(event: string): void;

}


const TelField = forwardRef<HTMLInputElement, TelProps>(
    ({ showIcon, maxlen, pos, val,
        style, showError, handleKeyUp, handleIconClick, helperText }, ref) => (

            <>
                <TextField className={style}
                    value={val && val.split("-")[pos] ? val.split("-")[pos] : ''}
                    error={showError} onChange={(e: any) => {
                        if (e.target.value.length <= maxlen)
                            handleKeyUp(e.target.value);
                    }}
                    helperText={helperText}
                    inputRef={ref}
                    FormHelperTextProps={{
                        style: { position: 'absolute', left: '-47.5%', bottom: '-73%' }

                    }}
                    InputProps={showIcon ? {
                        endAdornment: <ClearIcon onClick={handleIconClick} />
                    } : null}


                />
            </>
        ),
);


export default React.memo(TelNumber);
