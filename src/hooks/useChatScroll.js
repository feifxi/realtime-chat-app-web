import { useEffect, useRef } from "react";

export const useChatScroll = (dep) => {
    const messageEndRef = useRef(null)

    const scrollToBottom = () => {
        if (dep && messageEndRef.current) {
          messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [dep])

    return { scrollToBottom, messageEndRef }
}