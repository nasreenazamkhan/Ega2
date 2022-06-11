import { Icon, makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import React from "react";
import theme from "../../common/theme/theme";

type MyButtonProps =
    {
        type?: any,
        disabled?: boolean,
        text?: string,
        handleClick?(e: any): void,
        color?: string,
        icon?: string,
        size?: "medium",
        css?: any
    }

const useStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: "#fff",
            backgroundColor: "#1360D2",
        },
    },
}));



const AppButton: React.FC<MyButtonProps> = (props) => {

    const classes = useStyles();
    const { type, handleClick, disabled, text, icon = 'send',size, css} = props;
    const renders = React.useRef(100);

    return (
        <>
            {/* <span>renders:{renders.current++}</span> */}

            {/* <Button variant="contained" color="primary"
                type={type} onClick={handleClick}
                disabled={disabled}>
                {text}
            </Button> */}
            <Button 
                style={{fontWeight:600, fontFamily:'Dubai Light', fontSize:'16px', padding:'10px'}}
                type={type} onClick={handleClick} className={css} classes={text == 'Yes' ? {root: classes.button}:{}}
                variant="outlined"  disabled={disabled} size={size}> 
                {text}
            </Button>
        </>
    )

}

export default React.memo(AppButton);


