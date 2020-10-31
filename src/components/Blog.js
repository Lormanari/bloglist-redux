import React, { useState } from 'react'

const Blog = ({ blog, controlLikes, isCreator, handleDelete }) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div className="blogItem">
			<div>
				{blog.title} {blog.author} <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
				<button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
			</div>
			<div style={showWhenVisible} className="blogDetails">
				{blog.url}<br></br>
				likes <span className='numberOFLikes'>{blog.likes}</span> <button onClick={controlLikes}>like</button><br></br>
				{blog.user.username === null ? '': blog.user.username}<br></br>
				{isCreator === true ? <button className="btn-remove" onClick={handleDelete}>remove</button>: ''}
			</div>
		</div>
	)
}

export default Blog
