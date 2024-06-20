import { BLOG_REQUEST, BLOG_SUCCESS, ADD_NEW_BLOG, DEL_BLOG, UPDATE_NEW_BLOG } from "../constants/blogConstants";

const blogReducer = (state = { blogs: null }, action) => {
    switch (action.type) {

        case BLOG_REQUEST:
            return {
                ...state,
                isloading: true,
            }

        case BLOG_SUCCESS:
            return {
                ...state,
                isloading: false,
                blogs: action.payload
            }

        case ADD_NEW_BLOG:
            return {
                ...state,
                blogs: [...state.blogs, action.payload],
                isloading: false,
            }

        case DEL_BLOG:
            const delArray = state.blogs.filter((obj) => {
                return obj._id != action.payload;
            });
            return {
                ...state,
                blogs: delArray,
                isloading: false,
            }

        case UPDATE_NEW_BLOG:
            const newBlogArray = state.blogs.map((obj) => {
                if (obj._id == action.payload._id) {
                    return action.payload;
                }
                return obj;
            })

            return {
                ...state,
                blogs: newBlogArray,
                isloading: false,
            }

        default:
            return state;
    }
}

export default blogReducer;