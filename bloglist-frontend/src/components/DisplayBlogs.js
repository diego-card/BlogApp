import { useState, useEffect } from 'react'
import Blog from '../components/Blog'

const DisplayBlogs = ({ blogs, user, deleteBlog, updateBlog }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6 // Number of items to display per page
    const [displayedBlogs, setDisplayedBlogs] = useState([])
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const cardsToDisplay = sortedBlogs.slice(startIndex, endIndex)

        setDisplayedBlogs(cardsToDisplay.slice(0, 6))
    }, [currentPage, blogs])

    const totalPages = Math.ceil(sortedBlogs.length / itemsPerPage)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }
    return (
        <div>
            {displayedBlogs.reduce((columns, blog, index) => {
                if (index % 3 === 0) {
                    columns.push([])
                }
                columns[columns.length - 1].push(
                    <div key={blog.id} className="column">
                        <Blog key={blog.id} blog={blog} authenticatedUser={user} deleteBlog={deleteBlog} updateBlog={updateBlog} />
                    </div>
                )
                return columns
            }, []).map((columnGroup, index) => (
                <div key={index} className="columns">
                    {columnGroup}
                </div>
            ))
            }

            {/* Pagination controls */}
            <nav className='pagination centering' role='navigation'>
                <div className='pagination-list'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`pagination-link ${currentPage === index + 1 && 'has-background-orangeA has-text-white-ter'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    )
}

export default DisplayBlogs