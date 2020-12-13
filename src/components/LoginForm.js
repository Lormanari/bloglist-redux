import React from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import storage from '../utils/storage'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { saveUser } from '../reducers/userReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { visibilityChange } from '../reducers/visibleReducer'
import { Button, TextField } from '@material-ui/core'

const handleLogin = async (event, dispatch) => {
	event.preventDefault()
	const username = event.target.username.value
	const password = event.target.password.value

    try {
		const user = await loginService.login({
			username, password
		})

		dispatch(saveUser(user))
		blogService.setToken(user.token)

		dispatch(notificationChange(`${user.name} welcome back!`, "success"))
		setTimeout(() => {
			dispatch(notificationChange(''))
		}, 5000)

		storage.saveUser(user)
		dispatch(visibilityChange(false))

    } catch(exception) {
		dispatch(notificationChange('wrong username/password', "error"))
		setTimeout(() => {
			dispatch(notificationChange(''))
		}, 5000)
    }
}

const LoginForm = () => {
	const dispatch = useDispatch()
	return (
		<div>
			<h2>Log in to application</h2>
			<Notification />
			<form id="login-form" onSubmit={(event) => handleLogin(event, dispatch)}>
				<div>
					{/* username
					<input
						id="username"
						name="username"
					/> */}
					<TextField id='username' name="username" label="Username" />
				</div>
				<div>
					{/* password
					<input
						id="password"
						name="password"
					/> */}
					<TextField id='password' name="password" label="Password" />
				</div>
				{/* <button id="login-button" type="submit">Login</button> */}
				<Button d="login-button" type="submit" variant="contained" color="primary">Login</Button>
			</form>
		</div>
	)
}

// LoginForm.propTypes = {
// 	handleSubmit: PropTypes.func.isRequired,
// 	handleUsernameChange: PropTypes.func.isRequired,
// 	handlePasswordChange: PropTypes.func.isRequired,
// 	username: PropTypes.string.isRequired,
// 	password: PropTypes.string.isRequired
// }

export default LoginForm