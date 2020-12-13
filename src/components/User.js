import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from "react-router-dom"

const User = () => {
	// single user page
	const users = useSelector(({users}) => {
		return users
	})
	const match = useRouteMatch('/users/:id')

	const user = match
	? users.find(user => user.id === match.params.id)
	: null

	if (!user) {
		return null
	}

	return (

		<div className='blog'>
			<h1>{user.username}</h1>
			<div>
				<h5>Added blogs</h5>
				<ul>
					{user.blogs.map(b =>
						<li key={b.id}>{b.title}</li>
					)}
				</ul>
			</div>

		</div>
	)
}

export default User