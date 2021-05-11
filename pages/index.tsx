import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const BLOG_URL = 'https://ghost-with-next.herokuapp.com/'
const CONTENT_API_KEY = 'bc8d03d5aabcbde211c0c426d4'

type Post = {

}

async function getPosts(){
  // curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}`).then((res) => res.json())
  
  const titles = res.posts.map((post) => post.title)
  console.log(titles)
  return titles
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    props: {posts}
  }
}

const Home: React.FC<{ posts: string[]}> = (props) => {
  const { posts } = props

  return (
    <div className={styles.container}>
      <h1>Blog</h1>
      <ul>
        {posts.map((post, index) =>{
          return <li key={index}>{post}</li>
        })}
      </ul>
    </div>
  )
}

export default Home
