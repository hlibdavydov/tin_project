import '../../CSS/Logging.css'
import React, {useState} from "react";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
const Logging = () =>{
    const [showSignInForm,setShowSignInForm] = useState(false);
    return (
        <div className='loggingButtons'>
            <SignIn/>
            <SignUp/>
        </div>
    );

}
export {Logging};