import React from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Login.css";
import AdminBar from "./AdminBar";

const CreateUsers = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[1]; 

    return (
        <>
            <AdminBar path={path} />
            <form action="#" className="login-form">
                <div className="login"> 
                    <h1>Create {path.charAt(0).toUpperCase() + path.slice(1)}</h1> 
                    <div className="inputs">
                        <div className="firstName">
                            <input type="text" placeholder="First name..." className="input-field"/><br />
                        </div>
                        <div className="password">
                            <input type="text" placeholder="Last name..." className="input-field"/>
                        </div>
                        <div className="password">
                            <input type="email" placeholder="Email..." className="input-field"/>
                        </div>
                        <div className="password">
                            <input type="password" placeholder="Password..." className="input-field"/>
                        </div>
                        <div className="password">
                            <input type="password" placeholder="Confirm password..." className="input-field"/>
                        </div>
                    </div>
                    <button className="button-19" role="button">Submit</button>
                </div>
            </form>
        </>
    );
};

export default CreateUsers;
