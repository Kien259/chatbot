import { useContext, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaPlus } from 'react-icons/fa'
import { FaClockRotateLeft, FaRegCircleQuestion } from 'react-icons/fa6'
import { FiSettings } from 'react-icons/fi'
import { BsChatLeftDots } from 'react-icons/bs'
import { Context } from '~/context/Context'

const Sidebar = () => {
  const [extended, setExteneded] = useState(false)
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className='hidden md:inline-flex flex-col h-screen justify-between bg-[#f0f4f9] px-4 py-6'>
      <div className='top'>
        <RxHamburgerMenu
          onClick={() => setExteneded((prev) => !prev)}
          className='w-5 block cursor-pointer ml-2.5 menu'
        />
        <div
          onClick={() => newChat()}
          className='inline-flex items-center gap-2.5 bg-[#e6eaf1] text-sm text-gray-500 cursor-pointer mt-12 px-4 py-2.5 rounded-full new-chat'
        >
          <FaPlus />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className='flex flex-col recent animate-fadeIn'>
            <p className='mt-7 mb-5 recent-title'>Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className='flex gap-2.5 text-[#282828] cursor-pointer pr-10 p-2.5 rounded-full hover:bg-[#e2e6eb] recent-entry items-center'
                >
                  <BsChatLeftDots />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
      <div className='bottom flex flex-col'>
        <div className='flex gap-2.5 text-[#282828] cursor-pointer p-2.5 items-center rounded-full hover:bg-[#e2e6eb] recent-entry'>
          <FaRegCircleQuestion />
          {extended ? <p>Help</p> : null}
        </div>
        <div className='flex gap-2.5 text-[#282828] cursor-pointer p-2.5 items-center rounded-full hover:bg-[#e2e6eb] recent-entry'>
          <FaClockRotateLeft />
          {extended ? <p>Activities</p> : null}
        </div>
        <div className='flex gap-2.5 text-[#282828] cursor-pointer p-2.5 items-center rounded-full hover:bg-[#e2e6eb] recent-entry'>
          <FiSettings />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
