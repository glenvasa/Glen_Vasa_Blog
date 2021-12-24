import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts' )

export function getPostsFiles() {
    // reads all files in a sync way which is fine b/c we want to parse all posts
    // returns an array of strings of post file names
    return fs.readdirSync(postsDirectory)
}

// by changing argument to postIdentifier instead of filename, we can work with either a filename or slug as argument
// if we pass a slug, the replace method below will do nothing; 
export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, '') // removes the file extension from filename to give us the slug
    const filePath = path.join(postsDirectory, `${postSlug}.md` )
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    // returns an object with a data property (for metadata) and content property (post content/markdown text as a string)
    const {data, content} = matter(fileContent)


    const postData = {
        slug: postSlug,
        ...data, 
        content
    }

    return postData
}

export function getAllPosts() {
    
    const postFiles = getPostsFiles()

    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile)    
    })
    // sorts allPosts so that newer posts are sorted before older posts
    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1)

    return sortedPosts
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts()

    const featuredPosts = allPosts.filter(post => post.isFeatured)

    return featuredPosts
}

