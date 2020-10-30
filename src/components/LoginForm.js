import React from 'react'
import Notification from './Notification'

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
	errormessage
}) => (
	<div>
		<h2>Log in to application</h2>
		<Notification type='error' message={errormessage} />
		<form onSubmit={handleSubmit}>
			<div>
				username
				<input
					type='text'
					value={username}
					name='Username'
					onChange={handleUsernameChange} //({target}) => setUsername(target.value)
				/>
			</div>
			<div>
				password
				<input
					type='password'
					value={password}
					name='Password'
					onChange={handlePasswordChange} //
				/>
			</div>
			<button type="submit">Login</button>
	</form>
	</div>
)

export default LoginForm