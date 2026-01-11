import Comment from "./comment/Comment"
import './Comments.css'
import apiRequest from "../../utils/apiRequest"
import { useQuery } from "@tanstack/react-query"

function Comments({id}) {
    const { isPending, error, data } = useQuery({
    queryKey: ['comments', id],
    queryFn: ()=> apiRequest.get(`/comments/${id}`).then((res) => res.data)
  })

  if(isPending) return "Loading...";
  if(error) return "There is an error !" + error.message;
  if(!data) return "Pin not found!";
  return (
    <div className="comments-container">
      <h3 className="heading">{data.length === 0 ? "No comments" : data.length + " Comments"}</h3>
      <div className='comments'>
        {data?.map( (comment) => (
            <Comment key={comment._id} comment={comment}/>
        ))
        }
      </div>
    </div>

  )
}

export default Comments;