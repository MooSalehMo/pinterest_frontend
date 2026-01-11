import './GalleryItem.css' 
import {Link} from 'react-router'
import Image from '../Image/Image';
import SaveIcon from '../icons/SaveIcon';
import ShareIcon from '../icons/ShareIcon';
import MoreIcon from '../icons/MoreIcon';
const GalleryItem = ({item}) => {
    return (
        <>
            <div className='gallery-item' style={{gridRowEnd: `span ${Math.ceil(item.height/100)}`}}>
                <Image
                    path={item.media}
                    w={372}
                    alt="logo"
                />
                <Link to={`/pin/${item._id}`} className='overlay'>
                    <div>
                        <button className='save-icon'>
                            <SaveIcon />
                        </button>
                    </div>
                    <div className='shareicone-moreicone'>
                        <button className='share-icon'>
                            <ShareIcon />
                        </button>
                        <button className='more-icon'>
                            <MoreIcon />
                        </button>
                    </div>
                </Link>
            </div>
        </>
        
    )
};

export default  GalleryItem ;