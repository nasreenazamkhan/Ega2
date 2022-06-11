import React from 'react'
import { Card, CardHeader, CardContent } from '@material-ui/core';
import './formContainer.css';
import Messagebar from '../messagebar/messagebar';
function FormContainer(props) {
    return (
        <>
            <Card>
                <CardHeader title={props.title} className="page-header" />
                <CardContent>
                    <Messagebar />
                    {props.children}
                </CardContent>
            </Card>
        </>
    )
}

export default React.memo(FormContainer);
