import React, { useEffect } from "react";

import { ElementInputProps, LabelValue } from "../../common/ElementInputProps";
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
} from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

type MySelectFieldProps = {
  options: LabelValue[];
  multiple?: boolean;
  selectedItems: String[];
} & ElementInputProps;

const ApplnSelectBoxMultiple: React.FC<MySelectFieldProps> = (props) => {
  const renders = React.useRef(0);
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;

  const optionsCopy = props.options;
  const result = new Map(optionsCopy.map((i) => [i.value, i.label]));
  let itms = getValues(props.name);
  let data = itms?.toString();

  useEffect(() => {}, []);

  const handledata = (inpProps: any) => {
    console.log(inpProps);
    return true;
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel
          className={errors[props.name]?.message ? "error-label" : null}
        >
          {props.label}
        </InputLabel>
        <Controller
          control={control}
          name={props.name}
          render={(inpProps) => (
            <Select
              label={props.label}
              error={errors[props.name]?.message ? true : false}
              id={props.name}
              {...inpProps}
              placeholder={props.placeholder}
              multiple={true}
              input={<Input />}
              variant="outlined"
              renderValue={(e: Array<string>) => {
                let xx = [...e];
                let fnlList = xx.map((x: string) => {
                  return result.get(x) + ",";
                });
                return <span>{fnlList}</span>;
              }}
              MenuProps={{
                variant: "menu",
                getContentAnchorEl: null,
              }}
            >
              <MenuItem value="-1" key="-1">
                <em>{props.placeholder}</em>
              </MenuItem>
              {props.options?.map((option, i) => {
                return (
                  <MenuItem value={option.value} key={i}>
                    <Checkbox
                      checked={inpProps?.value.indexOf(option.value) > -1}
                    />
                    <ListItemText primary={option.label} />
                  </MenuItem>
                );
              })}
            </Select>
          )}
        ></Controller>
        <FormHelperText
          className={errors[props.name]?.message ? "error-label" : null}
        >
          {errors[props.name]?.message}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default ApplnSelectBoxMultiple;
