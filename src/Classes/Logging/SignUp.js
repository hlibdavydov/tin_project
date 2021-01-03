import React, {useState} from "react";
import '../../CSS/Logging.css';
import styled from 'styled-components';
import Modal from "react-modal";
import {ThemeProvider} from "styled-components";
import {useTranslation} from "react-i18next";


const SignUp = () => {
    const {t} = useTranslation();
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [errorText, setErrorText] = useState('');


    const SendSignUp = (event) => {
        event.preventDefault();
        if (password !== repeatedPassword) {
            setErrorText("Password don't match");
            return;
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"Login": login, "Password": password});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://localhost:5001/api/doctors/sign-up", requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    setErrorText("Cannot Sign Up")
                } else {
                    setShow(false);
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <button onClick={() => setShow(true)}>Sign Up</button>
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
                    <h1>Sign Up</h1>
                    <form onSubmit={SendSignUp}>
                        <label>
                            Login
                        </label>
                        <input type='text' onChange={(event) => setLogin(event.target.value)}/>
                        <label>
                            Password
                        </label>
                        <input type='password' onChange={(event => setPassword(event.target.value))}/>
                        <label>
                            Repeat Password
                        </label>
                        <input type='password' onChange={event => setRepeatedPassword(event.target.value)}/>
                        <span className='error-text'>{errorText}</span>
                        <button className='submit'>Sign Up</button>
                    </form>
                </div>
            </Modal>
        </div>
    );

}
export {SignUp};