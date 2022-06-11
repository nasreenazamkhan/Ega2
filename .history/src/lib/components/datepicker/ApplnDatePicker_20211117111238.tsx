import React, { useState, useEffect } from "react";
import {makeStyles} from "@material-ui/core";
import { ElementInputProps } from "../../common/ElementInputProps";
import DateFnsUtils from "@date-io/date-fns";
import { FieldAttributes } from "formik";
import {KeyboardDatePicker,MuiPickersUtilsProvider,} from "@material-ui/pickers";
import { Controller, useFormContext } from "react-hook-form";

type MydateProps = {
  height?:any,
  width?:any,
  maxDate?:any,
  minDate?:any,
  isError?:boolean
 
} & ElementInputProps & FieldAttributes<{}>;

const useStyles = makeStyles((theme) => ({
  root:{
    '& .MuiInputBase-input' : {
      fontSize:'14px',
      paddingTop:'10px',
      fontFamily:'Dubai Light',
    },
  }
}))


const ApplnDatePicker: React.FC<MydateProps> = (props) => {
  const methods = useFormContext();
  const isError=props?.isError?props.isError:false;
  const { errors, setValue, register, control } = methods;
  const [compDate, setCompdate] = useState(null);
  const classes = useStyles();
  
const handleKeypress = (e: Event) => {
  e.preventDefault();
  return false
  }

  const values = methods.getValues();

  useEffect(() => {
    register(
      { name: props.name, type: "text" },
    );
    var str: any = props.value;//control.defaultValuesRef.current[props.name];
    if (str && str.length > 0) {
      let day = str.split("/")[0];
      let mon = str.split("/")[1];
      let yr = str.split("/")[2];
      let myDate = new Date(yr, mon - 1, day);
      if (myDate instanceof Date) setCompdate(myDate);
    }
  }, []);



  const handleChange = (val: any) => {
    if (val && val !== "Invalid Date") {  
      console.log(errors[props.name]);
      console.log(isError);
      let day = val.getDate();
      let month = val.getMonth() + 1;
      let year = val.getFullYear();
      let datestr:any = day + "/" + month + "/" + year;
      setValue(props.name, datestr);
      methods.trigger(props.name);
      props.onChange(datestr);
    }
    else
    {
      props.onChange(undefined);
    }
  };
  return (
    <>
  
      {/* <Controller
        as={ */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            
             fullWidth
              label={props.label}
              id={props.name}
              name={props.name}
              placeholder={props.placeholder}
              value={compDate}
              // defaultValue={compDate}
              variant="inline"
              format="dd/MM/yyyy"
              maxDate={props.maxDate?props.maxDate:undefined}
              minDate={props.minDate?props.minDate:undefined}
              // inputVariant="outlined"
              className={classes.root}
              size="small"
              autoOk={true}
              margin="none"
              error={errors[props.name]?true:isError}        
              helperText={errors[props.name]?.message?errors[props.name]?.message:props.helperText}
              onChange={(val) => {
                setCompdate(val);
                handleChange(val);
              }}
              onKeyPress={handleKeypress}
            
             
              disablePast={props.disablePastDate?props.disablePastDate:false}
              InputProps = {{
                endAdornment: null,
                disableUnderline: true,
                readOnly: true,
                style:{
                    fontFamily:'Dubai Light',
                    boxShadow: '0px 0px 5px #00000029',
                    border: (isError ||errors[props.name]) ?'1.5px solid #f44336':'1.5px solid #168FE4BC',
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
                fontFamily:'Dubai Light'
               },
              }}
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
        {/* } 
        {/* name={props.name}
        control={control}
      /> */}
    </>
  );
};

export default React.memo(ApplnDatePicker);
