const initialNotification = {
	message: "",
	type: "success"
}

const notificationReducer = (state = initialNotification, action) => {
	switch(action.type) {
		case 'SET_NOTIFICATION': {
			return action.data
		}
		default:
			return state
	}
  }

  export const notificationChange = (message, type) => {
	return {
	  type: 'SET_NOTIFICATION',
	  data: {
		  message,
		  type,
	  }
	}
  }

export default notificationReducer