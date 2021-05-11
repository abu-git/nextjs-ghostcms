import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.scss'

const {BLOG_URL, CONTENT_API_KEY} = process.env

async function getPost(slug: string) {
    const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html,feature_image`).then((res) => res.json())
  
    const posts = res.posts
    return posts[0]    
}

//Ghost CMS request
export const getStaticProps = async ({ params }) => {
    const post = await getPost(params.slug)
    return {
      props: {post}
    }
}


export const getStaticPaths = async () => {
    // paths -> slugs which are allowed
    // fallback -> 
    return {
        paths: [],
        fallback: true
    }
}

type Post = {
    title: string
    html: string
    slug: string
}

const Post: React.FC<{post: Post}> = (props) => {
    //console.log(props)
    const router = useRouter()

    const { post } = props

    if(router.isFallback){
        return <h3>...loading</h3>
    }

    return <div className={styles.container}>
            <p className={styles.goback}>
                <Link href='/'>
                    <a>Go Back</a>
                </Link>
            </p>
            <h1>{post.title}</h1>

            <div dangerouslySetInnerHTML={{ __html: post.html }}></div>   
        </div>
}

export default Post