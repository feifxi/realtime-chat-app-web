import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { IoMdClose } from "react-icons/io";
import avatar from '../assets/image/avatar.jpg'
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { isUserOnline } = useAuthStore();

  return (
    <div className="flex justify-between items-center px-4 py-2.5 border-b border-base-300">
      <div className="flex gap-2">
        <img 
          src={ selectedUser.profilePic || avatar }
          alt="avatar"
          className="size-10 rounded-full object-cover" 
        />
        
        <div className="">
          <h3 className="font-semibold">{ selectedUser.fullname }</h3>
            <p className={`text-sm text-base-content/70 ${isUserOnline(selectedUser._id) ? 'text-green-500' : ''}`}>
            { isUserOnline(selectedUser._id) ? 'Online' : 'Offline' }
          </p>
        </div>
      </div>

      <button 
        onClick={() => setSelectedUser(null)}
        className="cursor-pointer text-2xl p-1 hover:bg-white/5 rounded-full transition"
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default ChatHeader;
