import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import visibleReducer from './reducers/visibleReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
// import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  visible: visibleReducer,
  user: userReducer,
  notification: notificationReducer,
  users: usersReducer,
})

const store = createStore(
	reducer,
	composeWithDevTools(
    	applyMiddleware(thunk)
  	)
)

export default store