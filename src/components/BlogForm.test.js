import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', () => {
	const createBlog = jest.fn()

	const component = render(
		<BlogForm createBlog={createBlog} />
	)

	const title = component.container.querySelector('#title')
	const author = component.container.querySelector('#author')
	const url = component.container.querySelector('#url')
	const form = component.container.querySelector('form')

	fireEvent.change(title, {
		target: { value: 'Wealthy funder pays reparations for use of HeLa cells' }
	})

	fireEvent.change(author, {
		target: { value: 'Nature' }
	})

	fireEvent.change(url, {
		target: { value: 'https://www.nature.com/articles/d41586-020-03042-5' }
	})

	fireEvent.submit(form)

	// console.log(createBlog.mock.calls)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('Wealthy funder pays reparations for use of HeLa cells' )

})