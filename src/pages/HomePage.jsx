import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'
import { useChatStore } from '../store/useChatStore'

const HomePage = () => {
  const { selectedUser } = useChatStore() 

  return (
    <section className="sm:px-4 sm:py-5">
      <div className="max-w-screen-lg h-[calc(100vh-8rem)] mx-auto rounded-lg bg-base-100 shadow-xl">
        <div className="flex h-full">
          <Sidebar />
          
          { selectedUser ? <ChatContainer /> : <NoChatSelected /> }
        </div>
      </div>
    </section>
  )
}

export default HomePage
