import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { StyledMainPage } from '../styles';
import { Login, Register } from '../components';
import img from "../images/undraw_things_to_say_re_jpcg.svg"

const MainPage = () => {
    const history = useNavigate();
    const [toRegister, setToRegister] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"))
        if (user) {
            history("/chats")
        }
    }, [history]);

    return (
        <StyledMainPage>
            <div className="main">
                <div className="left">
                    <div className="container">
                        <h1>SPILL THE TEA ☕</h1>
                        <p>Tsismis makes it easy to share your juiciest news with your fellow individuals.</p>
                        <img className='main-svg' src={img} alt="to-say" />
                    </div>
                </div>
                <div className="right">
                    <div className="main-right">
                        <div className="header">
                            <div className={`button-auth-changer login ${toRegister ? null : 'selected'}`} onClick={() => setToRegister(false)}>Login</div>
                            <div className={`button-auth-changer register ${toRegister ? 'selected' : null} `} onClick={() => setToRegister(true)}>Register</div>
                        </div>
                        {toRegister ? <Register /> : <Login />}
                    </div>
                </div>
            </div>

        </StyledMainPage>

    );
}

export default MainPage;
