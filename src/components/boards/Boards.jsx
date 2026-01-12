import apiRequest from '../../utils/apiRequest'
import Image from '../Image/Image'
import {format} from 'timeago.js'
import './Boards.css'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

const Boards = ({userId}) => {

  const { isPending, error, data } = useQuery({
    queryKey: ['boards', userId],
    queryFn: ()=> apiRequest.get(`/boards/${userId}`).then((res) => res.data)
  })

  if(isPending) return "Loading...";
  if(error) return "There is an error !" + error.message;
  if(!data) return "Pin not found!";

  return (
    <div className='boards'>
      <div className="items">

        {data?.map(board => (
          <Link to={`/search?boardId=${board._id}`} key={board._id} className="item">
            <Image
              path={board.fristPin?.media || "/default-placeholder.png"} 
              w={372}
              alt={board.title}
            />
            <h2 className="header">{board.title}</h2>
            <p className="desc">{board.pinCount} Pins . {format(board.craetedAt)}</p>
        </Link>
        ))
        }

      </div>
    </div>
  )
}

export default Boards