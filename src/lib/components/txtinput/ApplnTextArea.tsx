import { TextField, makeStyles, Icon } from "@material-ui/core";
import React, { useEffect } from "react";
import { ElementInputProps } from "../../common/ElementInputProps";
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
}));

function ApplnTextArea(props: any) {
  const renders = React.useRef(0);
  const methods = useFormContext();
  const { errors, getValues, setValue } = methods;

  const classes = useStyles();
  useEffect(() => {}, []);

  const handleIconClick = () => {
    setValue(props.name, "");
    methods.trigger(props.name);
  };

  let icon = null;

  if (getValues(name)) {
    icon = <ClearIcon onClick={handleIconClick} />;
  } else {
    icon = null;
  }
  return (
    <>
      <div className={classes.txtDiv}>
        {props.fieldIcon && (
          <div className={classes.iconDiv}>
            <Icon>{props.fieldIcon}</Icon>
          </div>
        )}
        <TextField
          id={name}
          className={classes.txtField}
          label={props.label}
          placeholder={props.label}
          name={name}
          rows={props.rows}
          multiline
          inputRef={methods.register()}
          autoComplete="off"
          fullWidth
          error={errors[name] ? true : false}
          helperText={errors[name]?.message}
          InputProps={{
            endAdornment: icon,
          }}
        />
      </div>
    </>
  );
}

export default ApplnTextArea;
