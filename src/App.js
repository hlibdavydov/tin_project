import React from 'react';
import "./CSS/App.css"
import {MainMenu} from "./Classes/MainMenu";
import Header from "./Classes/Header";
import Settings from "./Classes/Settings";
export class App extends React.Component {

    render() {
        return (
            <div>
                <Settings/>
                <MainMenu/>
            </div>
        );
    }
}
