import './App.css'
import Home from './components/Home'
import Jobsheet from './components/pages/Jobsheet'
import Editpage from './components/pages/editpage/Editpage'
import Viewpage from './components/pages/viewpage/Viewpage'
import {Route,Routes,BrowserRouter} from 'react-router-dom'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/jobsheet' element={<Jobsheet/>}/>
    <Route path='/editpage/:id' element={<Editpage/>}/>
    <Route path='/viewpage/:id' element={<Viewpage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
