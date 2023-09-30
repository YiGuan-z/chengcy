"use client"

import {CarTestPage} from "@/components/modules/car/test/car-test-page";

const CarTest4 = () => {
    return CarTestPage({
        url:'/api/car-item-bank/test4',
        title:'科目四测试',
        storeKey:'test4',
        setStoreKey:'setTest4',
        clearKey:'clearTest4'
    })
}

export default CarTest4