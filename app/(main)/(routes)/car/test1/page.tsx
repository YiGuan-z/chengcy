"use client"

import {CarTestPage} from "@/components/car/test/CarTest";

const CarTest1 = () => {
    return CarTestPage({
        url:'/api/car-item-bank/test1',
        title:'科目一测试',
        storeKey:'test1',
        setStoreKey:'setTest1',
        clearKey:'clearTest1'
    })
}

export default CarTest1