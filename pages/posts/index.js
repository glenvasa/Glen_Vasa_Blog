import AllPosts from "../../components/posts/all-posts"
import {getAllPosts} from '../../lib/posts-util'

   

function AllPostsPage(props){
  return <AllPosts posts={props.posts}/>
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