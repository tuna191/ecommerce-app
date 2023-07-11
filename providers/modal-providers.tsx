"use client"

import { useState,useEffect } from "react"
import StoreModal from '@/components/modal/store-modal'
import React from 'react'

const ModalProviers = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted) {
        return null;
    }

    return(
        <>
            <StoreModal/>
        </>
    )
}

export default ModalProviers