import './app.css'
import LeftBar from "./components/leftBar/LeftBar"
import RoutesFile from "./routes/RoutsFile"


const App = () => {
  return (
    <div className='app'>
      <LeftBar />
      <RoutesFile />    
    </div>
  )
}

export default App