import ChatHeader from "../ChatHeader";
import MessageInput from "../MessageInput";

const ChatSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader/>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {skeletonMessages.map((_, idx) => (
          <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
            <div className="chat-image avatar">
              <div className=" skeleton size-10 rounded-full"></div>
            </div>

            <div className="chat-header mb-1 w-full max-w-16">
              <div className="skeleton w-full h-4" ></div>
            </div>

            <div className="chat-bubble bg-transparent p-0 w-full max-w-[200px]">
              <div className="skeleton w-full h-16"></div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
    
  );
};

export default ChatSkeleton
