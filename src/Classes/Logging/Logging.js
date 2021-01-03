import '../../CSS/Logging.css'
import React, {useContext, useState} from "react";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
import {SessionContext} from "../../App";

const Logging = () => {
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [user, setUser] = useContext(SessionContext)
    return (
        <div >
            {!user.accessToken ?
                <div className='loggingButtons'>
                    <SignIn/>
                    <SignUp/>
                </div>
                :
                <button onClick={()=> {setUser({})}}>Log out</button>
            }
        </div>
    );

}
export {Logging};