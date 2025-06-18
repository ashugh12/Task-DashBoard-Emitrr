import { useBoardStore } from '../store/boardStore'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Header } from './HeaderPage'
import FooterNote from './FooterPage'

const BoardView = () => {
  const { boards, createBoard, deleteBoard } = useBoardStore()
  const [name, setName] = useState('')
  const navigate = useNavigate()

  return (
    <div className="p-6 h-auto">
      <Header />
      <div className='flex bg-gray-50 gap-4 w-auto h-auto justify-center items-start pt-4 pr-4 pl-4 rounded-lg border-t shadow-md mt-4 '>

        {/* Create Board */}
        <div className="flex flex-col gap-2 mb-4 w-auto p-20 rounded-lg h-[400px] justify-center items-center">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 rounded shadow-md w-[200px] mb-2"
            placeholder="Board Name"
          />
          <button
            onClick={() => {
              if (name.trim()) {
                createBoard(name)
                setName('')
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded w-[200px]"
          >
            Create Board
          </button>
        </div>

        {/* Board List */}
        <div className='w-full max-h-[400px overflow-y-auto rounded p-4 h-[400px] flex flex-col gap-3'>
          {Object.values(boards).reverse().map(board => (
            <div
              key={board.id}
              className="flex h-[60px] justify-between items-center py-2 mb-2 px-5 shadow-[0_2px_4px_rgba(0,0,0,0.1)] border-t rounded hover:bg-gray-50 transition-colors"
              >
              <div
                className="flex flex-col cursor-pointer w-full"
                onClick={() => navigate(`/board/${board.id}`)}
              >
                <span className="font-medium">{board.name}</span>
                <span className="text-xs text-gray-500">
                  {new Date(board.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
              <button
                onClick={() => deleteBoard(board.id)}
                className="text-gray-500 hover:text-red-600"
                title="Delete Board"
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <FooterNote />
    </div>
  )
}

export default BoardView
