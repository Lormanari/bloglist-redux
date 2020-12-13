import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
	switch(action.type) {
		case 'NEW_BLOG':
			return [...state, action.data]
		case 'INIT_BLOGS':
			return action.data
		case 'ADD_LIKE': {
				const id = action.data.id
				const blogToLike = state.find(b => b.id === id)
				const likedBlog = {
					...blogToLike,
					likes: blogToLike.likes + 1
				}

				return state.map(blog =>
					blog.id !== id ? blog : likedBlog
				)

		}
		case 'ADD_COMMENT': {
			const id = action.data.id
			const blogToComment = state.find(b => b.id === id)
			console.log(blogToComment)
			const commentedBlog = {
				...blogToComment,
				comments: [...blogToComment.comments, action.data.comment]
			}

			return state.map(blog =>
				blog.id !== id ? blog : commentedBlog
			)
		}
		case 'TOGGLE_DETAIL': {
			const id = action.data.id
			const blogToAct = state.find(b => b.id === id)
			const targetBlog = {
				...blogToAct,
				visible: !blogToAct.visible
			}

			return state.map(blog =>
				blog.id !== id ? blog : targetBlog
			)
		}
		case 'REMOVE': {
			const id = action.data.id
			return state.filter(b => b.id !== id)
		}
		default:
			return state
	}
  }



export const createBlog = content => {
	return async dispatch => {
	  	const newBlog = await blogService.create(content)
		dispatch({
			type: 'NEW_BLOG',
			data: newBlog,
		})
	}
  }

export const addLike = (id, blog) => {
	return async dispatch => {
		const likedBlog =  {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1
		}
		console.log(likedBlog)
		await blogService.update(id, likedBlog)
		dispatch({
			type: 'ADD_LIKE',
			data: { id }
		})
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
			data: {id, comment}
		})
	}
}

export const remove = (id, blog) => {
	return async dispatch => {

		const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
		if(ok) {
			await blogService.remove(id)

			dispatch ({
				type: 'REMOVE',
				data: { id }
			})
		}
	}
}
export const toggleVisibility = (id) => {
	return {
		type: 'TOGGLE_DETAIL',
		data: { id }
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
	  const blogs = await blogService.getAll()
	  console.log(blogs)
	  dispatch({
		type: 'INIT_BLOGS',
		data: blogs,
	  })
	}
}

export default blogReducer