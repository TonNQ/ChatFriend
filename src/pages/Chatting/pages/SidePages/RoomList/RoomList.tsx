/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useEffect, useState } from 'react'
import 'src/css/Scroll.css'
import userApi from 'src/apis/users.api'
import { RoomType } from 'src/types/room.type'
import Room from 'src/pages/Chatting/components/Room'

export default function RoomList() {
  const [inputSearch, setInputSearch] = useState('')
  const [rooms, setRooms] = useState<RoomType[] | null>(null)
  useEffect(() => {
    userApi.getAllRooms().then((response) => {
      setRooms(response.data.data)
    })
  }, [])
  const handleResetInputSearch = () => {
    setInputSearch('')
  }
  return (
    <div className='flex h-[100vh] flex-col'>
      <div className='m-4 text-2xl font-semibold'>Chats</div>
      <div className='mx-4 flex items-center justify-between rounded-md bg-stone-100 p-2'>
        <div className='flex grow items-center justify-center'>
          <div className='flex h-[20px] w-[30px] items-center justify-center text-gray-500'>
            <SearchOutlinedIcon />
          </div>
          <input
            type='text'
            className='text-md ml-1 grow border-none bg-stone-100 focus:outline-none'
            placeholder='Search'
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
        </div>
        <div
          className='ml-4 flex h-[24px] w-[24px] items-center justify-center rounded-md text-gray-500 hover:bg-stone-200'
          onClick={handleResetInputSearch}
        >
          <CloseOutlinedIcon sx={{ fontSize: '18px' }} />
        </div>
      </div>
      <div className='scrollbar-custom mt-4 w-full overflow-y-scroll scroll-smooth'>
        <div className=' mx-4 flex flex-col space-y-2 '>{rooms?.map((room) => <Room key={room.id} room={room} />)}</div>
      </div>
    </div>
  )
}