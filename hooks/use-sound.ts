import {useCallback, useEffect, useState} from "react";

export const useSpeech = (text: string, option?: Partial<SpeechSynthesisUtterance>) => {
    const [speaking, setSpeaking] = useState(false)
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

    useEffect(() => {
        const synthesis = window.speechSynthesis;
        if (!synthesis || typeof SpeechSynthesisUtterance === "undefined") {
            console.error('SpeechSynthesis is not supported by this browser')
            return
        }
        const utterance = new SpeechSynthesisUtterance(text)
        Object.assign(utterance, option)
        setUtterance(utterance)

        return () => {
            synthesis.cancel()
            setSpeaking(false)
        }
    }, [option, text])
    //添加状态监听器
    useEffect(() => {
        if (utterance) {
            const onencd = () => {
                setSpeaking(false)
            }
            utterance.addEventListener('end', onencd)
            return () => {
                utterance?.removeEventListener('end', onencd)
            }
        }
    }, [utterance])
    //如果当前在发言，那么取消当前发言，并重新发言
    const speak = useCallback((abort = false) => {
        if (utterance) {
            const synthesis = window.speechSynthesis;
            if (abort && synthesis.speaking) {
                synthesis.cancel()
            }
            setSpeaking(true)
            synthesis.speak(utterance)
        }
    }, [utterance])

    const cancel = useCallback(() => {
        const speechSynthesis = window.speechSynthesis;
        if (speaking){
            speechSynthesis.cancel()
        }
    }, [speaking])

    return {
        speak,
        speaking,
        cancel
    }
}