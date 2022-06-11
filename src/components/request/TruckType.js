  import React, { useEffect, useState } from "react";
  import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    Typography,
    Paper,
    IconButton,
    Icon,
    Grid,
  } from "@material-ui/core";
  import TextField from "@material-ui/core/TextField";
  import ApplnDateTimePicker from "../../lib/components/datepicker/ApplnDateTimePicker";
  import { FormProvider, useForm } from "react-hook-form";
  import FormContainer from "../../lib/components/formContainer/formContainer";
  import { yupResolver } from "@hookform/resolvers";
  import * as Yup from "yup";
  import RefVehicleTypeService from "../../service/RefVehicleTypeService";
  import ApplnSelectBox from "../../lib/components/select/ApplnSelectBox";
  import { MenuItem, Select } from "@material-ui/core";
  import { InputLabel } from "@material-ui/core";
  import moment from "moment";
  import * as utils from "../../utils/utilis";
  import MuiTableCell from "@material-ui/core/TableCell";
  import MuiTable from "@material-ui/core/Table";
  import { withStyles } from "@material-ui/core/styles";


  const TruckTypeTable = withStyles({
    root: {
      padding: 0,
      paddingBottom:2,
      width: 800,
      height: 66,
      border: "1px dashed #B7B7B7",
      marginTop: "20px",
      borderRadius: 8
    }
  })(MuiTable);

