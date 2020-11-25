import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './Classes/Header.js'
import {MainMenu} from "./Classes/MainMenu.js";

const page = (
    <div>
        <Header/>
        <MainMenu/>
    </div>
)
ReactDOM.render(page, document.getElementById('root'));

