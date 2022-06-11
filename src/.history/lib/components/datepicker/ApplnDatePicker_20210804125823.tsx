import React, { useState, useEffect } from "react";
import {makeStyles} from "@material-ui/core";
import { ElementInputProps } from "../../common/ElementInputProps";
import DateFnsUtils from "@date-io/date-fns";
import { FieldAttributes } from "formik";
import {KeyboardDatePicker,MuiPickersUtilsProvider,} from "@material-ui/pickers";
import { Controller, useFormContext } from "react-hook-form";

type MydateProps = {
  height?:any,
  width?:any
} & ElementInputProps & FieldAttributes<{}>;

const useStyles = makeStyles((theme) => ({
  root:{
    '& .MuiInputBase-input' : {
      fontSize:'0.8rem',
      paddingTop:'10px'
    }
  }
}))

const ApplnDatePicker: React.FC<MydateProps> = (props) => {
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;
  const [compDate, setCompdate] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    var str: any = props.value;//control.defaultValuesRef.current[props.name];
    console.log("date in appln " + str);
    if (str && str.length > 0) {
      let day = str.split("/")[0];
      let mon = str.split("/")[1];
      let yr = str.split("/")[2];
      let myDate = new Date(yr, mon - 1, day);
      if (myDate instanceof Date) setCompdate(myDate);
    }
  }, []);

  const handleChange = (val: any) => {
    console.log("change triggered");
    console.log(val);
    if (val && val !== "Invalid Date") {
      let day = val.getDate();
      let month = val.getMonth() + 1;
      let year = val.getFullYear();
      let datestr = day + "/" + month + "/" + year;
      setValue(props.name, datestr);
      methods.trigger(props.name);
      props.onChange(val);
    }
 

  };
  return (
    <>
  
      <Controller
        as={
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            //  fullWidth
              label={props.label}
              placeholder={props.placeholder}
              value={compDate}
              variant="inline"
              format="dd/MM/yyyy"
              // inputVariant="outlined"
              className={classes.root}
              size="small"
              autoOk={true}
              margin="none"
              error={errors[props.name] ? true : false}
              helperText={errors[props.name]?.message}
              onChange={(val) => {
                console.log(val);
                setCompdate(val);
                handleChange(val);
              }}
              disablePast={props.disablePastDate?props.disablePastDate:false}
              InputProps = {{
                endAdornment: null,
                disableUnderline: true,
                style:{
                    fontFamily:'Dubai Regular',
                    boxShadow: '0px 0px 5px #00000029',
                    border: '1.5px solid #168FE4BC',
                    borderRadius: '4px',
                    width: props.width ? props.width : '140px',
                    height: props.height ? props.height : '30px',
                    fontWeight: 600,
                    padding: '2px',
                   },
                  
            }}
            keyboardIcon={<img src="./calendar.svg" alt="calendar" width="15px" height="15px" style={{margin:'5px'}}/>}
            InputLabelProps={{
               style:{
                fontSize: '16px',
                fontStyle:"oblique",
                fontFamily:'Dubai Regular'
               }}}
               InputAdornmentProps={{ position: 'start' }}
            KeyboardButtonProps={{
                style:{
                    fontSize: '16px',
                    color:props.iconColor,
                    padding:0
                   }, 
            }}
            />
          </MuiPickersUtilsProvider>
        }
        name={props.name}
        control={control}
      />
    </>
  );
};

export default React.memo(ApplnDatePicker);
