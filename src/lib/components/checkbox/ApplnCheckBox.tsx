import React, { useState, useEffect } from "react";
import { ElementInputProps, LabelValue } from "../../common/ElementInputProps";
import { Checkbox, FormLabel, FormControlLabel } from "@material-ui/core";
import { Controller, useForm, useFormContext } from "react-hook-form";

type MyCheckFieldProps = {
  options: LabelValue[];
} & ElementInputProps;

export const ApplnCheckBox: React.FC<MyCheckFieldProps> = (props) => {
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;
  const { options, name, label } = props;

  useEffect(() => {
    console.log(" IN useEffect");
  }, []);

  const getDefChecked = (val: any) => {
    let v = control.defaultValuesRef.current[name]?.filter((opt: any) => {
      return opt === val;
    });

    return v.length > 0;
  };

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      {
        options.map((item, indx) => (
          <FormControlLabel
            control={<Checkbox defaultChecked={getDefChecked(item.value)} />}
            name={name}
            inputRef={register}
            value={item.value}
            key={indx}
            label={item.label}
          />
        ))
        // props contains: onChange, onBlur and value
      }
    </>
  );
};
export default React.memo(ApplnCheckBox);
