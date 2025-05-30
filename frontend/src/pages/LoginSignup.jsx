import React, { useState } from 'react'
import './CSS/loginsignup.css'

const LoginSignUp = () => {

    const [state, setState] = useState("Login");

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

        let responseData;
        await fetch('http://localhost:5000/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/form-data',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData=data)
        
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.data.token);
            localStorage.setItem('user-id', responseData.data.user._id);
            window.location.replace("/");
        }

        else {
            alert(responseData.message)
        }
    }


    const signup = async () => {
        console.log("Sign Up Function Executed: ", formData);

        let responseData;
        await fetch('http://localhost:5000/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/form-data',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData=data)
        
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.data.token);
            localStorage.setItem('user-id', responseData.data.user._id);
            window.location.replace("/");
        }

        else {
            alert(responseData.errors)
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