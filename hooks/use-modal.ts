import {create} from "zustand";

export type ModalType = "car:test1" | "car:test2"

interface ModalStore {
    type: ModalType | null
    isOpen: boolean
    onOpen: (type: ModalType) => void
    onClose: () => void
}

export const useModal = create<ModalStore>((setState) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => setState({type, isOpen: true}),
    onClose: () => setState({isOpen: false})
}))