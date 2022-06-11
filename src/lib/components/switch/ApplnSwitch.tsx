import React, { useEffect } from "react";
import { FormLabel, FormControlLabel, Switch } from "@material-ui/core";
import { Field, useField, FieldAttributes, FastField } from "formik";
import { ElementInputProps } from "../../common/ElementInputProps";
import "./appSwitch.css";
import { Controller, useFormContext } from "react-hook-form";

type MySwitchFieldProps = {
  status: boolean;
  onText?: string;
  offText?: string;
} & ElementInputProps &
  FieldAttributes<{}>;

const ApplnSwitch: React.FC<MySwitchFieldProps> = (props) => {
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;

  const renders = React.useRef(0);
  let switchLabel = "";

  useEffect(() => {
    console.log(getValues(props.name));
    setSwitchLabel(getValues(props.name));
  }, []);

  const setSwitchLabel = (switchSatus: boolean) => {
    if (switchSatus === true) {
      switchLabel = props.onText ? props.onText : "on";
    } else {
      switchLabel = props.offText ? props.offText : "off";
    }
  };

  return (
    <>
      <FormLabel component="div">{props.label}</FormLabel>

      <Controller
        name={props.name}
        control={control}
        render={(props) => (
          <FormControlLabel
            control={
              <Switch
                onClick={(e: any) => {
                  setSwitchLabel(e.target.checked);
                  setValue(props.name, e.target.checked);
                }}
                checked={props.value}
              />
            }
            label={switchLabel}
          />
        )}
      />
    </>
  );
};

export default ApplnSwitch;