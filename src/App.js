import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'

import storage from './utils/storage'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { saveUser } from './reducers/userReducer'
import {
	Switch,
	Route,
	Link,
} from "react-router-dom"

import {
	Container,
	Button,
	AppBar,
	Toolbar,
} from '@material-ui/core'

import styled from 'styled-components'

// const Navigation = styled.div`
//   background: LightGray;
//   padding: 1em;
// `
// const padding = {
// 	padding: 5
// }

const App = () => {
	const blogFormRef = React.createRef()

	const dispatch = useDispatch()
	useEffect(() => {
		const user = storage.loadUser()
		if (!user) return;
		dispatch(saveUser(user))
		blogService.setToken(user.token)
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
	}, [dispatch])

	const handleLogout = () => {
		dispatch(saveUser({}))
		storage.logoutUser()
	}

	const togglevisibility = () => {
		blogFormRef.current.toggleVisibility()
	}

	const user = useSelector(({user}) => {
		return user
	})

	if ( !Object.keys(user).length ) {
		return (
			<Container>
				<Togglable buttonLabel='login'>
					<LoginForm />
				</Togglable>
			</Container>
		)
	}

	return (
		<Container>

		<AppBar position="static">
			<Toolbar>
				<Button color="inherit" component={Link} to="/">
				blogs
				</Button>
				<Button color="inherit" component={Link} to="/users">
				users
				</Button>
				{/* <Link style={padding} to="/"></Link>
				<Link style={padding} to="/users">users</Link> */}
				{/* <button onClick={handleLogout}>logout</button> */}

					{user.name} logged in <Button variant="contained" color="default" onClick={handleLogout}>
					logout
					</Button>

			</Toolbar>
		</AppBar>
		<Switch>
				<Route path="/blogs/:id">
					<Blog />
				</Route>
				<Route path="/users/:id">
					<User />
				</Route>
				<Route path="/users">
					<Users />
				</Route>
				<Route path="/">
					<Notification />
					<h2>Blogs</h2>
					<Togglable buttonLabel='create new blog' ref={blogFormRef}>
						<NewBlog toggleVisibility={togglevisibility}/>
					</Togglable>
					<Blogs />
				</Route>
			</Switch>
		</Container>
	)
}

export default App