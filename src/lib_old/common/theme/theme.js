import { createMuiTheme } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#4b60e0",
        },
        secondary: {
            main: "#e0504b"
        },
    },
    status: {
        danger: orange
    },
    overrides: {
    }


});

export default theme;