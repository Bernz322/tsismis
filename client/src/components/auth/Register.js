import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { StyledAuth } from '../../styles';

export default function Register() {
    const history = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [about, setAbout] = useState("")
    const [img, setImg] = useState()

    // Show password toggler
    const [show, setShow] = useState(false)

    // Requests loading
    const [loading, setLoading] = useState(false)

    const postDetails = (img) => {
        setLoading(true)
        if (img === undefined) enqueueSnackbar("Something went wrong with uploading your image. Try again.", { variant: "error" })
        if (img.type === "image/png" || "image/gif" || "image/jpeg") {
            const data = new FormData()
            data.append("file", img)
            data.append("upload_preset", "tsismis-chat-app")
            data.append("cloud_name", "jeffbdev")
            fetch("https://api.cloudinary.com/v1_1/jeffbdev/image/upload", {
                method: "POST",
                body: data
            }).then((res) => res.json())
                .then((data) => {
                    setImg(data.url.toString())
                    setLoading(false)
                })
                .catch((err => {
                    console.log(err)
                    setLoading(false)
                }))
        } else {
            enqueueSnackbar("Please upload a valid image", { variant: "error" })
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!username || !password) {
            enqueueSnackbar("Please fill in all fields", { variant: "error" })
            setLoading(false)
            return
        }

        try {
            const { data } = await axios.post("api/user/register", {
                username,
                password,
                profileImg: img,
                about,
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
            localStorage.setItem("token", data.token)
            setLoading(false)
            history("/chats")
        } catch (error) {
            setLoading(false)
            console.log(error.response.data.message)
            enqueueSnackbar("Username already exists!", { variant: "error" })
        }
    }

    return (
        <StyledAuth>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>REGISTER</h1>
                <input className='auth-inputs' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <input className='auth-inputs' type={show ? "text" : "password"} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

                <div className="show-password">
                    <input type="checkbox" name="check" id="check" onClick={() => setShow(!show)} />
                    <label htmlFor="check">Show Password</label>
                </div>

                <textarea placeholder='Tell us about yourself. (Optional)' cols="30" rows="5" onChange={(e) => setAbout(e.target.value)}></textarea>


                <div className="img-upload">
                    <label htmlFor="img-upload">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </label>
                    <p>Upload Profile Picture (Optional)</p>
                    <input className='upload-img' name="img-upload" id="img-upload" type="file" accept="image/png, image/gif, image/jpeg" onChange={(e) => postDetails(e.target.files[0])} />
                </div>
                <button>{loading ? "Please wait..." : "Register"}</button>
            </form>
        </StyledAuth>
    )
}
