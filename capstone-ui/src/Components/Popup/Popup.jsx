import * as React from 'react'
import {Link} from "react-router-dom"
import './Popup.css'

export default function Popup(){
    return(
        <div className="popup-container">
            <div className="popup-card login">
                <button className="close-btn">&times;</button>
                <h1>Login</h1>
                <div className="form">
                    <div className="input-field">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" placeholder="user@gmail.com" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                <div className="footer">
                    <p>Don't have an account? <br/> Sign up&nbsp;
                        <Link className="here-link" to="/register">here</Link>.
                    </p>
                    <button className="footer-btn" >
                        {false ? "Loading..." : "SIGNUP"}
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}