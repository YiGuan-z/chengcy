"use client"

import {CarTestPage} from "@/components/modules/car/test/car-test-page";

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