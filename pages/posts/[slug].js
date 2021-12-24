// slug is a human readable identifier such as blog title with dashes separating words; 
// better for seo than if we just used post id as identifier

import PostContent from "../../components/posts/post-detail/post-content"
import {getPostData, getPostsFiles} from '../../lib/posts-util'

function PostDetailPage(props){
    return (
        <PostContent post={props.post}/>
    )
}

export function getStaticProps(context) {
   const { params} = context
   const {slug} = params
   const postData = getPostData(slug)

    return {
        props: {
            post: postData
        },
        // for one specific post if we update md data w/o rebuilding app, we can get latest data every 10mins/600s
        revalidate: 600
    }
}

// we need getStaticPaths b/c [slug].js is a dynamic path and we need to let Next know which concrete slug values
// we are using and which pages' paths we want to pregenerate.

export function getStaticPaths() {
    const postFileNames = getPostsFiles()

    const slugs = postFileNames.map(postFileName => postFileName.replace(/\.md$/, ''))

    return {
        // if we set the value of paths to [] and then fallback property to 'true' or 'blocking', all of the
        // pages will be prepared and fetched on demand when each page visited
        // would make sense for large blog with thousands of posts that are rarely visited
        // or if you want to pregenerate only your most popular posts but not all
        paths: slugs.map(slug => ({params: {slug: slug}})),
        fallback: false
    }
}

export default PostDetailPage