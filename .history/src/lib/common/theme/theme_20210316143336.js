import { createMuiTheme } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0E1B3D",
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
        fontSize:16,
        subtitle1: {
            fontSize: 20,
            color:'#0E1B3D',
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
          color:'#5A5A5A'
      },
     

        }

});

theme.overrides = {
    MuiButton: {
      root: {
        borderRadius: '8px', 
        textTransform: 'none', // removes uppercase transformation
        boxShadow:'0px 1px 4px #00000029',
        color:'#FFFFFF',
        fontSize:'18px',
        fontFamily:'Dubai Medium',
      },
      containedPrimary: {
          background: "transparent linear-gradient(180deg, #1E84EA 0%, #2673CE 67%, #364F91 100%) 0% 0% no-repeat padding-box;",
        },
  },

  
  MuiButtonBase: {
    root: {
      '&:focus': {
        outline:"none"
      },
    }
  },

    MuiOutlinedInput: {
        root: {
        
          // position: "relative",
          // "& $notchedOutline": {
          //   borderColor: "#2EFF22"
          //},
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: "#0568AE",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              borderColor: "#0568AE",
            },
          },
          "&$focused $notchedOutline": {
            borderColor: "#0568AE",
            borderWidth: 1.5,
          },
        },
      },

      MuiInputLabel: {
        root: {
         fontSize:'16px',
         color:'#000000',
         fontFamily: "Dubai Regular",
        },

    },

MuiSvgIcon:{
  root: {
    fill:"#0568AE"
  },
  },
    
    MuiLink:{
        root:{
          fontFamily: "Dubai Regular",
            cursor:'pointer',
        color: '#0568AE',
        '&:focus': {
          outline:"none"
        },
        }
    },

   MuiInputBase: {
     input: {
      fontSize:'16px',
      fontFamily: 'Dubai Regular',
   },
   }
};


export default theme;