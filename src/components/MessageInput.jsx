import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { LuImage } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null) 
  const fileInputRef = useRef(null)
  const { sendMessage, isMessageUploading } = useChatStore();
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file || isMessageUploading) return
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file")
      
    const maxSizeInBytes = 2 * 1024 * 1024; // max size in MB - 2mb
    if (file.size > maxSizeInBytes) return toast.error("File size too large");

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }


  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!text.trim() && !imagePreview) return toast.error('Plesae input some message or choose an image')

    await sendMessage({
      text: text.trim(),
      image: imagePreview,
    })

    setText('')
    removeImage()
  }

  return (
    <div className="p-4 w-full">
      { imagePreview && (
        <div className="flex mb-3">
          <div className="relative">
            <img 
              src={imagePreview} 
              alt="Preview image" 
              className="size-20 object-cover border border-zinc-700 rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 flex items-center justify-center size-5 bg-base-300 rounded-full"
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full input input-bordered rounded-lg"
        />

        <input
          ref={fileInputRef}        
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isMessageUploading}
          className="hidden"
        />
        <button 
          type="button" 
          className={`btn btn-circle ${imagePreview ? "text-emerald-500" : ''}`}
          onClick={() => fileInputRef.current?.click()}
          disabled={isMessageUploading}
        >
          <LuImage className="text-xl sm:text-2xl" />
        </button>

        <button 
          type="submit" 
          className="btn btn-circle btn-primary"
          disabled={(!text.trim() && !imagePreview) || isMessageUploading }
        >
          { isMessageUploading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <LuSend className="text-xl sm:text-2xl" />
          ) }
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
