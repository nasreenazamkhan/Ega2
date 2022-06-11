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
        icon?: string
    }

const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor: '#4F4F4F',
        color: '#FFFF',
        margin: '5px',
        '&:hover': {
            backgroundColor: '#F0902D'
        }
    }
}));



const AppButton: React.FC<MyButtonProps> = (props) => {

    const classes = useStyles();
    const { type, handleClick, disabled, text, icon = 'send' } = props;
    const renders = React.useRef(100);

    return (
        <>
            {/* <span>renders:{renders.current++}</span> */}

            {/* <Button variant="contained" color="primary"
                type={type} onClick={handleClick}
                disabled={disabled}>
                {text}
            </Button> */}
            <Button startIcon={<Icon>{icon}</Icon>}
                type={type} onClick={handleClick} className={classes.button}
                variant="contained" >
                {text}
            </Button>
        </>
    )

}

export default React.memo(AppButton);


