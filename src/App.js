import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  	const [blogs, setBlogs] = useState([])
  	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	// const initialState = {
	// 	title: '',
	// 	author: '',
	// 	url: ''
	// }
	// const [newBlog, setNewBlog] = useState(initialState)



	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if(loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')

		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}
	const handleLogout = async () => {
		setUser(null)
		window.localStorage.clear()
	}

	const noteFormRef = useRef()

	const addBlog = (blogObject) => {
		setErrorMessage(`A new blog "${blogObject.title}" by ${blogObject.author} added`)
			setTimeout(() => {
				setErrorMessage(null)
		}, 5000)

		noteFormRef.current.toggleVisibility()

		blogService
		.create(blogObject)
		.then(returnedBlog => {
			setBlogs(blogs.concat(returnedBlog))
		})
	}

	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm
				handleUsernameChange={({target}) => setUsername(target.value)}
				handlePasswordChange={({target}) => setPassword(target.value)}
				username={username}
				password={password}
				errormessage={errorMessage}
				handleSubmit={handleLogin}
			/>
		</Togglable>
	)



	const addBlogForm = () => (
		<Togglable buttonLabel='New blog' ref={noteFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)


	return (
		<div>
			<h1>blogs</h1>
			{user === null ?
				loginForm() :
				<div>
					<Notification type="success" message={errorMessage} />
					<p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>
					{addBlogForm()}
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			}
		</div>
	)
}

export default App