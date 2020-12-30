import React, {useContext, useState} from 'react';
import "./CSS/App.css"
import MainMenu from "./Classes/MainMenu";
import Header from "./Classes/Header";
import Settings from "./Classes/Settings";
import {Logging} from "./Classes/Logging/Logging";
import {SignIn} from "./Classes/Logging/SignIn";
export const SessionContext = React.createContext();

export const App = () => {
    const [session, setSession] = useState('xd');
    const updateSession = (session) => {
        setSession(session);
    };
    return (
        <SessionContext.Provider value={{session: session,updateSession: updateSession}}>
            <div>
                <Settings/>
                <Logging/>
                <MainMenu/>
            </div>
        </SessionContext.Provider>

    );


}
