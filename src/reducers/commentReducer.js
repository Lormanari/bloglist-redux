import blogService from '../services/blogs'

const commentReducer = (state = '', action) => {
	switch(action.type) {
		case 'ADD_COMMENT':
			return action.comment
		// {
		// 	const id = action.data.id
		// 	const blogToComment = state.find(b => b.id === id)
		// 	console.log(action.data)
		// 	const commentedBlog = {
		// 		...blogToComment,
		// 		comments: [...blogToComment.comments, action.data]
		// 	}

		// 	return state.map(blog =>
		// 		blog.id !== id ? blog : commentedBlog
		// 	)

		// }
		default:
			return state
	}
  }


export const addComment= (id, blog, comment) => {
	return async dispatch => {
		const commentedBlog =  {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes,
			comments: [...blog.comments, comment]
		}

		await blogService.comment(id, commentedBlog)

		dispatch({
			type: 'ADD_COMMENT',
			comment
		})
	}
}


export default commentReducer