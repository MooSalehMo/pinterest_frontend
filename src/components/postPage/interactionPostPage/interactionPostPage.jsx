import HeartIcon from "../../icons/HeartIcon"
import ShareIcon from "../../icons/ShareIcon"
import SaveIcon from "../../icons/SaveIcon"
import MoreIcon from "../../icons/MoreIcon"
import HeartFillIcon from "../../icons/HeartFillIcon"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import apiRequest from "../../../utils/apiRequest"
import './interactionPostPage.css'
import SaveFillIcon from "../../icons/SaveFillIcon"

const interact = async (id, type) => {
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });
  return res.data;
};

function interactionPostPage ({postId}) {

    const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interactionCheck", postId] });
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["interactionCheck", postId],
    queryFn: ()=> apiRequest.get(`/pins/interaction-check/${postId}`).then((res) => res.data)
  })

  if(isPending || error) return

  return (
    <div className="interaction">
        <div className="details-icons">
            <div className="heart-icon" onClick={() => mutation.mutate({ id: postId, type: "like" })}> 
              {data.isLiked ? <HeartFillIcon /> :  <HeartIcon /> }
            </div>
            <p className="numbers">{data.likeCount}</p>
            <div className="share-icon"> <ShareIcon /> </div>
            <div className="three-dots-icon"> <MoreIcon /> </div>
        </div>
        <div className="save-icon" disabled={mutation.isPending} onClick={() => mutation.mutate({ id: postId, type: "save" })}> 
          {data.isSaved ? <SaveFillIcon /> : <SaveIcon />} 
        </div>
    </div>
  )
}

export default interactionPostPage