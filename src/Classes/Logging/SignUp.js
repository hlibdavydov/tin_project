import React, {useState} from "react";
import '../../CSS/Logging.css';
import styled from 'styled-components';
import Modal from "react-modal";
import {ThemeProvider} from "styled-components";
import {useTranslation} from "react-i18next";


const SignUp = () => {
    const {t} = useTranslation();
    const [show, setShow] = useState(false);
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
                    <form>
                        <label>
                            Email
                        </label>
                        <input type='text'/>
                        <label>
                            Password
                        </label>
                        <input type='password'/>
                        <button className='submit'>Sign Up</button>
                    </form>
                </div>
            </Modal>
        </div>
    );

}
export {SignUp};