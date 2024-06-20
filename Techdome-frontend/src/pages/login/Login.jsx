import React, { useEffect, useState } from 'react'
import "./login.scss"
import NavBar from '../../components/navbar/NavBar'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const [userData, setuserData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setuserData({ ...userData, [e.target.name]: e.target.value });
    }

    //////////--------- for toast ---------/////////////////////
    const fun = (error) => {
        if (error) {
            toast.error(`ERROR: ${error} !`, { theme: "dark", autoClose: 2000 });
        }
        setLoader(false);
    }

    const login = () => {
        if (userData.email && userData.password) {
            setLoader(true);
            dispatch(loginUser(userData, fun));
        } else {
            toast.warning("WARNING: All fields required !", { theme: "dark", autoClose: 2000 });
        }
    }

    const { isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            navigate("/");
        }
    }, [isAuthenticated]);



    return (
        <>

            {/* //////////////////////////////////////////////////// */}
            <ToastContainer />
            {/* //////////////////////////////////////////////////// */}


            <div className='login'>
                <NavBar />

                {loader && <div className='loginLoader'>
                    <Bars
                        height="80"
                        width="80"
                        color="#fff"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>}


                <div className='inner'>
                    <div className='signupForm'>


                        <div className='form_group'>
                            <div><Button className='but' variant='contained'>Email</Button></div>
                            <input type="email" name="email" value={userData.email} id="" placeholder='Enter your email' onChange={handleChange} />
                        </div>

                        <div className='form_group'>
                            <div><Button className='but' variant='contained'>Password</Button></div>
                            <input type="text" name="password" value={userData.password} id="" placeholder='Enter your password' onChange={handleChange} />
                        </div>

                        <div className='btnBox'>
                            <Button variant='contained' onClick={login} className='subBt'>Login</Button>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Login