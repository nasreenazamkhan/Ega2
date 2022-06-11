import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { ElementInputProps, LabelValue } from "../../common/ElementInputProps";
import { useFormContext, Controller } from "react-hook-form";

type MySelectFieldProps = {
  options: LabelValue[];
  multiple?: boolean;
} & ElementInputProps;

const useStyles = makeStyles((theme) => ({
  button: {},
}));

const ApplnSelectBox: React.FC<MySelectFieldProps> = ({
  multiple,
  options,
  required = false,
  name,
  label,
  placeholder,
  helperText,
  fieldAction,
}) => {
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;

  useEffect(() => {
    register({ name: name, value: "-1" });
  }, [register]);
  const renders = React.useRef(0);
  return (
    <>
      <FormControl fullWidth>
        <InputLabel className={errors[name]?.message ? "error-label" : null}>
          {label}
        </InputLabel>
        <Controller
          control={control}
          name={name}
          as={
            <Select
              error={errors[name]?.message ? true : false}
              onChange={(e: any) => {
                setValue(name, e.target.value);
                methods.trigger(name);
                //   fieldAction("select", e);
              }}
            >
              {options.map((option, i) => {
                return (
                  <MenuItem value={option.value} key={i}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>
          }
        ></Controller>
        <FormHelperText
          className={errors[name]?.message ? "error-label" : null}
        >
          {errors[name]?.message}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default React.memo(ApplnSelectBox);
