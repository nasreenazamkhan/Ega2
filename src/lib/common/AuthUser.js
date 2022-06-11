import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser,confirmUserDetails } from '../redux';


function AuthUser() {
    const user = useSelector(state => state.loginUser.user);
    const status = useSelector(state => state.loginUser.login);

    console.log("login user auth....");


    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(loginUser());
        console.log("login user auth....")
    }, [])

    const refresh = () => {
        console.log('refreshing');
        dispatch(loginUser());
    }
    const handleTimer = () => {
        let tim = setTimeout(() => {
            refresh()
        }, user.expires_in_seconds);

    }
    return (
        <>
            {status === true ? handleTimer()
                : null
            }
        </>
    )
}

export default AuthUser
