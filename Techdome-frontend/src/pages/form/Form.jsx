import React, { useEffect, useState } from 'react'
import "./form.scss"
import NavBar from '../../components/navbar/NavBar'
import { Button } from '@mui/material'
import img from "../../assests/img2.png"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBlog, deleteBlog, getBlogs, updateBlog } from '../../actions/blogAction'
import ClearIcon from '@mui/icons-material/Clear';
import { Bars } from "react-loader-spinner"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Form = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector(state => state.user);
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/login");
        }
    }, [isAuthenticated]);


    //////////////////---------- ADD blog ----//////////////////////////////

    const [blog, setBlog] = useState({
        title: "",
        img: "",
        description: "",
        user_id: ""
    });

    useEffect(() => {
        if (user) {
            setBlog({ ...blog, "user_id": user._id });
        }
    }, [user]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        setBlog({ ...blog, "img": e.target.files[0] });
    }

    const submit = () => {
        if (blog.img && blog.description && blog.title) {
            dispatch(addBlog(blog));
        } else {
            toast.warning("WARNING: All fields required !", { theme: "colored", autoClose: 2000 });
        }
    }


    /////////////------ get blogs ------/////////
    const [blogArray, setBlogArray] = useState([]);
    const { isloading, blogs } = useSelector(state => state.blogReducer);

    useEffect(() => {
        dispatch(getBlogs());
    }, []);

    useEffect(() => {
        if (blogs) {
            setBlogArray(blogs);
        }
    }, [blogs]);


    ////////////--------- delete blog --------//////////////////
    const delBlog = (blog_data) => {
        dispatch(deleteBlog({ public_id: blog_data.public_id, _id: blog_data._id }))
    }


    ////////////------- update blog ----------//////////////////////
    const [open, setOpen] = useState(false);

    const [updateValue, setUpdateValue] = useState({
        title: "",
        description: "",
        img: ""
    });

    const handleUpdate = (e) => {
        setUpdateValue({ ...updateValue, [e.target.name]: e.target.value });
    }

    const handleUpdateImage = (e) => {
        setUpdateValue({ ...updateValue, "img": e.target.files[0], imgChange: true });
    }

    const submitUpdate = () => {
        dispatch(updateBlog(updateValue));
        setOpen(false);
    }


    return (
        <>
            <div className='form'>
                <NavBar />


                {/* //////////////////////////////////////////////////// */}
                <ToastContainer />
                {/* //////////////////////////////////////////////////// */}



                {open ? <div className='updateForm'>
                    <div className='formInner'>
                        <label>Title
                            <Button className='icon' onClick={() => setOpen(false)}><ClearIcon /></Button>
                        </label>
                        <input className='form-control' name='title' value={updateValue.title} type="text" onChange={handleUpdate} />
                        <label>Description</label>
                        <input className='form-control' name='description' value={updateValue.description} type="text" onChange={handleUpdate} />
                        <label>Image</label>
                        <input className='form-control' type="file" onChange={handleUpdateImage} />
                        <Button variant='contained' onClick={submitUpdate}>update</Button>
                    </div>
                </div> : null}



                <div className='inner'>

                    <div className='formCon'>

                        <div className='addTableHead'>
                            <label>Blog Title</label>
                            <label>Blog Description</label>
                            <label>Select Image</label>
                            <label>Submit Button</label>
                        </div>

                        <div className='addTableHead'>
                            <div><input type="text" name="title" value={blog.title} className="form-control" placeholder="Enter blog title..." onChange={handleChange} /></div>
                            <div><input type="text" name="description" value={blog.description} className="form-control" placeholder="Enter blog description..." onChange={handleChange} /></div>
                            <div><input type="file" className="form-control-file" onChange={handleImageChange} /></div>
                            <div><Button variant='contained' onClick={submit}>Add Blog</Button></div>
                        </div>

                    </div>


                    <div className='Blogtable'>

                        {isloading ? <div className='loaderBlog'>
                            <Bars
                                height="80"
                                width="80"
                                color="#fff"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div> : null}

                        {blogArray.map((val, index) => {
                            return (
                                <div className='blogDataBox' key={index}>
                                    <div className='serial'> {index + 1} </div>
                                    <section> {val.title} </section>
                                    <div><img src={val.img} alt="" /></div>
                                    <div>
                                        <Button className='bt1' variant='contained' onClick={() => { setOpen(true); setUpdateValue({ ...val, imgChange: false }) }}>update</Button>
                                        <Button className='bt2' variant='contained' onClick={() => delBlog(val)}>delete</Button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Form