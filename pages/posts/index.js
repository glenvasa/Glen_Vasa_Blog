import AllPosts from "../../components/posts/all-posts"
import {getAllPosts} from '../../lib/posts-util'
import Head from 'next/head'
import {Fragment} from 'react'
   

function AllPostsPage(props){
  return (
    <Fragment>
      <Head>
        <title>All Blog Posts</title>
        <meta name='description' content='A list of all programming-related blog posts' />
      </Head>
      <AllPosts posts={props.posts}/> 
    </Fragment>
 
    )
}

export function getStaticProps(){
  const allPosts = getAllPosts()

  // we dont' need a revalidate property b/c we likely aren't updating blog posts numerous/several times a day
  // so it's ok to regenerate the page during each new build
  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostsPage