import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`

}

const getAll = async () => {
	const request = axios.get(baseUrl)

	const response = await request
	return response.data
}

const create = async newBlog => {

	const config = {
		headers: { Authorization: token },
	}
	const object = {...newBlog, likes: 0, visible: false}


	const response = await axios.post(baseUrl, object, config)
	return response.data
}

const update = async (id, newBlog) => {
	const request = await axios.put(`${baseUrl}/${id}`, newBlog)
	return request.data
}

const comment = async (id, newBlog) => {
	const request = await axios.post(`${baseUrl}/${id}/comments`, newBlog)
	return request.data
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	}
	await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, comment, remove, setToken }