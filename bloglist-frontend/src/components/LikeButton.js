import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'

const LikeButton = ({ like }) => {
    const [liked, setLiked] = useState(false)

    const handleLike = () => {
        setLiked(!liked)
        like()

        setTimeout(() => {
            setLiked(false)
        }, 500)
    }

    return (
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
            <FaHeart />
        </button>
    )
}

export default LikeButton