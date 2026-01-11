import {useNavigate} from 'react-router'
import SearchIcon from '../icons/SearchIcon';
import UserButton from '../userButton/UserButton';
import './topBar.css' 

function TopBar() {
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        navigate(`/search?search=${e.target[0].value}`)
    }

    return (
        <div className='top-bar'>

            <form onSubmit={handleSubmit} className='search'>
                <SearchIcon />
                <input className='input-search' type='text' placeholder='Search'/>
            </form>
            
            <div className='btn-user'>
                <UserButton />
            </div>
            
        </div>
    )
};

export default  TopBar;