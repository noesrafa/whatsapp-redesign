import React from 'react'
import { auth, provider } from '../firebase'
import './login.css'
// Redux
import { useDispatch } from 'react-redux'
import { set_user_action } from './redux/actions/sign.action'

import logo from '../public/logo.png'
import google from '../public/google.svg'

export default function Login () {

    const dispatch = useDispatch();
    
    function signIn (e) {
        e.preventDefault()
        auth
            .signInWithPopup(provider)
            .then( response => dispatch(set_user_action(response.user)))
            .catch( error => alert(error.message))
    }
    
    return (
        <div className="login">
            <div className="login__logo">
                <img src={logo} alt="logo" />
                <div className="login__text">
                    <h2>Sign in to Whatsapp</h2>
                    <div className="divider"></div>
                    <button className="login__google" onClick={signIn}>
                        <img src={google}  alt="google logo" />
                        <p> Continue with google</p>
                    </button>
                </div>
            </div>
        </div>
    )
}