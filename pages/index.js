import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { request } from "../lib/datocms";

const HOMEPAGE_QUERY = `query HomePage($limit: String) {
  allStandardPages(filter: {slug: {eq: $limit}}) {
    standardPageTitle
  }
}`;

export async function getStaticProps() {  
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 'home-page' }
  });
  return {
    props: {data} // will be passed to the page component as props
  };
}

export default function Home({data}) {
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