import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { useEffect, useState } from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)
    useEffect(()=>{
        auth().catch(()=> setIsAuthorized(false))
    },[])
    
    const refreshToken = async()=>{
        const refresh_token = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('/token/refresh/', {refresh: refresh_token}) 
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }
        } catch (error) {
            console.log(error)   
            setIsAuthorized(false)         
        }
    }
    const auth = async()=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        
        if(!token){
            setIsAuthorized(false)
            return
        }
        const now = Date.now() / 1000
        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        if(tokenExpiration < now){
            await refreshToken()
        }
        else{
            setIsAuthorized(true)
        }
    }
    if (isAuthorized === null) {
        
        return <div>Loading...</div>; 
    } else if (isAuthorized === true) {
        return <>{children}</>;
    } else {
        return <Navigate to="login" />;
    }
    
}
export default ProtectedRoute