import { useState, useEffect, useRef } from 'react'
// import Blog from './components/Blog'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import DisplayBlogs from './components/DisplayBlogs'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import './styles/App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (err) {
      console.log(err)

      setErrorMessage('Username or password incorrect.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = async () => {
    // event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')

      setSuccessMessage('You logged out. Refresh the page.')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error)

      setErrorMessage(
        `${error.response.data.error}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  // Set a timer to automatically log out the user after 5 minutes of inactivity
  const inactivityTimeout = 5 * 60 * 1000 // 5 minutes in milliseconds
  let timeoutId

  function resetInactivityTimer() {
    // Clear the existing timeout
    clearTimeout(timeoutId)

    // Set a new timeout for 5 minutes
    timeoutId = setTimeout(handleLogout, inactivityTimeout)
  }

  // Attach event listeners to track user activity
  useEffect(() => {
    document.addEventListener('mousemove', resetInactivityTimer)
    document.addEventListener('keydown', resetInactivityTimer)

    // Initialize the timer when the component mounts
    resetInactivityTimer()

    // Clean up the event listeners when the component unmounts
    return () => {
      document.removeEventListener('mousemove', resetInactivityTimer)
      document.removeEventListener('keydown', resetInactivityTimer)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {

      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))

      setSuccessMessage('You added a blog successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      console.log('Error creating blog:', error)
      setErrorMessage(
        `${error.response.data.error}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete the blog?')) {
        await blogService.deleteBlog(id)
        //Updating the blogs without the blog with id deleted
        setBlogs(blogs.filter((blog) => blog.id !== id))

        setSuccessMessage('You deleted the blog successfully')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      }
    } catch (error) {
      console.log('Error deleting blog:', error)
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const updateBlog = async (id, updatedLikes) => {
    try {
      await blogService.update(id, { 'likes': updatedLikes })

      setBlogs(
        blogs.map((blog) =>
          blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
        )
      )
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      console.log(error.message)
    }
  }

  const handleSignup = async (userObject) => {
    try {
      const returnedUser = await userService.create(userObject)
      console.log(returnedUser)
      setSuccessMessage('Login with your new account')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      console.log('Error creating user:', error)
      setErrorMessage(
        `${error.response.data.error}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  if (user === null) {
    return (
      <div id='page'>
        <SuccessNotification message={successMessage} />
        <ErrorNotification message={errorMessage} />

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}

          handleSignup={handleSignup}
        />
        <Footer />
      </div>
    )
  }

  return (
    <div id='page'>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

      <p id='to-right-screen' className='is-size-5'>
        <span className='has-text-weight-bold'>{user.name}</span> logged in <button onClick={handleLogout} className='button is-small has-background-orangeA has-text-white-ter has-text-weight-bold'>Logout</button>
      </p>

      <h3 className='container centering'>
        <span className='orange-primary is-size-3 has-text-weight-bold'>Create a new blog now</span>
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </h3>

      <DisplayBlogs blogs={blogs} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      <Footer />
    </div>
  )
}


export default App