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


	blogs.sort((a,b) => a.likes - b.likes)


	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs( blogs )
		}
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

	const loginForm = () => (
		<Togglable buttonLabel='login'>
			<LoginForm
				handleUsernameChange={({ target }) => setUsername(target.value)}
				handlePasswordChange={({ target }) => setPassword(target.value)}
				username={username}
				password={password}
				errormessage={errorMessage}
				handleSubmit={handleLogin}
			/>
		</Togglable>
	)


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

	const addBlogForm = () => (
		<Togglable buttonLabel='Create new blog' ref={noteFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

	const addLikes = (id) => {
		const blog = blogs.find(b => b.id === id)
		const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }

		blogService
			.update(id, updatedBlog)
			.then(returnedBlog => {
				setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
			})
			.catch(error => {
				setErrorMessage(`the blog '${blog.title}' was already deleted from server`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setBlogs(blogs.filter(b => b.id !== id))
			})
	}
	const handleRemove = (name, author, id) => {
		if (window.confirm(`remove blog "${name}" by ${author}`)) {
			blogService
				.remove(id)
				.then(setBlogs(blogs.filter(b => b.id !== id)))
		}
	}

	return (
		<div>
			<h1>blogs</h1>
			{user === null ?
				loginForm() :
				<div>
					<Notification type="success" message={errorMessage} />
					<p>{user.username} logged-in<button onClick={handleLogout}>logout</button></p>
					{addBlogForm()}
					{blogs.map(blog => (
						<Blog
							key={blog.id}
							blog={blog}
							controlLikes={() => addLikes(blog.id)}
							isCreator={user.username === blog.user.username ? true : false}
							handleDelete={() => handleRemove(blog.title, blog.author, blog.id)}
						/>
					)
					)}
				</div>
			}
		</div>
	)
}

export default App