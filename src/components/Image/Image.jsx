import { IKImage } from 'imagekitio-react';
const Image = ({path,src, className, w, h, alt}) => {
    return(
        <IKImage 
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT} 
            path={path} 
            src={src} 
            alt={alt} 
            width={w} 
            height={h}
            lqip={{active: true, quality: 20}}
            loading='lazy'
            className={className}
            transformation={[{width: w, height:h }]}
        />
    )
}

export default Image