const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  	response.json(blogs)  
})

blogRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

// const getTokenFrom = request => {
// 	const authorization = request.get('authorization')
// 	if (authorization && authorization.startsWith('Bearer ')) {
// 		return authorization.replace('Bearer ', '')
// 	}
// 	return null
// }

blogRouter.post('/', async (request, response) => {
	const body = request.body
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	const user = await User.findById(decodedToken.id)
	//const user = request.user
	
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: decodedToken.id,
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	//response.status(201).json(savedBlog)
	response.json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
	const { likes } = request.body

	const blog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true, context: 'query' })

	response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() === decodedToken.id) {
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} else {
		return response.status(401).json({ error: 'you do not have permission to delete this blog'})
	}
})

module.exports = blogRouter