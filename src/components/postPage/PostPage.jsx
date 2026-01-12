import { useParams } from "react-router"
import Image from "../Image/Image"
import './PostPage.css'
import WriteComment from "../comments/writeComment/WriteComment"
import UserImgName from "../userImgName/UserImgName"
import InteractionPostPage from "./interactionPostPage/interactionPostPage"
import Comments from "../comments/Comments"
import { useQuery } from "@tanstack/react-query"
import apiRequest from "../../utils/apiRequest"


const PostPage = () => {
  const {id} = useParams()

  const { isPending, error, data } = useQuery({
    queryKey: ['pin', id],
    queryFn: ()=> apiRequest.get(`/pins/${id}`).then((res) => res.data)
  })

  if(isPending) return "Loading...";
  if(error) return "There is an error !" + error.message;
  if(!data) return "Pin not found!";

  return (
    <div className='post-page'>
      <div className="post-container">

        <div className="post-img">
          <Image path={data.media} w={400} alt='post' />
        </div>

        <div className="post-details">
          <div className="details-user-comments">
            <InteractionPostPage postId={id}/>
            <UserImgName data={data}/>
            <Comments id={data._id}/>
          </div>

          <WriteComment id={data._id}/>
        </div>

      </div>
    </div>
  )
}

export default PostPage