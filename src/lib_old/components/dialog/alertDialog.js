import React from 'react'
import { AppDialog } from './dialogBox'

function AlertDialog(props) {
    return (
        <div>
            <AppDialog title="Alert" onClose={props.onClose} isopen={props.isopen}>
                {props.message}
            </AppDialog>
        </div>
    )
}

export default React.memo(AlertDialog);
