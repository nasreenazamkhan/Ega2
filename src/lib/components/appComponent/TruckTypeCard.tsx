import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, Select, TextField } from "@material-ui/core";
import moment from 'moment';
import './containerCard.css';
import { Autocomplete } from "@material-ui/lab";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import RefVehicleTypeService from "../../../service/RefVehicleTypeService";
import TruckType from "../../../components/request/TruckType";

type item = {
    label: string;
    value: string;
}
interface TruckTypeParam {
    truckType?: any,
    dateAndTime?: string,
    interval?: string,
    truckTypes?: any[],
    changeInterval?(e?: string): any,
}


const useStyles = makeStyles(() => ({

    //     root: {
    //         flexGrow: 1,
    //     },
    //     title: {
    //         fontSize: 14,
    //         marginLeft: theme.spacing(2),
    //         flex: 1,
    //     },
    //     appBar: {
    //         position: 'relative',
    //     },
    //     pos: {
    //         marginBottom: 12,
    //     },
    //     menuButton: {
    //         marginRight: theme.spacing(2),
    //     },
}));
// const intervals: item[] = [
//     { label: "30 min", value: "00:30" },
//     { label: "1 h", value: "01:00" },
//     { label: "2 h", value: "02:00" },
//     { label: "3 h", value: "03:00" },
//     { label: "4 h", value: "04:00" },

// ]
const optionTruckTypes: item[] = [];
const TruckTypeCard: React.FC<TruckTypeParam> = (TruckTypeParam) => {
    // const [truckType, setTruckType] = useState();
    // const [truckTypes, setTruckTypes] = useState([]);
    // const [truckTypeValue, setTruckTypeValue] = useState('');
    // const [interval, setInterval] = useState<string | null>(intervals[0]?.value);
    // //const [interval, setInterval] = useState<any | null>('');
    // const [intervalValue, setIntervalValue] = useState('');
    // const [detail, setDetail] = useState([]);
    // const [selectedDate, setSelectedDate] = useState<Date | null>()


    const onIntervalChange = (event: any) => {
        // setInterval(newValue)
        // if (next && typeof next == "function")
        //     next(newValue);
        setInterval(event.target.value)
    }

    // const handleDateChange = (date: Date | null) => {
    //     setSelectedDate(date);
    // };

    // const getTruckType = async () => {
    //     if (truckTypes?.length === 0) {
    //         //     setTruckTypes(optionTruckTypes);
    //         // } else {
    //         let res: any[] = await RefVehicleTypeService.fetchVehicleType();

    //         //  await   optionTruckTypes.push(...res); 
    //         //  await   console.log("ghghgfd ",JSON.stringify(optionTruckTypes))// set response in cache;
    //         await setTruckTypes(res);
    //     }
    // }
    // const handleIntervalChange = (event: React.ChangeEvent<{ label?: string; value?: any }>) => {
    //     // const label = event.target.label as keyof typeof interval;
    //     const value = event.target.value as keyof typeof interval;
    //     console.log("INFO ", JSON.stringify(event.target))
    //     setInterval(event.target.value);
    //     console.log("INFO ", JSON.stringify(interval))
    // };
    useEffect(() => {
        // getTruckType();
    }, []);


    return (
        <>
            <Grid container xs={12} sm spacing={1}>

                <Grid item xs={12} sm={4} md={4}   >
                    {/* <Autocomplete id="truckType"
                        value={truckType ?? TruckTypeParam?.truckType}
                        defaultValue={TruckTypeParam?.truckType}
                        onChange={(event, newValue) => {
                            setTruckType(newValue);
                        }}
                        inputValue={truckTypeValue}
                        onInputChange={(event, newInputValue) => {
                            setTruckTypeValue(newInputValue);
                        }}
                        options={truckTypes}
                        getOptionLabel={(option) => option?.label}
                        renderInput={(params) => <TextField {...params} margin="dense" label="Truck Type" fullWidth required />}
                    /> */}
                    <TextField aria-readonly={true} margin="dense" value={TruckTypeParam?.truckType?.label} label="Vehicle name" type="text" fullWidth />
                </Grid>
                <Grid item xs={12} sm={4} md={4} >
                    {/*  */}
                    <TextField aria-readonly={true} margin="dense" value={TruckTypeParam?.dateAndTime} label="Date And Time" type="text" fullWidth />
                </Grid>
                <Grid item xs={12} sm={4} md={4}   >
                    <TextField aria-readonly={true} margin="dense" value={TruckTypeParam?.interval} label="Interval" type="text" fullWidth />
                </Grid>
            </Grid>

        </>
    )

}

export default TruckTypeCard;