import React, { useImperativeHandle } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { visibilityChange } from '../reducers/visibleReducer'
import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
	const dispatch = useDispatch()
	const visible = useSelector(({visible}) => {
		return visible
	})

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		dispatch(visibilityChange(visible))
	}

	useImperativeHandle(ref, () => {
		return {
		toggleVisibility
		}
	})

	return (
		<div>
		<div style={hideWhenVisible}>
			{/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
			<Button onClick={toggleVisibility} variant="contained" color="primary">{props.buttonLabel}</Button>
		</div>
		<div style={showWhenVisible} className="togglableContent">
			{props.children}
			{/* <button onClick={toggleVisibility}>cancel</button> */}
			<Button onClick={toggleVisibility} variant="contained" color="secondary">cancel</Button>
		</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'

export default Togglable