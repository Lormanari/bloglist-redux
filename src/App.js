import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  	const [blogs, setBlogs] = useState([])
  	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const initialState = {
		title: '',
		author: '',
		url: ''
	}
	const [newBlog, setNewBlog] = useState(initialState)



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

	const addBlog = (event) => {
		event.preventDefault()
		const blogObject = {
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
		}
		setBlogs(blogs.concat(blogObject))
		setNewBlog(initialState)

		setErrorMessage(`A new blog "${blogObject.title}" by ${blogObject.author} added`)
			setTimeout(() => {
				setErrorMessage(null)
		}, 5000)

		// axios
		// .post('http://localhost:3001/notes', noteObject)
		blogService
		.create(blogObject)
		.then(returnedBlog => {
			setBlogs(blogs.concat(returnedBlog))
			setNewBlog(initialState)
		})
	}

	const loginForm = () => (
		<>
		<h2>Log in to application</h2>
		<Notification type='error' message={errorMessage} />
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={({target}) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={({target}) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
		</>
	)

	const addBlogForm = () => (
		<form onSubmit={addBlog}>
			<div>
				title
				<input value={newBlog.title}  name="title" onChange={({target}) => setNewBlog({...newBlog, title: target.value})} />
			</div>
			<div>
				author
				<input value={newBlog.author}  name="author" onChange={({target}) => setNewBlog({...newBlog, author: target.value})} />
			</div>
			<div>
				url
				<input value={newBlog.url}  name="author" onChange={({target}) => setNewBlog({...newBlog, url: target.value})} />
			</div>
			<button type="submit">create</button>
		</form>
	)

	if(user === null) {
		return loginForm()
	}
	return (
		<div>
			<h2>blogs</h2>
			<Notification type="success" message={errorMessage} />
			<p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>
			{addBlogForm()}
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default App