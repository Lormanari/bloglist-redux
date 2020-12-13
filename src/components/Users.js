import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from '@material-ui/core'

const User = ({ user }) => {
  return (
    <TableRow>
		<TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell>
		<TableCell>{user.blogs.length}</TableCell>
	</TableRow>
  )
}

const Users = () => {

	const users = useSelector(({ users }) => {
		return users
	})


	return (
		<div>
			<h2>Users</h2>

		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					<TableRow>
							<TableCell></TableCell>
							<TableCell>Blogs created</TableCell>
					</TableRow>
					{users.map(user =>
						<User
						key={user.id}
						user={user}
						/>
					)}
				</TableBody>
			</Table>
		</TableContainer>

		</div>
	)

}

export default Users
