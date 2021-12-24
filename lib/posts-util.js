import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts' )

function getPostData(fileName) {
    const filePath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    // returns an object with a data property (for metadata) and content property (post content/markdown text as a string)
    const {data, content} = matter(fileContent)

    const postSlug = fileName.replace(/\.md$/, '') // removes the file extension from filename to give us the slug

    const postData = {
        slug: postSlug,
        ...data, 
        content
    }

    return postData
}

export function getAllPosts() {
    // reads al files in a sync way which is fine b/c we want to parse all posts
    // returns an array of strings of post file names
    const postFiles = fs.readdirSync(postsDirectory)

    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile)    
    })
    // sorts allPosts so that newer posts are sorted before older posts
    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1)

    return sortedPosts
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts()

    const FeaturedPosts = allPosts.filter(post => post.isFeatured)

    return FeaturedPosts
}

