import React from "react";
import { TextField } from "@material-ui/core";
import { useField } from "formik";
import ClearIcon from "../icons/clearIcon";

function TextArea(props: any) {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    let { helperText } = props;
    const handleIconClick = () => {
        setValue('');
    }

    let showError = false;
    if (meta.touched && meta.error) {
        showError = true;
        helperText = meta.error;
    }
    let icon = null;
    if (field.value) {
        icon = <ClearIcon onClick={handleIconClick} />;
    } else {
        icon = null;
    }

    const IsEqual = (prevProps: any, nextProps: any) => {
        const [field, meta, helpers] = useField(prevProps);
        const [field2, meta2, helpers2] = useField(nextProps);
        console.log('prev ' + field.value);
        console.log('next ' + field2.value);
        return true;
    }
    return (
        <TextField
            label={props.label}
            id={props.name}
            rows={props.rows}
            multiline
            defaultValue={props.placeholder}
            fullWidth={true}
            {...field}
            InputProps={{
                endAdornment: icon
            }}
        />


    )

}

export default React.memo(TextArea, (prev: any, next: any) => {
    return true;
});


