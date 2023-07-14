import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccount = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword ] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const createAccount = async () =>{
        try{
            if(password !== confirmPassword){
                setError('Password does not match')
                return
            }
            await createUserWithEmailAndPassword(getAuth(), email, password)
            navigate("/articles")
        } catch(e){
            setError(e.meesage)
        }
    }

    return (
        <>
        <h3>Create Account</h3>
        {error && <p className="error">{error}</p>}
        <div className="add-comment-form"> 
            <input
                placeholder="Your Email address here.."
                value = {email}
                onChange={e=> setEmail(e.target.value)}
            />
            <input
                placeholder="Your password"
                type="password"
                value = {password}
                onChange={e=> setPassword(e.target.value)}
                />
            <input
                placeholder="Confirm password"
                type="password"
                value = {confirmPassword}
                onChange={e=> setConfirmPassword(e.target.value)}
                />
            <button onClick={createAccount}>Create Account</button>
            <Link id = "link" to ="/login">Already have an account? log In Here!</Link>
        </div>
        </>
    )
}
export default CreateAccount