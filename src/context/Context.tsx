import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import runChat from '~/config/gemini'

interface ContextType {
  prevPrompts: string[]
  setPrevPrompts: Dispatch<SetStateAction<string[]>>
  onSent: (prompt?: string) => Promise<void>
  setRecentPrompt: Dispatch<SetStateAction<string>>
  recentPrompt: string
  showResult: boolean
  loading: boolean
  resultData: string
  input: string
  setInput: Dispatch<SetStateAction<string>>
  chatHistory: ChatEntry[]
  setChatHistory: Dispatch<SetStateAction<ChatEntry[]>>
  newChat: () => void
}

export const Context = createContext<ContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

interface ChatEntry {
  prompt: string;
  result: string;
  timestamp: Date;
}

const ContextProvider = ({ children }: Props) => {
  const [input, setInput] = useState<string>('')
  const [recentPrompt, setRecentPrompt] = useState<string>('')
  const [prevPrompts, setPrevPrompts] = useState<string[]>([])
  const [showResult, setShowResult] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [resultData, setResultData] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord)
    }, 35 * index)
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt?: string) => {
    setLoading(true);
    setShowResult(true);
    const actualPrompt = prompt || input; // Use the provided prompt or fallback to the current input

    try {
        const response: string = await runChat(actualPrompt);
        // setInput(''); 
        // Preserving the response formatting logic
        const responseArray = response.split('**');
        const formattedResponse = responseArray.reduce((acc, curr, i) => {
            return acc + (i % 2 === 1 ? `<b>${curr}</b>` : curr);
        }, '');
        const finalResponse = formattedResponse.split('*').join('<br/>');

        // Assuming chatHistory is an array of objects { prompt: string, result: string }
        setChatHistory(prevHistory => [
            ...prevHistory,
            { prompt: actualPrompt, result: finalResponse, timestamp: new Date()} // Store formatted response
        ]);

        setRecentPrompt(actualPrompt);
        setResultData(''); // Optionally keep if you display the latest response separately

        finalResponse.split('').forEach((char, index) => {
          delayPara(index, char);
        });

        setPrevPrompts((prev) => [...prev, actualPrompt]);

    } catch (error) {
        console.error('Error while running chat:', error);
    } finally {
        setLoading(false);
    }
}

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    chatHistory,
    setChatHistory,
    newChat
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default ContextProvider
