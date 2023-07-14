import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"

const Login = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword ] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const LogIn = async() =>{
        try{
            await signInWithEmailAndPassword(getAuth(), email, password)
            navigate("/articles")
        } catch (e){
            setError(e.message);
        }
    }

    return (
        <>
        <h3>Login</h3>
        {error && <p className="error">{error}</p>}
        <div className="add-comment-form"> 
            <input
                placeholder="Your Email address here.."
                value = {email}
                onChange={e=> setEmail(e.target.value)}
            />
            <input
                placeholder="Your password"
                type = "password"
                value = {password}
                onChange={e=>setPassword(e.target.value)}
                />
            <button onClick={LogIn}>Log In</button>
            <Link id = "link" to ="/create-account">Don't Have an account? Create Here!</Link>
        </div>
        </>
       
    )
}
export default Login