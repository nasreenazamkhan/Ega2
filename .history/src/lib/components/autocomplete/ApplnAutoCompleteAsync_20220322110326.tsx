import React, { useEffect, useState } from "react";
import { FieldAttributes } from "formik";
import { ElementInputProps, LabelValue } from "../../common/ElementInputProps";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, CircularProgress, makeStyles } from "@material-ui/core";
import "./autocomplete.css";
import { getHttp } from "../../common/HttpService";
import { useFormContext, Controller } from "react-hook-form";

type MySelectFieldProps = {
  options?: LabelValue[];
  remoteUrl?: string;
  helperText?: string;
  reload?: number;
  kvMapping?: any;
  onSelect?: any;
  width?: string;
  border?: string;
  onSelectMenu?(value: any): void;
  defaultValue?: LabelValue;
  isAssignTruck?: Boolean;
  adminSearch?: Boolean;
  isError?:Boolean;
} & ElementInputProps &
  FieldAttributes<{}>;

// { options, required = false, name,
//     label, helperText, type = "text", remoteUrl, kvMapping }

const useStyles = makeStyles({
  paper: {
    fontSize: "14px",
    fontWeight: 600,
    color: '#5A5A5A',
    fontFamily: 'Dubai Light',
  },
  notchedOutline: {
    borderWidth: '0',
    borderColor: 'transparent !important',
  },
  clearIndicator:{
    fill:'#0E1B3D',
    '& .MuiSvgIcon-root':{
      fill:'#0E1B3D',
    }
  },
  adminSearch:{
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: 'Dubai Light',
    borderRadius:'0px 0px 10px 10px',
    marginTop:'11px',
    width:'727px',
    marginLeft:'-66px',
    color:'#248AFF'
  },
  root:{
    '& .MuiAutocomplete-option[aria-disabled="true"]': {
      opacity: 1,
      color:'#EA2428'
    }
  }
});

const ApplnAutoCompleteAsync: React.FC<MySelectFieldProps> = (props) => {
  const [opts, setOpts] = useState({ q: "", timerId: null, dataset: props?.options?props.options:[] });
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const renders = React.useRef(0);
  const methods = useFormContext();
  const { errors, getValues, setValue, register, control } = methods;
  let timerId: any = null;
  const [def, setDef] = useState(props.defaultValue);
  const classes = useStyles();

  const autocompleteSearch = (value: any) => {
    setLoading(true);
    let qurl = "";
    if (props.remoteUrl.indexOf('?') === -1) {
      qurl = props.remoteUrl + '?q=' + `${value}`;
    } else {

      qurl = props.remoteUrl + '&q=' + `${value}`;
    }
    // let qurl = props.remoteUrl + "&q=" + value;
    getHttp({ url: qurl }, false)
      .then((e) => {
        let dItems: any = [];
      
        dItems = e.map((ele: any) => {
          let labEle = "ele." + props.kvMapping.label;
          let labelv = eval(labEle);
          let valEle = "ele." + props.kvMapping.value;
          let val = eval(valEle);
          return { label: labelv, value: val };
        });
        setOpts((prevState) => ({
          ...prevState,
          dataset: dItems,
        }));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        let eitems = [
          { label: "Unable to Fetch the data " , value: "-3333" },
        ];
        setOpts((prevState) => ({
          ...prevState,
          dataset: eitems,
        }));
      });
  };

  const handleChange = (event: any, option: LabelValue) => {
    setRefresh(true);
    if (option != null) {
      setValue(props.name, option.value);
      methods.trigger(props.name);
      if (!props.isAssignTruck) props.onSelect(option);
      else props.onSelectMenu(option);
    } else {
      event.target.value = "";
      setValue(props.name, "");
      if (props.isAssignTruck) props.onSelectMenu("")
      else props.onSelect("");
    }
  };

  const onKeyPressInput = (event: any, value: string, truereason: string) => {
    if (event?.type === "click") {
      return;
    }
    // if()
    // setRefresh(true);

    if (props.remoteUrl && value !== "") {
      clearTimeout(opts.timerId);

      timerId = setTimeout(() => {
        autocompleteSearch(value);
      }, 200);
      setOpts((prevState) => ({
        ...prevState,
        q: value,
        timerId: timerId,
      }));
    }
  };

  const handleClose = (event: any, reason: any) => {
    if (props.remoteUrl) {
      setOpts((prevState) => ({
        ...prevState,
        dataset: [],
      }));
    }
    setRefresh(false);
  };

  const intializeList = () => {
    if (props.options?.length > 0) {
      let ds: any = props.options;
      if (props.kvMapping) {
        ds = props.options.map((opt) => {
          let labEle = "opt." + props.kvMapping.label;
          let labelv = eval(labEle);
          let valEle = "opt." + props.kvMapping.value;
          let val = eval(valEle);
          return { label: labelv, value: val };
        });
      }
      setOpts({
        q: "",
        dataset: ds,
        timerId: null,
      });
    }
  };

  useEffect(() => {


  }, []);

  return (
    <>
      <Controller
        control={control}
        name={props.name} 
        // Pyament
        render={(inpProps) => (
          <>
            <Autocomplete
              freeSolo
              autoHighlight
              defaultValue={props.defaultValue}
              autoComplete={false}
              options={opts.dataset}
              getOptionLabel={(option: LabelValue) => option.label}
              getOptionSelected={(option: LabelValue, value: any) => {
                return true;
              }}
              getOptionDisabled={(option: LabelValue) => option.value == "168"}
              // fullWidth
              onChange={handleChange}
              onInputChange={onKeyPressInput}
              onClose={handleClose}
              classes={{ paper: props.adminSearch ? classes.adminSearch : classes.paper, clearIndicator:classes.clearIndicator, popper:classes.root }}
              renderInput={(params: any) => {
                return (
                  <>
                    <div className="autoSelect-txt-div">
                      <TextField
                        autoComplete="false"
                        variant="outlined"
                        size="small"
                        inputRef={register()}
                        error={errors[props.name]}
                        defaultValue={props.defaultValue?.label}
                        margin="dense"
                        label={props.label}
                        helperText={errors[props.name]?.message}
                        placeholder={props.placeholder}
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            fontSize: '14px !important',
                            color: '#0E1B3D',
                            fontFamily: 'Dubai Light',
                            fontWeight: 600,
                            borderColor: props.border !== 'none' ?? '#168FE4BC',
                            width: props.width
                          },
                          classes: props.border === 'none' ? { 
                            root: classes.notchedOutline,
                            focused: classes.notchedOutline,
                            notchedOutline: classes.notchedOutline,
                          } : {},
                        }}
                        InputLabelProps={{
                          ...params.InputLabelProps,
                          style: {
                            fontSize: '15px',
                            fontStyle: "normal",
                            color: '#5A5A5A',
                            fontFamily: 'Dubai Light',
                            fontWeight: 600
                          }
                        }}
                      />
                      {loading && (
                        <CircularProgress className="auto-search-loading-icon" />
                      )}
                    </div>
                  </>
                );
              }}
            />
          </>
        )}
      />
    </>
  );
};

export default ApplnAutoCompleteAsync;
