import React from 'react'
import { useSelector } from 'react-redux'
// import { addLike, remove, toggleVisibility } from '../reducers/blogReducer'
import { Link } from "react-router-dom"
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@material-ui/core'

const Blog = ({ blog }) => {
	// const dispatch = useDispatch()
	// const user = useSelector(({user}) => {
	// 	return user
	// })
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	return (
		<TableRow>
			<TableCell>
				<Link to={`/blogs/${blog.id}`}><i>{blog.title} by {blog.author}</i></Link>
			</TableCell>
		</TableRow>
		/* <div style={blogStyle} className='blog'>
			<div>
			<Link to={`/blogs/${blog.id}`}><i>{blog.title} by {blog.author}</i></Link>
			 <button onClick={() => dispatch(toggleVisibility(blog.id))}>{blog.visible ? 'hide' : 'view'}</button>
			</div>
			 {blog.visible&&(
			<div>
				<div>{blog.url}</div>
				<div>likes {blog.likes}
				<button onClick={() => dispatch(addLike(blog.id, blog))}>like</button>
				</div>
				<div>{blog.user.name}</div>
			{user.username===blog.user.username&&<button onClick={() => dispatch(remove(blog.id, blog))}>remove</button>}
			</div>
			)}
		</div> */
	)
}

const byLikes = (b1, b2) => b2.likes - b1.likes

const Blogs = () => {

	const blogs = useSelector(({blogs}) => {
		return blogs
	})


	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>

					{blogs.sort(byLikes).map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
						/>
					)}

				</TableBody>
			</Table>
		</TableContainer>
	)

}

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//   }).isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleRemove: PropTypes.func.isRequired,
//   own: PropTypes.bool.isRequired
// }

export default Blogs
