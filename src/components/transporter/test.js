
import { getHttp } from '../../lib/common/HttpService';
import React, { useEffect, useState } from "react";

export default function Test() {

    useEffect(()=>   
    {
        const link=`/app/api/secure/boe/declaration?ref=c123`;
        let obj=
        {
            url:link
        }
        return getHttp(obj, false);
    },[])


    return (
        <>
        <h2>Success</h2>
        </>
    )
}