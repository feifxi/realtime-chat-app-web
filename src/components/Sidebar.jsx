import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { TbUsers } from "react-icons/tb";
import avatar from '../assets/image/avatar.jpg'
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading, notiUserIds } = useChatStore();
  const { onlineUsers, isUserOnline } = useAuthStore()

  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly 
  ? users.filter((user) => isUserOnline(user._id)) 
  : users

  const onlineNumber = (onlineUsers.length === 0) ? 0 : onlineUsers.length - 1 

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex flex-col h-full w-14 sm:w-20 lg:w-72 border-r border-base-300 transition-all duration-200">
      <div className="p-5 border-b border-base-300">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <TbUsers fontSize={25} />
          <span className="hidden lg:block font-bold">Contacts</span>
        </div>
        {/* Online user filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineNumber} online)</span>
        </div>
      </div>

      {/* Contacts */}
      <div className="overflow-y-auto flex flex-col">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`relative p-3 flex justify-center lg:justify-start items-center gap-3 ${
              selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''
            }`}
          >
            {/* User Avatar */}
            <div className="relative">
              <img 
                src={ user.profilePic || avatar } 
                alt="skeleton avatar"
                className="size-6 sm:size-12 rounded-full object-cover" 
              />
              { isUserOnline(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
              )}
            </div>
            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0 max-w-[200px]">
              <h3 className="font-semibold truncate">
                { user.fullname }
              </h3>
              <p className="text-sm text-zinc-400">
                { isUserOnline(user._id) ? 'Online' : 'Offline' }
              </p>
            </div>
            { notiUserIds[user._id] && (
              <span className="absolute right-5 rounded-full bg-red-500 size-6 text-white flex justify-center items-center ml-auto max-lg:hidden">
                { notiUserIds[user._id] > 9 ? '9+' : notiUserIds[user._id] }
              </span>
            )}
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
