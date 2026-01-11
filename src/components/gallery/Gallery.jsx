import GalleryItem from '../galleryItem/GalleryItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import './Gallery.css' ;

const fetchPins = async ({pageParam, search, userId, boardId}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/pins?cursor=${
            pageParam
        }&search=${
            search || ""
        }&userId=${
            userId || ""
        }&boardId=${
            boardId || ""
        }`
    );
  return res.data
}

function Gallery({search, userId, boardId}){
    const {data, fetchNextPage, hasNextPage, status} = useInfiniteQuery({
         queryKey: ['pins',search, userId, boardId], 
         queryFn: ({pageParam=0})=>fetchPins({pageParam, search, userId, boardId}) ,
         initialPageParam: 0,
         getNextPageParam: (lastPage, pages) => lastPage.nextCursor ,
        })

    if(status === "pending") return "Loging..." ;
    if(status === "error") return "Something went wrong! ";

    const allPins = data?.pages.flatMap(page => page.pins) || []
    
    return (
        <InfiniteScroll 
            dataLength={allPins.length} 
            next={fetchNextPage} 
            hasMore={!!hasNextPage} 
            loader={<h4>Loading more pins</h4>}
            endMessage={<h4>All posts loaded!</h4>}
        >
            <div className='gallery'>
                {allPins?.map( (item) => (
                    <GalleryItem key={item._id} item={item}/>
                ))
                }
            </div>
        </InfiniteScroll>
        
    )
};


export default  Gallery;