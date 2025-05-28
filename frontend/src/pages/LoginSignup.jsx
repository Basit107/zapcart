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
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData=data)
        
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }

        else {
            alert(responseData.errors)
        }
    }


    const signup = async () => {
        console.log("Sign Up Function Executed: ", formData);

        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData=data)
        
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
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
                <button on onClick={() => {state === "Login"? login():signup()}}>Continue</button>
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