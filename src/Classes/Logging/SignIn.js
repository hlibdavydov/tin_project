import React, {useContext, useState} from "react";
import '../../CSS/Logging.css';
import styled from 'styled-components';
import Modal from "react-modal";
import {ThemeProvider} from "styled-components";
import {useTranslation} from "react-i18next";
import axios from 'axios';
import {DefaultContext} from "react-icons";
import {SessionContext} from "../../App";

const SignIn = () => {
    const {t} = useTranslation();
    const [show, setShow] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [session, setSession] = useState('');
    const [user, setUser] = useContext(SessionContext);

    const logIn = (event) => {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"Login": login, "Password": password});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://localhost:5001/api/doctors", requestOptions)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    response.json().then(value => {
                        updateSession(value)
                    });
                } else {
                    setErrorText("Login or Password is incorrect")
                }
            })
            .catch(error => console.log('error', error));

    }
    const updateSession = (response) => {
        console.log(response);
        const sessionProperties = {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            roles: response.roles
        }
        setUser(sessionProperties);
    }
    return (
        <div>
            <SessionContext.Provider value={session}/>
            <button onClick={() => setShow(true)}>Sign In</button>
            <Modal isOpen={show}
                   onRequestClose={() => setShow(false)}
                   style={
                       {
                           overlay: {
                               background: 'rgba(0, 0, 0, .5)'
                           },
                           content: {
                               background: '#182227',
                               width: 500,
                               justifyContent: "center",
                               marginInline: 'auto',
                           }
                       }
                   }>
                <div className='logging'>
                    <h1>Log in</h1>
                    <form onSubmit={logIn}>
                        <label>
                            Email
                        </label>
                        <input value={login} onChange={(event => setLogin(event.target.value))} type='text'/>
                        <label>
                            Password
                        </label>
                        <input value={password} onChange={(event => setPassword(event.target.value))} type='password'/>
                        <button className='submit'>Log in</button>
                    </form>
                    <span className='error-text'>{errorText}</span>
                </div>
            </Modal>
        </div>
    );

}
export {SignIn};