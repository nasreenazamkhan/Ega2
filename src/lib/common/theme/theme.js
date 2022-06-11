import { createMuiTheme } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0568AE",
    },
    secondary: {
      main: "#0568AE"
    },
    background: {
      default: "#FFFFFF"
    }
  },
  status: {
    danger: orange
  },
  overrides: {
  },
  typography: {
    fontFamily: "Dubai Regular",
    fontWeight:600,
    fontSize: 16,
    subtitle1: {
      fontSize: 20,
      color: '#0E1B3D',
      fontFamily: "Dubai Medium",
    },
    h1:
    {
      fontSize: 24,
      fontFamily: "Dubai Medium",
    },
    h2:
    {
      fontSize: 28,
      fontFamily: "Dubai Medium",
      color: '#0568AE'
    },
    h3:
    {
      fontSize: 16,
      fontFamily: "Dubai Regular",
      color: '#5A5A5A'
    },
    body2:{
      fontSize: 16,
      fontFamily: "Dubai Light",
      fontWeight:600
    },
    caption:{
      fontSize: 16,
      fontFamily: "Dubai Light",
      fontWeight:600
    },
    h4:{
      fontFamily: "Dubai Light",
      fontWeight:600
    },
  }

});


theme.overrides = {
  MuiButton: {
    // root: {
    //   borderRadius: '3px', 
    //   textTransform: 'none', // removes uppercase transformation
    //   boxShadow:'0px 1px 4px #00000029',
    //   color:'#FFFFFF',
    //   fontSize:'18px',
    //   fontFamily:'Dubai Medium',
    //   marginBottom:'5px',
    // },
    outlined: {
      color: '#0E1B3D',
      borderRadius: '3px',
      boxShadow: '0px 1px 5px #00000029',
      border: '1px solid #0E1B3D',
      backgroundColor: '#FAFAFA',
      '&:hover': {
        color: '#1360D2',
      },
    },
    root: {
      border: "1px solid #1360D2",
      textTransform: 'none',
      boxShadow: '0px 1px 4px #00000029',
      fontSize: "16px",
      fontFamily: 'Dubai Light',
      fontWeight: 600,
      minWidth: '100px',
      minHeight: '37px',
      color: '#FFFFFF',
      padding: '0',
      backgroundColor: '#1360D2',
      borderRadius: '3px',
      '&:hover': {
        color: '#1360D2',
      },
      "&:disabled": {
        color: '#FFFFFF !important',
        background: '#AEB2BB',
        border: "1px solid #AEB2BB",
      }
    },
  },

  MuiButtonBase: {
    root: {
      '&:focus': {
        outline: "none"
      },
    }
  },

  MuiOutlinedInput: {
    root: {
      // position: "relative",
      "& $notchedOutline": {
        borderColor: "#168FE4BC",
        color: "#168FE4BC",
      },
      "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
        borderColor: "#1360D2",
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          borderColor: "#1360D2",
        },
      },
      "&$focused $notchedOutline": {
        borderColor: "#1360D2",
        borderWidth: 1.5,
      },
    },
  },

  MuiInputLabel: {
    root: {
      fontSize: '16px',
      color: '#000000',
      fontFamily: "Dubai Regular",
    },

  },

  MuiSvgIcon: {
    root: {
      fill: "#1360D2"
    },
  },

  MuiLink: {
    root: {
      fontFamily: "Dubai Regular",
      cursor: 'pointer',
      color: '#0568AE',
      '&:focus': {
        outline: "none"
      },
    }
  },

  MuiInputBase: {
    input: {
      fontSize: '16px',
      fontFamily: 'Dubai Regular',
    },
  }
};

export default theme;