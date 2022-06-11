import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WarningIcon from '@material-ui/icons/Warning';
import { ms } from 'date-fns/locale';
import { SUCCESS, ERROR, INFO, WARNING } from '../../redux/messagebar/messagebarType';
import './messagebar.css';
import { Icon } from '@material-ui/core';
import { hideMessageBar } from '../../redux';

function Messagebar() {
    const mb = useSelector(state => state.messagebar);
    const dispatch = useDispatch();



    const MessageContainer = ({ msgClass, icon }) => {
        return (
            <>
                <div className={msgClass}>
                    <div className="message-icon"><Icon>{icon}</Icon></div>

                    <div className="message-list">
                        <ul>{
                            mb.messages.map((e, i) => {
                                return <li key={i}>{e}</li>
                            })
                        }</ul>
                    </div>
                    <div className="close-icon" onClick={() => {
                        dispatch(hideMessageBar())
                    }}>
                        <Icon>clear</Icon>
                    </div>
                </div>
            </>
        )
    }
    const getWarningMessage = () => {
        return (
            <>
                <MessageContainer msgClass='alert-message-box bg-warning' icon='warning' />
            </>
        )
    }

    const getInfoMessage = () => {
        return (
            <>
                <MessageContainer msgClass='alert-message-box bg-info' icon='info' />
            </>
        )
    }

    const getErrorMessage = () => {
        return (
            <>
                <MessageContainer msgClass='alert-message-box bg-error' icon='error' />
            </>
        )
    }

    const getSuccessMessage = () => {
        return (
            <>
                <MessageContainer msgClass='alert-message-box bg-success' icon='check' />
            </>)
    }

    const getMessageBar = () => {
        console.log('IN componenet');
        switch (mb.messageType) {
            case SUCCESS: return getSuccessMessage();
            case ERROR: return getErrorMessage();
            case INFO: return getInfoMessage();
            case WARNING: return getWarningMessage();
            default:
                return <></>;
        }

    }
    console.log(mb);
    return (
        <>
            {mb.show && mb.show === true && getMessageBar()}
        </>

    )
}

export default React.memo(Messagebar);
