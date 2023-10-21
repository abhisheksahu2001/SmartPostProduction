import {  BrowserRouter , Route ,Routes , } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ModalInfo from './pages/ModalInfo';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path='/adminauth' element={<Login/>}/>
        <Route path='/adminpanel' element={<Dashboard/>}/>
        <Route path='/adminpanel/:TableName' element={<ModalInfo/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
