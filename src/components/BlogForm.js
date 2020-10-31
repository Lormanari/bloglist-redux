import React, { useState } from 'react'

const BlogForm =({ createBlog }) => {
	const initialState = {
		title: '',
		author: '',
		url: ''
	}
	const [newBlog, setNewBlog] = useState(initialState)

	const handleTitleChange = (event) => {
		setNewBlog({ ...newBlog, title: event.target.value })
	}
	const handleAuthorChange = (event) => {
		setNewBlog({ ...newBlog, author: event.target.value })
	}
	const handleUrlChange = (event) => {
		setNewBlog({ ...newBlog, url: event.target.value })
	}
	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
		}
		// setBlogs(blogs.concat(blogObject))
		createBlog(blogObject)
		setNewBlog(initialState)

	}
	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title
					<input id="title" value={newBlog.title}  name="title" onChange={handleTitleChange} />
				</div>
				<div>
					author
					<input id="author" value={newBlog.author}  name="author" onChange={handleAuthorChange} />
				</div>
				<div>
					url
					<input id="url" value={newBlog.url}  name="author" onChange={handleUrlChange} />
				</div>
				<button type="submit">Create blog</button>
			</form>
		</div>
	)
}

export default BlogForm
