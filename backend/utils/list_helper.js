const dummy = (blogs) => {
    return 1
}
 
const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)


const favoriteBlog = (blogs) => blogs.reduce((maxLikesBlog, blog) => {
    if (!maxLikesBlog || blog.likes > maxLikesBlog.likes) {
      return blog;
    }

    return {
        "title": maxLikesBlog.title,
        "author": maxLikesBlog.author,
        "likes": maxLikesBlog.likes
    };
}, null);

function mostBlogs(blogs) {
    if (blogs.length === 0) {
      return null; // Return null or handle empty array
    }
  
    const authorWithMostBlogs = blogs.reduce((authors, blog) => {
      const author = blog.author;
      if (!authors[author]) {
        authors[author] = { author, blogs: 0 };
      }
      authors[author].blogs++;
      return authors;
    }, {});
  
    const topAuthor = Object.values(authorWithMostBlogs).reduce((prev, current) =>
      prev.blogs > current.blogs ? prev : current
    );
  
    return topAuthor;
  }

  
function mostLikes(blogs) {
    if (blogs.length === 0) {
      return null; // Return null or handle empty array case as per your requirement
    }
  
    const likesByAuthor = {};
  
    blogs.forEach((blog) => {
      const author = blog.author;
      const likes = blog.likes;
  
      if (!likesByAuthor[author]) {
        likesByAuthor[author] = 0;
      }
  
      likesByAuthor[author] += likes;
    });
  
    let topAuthor = null;
    let maxLikes = 0;
  
    Object.entries(likesByAuthor).forEach(([author, likes]) => {
      if (likes > maxLikes) {
        topAuthor = author;
        maxLikes = likes;
      }
    });
  
    if (topAuthor === null) {
      return null; // Return null or handle case where no likes are found
    }
  
    return {
      author: topAuthor,
      likes: maxLikes,
    };
}
  

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}