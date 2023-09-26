"use client"

import {useModal} from "@/hook/use-modal";

const CarTest1Modal = () => {
    const {isOpen,onClose,type}=useModal()

    return (
        <div>
            科目一测试
        </div>
    )
}

export default CarTest1Modal