import { useLocation, useNavigate } from 'react-router-dom'

export const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isOnBoardDetail = location.pathname.startsWith('/board/')

  return (
    <header className="flex flex-col items-center min-h-[150px] justify-center bg-blue-500 text-white p-4">
      <h1 className="text-[32px] text-center font-extrabold">Task Dashboard  @emitrr</h1>

      {isOnBoardDetail && (
        <div
          onClick={() => navigate('/')}
          className="w-[430px] mt-2 cursor-pointer bg-white text-black h-[50px] rounded-full flex items-center justify-center shadow hover:shadow-md transition"
        >
          <span className="font-semibold text-base">← Back to Board View</span>
        </div>
      )}
    </header>
  )
}
