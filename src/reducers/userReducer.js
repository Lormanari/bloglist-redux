const userReducer = (state = {}, action) => {
	switch(action.type) {
		case 'USER':
			return action.user
		case 'LOGIN':
			return action.user
		default:
			return state
	}
  }

  export const saveUser = (user) => {
		return {
			type: 'USER',
			user,
	  	}
  }



export default userReducer