import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

const Form = ({route, method})=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        setIsLoading(true)
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/')
            }else{
                navigate('/login')
            }
        } catch (error) {
            console.error("request failed",error)          
        }
        finally{
            setIsLoading(false)
        }
    }
    const name = (method === "login") ? 'Login' : 'Register'
    return(
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input 
            type="text"
            className="form-input"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            placeholder="username"            
            />
            <input 
            type="password"
            className="form-input"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Password"            
            />
            {loading && <LoadingIndicator/>}
            <button type="submit" className="form-button">{name}</button>
        </form>
    )
}
export default Form;