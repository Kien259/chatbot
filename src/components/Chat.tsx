import { GrAttachment } from 'react-icons/gr'
import { FaMicrophone } from 'react-icons/fa6'
import { LuSend } from 'react-icons/lu'
import { FaUserCircle } from 'react-icons/fa'
import { useContext } from 'react'
import { Context } from '~/context/Context'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { AiOutlineCode } from 'react-icons/ai'
import React from 'react'

const Chat = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, chatHistory } = useContext(Context);

  return (
    <div className='flex-1 min-h-screen relative pb-[15vh]'>
      <div className='flex items-center justify-end text-[22px] text-[#585858] p-5'>
        <FaUserCircle className='text-6xl w-10 rounded-full' />
      </div>
      <div className='max-w-[900px] m-auto w-full'>
        {!showResult ? (
          <>
            <div className='flex flex-col items-center text-center my-[50px]'>
              <p className='text-[36px] md:text-[56px] text-[#c4c7c5] font-medium'>
                <span className='bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent'>
                  Hello, ...
                </span>
              </p>
              <p className='text-[18px] md:text-[22px]'>How can I help you today?</p>
            </div>
            <div className='absolute w-full max-w-[900px] m-auto px-5 py-0 bottom-[10%] md:bottom-[30%]'>
              <div className='flex flex-col gap-6 bg-[#f0f4f9] px-5 py-2.5 rounded-lg'>
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type='text'
                  placeholder='Enter a prompt here'
                  className='w-full bg-transparent text-lg p-2 border-none outline-none'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && input.trim() !== '') {
                      onSent()
                      setInput('')
                      e.preventDefault()
                    }
                  }}
                />
                <div className='flex justify-between items-center gap-[15px] text-base'>
                  <div className='flex gap-4'>
                    <div className='flex cursor-pointer rounded-full hover:bg-[#e2e6eb] p-2 items-center'>
                      <GrAttachment className='w-6' />
                      <p>Attach</p>
                    </div>
                    <div className='flex cursor-pointer rounded-full hover:bg-[#e2e6eb] p-2 items-center'>
                      <FaMicrophone className='w-6' />
                      <p>Voice</p>
                    </div>
                  </div>
                  <div className='cursor-pointer rounded-full hover:bg-[#e2e6eb] p-2 text-xl items-center'>
                    <LuSend onClick={() => onSent()} className='w-6 m-1' />
                  </div>
                </div>
              </div>
              <div className='flex mt-8 gap-1 justify-center flex-wrap'>
                <div className='flex items-center text-xs px-2 py-1 mt-2'>
                  <FaArrowRightToBracket />
                  <p>Try searching</p>
                </div>
                <div className='flex items-center text-xs border px-2 py-1 mt-2 rounded-full whitespace-nowrap'>
                  <AiOutlineCode />
                  <p>Suggest beautiful place to see on an upcoming road trip</p>
                </div>
                <div className='flex items-center text-xs border px-2 py-1 mt-2 rounded-full'>
                  <AiOutlineCode />
                  <p>Optimize this code for me</p>
                </div>
                <div className='flex items-center text-xs border px-2 py-1 mt-2 rounded-full'>
                  <AiOutlineCode />
                  <p>Optimize this code for me</p>
                </div>
                <div className='flex items-center text-xs border px-2 py-1 mt-2 rounded-full'>
                  <AiOutlineCode />
                  <p>Optimize this code for me</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='max-h-[70vh] overflow-y-scroll px-[5%] py-0 no-scrollbar'>
            {chatHistory.map((entry, index) => {
              return (
              <React.Fragment key={index}>
              <div className='flex items-center gap-5 mx-0 my-10 '>
                <span className='text-4xl'>{entry.prompt}</span>
              </div>
              <div className='flex flex-col max-w-full'>
                <div className='flex items-start gap-5 text-xl'>
                  <FaUserCircle className='flex-shrink-0 mt-1' /> {/* Ensure the icon doesn't shrink */}
                  <p className='text-right'>Answer</p> {/* Aligns "Answer" text to the right */}
                </div>
                <div className='w-full overflow-y-auto p-4 mt-4 text-justify'>
                  <p dangerouslySetInnerHTML={{ __html: entry.result }}></p>
                </div>
              </div>
              {index < chatHistory.length - 1 && (
                <div className='my-4 flex items-center'>
                  <div className='flex-grow border-t border-gray-300'></div>
                  <span className='mx-4 text-sm text-gray-500'>
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className='flex-grow border-t border-gray-300'></div>
                </div>
              )}
              </React.Fragment>
            )})}
            <div className='absolute w-[90%] max-w-[900px] m-auto px-5 py-0 bottom-[5%]'>
              <div className='flex gap-6 bg-[#f0f4f9] px-5 py-2.5 rounded-full'>
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type='text'
                  placeholder='Enter a prompt here'
                  className='w-full bg-transparent text-base p-2 border-none outline-none'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && input.trim() !== '') {
                      onSent()
                      setInput('')
                      e.preventDefault()
                    }
                  }}
                />
                <div className='flex justify-between items-center text-base'>
                  <div className='flex'>
                    <div className='flex cursor-pointer rounded-full hover:bg-[#e2e6eb] p-2 items-center'>
                      <GrAttachment className='w-6' />
                    </div>
                    <div className='flex cursor-pointer rounded-full hover:bg-[#e2e6eb] p-2 items-center'>
                      <FaMicrophone className='w-6' />
                    </div>
                  </div>
                  {input ? (
                    <div className='cursor-pointer rounded-full hover:bg-[#e2e6eb] p-2 items-center'>
                      <LuSend onClick={() => onSent()} className='w-6 m-1' />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
