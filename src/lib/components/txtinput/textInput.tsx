import { TextField, makeStyles, Icon } from "@material-ui/core";
import { ClearOutlined, AccountCircle } from '@material-ui/icons';
import { FastField, FieldAttributes, FieldProps } from "formik";
import React, { useEffect } from 'react';
import { ElementInputProps } from '../../common/ElementInputProps';
import './textInput.css';
import ClearIcon from "../icons/clearIcon";

type MyTextFieldProps =
    { iconType?: string } & ElementInputProps & FieldAttributes<{}>;


const useStyles = makeStyles(theme => ({
    txtDiv: {
        display: "flex"
    },
    iconDiv: {
        width: "25px",
        "& span": {
            position: "absolute",
            top: "40%",
            fontSize: "16px"
        }
    },
    textInput : {
        textAlign: 'left', 
        color:'#494949', 
        fontWeight:600,
    },
    labelRoot :{
        fontWeight:600, 
        color:'#9A9A9A', 
        fontSize:'0.9rem'
    }
}));


const TextInput: React.FC<MyTextFieldProps>
    = ({ required = false, name, label, helperText, fieldIcon, placeholder, disabled }) => {
        const renders = React.useRef(0);
        const showIcon = false;
        const classes = useStyles();
        useEffect(() => {
        }, [])

        return (
            <>
                <FastField name={name}>
                    {
                        ({ form, field, meta }: FieldProps) => {
                            const { setFieldValue } = form;

                            const handleIconClick = (event: any) => {
                                setFieldValue(name, '');
                            }

                            let showError = false;
                            if (meta.touched && meta.error) {
                                showError = true;
                                helperText = meta.error;
                            }
                            let icon = null;
                            if (field.value) {
                                icon = <ClearIcon onClick={handleIconClick} />;
                            } else {
                                icon = null;
                            }
                            return (
                                <>
                                    {/* <div>renders:{renders.current++}</div> */}
                                    <div className={classes.txtDiv}>
                                        {fieldIcon && <div className={classes.iconDiv}><Icon>{fieldIcon}</Icon></div>}
                                        <TextField {...field} 
                                            label={label} 
                                            fullWidth 
                                            id={field.name}
                                            disabled={disabled} 
                                            error={showError}
                                            helperText={showError ? meta.error : ""}
                                            required={required} placeholder={placeholder}
                                            InputProps={{
                                                endAdornment: icon,
                                                classes: { 
                                                    root: classes.textInput
                                                }
                                            }}
                                            InputLabelProps={{
                                                classes: {
                                                  root: classes.labelRoot,
                                                }
                                              }}
                                        />
                                    </div>
                                </>

                            )
                        }
                    }

                </FastField>

            </>
        )

    }

export default React.memo(TextInput);