import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const {BLOG_URL, CONTENT_API_KEY} = process.env


type Post = {
  title: string
  slug: string
}

async function getPosts(){
  // curl "https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062"
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_except,feature_image`).then((res) => res.json())
  
  const posts = res.posts
  return posts
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    props: {posts},
    revalidate: 10
  }
}

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props

  return (
    <div className={styles.container}>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) =>{
          return <li className={styles.postitem} key={post.slug}>
            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
            </li>
        })}
      </ul>
    </div>
  )
}

export default Home
