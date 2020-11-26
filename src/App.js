import React from 'react';
import "./CSS/App.css"
import {MainMenu} from "./Classes/MainMenu";
import {Header} from "./Classes/Header";

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
