import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    notiUserIds: {},
    selectedUser: null,
    isMessagesLoading: false,
    isUsersLoading: false,
    isMessageUploading: false,

    setSelectedUser: (selectedUser) => {
        set({ selectedUser })
        if (selectedUser) {
            delete get().notiUserIds[selectedUser._id]
        }
    },

    getUsers: async () => {
        try {
            set({ isUsersLoading: true })
            const res = await axiosInstance.get('/messages/users')
            set({ users: res.data })
            get().sortedOnlineUsers()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true })
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
            set({ messages: [] })
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        try {
            set({ isMessageUploading: true })
            const { selectedUser, messages } = get()
            const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
            set({ isMessageUploading: false })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return;

        const { socket } = useAuthStore.getState()

        socket.on('newMessage', (newMessage) => {
            if (newMessage.senderId === selectedUser._id) {
                set({ messages: [ ...get().messages, newMessage ] })
            }
        })
    },

    unsubscribeFromMessages: () => {
        const { socket } = useAuthStore.getState()
        socket.off('newMessage')
    },

    sortedOnlineUsers: () => {
        const { isUserOnline } = useAuthStore.getState()
        const { users } = get()
        set({ users: users.sort((a,b) => isUserOnline(b._id) - isUserOnline(a._id)) }) // 1 - 0 => online come first 
    },
}))