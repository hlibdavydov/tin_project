import React, {Component, useState} from 'react';
import {Dropdown, Button} from "react-bootstrap";
import '../CSS/Settings.css';
import i18n from '../Translations/translate';
import Header from "./Header";
import {Logging} from "./Logging/Logging";


export default function Settings() {

    const [language, setLanguage] = useState('en');

    const handleOnclick = (e) => {
        e.preventDefault();
        setLanguage(e.target.value);
        i18n.changeLanguage(e.target.value);
    }
    return (
        <div className="App">
            <select onChange={handleOnclick} id='languageSelection'>
                <option value='en'>English</option>
                <option value='pl'>Polski</option>
            </select>
            <Header/>
        </div>
    );
}
