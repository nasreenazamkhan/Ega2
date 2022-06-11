import { Breadcrumbs, Grid, InputBase, Link, makeStyles, TextField, withStyles } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { useHistory } from "react-router-dom";
import HaulierList from "./HaulierList";
import ApplnAutoCompleteAsync from "../../../lib/components/autocomplete/ApplnAutoCompleteAsync";
import * as endpointContants from '../../../utils/ptmsEndpoints';

const useStyles = makeStyles((theme) => ({
    separator: {
        color: '#EA2428'
    },
    breadCrumRoot: {
        fontFamily: 'Dubai Light',
        fontWeight: 600,
        fontSize: '16px'
    }
}));

const CustomizedInputBase = withStyles({
    input: {
        fontWeight: 600,
        fontFamily: 'Dubai Light',
        fontSize: '16px',
        color: '#0E1B3D',
    }
})(InputBase);

export default function HaulierDetails(props: any) {
    const classes = useStyles();
    let history = useHistory();
    const [haulierCode, setHaulierCode] = useState();
    const [haulierName, setHaulierName] = useState();
    const haulierMapping = { label: "label", value: "value" };
    const haulierUrl = `${endpointContants.fetchTransporters}`;

    const methods = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        // defaultValues: formvalues,
    });


    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return (
        <FormProvider {...methods}>
            <form>
                <Grid container spacing={2} style={{ paddingTop: '25px' }}>
                    <Grid item style={{paddingRight:0}}>
                        {/* <SearchRoundedIcon style={{ fill: '#848484', marginTop:'12px'}} /> */}
                        <img src="./search.svg" height="23px" style={{marginTop:'17px'}}/>
                    </Grid>
                    <Grid item style={{paddingLeft:0}}>
                        <ApplnAutoCompleteAsync
                            name={"haulierCode"}
                            placeholder="Search with haulier name or code"
                            width={"1180px"}
                            border={"none"}
                            kvMapping={haulierMapping}
                            remoteUrl={haulierUrl}
                            isAssignTruck={true}
                            onSelectMenu={(option: any) => {
                                console.log("haulier selected new", option);
                                setHaulierCode(option.value);
                                setHaulierName(option.label);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: '20px' }}>
                        <Breadcrumbs aria-label="breadcrumb" classes={{
                            root: classes.breadCrumRoot,
                            separator: classes.separator,
                        }}>
                            <Link onClick={history.goBack} style={{ color: '#848484' }}>
                                Home
                            </Link>
                            <Link href="/haulier-list" onClick={handleClick} style={{ color: '#0E1B3D' }}>
                                Hauliers
                            </Link>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: 0 }}>
                        <HaulierList haulierCode={haulierCode} haulierName={haulierName}/>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
}