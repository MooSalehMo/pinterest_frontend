import { Link } from "react-router"
import Image from "../Image/Image"
import './UserImgName.css'

function UserImgName({ data }) {
  if (!data?.user) return <div className="user">Loading user...</div>;

  return (
    <Link to={`/profile/${data.user.username}`} className="user">
        <div className="user-img">
          <Image w={35} h={35} path={data.user.img || "/pinterest/user/avatar.png"}/> 
        </div>
        <div className="username">{data.user.name || data.user.username}</div>
    </Link>
  )
}

export default UserImgName