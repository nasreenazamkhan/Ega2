import React from 'react';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';


function IconLookup(props) {
    const getIcon = (iconType) => {
        switch (iconType) {
            case 1: return (<><DescriptionOutlinedIcon /></>);
            default:
                return (<><DescriptionOutlinedIcon /></>)
        }
    }

    return (
        <div>
            {
                getIcon(props.IconType)
            }
        </div>
    )
}

export default IconLookup;

