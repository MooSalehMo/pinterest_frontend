import { Link } from "react-router";
import HomeIcon from "../icons/HomeIcon";
import ChatIcon from "../icons/ChatIcon";
import CreateIcon from "../icons/CreateIcon";
import Image from "../Image/Image";

function LeftBarLinks() {
    return (
        <>
            <Link to={'/'}>
                <Image className='menuIcon logo' path={"/pinterest/logo/logo.jpeg"} alt={"logo"}/>
            </Link>
            <Link to="/" className='menuIcon home'>
                <HomeIcon />
            </Link>
            <Link to="/create" className='menuIcon create'>
                <CreateIcon />
            </Link>

            <Link to="/" className='menuIcon chat'>
                <ChatIcon />
            </Link>
        </>
    )
}

export default  LeftBarLinks;