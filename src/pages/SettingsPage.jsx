import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../constants"
import { IoIosSend } from "react-icons/io";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore()

  return (
    <section className="px-8 sm:px-16 py-5">
      <div className="py-5 max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold text-center">SETTINGS</h1>
        {/* Theme Section */}
        <div className="flex flex-col gap-1 mt-8">
          <h2 className="font-semibold text-xl">Themes</h2>
          <p>Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 mt-5">
          {THEMES.map((t) => (
            <button 
              key={t}
              className={`flex flex-col justify-center items-center p-3 rounded-xl ${
                t === theme ? 'bg-base-300' : 'hover:bg-base-300/50'
              }`}
              onClick={() => { setTheme(t) }}
            >
              <div className="bg-base-100 p-2 rounded" data-theme={t}>
                <div className="flex rounded overflow-hidden">
                  <div className="bg-primary size-5"></div>
                  <div className="bg-secondary size-5"></div>
                  <div className="bg-accent size-5"></div>
                  <div className="bg-neutral size-5"></div>
                </div>
              </div>
              <p className="text-sm font-semibold">{ t }</p>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h2 className="text-lg font-semibold mt-5 mb-3">Preview</h2>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0 text-2xl">
                      <IoIosSend />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default SettingsPage
