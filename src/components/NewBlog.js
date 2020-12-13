import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import {notificationChange} from '../reducers/notificationReducer'

import { Button, TextField } from '@material-ui/core'

const NewBlog = (props) => {

  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
	event.preventDefault()
	console.log('submited')

	const content = {
		author: event.target.author.value,
		title: event.target.title.value,
		url: event.target.url.value
	}
	console.log(content)
	event.target.author.value = ''
	event.target.title.value = ''
	event.target.url.value = ''

	props.toggleVisibility()

	dispatch(createBlog(content))
	dispatch(notificationChange(`a new blog '${content.title}' by ${content.author} added!`, "success"))

	setTimeout(() => {
		dispatch(notificationChange(''))
	}, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form noValidate onSubmit={handleNewBlog}>
        <div>
          {/* author
          <input
            id='author'
            name="author"
          /> */}
		  <TextField id='author' name="author" label="Author" />
        </div>
        <div>
          {/* title
          <input
            id='title'
            name="title"
          /> */}
		  <TextField id='title' name="title" label="Title" />
        </div>
        <div>
          {/* url
          <input
            id='url'
            name="url"
          /> */}
		  <TextField id='url' name="url" label="Url" />
        </div>
        <Button id="create" type="submit" variant="contained" color="primary">create</Button>
      </form>
    </div>
  )
}

export default NewBlog
