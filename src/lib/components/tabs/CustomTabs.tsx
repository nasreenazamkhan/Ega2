
import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const CustomizedTabs = withStyles({
  root: {
    background: '#fff',
    '& .Mui-disabled':{
      background: '#fff',
    }
  },
  indicator: {
    backgroundColor: '#0E1B3D',
    height:4
  },
  flexContainer: {
    // borderBottom: '3.5px solid #E1E1E1'
  },
})(Tabs);

const CustomizedTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color:'black',
      fontFamily:'Dubai Regular',
      fontSize:'16px',
      fontWeight: theme.typography.fontWeightBold,
      maxWidth: 350,
      textAlign: 'left',
      whiteSpace:'nowrap',
      '&$selected': {
        color:'#0E1B3D',
         fontWeight: theme.typography.fontWeightBold,
      },
      // '&:focus': {
      //  color:'##FF0000'
      // },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
  nonActiveStep: {
    borderBottomStyle: "solid",
    borderBottomColor: "#E9E9E9",
    height:4,
    '&.Mui-selected': {
      borderBottomStyle: "solid",
      borderBottomColor: "#0E1B3D",
  }
}
}));

export default function CustomTabs(props:any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.defaultSelected ? props.defaultSelected : 0);
  const labelList=props.labelList;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    props.onSelected(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <CustomizedTabs value={value} onChange={handleChange} classes={{root:classes.nonActiveStep}}>
        { labelList.map((label:any) =><CustomizedTab key={label} label={label}/>)}
          {/* <AntTab label="Tab 1" />
          <AntTab label="Tab 2" />
          <AntTab label="Tab 3" /> */}
        </CustomizedTabs>
        {/* <Typography className={classes.padding} /> */}
      </div>
    
    </div>
  );
}