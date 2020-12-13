import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, remove, addComment } from '../reducers/blogReducer'
// import { addComment } from '../reducers/commentReducer'
import { useRouteMatch } from "react-router-dom"
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Button,
	TextField
} from '@material-ui/core'

const Blog = () => {
	const dispatch = useDispatch()
	const user = useSelector(({user}) => {
		return user
	})
	const blogs = useSelector(({blogs}) => {
		return blogs
	})

	const handleNewComment = (event, id, blog) => {
		event.preventDefault()

		const comment = event.target.comment.value
		event.target.comment.value = ''

		dispatch(addComment(id, blog, comment))
	}

	const match = useRouteMatch('/blogs/:id')

	const blog = match
	? blogs.find(blog => blog.id === match.params.id)
	: null

	if (!blog) {
		return null
	}

	return (

		<div className='blog'>
			<div>
				<h1><i>{blog.title}</i> by {blog.author}</h1>

				<div>{blog.url}</div>
				<div>likes {blog.likes}
					<Button onClick={() => dispatch(addLike(blog.id, blog))} variant="contained" color="primary">like</Button>
				</div>
				<div>added by {blog.user.name}</div>
				{user.username===blog.user.username&&<Button onClick={() => dispatch(remove(blog.id, blog))} variant="contained" color="secondary">remove</Button>}
			</div>
			<h4>Comments</h4>
			<div>
				<form onSubmit={(event)=>handleNewComment(event, blog.id, blog)}>
					{/* <input
						id="comment"
						name="comment"
					/> */}

					<TextField id='comment' name="comment" label="Comment" />

					{/* <button id="add-comment" type="submit">add commnet</button> */}
					<Button id="add-comment" type="submit" variant="contained" color="primary">add commnet</Button>
				</form>
			</div>
			<ul>
				{blog.comments.map((c,index) => <li key={index}>{c}</li>)}
			</ul>

		</div>
	)
}

export default Blog
