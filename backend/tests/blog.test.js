// const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }
    // {
    //     _id: "5a422aa71b54a676234d17f8",
    //     title: "Go To Statement Considered Harmful",
    //     author: "Anonymous",
    //     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    //     likes: 5,
    //     __v: 0
    // },
    // {
    //     _id: "5a422b3a1b54a676234d17f9",
    //     title: "Canonical string reduction",
    //     author: "Edsger W. Dijkstra",
    //     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    //     likes: 12,
    //     __v: 0
    // },
    // {
    //     _id: "5a422b891b54a676234d17fa",
    //     title: "First class tests",
    //     author: "Robert C. Martin",
    //     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    //     likes: 10,
    //     __v: 0
    // },
    // {
    //     _id: "5a422ba71b54a676234d17fb",
    //     title: "TDD harms architecture",
    //     author: "Robert C. Martin",
    //     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    //     likes: 0,
    //     __v: 0
    // },
    // {
    //     _id: "5a422bc61b54a676234d17fc",
    //     title: "Type wars",
    //     author: "Robert C. Martin",
    //     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    //     likes: 2,
    //     __v: 0
    // }
]

// describe('total likes', () => {
//     test('when list has only one blog, equals the likes of that', () => {
//         const result = listHelper.totalLikes(listWithOneBlog)
//         expect(result).toBe(41)
//     })
// })

// describe('most likes', () => {
//     test('when list has only one blog, equals the likes of that', () => {
//         const result = listHelper.favoriteBlog(listWithOneBlog)
//         expect(result).toEqual({ "author": "Edsger W. Dijkstra", "likes": 12, "title": "Canonical string reduction" })
//     })
// })

// describe('most likes', () => {
//     test('when list has only one blog, equals the likes of that', () => {
//         const result = listHelper.mostBlogs(listWithOneBlog)
//         expect(result).toEqual({ "author": "Robert C. Martin", "blogs": 3 })
//     })
// })

// describe('most likes', () => {
//     test('when list has only one blog, equals the likes of that', () => {
//         const result = listHelper.mostLikes(listWithOneBlog)
//         expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
//     })
// })	

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

mongoose.set("bufferTimeoutMS", 30000)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.listWithOneBlog) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.listWithOneBlog.length)
})

test('blog has property of "id"', async () => {
    const response = await api.get('/api/blogs')

    // const contents = response.body.map(blog => b.id)

    expect(response.body[0].id).toBeDefined()
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    //create an array containing the content of every blog returned by the API.
    //The toContain method is used for checking that the blog given to it as a parameter is in the list of blogs returned by the API.
    const contents = response.body.map(b => b.title)
    expect(contents).toContain('React patterns')
})

test('blog without url and title is not added', async () => {
    const newBlog = {
    	id: "5d422dd61d54d676234d17fd",
        author: "Nobody",
        likes: 0,
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
	
	const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.listWithOneBlog.length)
}, 100000)

test('a valid blog can be added', async () => {
    const newBlog = {
        id: "5d422dd61d54d676234d17fd",
        title: "Dummy Test",
        author: "Nobody",
        url: "www.google.com/"
    }
  
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

	
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.listWithOneBlog.length + 1)

	const contents = blogsAtEnd.map(n => n.likes)  
    expect(contents).toContain(
        0
    )
}, 100000)

test('a specific blog can be viewed', async () => {
	const blogsAtStart = await helper.blogsInDb()
  
	const blogToView = blogsAtStart[0]
  
	const resultBlog = await api
		.get(`/api/blogs/${blogToView.id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)
    
	expect(resultBlog.body).toEqual(blogToView)
}, 100000)
  
test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
	const blogToView = blogsAtStart[0]
  
	const resultBlog = await api
		.put(`/api/blogs/${blogToView.id}`)
        .send({ likes: 23 })
		.expect(201)
    
	expect(23).toEqual(resultBlog.body.likes)
}, 100000)

test('a blog can be deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		//.delete(`/api/blogs/5a422aa71b54a676234d17f8`)
		.expect(204)
  
	const blogsAtEnd = await helper.blogsInDb()
  
	expect(blogsAtEnd).toHaveLength(
		helper.listWithOneBlog.length - 1
	)
  
	const contents = blogsAtEnd.map(r => r.title)
  
	expect(contents).not.toContain(blogToDelete.title)
}, 100000)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('expected `username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })
  })

afterAll(async () => {
  await mongoose.connection.close()
})