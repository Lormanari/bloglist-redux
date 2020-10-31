import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'Wealthy funder pays reparations for use of HeLa cells',
		author: 'Nature',
		url: 'https://www.nature.com/articles/d41586-020-03042-5',
		user: {
			username: 'Root',
		}
	}

	const component = render(
		<Blog blog={blog} />
	)

	// const renderedBlog = component.container.querySelector('.blogItem')
	const blogurl = component.container.querySelector('.blogDetails')

	// console.log(prettyDOM(renderedBlog))

	expect(component.container).toHaveTextContent(
		'Wealthy funder pays reparations for use of HeLa cells'
	)

	expect(component.container).toHaveTextContent(
		'Nature'
	)

	expect(blogurl).toHaveStyle('display: none')

})

test('blogs url and number of likes are shown when show button is clicked', () => {
	const blog = {
		title: 'Wealthy funder pays reparations for use of HeLa cells',
		author: 'Nature',
		url: 'https://www.nature.com/articles/d41586-020-03042-5',
		user: {
			username: 'Root',
		}
	}

	const component = render(
		<Blog blog={blog} />
	)

	const blogurl = component.container.querySelector('.blogDetails')

	const button = component.getByText('view')
	fireEvent.click(button)

	expect(blogurl).not.toHaveStyle('display: none')

})

test('clicking the button twice calls event handler twice', () => {
	const blog = {
		title: 'Wealthy funder pays reparations for use of HeLa cells',
		author: 'Nature',
		url: 'https://www.nature.com/articles/d41586-020-03042-5',
		user: {
			username: 'Root',
		}
	}

	const mockHandler = jest.fn()

	const component = render(
		<Blog blog={blog} controlLikes={mockHandler} />
	)

	const button = component.getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls).toHaveLength(2)

})