import { useState } from 'react'
//import blogService from '../services/blogs'
import '../styles/Blog.css'
import LikeButton from './LikeButton'

const Blog = ({ blog, authenticatedUser, deleteBlog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  const [newLikes, setNewLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const whenLogged = {
    display: blog.user.username === authenticatedUser.username ? '' : 'none',
  }

  const handleLike = () => {
    // event.preventDefault()

    const updatedLikes = newLikes + 1
    setNewLikes(updatedLikes)

    // blogService.update(blog.id, { 'likes': updatedLikes })
    updateBlog(blog.id, updatedLikes)
  }

  return (
    <div className='content column blog-card has-background-orangeS'>
      <h4>{blog.title}</h4>
      <p>Author: <i>{blog.author}</i></p>

      <div>
        <button style={hideWhenVisible} onClick={toggleVisibility} className='button is-small has-background-orangeA has-text-white-ter has-text-weight-bold'>Show details</button>
        <button style={showWhenVisible} onClick={toggleVisibility} className='button is-small has-background-orangeA has-text-white-ter has-text-weight-bold'>Hide</button>
      </div>

      <br />
      <p style={showWhenVisible}>User that created the blog: {blog.user.name}</p>
      <div style={showWhenVisible}>
        <span className='label'>
          <LikeButton like={handleLike} />
          {/* <button className="button is-small has-background-success has-text-white-ter has-text-weight-bold" onClick={handleLike}>
            Like
          </button> */}
        </span>
        <span className='value'>
          {blog.likes}
        </span>
      </div>
      <br />
      <br />
      <p style={showWhenVisible}>
        Link:
        <br />
        <a href={`${blog.url}`}>{blog.url}</a>
      </p>
      <p style={showWhenVisible}>
        <button style={whenLogged} onClick={() => deleteBlog(blog.id)} className='button is-small has-background-danger has-text-white-ter has-text-weight-bold'>
          Remove
        </button>
      </p>
    </div >
  )
}

export default Blog