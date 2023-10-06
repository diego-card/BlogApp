import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const elBlog = {
    title: 'Testy',
    author: 'George Washington',
    url: 'www.test.com',
    likes: 33,
    user: {
        username: 'test',
        name: 'El Testador',
        id: '2189892348923'
    },
    id: '1938839',
}

const elUser = {
    username: 'test',
    name: 'El Testador',
    id: '2189892348923'
}

test('Assures that only title and author of Blog is rendered', async () => {
    render(<Blog blog={elBlog} authenticatedUser={elUser} />)

    const title = screen.queryByText('Testy')
    const author = screen.queryByText('George Washington')

    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const url = screen.queryByText('www.test.com')
    const likes = screen.queryByText(33)

    expect(url).toHaveStyle('display: none')
    expect(likes).toHaveStyle('display: none')
})

test('URL and likes are shown when button clicked', async () => {
    render(<Blog blog={elBlog} authenticatedUser={elUser} />)

    const buttonShow = screen.getByText('Show details')
    const userEventClick = userEvent.setup()
    await userEventClick.click(buttonShow)

    const urlAfterClick = screen.queryByText('www.test.com')
    const likesAfterClick = screen.queryByText(33)

    expect(urlAfterClick).toHaveStyle('display: block')
    expect(likesAfterClick).toHaveStyle('display: block')
})

test('Like button pressed twice', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={elBlog} authenticatedUser={elUser} updateBlog={mockHandler} />)

    const like = screen.getByText('like')
    const clickedEvent = userEvent.setup()
    await clickedEvent.click(like)
    await clickedEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
})