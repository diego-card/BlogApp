import React from 'react'
import '@testing-library/jest-dom/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Form calls the event handler received as correct props', async () => {
    const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title')
  await user.type(inputTitle, 'Mengaum Campeaon')

  const inputAuthor = screen.getByPlaceholderText('author')
  await user.type(inputAuthor, 'Arrasxa Di Menotti')

  const inputUrl = screen.getByPlaceholderText('url')
  await user.type(inputUrl, 'www.url.com')

  const createButton = screen.getByText('Save')
  expect(createButton).toBeDefined()
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toMatch('Mengaum Campeaon')
  expect(createBlog.mock.calls[0][0].author).toMatch('Arrasxa Di Menotti')
  expect(createBlog.mock.calls[0][0].url).toMatch('url')
})