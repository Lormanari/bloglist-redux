import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
	const notification = useSelector(({notification}) => {
		return notification
	})
	if ( !notification.message ) {
		return null
	}

	// const style = {
	// 	borderStyle: 'solid',
	// 	borderRadius: 5,
	// 	padding: 10,
	// 	color: notification.type === 'success' ? 'green' : 'red',
	// 	background: 'lightgrey'
	// }

	return <Alert severity={notification.type}>
		{notification.message}
	</Alert>
}

export default Notification