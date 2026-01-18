import { Link, useParams } from "react-router"
import TopBar from "../topBar/topBar"
import ShareIcon from "../icons/ShareIcon"
import MoreIcon from "../icons/MoreIcon"
import PinterestIcon from "../icons/PinterestIcon"
import Gallery from "../gallery/Gallery"
import { useState } from "react"
import apiRequest from "../../utils/apiRequest"
import { useQuery } from "@tanstack/react-query"
import Image from "../Image/Image"
import Boards from "../boards/Boards"
import './ProfilePage.css'
import FollowButton from "./Follow"


const ProfilePage = () => {
  const [type, setType] = useState(null)

    const {username} = useParams()

  const { isPending, error, data } = useQuery({
    queryKey: ['profile', username],
    queryFn: ()=> apiRequest.get(`/users/${username}`).then((res) => res.data)
  })

  if(isPending) return "Loading...";
  if(error) return "There is an error !" + error.message;
  if(!data) return "Pin not found!";

  return (
    <div className='profile-page'>
      <div className="container">
        
        <div className="profile-info">
          <div className="img">
              <Image w={60} h={60} path={data?.img || "/pinterest/user/avatar.png"}/> 
            </div>
          <h1 className="name">{data.name || data.username}</h1>
          <div className="pinterestIcon"><Link > <PinterestIcon /> pinterestIcon</Link></div>
          <p className="followers-count">{data.followerCount} Followers . {data.followingCount} Following</p>
        </div>

        <div className="details">
          <Link className="share-icon"><ShareIcon /></Link>
          <Link className="message">Message</Link>
          <FollowButton isFollowing={data.isFollowing} username={data.username}/>
          <Link className="more"><MoreIcon /></Link>
        </div>

        <div className="saved-created">
          <div onClick={()=>setType("created")} className={type==="created" ? "active": "created"}>Created</div>
          <div onClick={()=>setType("saved")} className={type==="saved" ? "active": "saved"}>Saved</div>
        </div>

        <div className="gallery-boards">
          {type==="created" ? <Gallery userId={data._id}/> : <Boards  userId={data._id}/>}
        </div>

      </div>

    </div>
  )
}

export default ProfilePage