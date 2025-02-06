import React from "react";
import "../Styles/Login.css";
import myImage from "../Pics/undefined.png"; 
const Login = () => {
    
    
    
    
    
    return (
        <>
        <img src={myImage} alt="Description" className="logo-login" />
            <form action="#" className="login-form">
                <div className="login"> 
                    <h1>Login</h1>
                    <div className="inputs">
                        <div className="email">
                            <input type="text" placeholder="Email..." className="input-field"/><br />
                        </div>
                        <div className="password">
                            <input type="password" placeholder="Password..." className="input-field"/>
                        </div>
                    </div>
                    <button class="button-19" role="button">Submit</button>
                </div>
            </form>
        </>
    );
};

export default Login;
