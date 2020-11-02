import React, { useState } from 'react'
import './login.css'

import Api from '../../conexao/Api'
import { auth } from '../../conexao/Api'

import Logo from '../../assets/logosigin.png'
import { Email, Lock } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { FiEyeOff, FiEye } from 'react-icons/fi'

const Login = ({ onReceive }) => {
    const [show, setShow] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleClickEye = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    const handleFacebookLogin = async () => {
        let result = await Api.fbPopup()

        if (result) {
            onReceive(result.user)
        } else {
            alert('Erro!')
        }
    }

    const handleSiginPasswordEmail = async () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {  })
            .catch(() => alert('Digíte um e-mail ou uma senha válida!'))
    }

    const handleGoogleLogin = async () => {
        let resultG = await Api.GooglePopup()

        if (resultG) {
            onReceive(resultG.user)
        } else {
            alert('Erro!')
        }
    }

    return (
        <div className="login_left" >
            <div className="login_left__logo">
                <img
                    className="login_left__Image"
                    src={Logo}
                    alt=""
                />
                <text>WhatsApp</text>
            </div>

            <div className="login__right">
                <h1>Login</h1>

                <div className="login__right__inputEmail">
                    <Email />
                    <input
                        placeholder="Digíte seu e-mail"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="login__right__inputSenha">
                    <Lock />
                    <input
                        placeholder="Digíte sua senha"
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="login__right__eyepassword">
                        {show ? (
                            <FiEye
                                size={20}
                                onClick={handleClickEye}
                            />
                        ) : (
                                <FiEyeOff
                                    size={20}
                                    onClick={handleClickEye}
                                />
                            )}
                    </div>
                </div>

                <Button
                    onClick={handleSiginPasswordEmail}
                >Entrar</Button>

                <h3>Ou entre com</h3>

                <div className="login__right__button__redesocial">
                    <Button
                        onClick={handleGoogleLogin}
                    >GOOGLE</Button>

                    <Button
                        onClick={handleFacebookLogin}
                    >FACEBOOK</Button>
                </div>
            </div>
        </div>
    )
}

export default Login
