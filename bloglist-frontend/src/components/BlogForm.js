import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          className='input'
          id='title'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        Author:
        <input
          className='input'
          id='author'
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        Url:
        <input
          className='input'
          id='url'
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>
      <button className='button is-small has-background-success has-text-white-ter has-text-weight-bold' id='submit' type="submit">Save</button>
    </form>
  )
}

export default BlogForm