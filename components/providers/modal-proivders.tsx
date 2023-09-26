"use client"

import {useEffect, useState} from "react";
import CarTest1Modal from "@/components/modules/car-test1-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) return null

    return (
        <>
            <CarTest1Modal/>
        </>
    )
}