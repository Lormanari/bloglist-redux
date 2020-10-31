describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Yurong Z',
			username: 'user',
			password: '12345'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('login').click()
		cy.get('#login-form').should('contain', 'username')
			.and('contain', 'password')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.contains('login').click()
			cy.get('#username').type('user')
			cy.get('#password').type('12345')
			cy.get('#login-button').click()

			cy.contains('Yurong Z logged-in')
		})

		it('fails with wrong credentials', function() {
			cy.contains('login').click()
			cy.get('#username').type('user')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'Wrong credentials')
				.and('have.css', 'color', 'rgb(255, 0, 0)')

			cy.get('html').should('not.contain', 'Yurong Z logged-in')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'user', password: '12345' })
		})

		it('A blog can be created', function() {
			cy.contains('Create new blog').click()
			cy.get('#title').type('What 50 gravitational-wave events reveal about the Universe')
			cy.get('#author').type('Davide Castelvecchi')
			cy.get('#url').type('https://www.nature.com/articles/d41586-020-03047-0')
			cy.contains('Create blog').click()
			cy.contains('What 50 gravitational-wave events reveal about the Universe')
			cy.get('html').find('.blogs-container').contains('What 50 gravitational-wave events reveal about the Universe')
		})

		describe('and a blog exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'What 50 gravitational-wave events reveal about the Universe',
					author: 'Davide Castelvecchi',
					url: 'https://www.nature.com/articles/d41586-020-03047-0'
				})
			})

			it('user can like a blog', function () {
				cy.contains('What 50 gravitational-wave events reveal about the Universe').as('theTitle')
				cy.get('@theTitle').contains('view').click()
				cy.get('@theTitle').parent().parent().contains('like').as('theButton')
			  	cy.get('@theButton').click()
			  	cy.get('.numberOFLikes').should('contain', '1')
			})

			it('user can delete a blog he/she created', function () {
				cy.contains('What 50 gravitational-wave events reveal about the Universe').as('theTitle')
				cy.get('@theTitle').contains('view').click()
				cy.get('@theTitle').parent().parent().contains('remove').as('theButton')
			  	cy.get('@theButton').click()
			  	cy.get('html').should('not.contain', 'What 50 gravitational-wave events reveal about the Universe')
			})

			it('user can not delete a blog he/she was not created', function () {
				const user2 = {
					name: 'Anna S',
					username: 'user2',
					password: '12345'
				}
				cy.request('POST', 'http://localhost:3001/api/users/', user2)

				cy.contains('logout').click()
				cy.contains('login').click()
				cy.get('#username').type('user2')
				cy.get('#password').type('12345')
				cy.get('#login-button').click()

				cy.contains('What 50 gravitational-wave events reveal about the Universe').as('theTitle')
				cy.get('@theTitle').contains('view').click()
				cy.get('@theTitle').parent().parent().should('not.have.class', 'btn-remove')

			})
		})

		it('Blogs are sorted with decending order', function() {
			const blog1 = {
				title: 'Wealthy funder pays reparations for use of HeLa cells',
				author: 'Alexandra Witze',
				url: 'https://www.nature.com/articles/d41586-020-03042-5',
				likes: 12
			}
			const blog2 = {
				title: 'New polio vaccine poised to get emergency WHO approval',
				author: 'Aisling Irwin',
				url: 'https://www.nature.com/articles/d41586-020-03045-2',
				likes: 5
			}
			const blog3 = {
				title: 'What 50 gravitational-wave events reveal about the Universe',
				author: 'Davide Castelvecchi',
				url: 'https://www.nature.com/articles/d41586-020-03047-0',
				likes: 20
			}


			cy.request({
				method: 'POST',
				url: 'http://localhost:3001/api/blogs/',
				headers: {
						'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
			  	},
				body: blog1
			})
			cy.request({
				method: 'POST',
				url: 'http://localhost:3001/api/blogs/',
				headers: {
					'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
			  	},
				body: blog2
			})
			cy.request({
				method: 'POST',
				url: 'http://localhost:3001/api/blogs/',
				headers: {
					'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
				  },
				body: blog3
			})

			cy.visit('http://localhost:3000')



			cy.get('.numberOFLikes').then(($likes) => {
				expect($likes.get(0).innerText).to.eq('20')
				expect($likes.get(2).innerText).to.eq('5')
			})
		})

	})
})
