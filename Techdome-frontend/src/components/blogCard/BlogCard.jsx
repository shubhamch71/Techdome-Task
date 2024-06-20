import React from 'react'
import "./blogCard.scss"

const BlogCard = (props) => {
    return (
        <>
            <div className='blogCard' onClick={() => props.fun(props.data)}>
                <div className='main'>
                    <img src={props.data.img} alt="" />
                    <div className='textBox'>
                        <section> {props.data.title} </section>
                        <div className='des'>
                            {props.data.description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard