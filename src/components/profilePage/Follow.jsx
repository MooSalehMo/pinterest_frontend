import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiRequest from "../../utils/apiRequest"

const followUSer = async(username) => {
    const res = await apiRequest.post(`/users/follow/${username}`)
    return res.data
}

function FollowButton({isFollowing, username}) {
    const queryClient = useQueryClient()

    const mutation = useMutation({
    mutationFn: followUSer,
    onSuccess: ()=> {
        queryClient.invalidateQueries({queryKey: ['profile', username] }) 
    }
    })

    return (
        <button 
            onClick={ () => mutation.mutate(username)} 
            disabled={mutation.isPending}
            className="follow-button"
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    )
}

export default FollowButton