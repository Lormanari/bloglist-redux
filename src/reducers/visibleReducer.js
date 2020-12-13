const visibleReducer = (state = false, action) => {
	switch(action.type) {
		case 'TOGGLE_VISIBILITY':
			return action.visible
		default:
			return state
	}
  }

  export const visibilityChange = (visible) => {
	return {
	  type: 'TOGGLE_VISIBILITY',
	  visible: !visible,
	}
  }

export default visibleReducer