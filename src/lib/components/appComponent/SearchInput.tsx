import React, { useState } from "react";
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { IconButton, InputBase, MenuItem, Paper, Select, OutlinedInput } from "@material-ui/core";
import { Search, ExpandMoreRounded, Clear } from "@material-ui/icons";
import './containerCard.css';
import theme from "../../common/theme/theme";
import ApplnAutoCompleteAsync from "../../../lib/components/autocomplete/ApplnAutoCompleteAsync";
import * as endpointContants from '../../../utils/ptmsEndpoints';
import { FormProvider, useForm } from "react-hook-form";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: 730,
        flexGrow: 1,
        height: '60px',
        marginTop: 15,
        boxShadow: '0px 3px 6px #0E1B3DB7',
        borderRadius: '3px',
        border: '1.6px solid #0e1b3d94',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
    },
    input: {
        borderRadius:0,
    },
    iconButton: {
        padding: 10,
        marginRight: '10px',
        marginLeft: '10px'
    },
    icon: {
        fontSize: "1.5rem",
        fill: "#fff",
        zoom: 1.6,
        paddingLeft: '5px'
    },
}));

const CustomMenuItem = withStyles((theme) => createStyles({
    root: {
        color: '#2B2B2B',
        fontSize: "15px",
        fontWeight: 600,
        width:'209px',
        fontFamily: 'Dubai Light',
        padding: '8px 20px 8px 20px',
        "&$selected": {
            backgroundColor: "#1360D2",
            color: '#FFFFFF'
        },
    },
    '& .MuiPopover-paper': {
        borderRadius:0
    }
})
)(MenuItem);

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#0E1B3DDB',
        padding: '5px',
        borderRadius: 0,
        color: '#FFFFFF',
        borderColor: '#0E1B3DDB',
        width: '300px',
        paddingLeft: "10px",
        height: '59px',
        "& $notchedOutline": {
            borderColor: "#0E1B3DDB",
            borderRadius: 0,
            boxShadow: '0px 0px 5px #00000029',
        },
        "& .MuiInputBase-input": {
            fontFamily: 'Dubai Light',
            fontSize: '17px',
            fontWeight: 600,
        },
        "& .MuiOutlinedInput-input": {
            paddingLeft: '10px',
            paddingRight: '10px'
        },
    },
    focused: {},
    notchedOutline: {},
}));

interface SearchInputParam {
    placeholder?: string,
    defaultType?: string,
    defaultValue?: string,
    searchClick?(value: any): void,
    changeType?(value?: any): string,
    changeValue?(value?: any): string,
    optionValues?: any[],
    searchUrl?: any,
    searchMapping?: any,
    width: any
}

const SearchInput: React.FC<SearchInputParam> = (SearchInputParam) => {
    const outlinedInputClasses = useOutlinedInputStyles();
    const classes = useStyles();
    const [search, setSearch] = useState();
    const [type, setType] = useState(SearchInputParam.defaultType);
    const [typeOptions, setTypeOptions] = useState(SearchInputParam.optionValues);
    const searchMapping = { label: "label", value: "value" };

    const handleInputValueChange = (event: any) => {
            setSearch(event);
            return event;
    }

    const methods = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        // defaultValues: formvalues,
    });

    const handleTypeChange = (event: any) => {
        setType(event.target.value);
        return event.target.value;
    }

    return (
        <FormProvider {...methods}>
            <form>
                <Paper component="form" className={classes.root} style={{ width: SearchInputParam.width }}>
                    <IconButton
                        onClick={() => SearchInputParam.searchClick({ "serviceType": type, "serviceNumber": search })}
                        className={classes.iconButton}
                        aria-label="search">
                        <img src="./search.svg" height="26px" />
                    </IconButton>
                    <ApplnAutoCompleteAsync
                        name={"haulierCode"}
                        placeholder={`Enter the ${type} ${type !== "haulier" ? "number" : "code"} `}
                        width={"452px"}
                        border={"none"}
                        kvMapping={searchMapping}
                        remoteUrl={`${endpointContants.adminSearchRequest}?searchType=${type}`}
                        isAssignTruck={true}
                        adminSearch={true}
                        onSelectMenu={(option) => {
                            console.log("haulier selected new", option);
                            SearchInputParam.changeValue(handleInputValueChange(option.value))
                        }}
                    />
                    {/* {search && <IconButton
                        onClick={() => SearchInputParam.changeValue(handleInputValueChange(""))}
                        className={classes.iconButton}
                        aria-label="search">
                        <Clear style={{ fill: '#0E1B3D', fontSize: '24px' }} />
                    </IconButton>} */}
                    <Select
                        id="search-booking"
                        name="searchBooking"
                        value={type}
                        onChange={(e) => SearchInputParam.changeType(handleTypeChange(e))}
                        variant="outlined"
                        input={
                            <OutlinedInput
                                name="containerType"
                                classes={outlinedInputClasses}
                            />
                        }
                        inputProps={{
                            classes: { icon: classes.icon },
                            MenuProps: {
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                },
                                getContentAnchorEl: null,
                                classes: { paper: classes.input },
                                style:{top:'4px', left:'-8px'}
                            }
                        }}
                        IconComponent={ExpandMoreRounded}
                    >
                        {typeOptions.map((option, i) => (
                            <CustomMenuItem key={i} value={option.value} >
                                {option.label}
                            </CustomMenuItem>
                        ))}
                    </Select>
                </Paper>
            </form>
        </FormProvider>
    )
}

export default SearchInput;