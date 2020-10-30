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
		console.log('clicked')
		const blog = blogs.find(b => b.id === id)
		const updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user_id }
		console.log(updatedBlog)

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
			setBlogs(blogs.filter(n => n.id !== id))
		})
	}

	return (
		<div>
			<h1>blogs</h1>
			{user === null ?
				loginForm() :
				<div>
					<Notification type="success" message={errorMessage} />
					<p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>
					{addBlogForm()}
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} controlLikes={() => addLikes(blog.id)}/>
						)
					)}
				</div>
			}
		</div>
	)
}

export default App