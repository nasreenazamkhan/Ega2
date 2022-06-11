import React from 'react';
import './label.css';
import { Icon } from '@material-ui/core';

function LabelComponent(props) {

    return (
        <>

            <div className="MuiFormLabel-root label-label-text">
                {props.label}
            </div>
            <div className="label-div">
                {props.labelType === 1 &&
                    <span className="label-txt">
                        {props.value}
                    </span>
                }

                {props.labelType === 2 &&
                    <span onClick={() => {
                        props.onClick(props.id)
                    }} className="label-txt label-txt-hyperlink">
                        {props.value}
                    </span>
                }


                {props.labelType === 3 &&
                    <span onClick={() => {
                        props.onClick(props.id)
                    }} className="label-txt label-download">
                        <Icon>vertical_align_bottom</Icon>   {props.value}
                    </span>
                }
            </div>
        </>
    )
}

export default React.memo(LabelComponent);

