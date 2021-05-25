// import Link from 'next/link'
// import Image from 'next/image'
// import Head from 'next/head'
// import Layout from '../../components/layout'
// import { getAll } from "../../lib/datocms"

// export default function FirstPost() {
//   console.log(getAll())
//   return (
//     <Layout>
//       <Head>
//         <title>First Post in NEXT JS!</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <h1>First Post</h1>
//       <h2>
//         <Link href="/">
//           <a>Back to home</a>
//         </Link>
//       </h2>
//       <Image
//         src="/images/profile.jpg" // Route of the image file
//         height={144} // Desired size with correct aspect ratio
//         width={144} // Desired size with correct aspect ratio
//         alt="Your Name"
//       />
//     </Layout>
//   )
// }



import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import { request } from "../../lib/datocms";
import { useRouter } from "next/router"
import { getAll } from "../../lib/datocms"

const HOMEPAGE_QUERY = `query allSlugQuery {
  allStandardPages {
    standardPageTitle
    slug
  }
}
`;


export async function getStaticProps() {  
  // console.log(getAll)
  const data = await request({
    query: HOMEPAGE_QUERY
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
            console.log(data.allStandardPages)
          }
        </p>
      </section>
    </Layout>
  )
}