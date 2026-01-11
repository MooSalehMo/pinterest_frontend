import { useSearchParams } from "react-router"
import Gallery from "../gallery/Gallery"
import TopBar from "../topBar/topBar"

const SearchPage = () => {
  let [searchParams] = useSearchParams()

  const search = searchParams.get("search")
  const boardId = searchParams.get("boardId")
  

  return (
    <div className='search-page'>
      <TopBar />
      <Gallery search={search} boardId={boardId} />
    </div>
  )
}

export default SearchPage