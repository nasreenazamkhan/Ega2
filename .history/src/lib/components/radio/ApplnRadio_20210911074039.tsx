import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";
import { ElementInputProps, LabelValue } from "../../common/ElementInputProps";
import { Controller, useFormContext } from "react-hook-form";

type MyRadioProps = {
  selectedOption: string;
  options: LabelValue[];
  defaultValue: string;
 
} & ElementInputProps;

const ApplnRadio: React.FC<MyRadioProps> = (props) => {
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;
  return (
    <>
      <FormLabel component="legend">{props.label}</FormLabel>
      <Controller
        as={
          <RadioGroup aria-label={props.label} row={true} defaultValue={props.defaultValue}    onChange={() => {console.log("chnage called!!!!!!!!!")}}>
            {props.options.map((option, i) => {
              return (
                <FormControlLabel
                  key={i}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
               
                
                />
              
              );
            })}
             
          </RadioGroup>
        }
        name={props.name}
        control={control}
      />
    </>
  );
};

export default React.memo(ApplnRadio);