const TruckTypeNumber = withStyles({
  root: {
    width: 63,
    height: 66,
    border: "1px solid #B7B7B7",
  
    borderRadius: "5px 0px 0px 5px",
    backgroundColor: "#F3F3F3",
    padding: 0,
    paddingLeft: 1
  }
})(MuiTableCell);
const TruckTypeDetails = withStyles({
    root: {
      borderBottom: 0,
      width: 63,
      height: 66,
      padding: 0,
    paddingLeft: 10,
    alignItems:"center"
     
    }
  })(MuiTableCell);

  const TruckType = (props) => {
    const [truckNo, SetTruckNo] = useState(1);
    const [masterVals, setMasterVals] = useState({
      intervalOpts: [""],
      compMouted: false,
    });
    const [vehicleTypeOpt, SetVehicleTypeOpt] = useState([]);
    const [truckType, setTruckType] = useState('');
    const [interval, setInterval] = useState('');
    const [datetime, setDatetime] = useState('');
    const [interval1, setInterval1] = useState('');
    const [render, setRender] = useState(0);
    const methods = useForm({
      //resolver: yupResolver(schema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: "",
    });

    const schema = Yup.object({
      contactNo: Yup.string().matches(/^\d{10}$/, "Mobile number is not valid"),
    });

    const formatDate = (date) => {
      var str = date;
      if (date != "Invalid Date") {
        var res = str.split(" ");
        var x = res[0].split("/");
        return x[2] + "/" + x[1] + "/" + x[0] + " " + res[1];
      }
      else return str;
    }
    
    const calculateData = (date_time,interval) => {
      console.log("props in calculate data", date_time);
      console.log("props in calculate data", interval);
      
      if (interval != '' && date_time!='') {
        props.truckdetailsList.map((truckdetails, inx) => {
          if (inx + 1 < props.truckdetailsList.length) {
      //       var date1 = new Date(props.truckdetailsList[inx].date_time);
      //     var date = new Date(props.truckdetailsList[inx].date_time);
      //   //  var date = moment(props.truckdetailsList[inx].date_time, "MM/DD/yyyy hh:mm").toDate();
      //       console.log("daaaa", props.truckdetailsList[inx].date_time);
      //       console.log("dateeee", date);
      //       console.log("qqqqqqqqqqq", date.getMinutes());
      //  //  props.truckdetailsList[inx + 1].date_time = moment((date.getTime() + props.truckdetailsList[inx].interval )).format("MM/DD/yyyy hh:mm");
      // // props.truckdetailsList[inx + 1].date_time =  new Date(date.setMinutes(date.getMinutes() + interval));;
      // props.truckdetailsList[inx + 1].date_time = new Date(date.setMinutes(date1.getMinutes() + interval));
            console.log("inx ::", inx);
            console.log("props.truckdetailsList[inx].date_time", props.truckdetailsList[inx].date_time);
          
              var dat = formatDate(props.truckdetailsList[inx].date_time);
              console.log("manual formatting", dat);
        
            var date = utils.formatDate(dat)
            console.log("date after formatting", date);
            props.truckdetailsList[inx + 1].date_time = utils.getNextDateTime(utils.convertToMillSeconds(props.truckdetailsList[inx].interval), date)
          }
        }
        )
        setRender(render+1);
      }
      console.log("props i truck",props.truckdetailsList);
    }

    useEffect(() => {
      let unmounted = false;

      console.log("truckList in useEffect:::", props);
      const loadVehicleType = async () => {
        RefVehicleTypeService.fetchVehicleType()
          .then((response) => {
            console.log("response in vehicleType::", response);

            console.log("length", response.length);
            SetVehicleTypeOpt(response);
          })
          .catch((error) => {
            console.log("error");
          });
      };
      loadVehicleType();
      console.log("props in truck Type", props);
      setMasterVals((prevstate) => ({
        intervalOpts: [
          { label: "No interval", value: "00:00" },
          { label: "30 min", value: "00:30" },
          { label: "1hr", value: "01:00" },
          { label: "2hr", value: "02:00" },
          { label: "3hr", value: "03:00" },
          { label: "4hr", value: "04:00" },
        ],
        compMouted: true,
      }));
      if (props.truckdetailsList[0].date_time != '' && props.truckdetailsList[0].interval != '')
      calculateData(props.truckdetailsList[0].date_time,props.truckdetailsList[0].interval)
      return () => { unmounted = true };
    }, []);

    return (
      <>
        {masterVals.compMouted && (
          <FormProvider {...methods}>
            <div>
              {props.truckdetailsList.map((truckdetails, inx) => (
                truckdetails.index=inx,
                <Paper
                  elevation={0}
                
                  key={inx}
                >
                  <TruckTypeTable >
                    <TableBody>
                      <TableRow>
                        <TruckTypeNumber>
                          
                          <InputLabel   style={{ color:"black" ,textAlign:"center",fontSize:"16px"}}> {((inx + 1) + "").padStart(2, '0')}</InputLabel> 
                          
                        </TruckTypeNumber>
                        <TruckTypeDetails >
                          <Grid>
                            <InputLabel style={{color:"#9A9A9A",width:"200px"}}>
                              Truck Type
                            </InputLabel>
                          </Grid>
                          <Grid >
                        
                            <Select
                              style={{width:"145px"}}
                              name="truckType"
                              value={truckdetails.vehicleCode}
                              onChange={(e) => {
                                truckdetails.vehicleCode = e.target.value;
                                {vehicleTypeOpt.map((vehicle, i) => {
                                  if (vehicle.value === e.target.value)
                                  truckdetails.vehicleName = vehicle.label;
                                });
                              }
                              // setTruckType(e.target.value);
                                setRender(render + 1);
                              }}
                            >
                              {vehicleTypeOpt.map((vehicleTypeOpt, i) => {
                                return (
                                  <MenuItem value={vehicleTypeOpt.value} key={i}>
                                    {vehicleTypeOpt.label}
                                  </MenuItem>
                                );
                              })}
                              </Select>
                            
                          </Grid>
                        </TruckTypeDetails>

                        <TruckTypeDetails >
                          <Grid >
                            <InputLabel style={{color:"#9A9A9A"}}>
                              Date And Time
                            </InputLabel>
                          </Grid>
                          <Grid item xs={6} style={{alignItems:"center",width:"380px"}}>
                          {inx !== 0 && <InputLabel 
                            
                            >{(props.truckdetailsList[inx].date_time)}</InputLabel>}
                          
                            {inx === 0 && <ApplnDateTimePicker name={"dateTime"} label="" disablePastDate={true} onChange={(e) => {
                              truckdetails.date_time = methods.getValues().dateTime;
                              calculateData(truckdetails.date_time, truckdetails.interval);
                            }}/>}
                          
                          
                          </Grid>
                        </TruckTypeDetails>

                        <TruckTypeDetails >
                          <Grid>
                            <InputLabel style={{ color: "#9A9A9A" }}>
                              Interval
                            </InputLabel>
                          </Grid>
                          <Grid >
                            <Select 
                              name="interval"
                              value={truckdetails.interval}
                              onChange={(e) => {
                                {
                                  props.truckdetailsList[inx].interval = e.target.value
                                
                                  for ( var i = inx; i < props.truckdetailsList.length; i++) {
                                    if (i + 1 < props.truckdetailsList.length) {
                                      props.truckdetailsList[i + 1].interval = props.truckdetailsList[i].interval
                                    }
                                    // if (inx === props.truckdetailsList.length - 1) {
                                    //   props.truckdetailsList[inx].interval = props.truckdetailsList[inx - 1].interval
                                    // }
                                    calculateData(truckdetails.date_time, truckdetails.interval);
                                  
                                  }
                                  
                                }
                                truckdetails.interval = e.target.value;
                                setInterval(e.target.value);
                                console.log("selected value", e.target.value);
                            //     if (inx+1 !== props.truckdetailsList.length) {
                            //       var date = new Date(props.truckdetailsList[inx].date_time);
                            //       var date1 = new Date(date.getTime() + props.truckdetailsList[inx].interval * 60000);
                            //       props.truckdetailsList[inx+1].date_time = moment(date1).format("M/D/yyyy HH:mm");
                            //  }
                                // if (inx !== 0) {
                                //   console.log("methods", (props.truckdetailsList[inx - 1].date_time));
                                //   var date = new Date(props.truckdetailsList[inx - 1].date_time);
                                //   var date1 = new Date(date.getTime() + props.truckdetailsList[inx - 1].interval * 60000);
                                //   console.log("dateeee", date1);
                              
                                //   //setInterval(e.target.value);
                                //  // setDatetime(date1);
                                //   props.truckdetailsList[inx].date_time = date1;
                                // }
                                setRender(render + 1);
                              }}
                            >
                              {masterVals.intervalOpts.map((intervalOpts, i) => {
                                return (
                                  <MenuItem value={intervalOpts.value} key={i}>
                                    {intervalOpts.label}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </Grid>
                        </TruckTypeDetails>
                      </TableRow>
                    </TableBody>
                  </TruckTypeTable>
                </Paper>
              ))}
            </div>
          </FormProvider>
        )}
      </>
    );
  };
  export default TruckType;
