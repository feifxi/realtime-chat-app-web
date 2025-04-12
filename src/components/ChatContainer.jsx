import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import { useAuthStore } from "../store/useAuthStore"
import avatar from '../assets/image/avatar.jpg'
import { formatMessageTime } from "../lib/utils"
import ChatSkeleton from "./skeletons/ChatSkeleton"
import { useChatScroll } from "../hooks/useChatScroll"

const ChatContainer = () => {
  const { selectedUser ,messages, getMessages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore()
  const { authUser } = useAuthStore()
  const { scrollToBottom, messageEndRef } = useChatScroll(messages)
  
  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()

    return () => unsubscribeFromMessages()
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])


  const handleImageLoaded = () => {
    scrollToBottom()
  }

  if (isMessagesLoading) return <ChatSkeleton />

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader />

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        { messages.map((message) => (
          <div 
            ref={messageEndRef}
            key={message._id}
            className={`chat ${ message.senderId === authUser._id ? 'chat-end' : 'chat-start' }`} 
          >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="chat avatar"
                src={
                  message.senderId === authUser._id 
                  ? authUser.profilePic || avatar
                  : selectedUser.profilePic || avatar
                }
              />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50">
              { formatMessageTime(message.createdAt) }
            </time>
          </div>
          <div className={`chat-bubble shadow-sm ${
              message.senderId === authUser._id ? 'bg-primary' : 'bg-base-200' 
            } ${
              message.image ? 'p-3' : ''
            }`}
          >
            { message.image && (
              <img 
                src={message.image} 
                alt="chat image" 
                className="w-[200px] object-cover rounded-md mb-3"
                onLoad={handleImageLoaded}
              />
            )}
            { message.text && (
              <p className={`font-medium break-words ${message.senderId === authUser._id ? 'text-primary-content' : ''}`}>
                { message.text }
              </p>
            )}
          </div>
        </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
