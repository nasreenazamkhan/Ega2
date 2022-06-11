import React from 'react';
import { Card, CardHeader, CardContent, Icon } from '@material-ui/core';
import './confirm.css';

function ConfirmComponent(props) {
    return (
        <>
            <Card>
                <div className="confirm-header">
                    <div><Icon className={props.iconClass || "confirm-icon"}>{props.confirmIcon || 'done'}</Icon></div>
                    <div className={props.msgClass || "confirm-message"}>{props.headMessage || 'Confirmed'}</div>
                </div>
                <CardContent className="confirm-content">
                    {props.children}
                </CardContent>

            </Card>
        </>
    )
}

export default React.memo(ConfirmComponent);
