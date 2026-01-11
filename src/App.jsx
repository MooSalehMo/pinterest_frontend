import React from 'react';
import './app.css'
const LeftBar = React.lazy(() => import("./components/leftBar/leftBar"));
const RoutesFile = React.lazy(() => import("./routes/RoutsFile"));


const App = () => {
  return (
    <div className='app'>
      <LeftBar />
      <RoutesFile />    
    </div>
  )
}

export default App