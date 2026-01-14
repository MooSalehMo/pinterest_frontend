import './LeftBar.css' 
import { Link } from 'react-router';
import SettingIcon from '../icons/SettingIcon';
import LeftBarLinks from './Links';


function LeftBar() {
    return (
        <div className='leftBar'>
            <div className="container">
                <div className='menuIcons'>
                    <LeftBarLinks />
                </div>
                <div className='icon-setting'>
                    <Link to='/' className='menuIcon'>
                    <SettingIcon />
                    </Link>
                </div>
            </div>
        </div>


    )
};


export default  LeftBar;