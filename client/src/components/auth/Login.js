import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { StyledAuth } from '../../styles';

export default function Login() {
    const history = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Show password toggler
    const [show, setShow] = useState(false)

    // Requests loading
    const [loading, setLoading] = useState(false)

    // Error handling
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    const handleGuestLogin = () => {
        setUsername("guest")
        setPassword("guest")
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!username || !password) {
            enqueueSnackbar("Please fill in all fields", { variant: "error" })
            setLoading(false)
            return
        }

        try {

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post("api/user/login", { username, password }, config)
            localStorage.setItem("userInfo", JSON.stringify(data))
            setError(false)
            setErrorMsg("")
            setLoading(false)
            history("/chats")
        } catch (error) {
            setError(true)
            setErrorMsg(error.response.data.message)
            setLoading(false)
        }
    }

    return (
        <StyledAuth>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>LOGIN</h1>
                <input className='auth-inputs' type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <input className='auth-inputs' type={show ? "text" : "password"} value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <div className="show-password">
                    <input type="checkbox" name="check" id="check" onClick={() => setShow(!show)} />
                    <label htmlFor="check">Show Password</label>
                </div>
                {error && <p className='error-msg'>{errorMsg}</p>}
                <button>{loading ? "Please wait..." : "Login"}</button>
                <button onClick={handleGuestLogin}>{loading ? "Please wait..." : "Login as Guest User"}</button>
            </form>
        </StyledAuth>
    )
}
