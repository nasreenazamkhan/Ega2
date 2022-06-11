
import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const CustomizedTabs = withStyles({
  root: {
  
  },
  indicator: {
    backgroundColor: '#0568AE',
    height:4
  },
  flexContainer: {
    borderBottom: '3.5px solid #E1E1E1'
  }
})(Tabs);

const CustomizedTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color:'black',
      fontSize:'18px',
      fontFamily:'Dubai Medium',
      fontWeight: theme.typography.fontWeightBold,
      //minWidth: 200,
      textAlign: 'left',
      whiteSpace:'nowrap',
     // fontWeight: theme.typography.fontWeightBold,
      // marginRight: theme.spacing(4),
      '&$selected': {
        //color: '#1890ff',
        color:'#0568AE',
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
}));

export default function CustomTabs(props:any) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.defaultSelected?props.defaultSelected:0);
  const labelList=props.labelList;


  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    props.onSelected(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <CustomizedTabs value={value} onChange={handleChange} >
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