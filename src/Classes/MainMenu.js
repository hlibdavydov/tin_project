import React from 'react';
import '../CSS/MainMenu.css';
import {FaAlignRight} from 'react-icons/fa';

export class MainMenu extends React.Component {
    state = {
        toggle: false
    }
    Toggle = () => {
        this.setState({toggle: !this.state.toggle})
    }


    render() {
        return <div id={"navBar"}>
            <button onClick={this.Toggle}>
            </button>
            <ul className={this.state.toggle ? "nav-links show-nav" : "nav-links"}>
                <li href="#">Home</li>
                <li href="#">About us</li>
                <li href="#">Contact</li>
            </ul>
        </div>
    }
}