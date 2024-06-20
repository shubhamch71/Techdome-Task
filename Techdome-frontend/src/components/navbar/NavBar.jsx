import React, { useEffect, useState } from 'react'
import "./navBar.scss"
import { Button } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userAction';

const NavBar = () => {

    const location = useLocation();

    const [show, setShow] = useState(false);

    const toggle = () => {
        setShow(!show);
    }

    ////////////////-------------- redux ---------------//////////////////

    const [state, setState] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            setState(true);
        } else {
            setState(false);
        }
    }, []);

    const logout = () => {
        dispatch(logoutUser(navigate));
    }


    return (
        <>
            <div className='nav_bar'>
                <div className='options_link'>
                    {state && <div><Link to="/form"> <Button className={`btt ${location.pathname == "/form" ? "active" : ""}`} variant="contained"> Form </Button> </Link> </div>}
                    <div><Link to="/"> <Button className={`btt ${location.pathname == "/" ? "active" : ""}`} variant="contained"> Blog</Button> </Link> </div>
                    {!state && <div> <Link to="/signup"> <Button className={`btt ${location.pathname == "/signup" ? "active" : ""}`} variant="contained"> Sign up</Button> </Link> </div>}
                    {!state && <div> <Link to="/login"> <Button className={`btt ${location.pathname == "/login" ? "active" : ""}`} variant="contained"> Login</Button> </Link></div>}
                    {state && <div> <Button className="btt" variant="contained" onClick={logout}> Logout</Button> </div>}
                </div>

                <div className='toggle'>
                    <Button className='bt' variant='outlined' onClick={toggle}> <MenuIcon /> </Button>
                </div>

                {show ? <div className='opt'>
                    {state && <div><Link to="/form"> <Button className={`btt ${location.pathname == "/form" ? "active" : ""}`} variant="contained"> Form </Button> </Link> </div>}
                    <div><Link to="/"> <Button className={`btt ${location.pathname == "/" ? "active" : ""}`} variant="contained"> Blog</Button> </Link> </div>
                    {!state && <div> <Link to="/signup"> <Button className={`btt ${location.pathname == "/signup" ? "active" : ""}`} variant="contained"> Sign up</Button> </Link> </div>}
                    {!state && <div> <Link to="/login"> <Button className={`btt ${location.pathname == "/login" ? "active" : ""}`} variant="contained"> Login</Button> </Link></div>}
                    {state && <div> <Button className="btt" variant="contained" onClick={logout}> Logout</Button> </div>}
                </div> : null}

            </div>
        </>
    )
}

export default NavBar