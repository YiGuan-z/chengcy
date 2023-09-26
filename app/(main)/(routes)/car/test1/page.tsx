"use client"

import {CarTestPage} from "@/components/car/test/CarTest";

const CarTest1 = () => {
    return CarTestPage({
        url:"/api/car-item-bank/test1",
        title:"科目一测试"
    })
}

export default CarTest1