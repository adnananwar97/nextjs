import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import { request } from "../../lib/datocms";
import { useRouter } from "next/router"
import { getAll } from "../../lib/datocms"

const HOMEPAGE_QUERY = `query HomePage($limit: String) {
  allStandardPages(filter: {slug: {eq: $limit}}) {
    standardPageTitle
  }
}`;

const ALLSLUG_QUERY = `query allSlugQuery {
  allStandardPages {
    standardPageTitle
    slug
  }
}`;

export async function getStaticPaths() {
  const posts = await request({
    query: ALLSLUG_QUERY
  });

  const paths = posts.allStandardPages.map((post) => ({
    params: { slug: post.slug }, // Rename to `slug`
  }));

  return { paths, fallback: false };
}


export async function getStaticProps({params}) {  
   //console.log(params.slug)
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: params.slug }
  });
  return {
    props: {data} // will be passed to the page component as props
  };
}

export default function Slug({data}) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, Everyone!</p>
        <p>
          {' '}
          <Link href="posts/first-post">
            <a className={utilStyles.colorInherit}>See My first post</a>
          </Link>
        </p>
        <p>
          {
            JSON.stringify(data)
          }
        </p>
      </section>
    </Layout>
  )
}