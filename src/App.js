import React from 'react';
import "./CSS/App.css"
import {MainMenu} from "./Classes/MainMenu";
import {Header} from "./Classes/Header";
/*const empApiRouter = require('./API/EmployeeAPI');
const express = require('express')
const app = express();
app.use('/api/employees', empApiRouter);*/
export class App extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <MainMenu/>
            </div>
        );
    }
}
