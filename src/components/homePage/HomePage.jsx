import Gallery from "../gallery/Gallery"
import TopBar from "../topBar/topBar"

const HomePage = () => {
  return (
    <div className='home-page'>
        <div className='content'>
            <TopBar />
            <Gallery />
        </div>
    </div>
  )
}

export default HomePage