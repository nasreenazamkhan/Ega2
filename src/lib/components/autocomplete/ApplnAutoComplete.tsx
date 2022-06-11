import React, { useEffect, Fragment, useState } from "react";
import {
  Field,
  useField,
  FieldAttributes,
  FastField,
  FieldProps,
} from "formik";
import { ElementInputProps, LabelValue } from "../../common/ElementInputProps";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, CircularProgress,Typography } from "@material-ui/core";
import "./autocomplete.css";
import { getHttp } from "../../common/HttpService";
import { useFormContext, Controller } from "react-hook-form";

type MySelectFieldProps = {
  options?: LabelValue[];
  remoteUrl?: string;
} & ElementInputProps &
  FieldAttributes<{}>;

const ApplnAutoComplete: React.FC<MySelectFieldProps> = (props) => {
  const renders = React.useRef(0);
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;

  useEffect(() => {}, []);

  return (
    <>
      {props.options && props.options.length > 0 && (
        <Controller
          control={control}
          name={props.name}
          as={
            <>
              <Autocomplete
                autoHighlight
                fullWidth
                // value={inpProps.value}
                options={props.options}
                renderOption={(option) => (
                  <Typography variant="body2">{option.label}</Typography>
                )}
                getOptionLabel={(option) => (option ? option.label : "")}
                getOptionSelected={(option: LabelValue, value: any) => {
                  if (value.value === option.value) return true;
                  else return false;
                }}
                style={{ width: 300 }}
                onChange={(e, item) =>
                  item ? setValue(props.name, item) : setValue(props.name, "")
                }
                renderInput={(params: any) => (
                  <TextField {...params} label={props.label} />
                )}
              />
            </>
          }
        />
      )}
    </>
  );
};

export default ApplnAutoComplete;
