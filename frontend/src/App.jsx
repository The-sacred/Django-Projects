
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from './pages/register'
import ProtectedRoute from './components/ProtectedRoute'
import "./styles/Form.css"


function Logout(){
    localStorage.clear();
    return <><Navigate to="/login"/></>
    
  }

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
    
function App() { 
  
  return ( 
     <Router>
      <Routes>
        <Route path='/' element={ <ProtectedRoute> <Home/></ProtectedRoute>}/>
        <Route path="/register" element={<RegisterAndLogout/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='logout' element={<Logout/>}/>
        <Route path='*' element={ <NotFound/>}/>
      </Routes>
     </Router>  

)}

export default App
