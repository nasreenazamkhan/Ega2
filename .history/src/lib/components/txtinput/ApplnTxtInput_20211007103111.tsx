import { TextField, makeStyles, Icon, withStyles,OutlinedInput } from "@material-ui/core";
import React, { useEffect } from "react";
import { ElementInputProps } from "../../common/ElementInputProps";
import "./textInput.css";
import ClearIcon from "../icons/clearIcon";
import { useFormContext } from "react-hook-form";

const useStyles = makeStyles(() => ({
  txtDiv: {
    display: "flex",
  },
  iconDiv: {
    width: "10%",
    "& span": {
      position: "absolute",
      top: "40%",
      fontSize: "16px",
    },
  },
  txtField: {},
  textInput: {
    textAlign: 'left',
    color: '#494949',
    fontWeight: 600,
    fontFamily:'Dubai Light'
  },
  labelRoot: {
    fontWeight: 600,
    color: '#9A9A9A',
    fontSize: '0.9rem',
    fontFamily:'Dubai Light'
  }
}));

const CssTextField = withStyles({
  root: {
    '& .MuiInputLabel-root': {
      fontWeight: 600,
      color: '#494949',
      fontSize: '14px',
      fontFamily:'Dubai Light'
    },
    '& .MuiInput-underline': {
      fontSize: '15px',
      fontWeight: 600,
      fontFamily: 'Dubai Light',
    },
    '& label.Mui-focused': {
      color: '#9A9A9A',
      fontWeight: 600,
      fontSize: '14px',
      fontFamily:'Dubai Light'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#494949',
    },
    '& .MuiInputBase-input':{
      fontSize: '15px',
    },
    '& .MuiFormHelperText-root.Mui-error':{
      fontWeight: 600,
      fontFamily:'Dubai Light',
      color:'#EA2428'
    },
    "& .MuiInput-underline.Mui-error:after": {
      borderBottomColor: "#EA2428 !important"
    },
    '& label.Mui-focused.Mui-error': {
      color:'#EA2428'
    },
  },
})(TextField);

const ApplnTxtInput: React.FC<ElementInputProps> = ({
  name,
  label,
  placeholder,
  fieldIcon,
  type = "text",

}) => {
  const renders = React.useRef(0);
  const methods = useFormContext();
  const { errors, getValues, setValue } = methods;

  const classes = useStyles();
  useEffect(() => { }, []);

  const handleIconClick = () => {
    setValue(name, "");
    methods.trigger(name);
  };

  let icon = null;
  console.log(" IN Txt field");

  if (getValues(name)) {
    icon = <ClearIcon onClick={handleIconClick} />;
  } else {
    icon = null;
  }
  return (
    <>
      <div className={classes.txtDiv}>
        {fieldIcon && (
          <div className={classes.iconDiv}>
            <Icon>{fieldIcon}</Icon>
          </div>
        )}
        <OutlinedInput
          id={name}
          className={classes.txtField}
          label={label}
          placeholder={placeholder ? placeholder :label}
          name={name}
          inputRef={methods.register()}
          autoComplete="off"
          inputProps={{
            autoComplete: 'off'
          }}
          fullWidth
          type={type}
          error={errors[name] ? true : false}
          // helperText={errors[name]?.message}
        />
      </div>
    </>
  );
};

export default ApplnTxtInput;
