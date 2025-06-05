import React, { useState } from 'react'
import './CSS/loginsignup.css'
import api from '../config/axios'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {

    const [state, setState] = useState("Login");
    const {setUserId,setIsLoggedIn, setLoading} = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const login = async () => {
        console.log("login Function Executed: ", formData);
        setLoading(true);

        try {
            const res = await api.post('v1/auth/signin', formData, {withCredentials: true}); // token sent via cookie

            if (res.status === 200 && res.data.success) {
                // ✅ token is already in httpOnly cookie, no need for localStorage
                setUserId(res.data.data.user._id)
                setIsLoggedIn(true);
                setLoading(false);  // ✅ Stop loading
                navigate("/"); // Redirect to home page after successful login
            } else {
                alert(res.data.message);
            }

        } catch (err) {
            console.error("Login error:", err);
            setLoading(false);
            // Handle error appropriately, e.g., show an alert or message
            alert("Login failed. Please try again.");
        } finally {
            setLoading(false);  // ✅ Stop loading
        }
    }


    const signup = async () => {
        console.log("Sign Up Function Executed: ", formData);

        try {
            const res = await api.post('v1/auth/signup', formData); // token sent via cookie

            if (res.data.success) {
                // ✅ token is already in httpOnly cookie, no need for localStorage
                window.location.replace("/login");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Sign Up error:", error);
            alert("Sign Up failed. Please try again.");
        }
    }


    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => {state === "Login"? login():signup()}}>Continue</button>
                {state === "Sign Up"
                    ? <p className="loginsignup-login">Already have an Account? <span onClick={() => {setState("Login")}}> Then Login here</span></p>
                    : <p className="loginsignup-login">Don't have an Account? <span onClick={() => {setState("Sign Up")}}> Sign Up here</span></p>}

                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the Terms & Conditions and Privacy Policy</p>
                </div>
            </div>

        </div>
    )
}

export default LoginSignUp