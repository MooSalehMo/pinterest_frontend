import { format } from "timeago.js"
import UserImgName from "../../userImgName/UserImgName"
import './Comment.css'

const Comment = ({comment}) => {
  return (
    <div className='comment'>
      <div className="user-date">
        <UserImgName data={comment}/>
        <p className="created">{format(comment.createdAt)}</p>
      </div>
      <p className="desc">{comment.description}</p>
    </div>
  )
}

export default Comment