import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

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
		<form id="login-form" onSubmit={handleSubmit}>
			<div>
				username
				<input
					id="username"
					type='text'
					value={username}
					name='Username'
					onChange={handleUsernameChange} //({target}) => setUsername(target.value)
				/>
			</div>
			<div>
				password
				<input
					id="password"
					type='password'
					value={password}
					name='Password'
					onChange={handlePasswordChange} //
				/>
			</div>
			<button id="login-button" type="submit">Login</button>
		</form>
	</div>
)

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default LoginForm