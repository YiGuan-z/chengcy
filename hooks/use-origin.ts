import {useEffect, useState} from "react";

/**
 *  get Origin
 */
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    //获取当前url
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""
    if (!mounted) {
        return ""
    }
    return origin
}