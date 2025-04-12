import { TbMessage } from "react-icons/tb";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex justify-center items-center p-4">
      <div>
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce" >
              <TbMessage className="text-3xl" /> 
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Let's Start มั่วบ้านงาน!</h2>
          <p className="text-base-content/60">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoChatSelected
