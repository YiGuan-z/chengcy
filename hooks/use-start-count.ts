import {useCallback, useEffect, useState} from "react";

/**
 * 检查时候第一次加载，如果不传递参数，就检查时候是第一次启动，传递了参数可以检查许多东西的第一次。
 * 返回一个变量和一个重置方法，重置方法和它的key高度绑定。
 * @param key
 */
export const useStartCount = (key: string = "firstStart") => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (localStorage) {
            const item = localStorage.getItem(key);
            const initialCount = item ? parseInt(item,10) : 0
            setCount(initialCount)
        }
    }, [key]);

    useEffect(() => {
        if (localStorage) {
            localStorage.setItem(key,count.toString())
        }
    }, [key,count]);

    const resetCount = useCallback(() => {
        if (localStorage) {
            localStorage.setItem(key,'0')
        }
    }, [key]);

    const incrementCount = useCallback(() => {
        setCount((state)=>state+1)
    }, []);

    return { count, resetCount, incrementCount}
}