import { useState } from 'react'
import apiRequest from '../../utils/apiRequest'
import { useNavigate, Link } from 'react-router'
import '../userButton/UserButton.css'
import useAuthStore from '../../utils/authStore'
import Image from '../Image/Image'



const UserButton = () => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const {currentUser, removecurrentUser} = useAuthStore()


    const handleLogout = async () => {
        try {
            await apiRequest.post('/users/auth/logout', {})
            removecurrentUser()
            navigate('/auth')
        } catch (err) {
            console.log(err);
        }
    }

    return currentUser ? (
        <div className='user-button' onClick={() => setOpen(prev => !prev)}> 
            <Image path={currentUser.media || "/pinterest/user/avatar.png"} w={35} h={35} alt="userImg" className="user-img"/>
            {open && 
                <div className='user-options'>
                    <ul>
                        <Link to={`/profile/${currentUser.username}`}   className='user-option'>Profile</Link>
                        <li className='user-option' onClick={handleLogout}>Logout</li>
                    </ul>

                </div>
            }
        </div>
    ) : (
        <div className='login-logout-links'> 
            <Link to="/auth" className="login-link" >Login / Register</Link>
         </div>
    ) 
    }

export default UserButton