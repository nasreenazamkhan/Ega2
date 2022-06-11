import React, { useState, useEffect } from "react";
import { FieldAttributes, Field, FieldProps, useField } from "formik";
import { ElementInputProps } from "../../common/ElementInputProps";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DatePicker,
  DateTimePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { Controller, useFormContext } from "react-hook-form";

type MydateProps = {} & ElementInputProps & FieldAttributes<{}>;

type MyDateState = {
  dpDate: Date;
};

const ApplnDateTimePicker: React.FC<MydateProps> = (props) => {
  const [compDate, setCompDate] = useState(null);
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;

  useEffect(() => {
    var str: any = control.defaultValuesRef.current[props.name];
    if (str) {
      let dateStr = str.split(" ")[0];
      let timeStr = str.split(" ")[1];
      let day = dateStr.split("/")[0];
      let mon = dateStr.split("/")[1];
      let yr = dateStr.split("/")[2];
      let hr = timeStr.split(":")[0];
      let min = timeStr.split(":")[1];
      let myDate = new Date(yr, mon - 1, day, hr, min);
      if (myDate instanceof Date) setCompDate(myDate);
    }
  }, []);

  const handleChange = (val: any) => {
    console.log("change triggered");
    if (val && val != "Invalid Date") {
      let day = val.getDate();
      let month = val.getUTCMonth() + 1;
      let year = val.getUTCFullYear();
      let hr = val.getHours();
      let min = val.getMinutes();
      let datestr = day + "/" + month + "/" + year + " " + hr + ":" + min;
      setValue(props.name, datestr);
    
    }
    else
    setValue(props.name, val);
    setCompDate(val);
    props.onChange(val);
  };

  return (
    <>
      <Controller
        as={
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              fullWidth
              label={props.label}
              placeholder={props.label}
              value={compDate}
              variant="inline"
              format={"dd/MM/yyyy HH:mm"}
              onChange={handleChange}
              ampm={true}
              autoOk={true}
              disablePast={props.disablePastDate?props.disablePastDate:false}
            />
          </MuiPickersUtilsProvider>
        }
        name={props.name}
        control={control}
      />
    </>
  );
};

export default React.memo(ApplnDateTimePicker);
